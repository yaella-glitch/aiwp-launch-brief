import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Renderer, Triangle, Program, Mesh } from 'ogl';
import { cn } from '@/lib/utils';

interface MeshGradientProps {
  className?: string;
  /** Force the CSS fallback (useful for offline / failing WebGL). */
  forceFallback?: boolean;
}

/**
 * Khroma-style animated mesh gradient.
 *
 * Renders a fullscreen triangle with a fragment shader that mixes four
 * gradient blobs in violet, indigo, sky, rose — drifting on slow noise.
 * Falls back to stacked CSS blurs if WebGL fails or reduced-motion is on.
 */
export function MeshGradient({ className, forceFallback = false }: MeshGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const useFallback = reduce || forceFallback;

  useEffect(() => {
    if (useFallback) return;
    const el = containerRef.current;
    if (!el) return;

    let renderer: Renderer;
    let raf = 0;
    let disposed = false;

    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
    } catch {
      // WebGL unsupported — leave CSS fallback rendered.
      return;
    }

    const gl = renderer.gl;
    el.appendChild(gl.canvas);
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.inset = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';

    const geometry = new Triangle(gl);

    const vertex = /* glsl */ `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;

      // Simple 2D pseudo-noise — fast and serviceable for ambient motion.
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      // Soft radial blob with smooth falloff.
      float blob(vec2 uv, vec2 center, float radius, float softness) {
        float d = length(uv - center);
        return smoothstep(radius + softness, radius - softness, d);
      }

      void main() {
        vec2 uv = vUv;
        // Keep aspect-corrected so blobs don't squish.
        vec2 cuv = uv;
        cuv.x *= uResolution.x / uResolution.y;

        float t = uTime * 0.06;

        // Slow-drifting centers via 2D noise.
        vec2 c1 = vec2(0.15 + noise(vec2(t, 0.0)) * 0.25,
                       0.30 + noise(vec2(0.0, t)) * 0.18) * vec2(uResolution.x / uResolution.y, 1.0);
        vec2 c2 = vec2(0.85 + noise(vec2(t + 5.0, 1.0)) * 0.18,
                       0.40 + noise(vec2(1.0, t + 5.0)) * 0.22) * vec2(uResolution.x / uResolution.y, 1.0);
        vec2 c3 = vec2(0.55 + noise(vec2(t + 9.0, 2.0)) * 0.22,
                       0.85 + noise(vec2(2.0, t + 9.0)) * 0.12) * vec2(uResolution.x / uResolution.y, 1.0);
        vec2 c4 = vec2(0.35 + noise(vec2(t + 13.0, 3.0)) * 0.20,
                       0.75 + noise(vec2(3.0, t + 13.0)) * 0.16) * vec2(uResolution.x / uResolution.y, 1.0);

        float b1 = blob(cuv, c1, 0.55, 0.55);
        float b2 = blob(cuv, c2, 0.50, 0.55);
        float b3 = blob(cuv, c3, 0.45, 0.55);
        float b4 = blob(cuv, c4, 0.42, 0.55);

        // Restrained palette — deep navy base with restrained violet/indigo accents
        // and a quiet hint of sky/teal. No rose. Inspired by Harvey + Letta.
        vec3 violet = vec3(0.55, 0.44, 0.92);
        vec3 indigo = vec3(0.30, 0.33, 0.78);
        vec3 sky    = vec3(0.20, 0.55, 0.85);
        vec3 deep   = vec3(0.08, 0.07, 0.18);

        vec3 col = vec3(0.024, 0.024, 0.055); // ~rgb(6,6,14)
        col = mix(col, violet, b1 * 0.32);
        col = mix(col, indigo, b2 * 0.28);
        col = mix(col, sky,    b3 * 0.14);
        col = mix(col, deep,   b4 * 0.40);

        // Stronger vignette — keeps focus on the center, calmer edges.
        float vig = smoothstep(1.15, 0.10, length(uv - 0.5));
        col *= mix(0.40, 1.0, vig);

        // Subtle grain to kill banding.
        float grain = (hash(uv * uResolution + uTime) - 0.5) * 0.025;
        col += grain;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const rect = el!.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      program.uniforms.uResolution.value = [rect.width, rect.height];
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const start = performance.now();
    function loop() {
      if (disposed) return;
      // Pause when tab is backgrounded.
      if (!document.hidden) {
        program.uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render({ scene: mesh });
      }
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.canvas.remove();
    };
  }, [useFallback]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {/* CSS fallback layer — visible when WebGL is off or fails to mount */}
      {useFallback && (
        <>
          <div className="absolute -left-[10%] top-[5%] h-[60vmin] w-[60vmin] rounded-full bg-[rgba(165,138,255,0.45)] blur-[100px]" />
          <div className="absolute right-[-8%] top-[20%] h-[55vmin] w-[55vmin] rounded-full bg-[rgba(99,102,241,0.38)] blur-[110px]" />
          <div className="absolute left-[20%] bottom-[-20%] h-[55vmin] w-[55vmin] rounded-full bg-[rgba(244,63,94,0.18)] blur-[120px]" />
          <div className="absolute right-[18%] bottom-[5%] h-[40vmin] w-[40vmin] rounded-full bg-[rgba(56,189,248,0.25)] blur-[90px]" />
        </>
      )}
    </div>
  );
}
