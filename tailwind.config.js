/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(56px, 9vw, 132px)', { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-lg': ['clamp(40px, 6vw, 72px)', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-md': ['clamp(28px, 3.5vw, 40px)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        eyebrow: ['14px', { lineHeight: '1', letterSpacing: '0.08em', fontWeight: '500' }],
        lead: ['clamp(18px, 1.4vw, 22px)', { lineHeight: '1.5', fontWeight: '400' }],
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        card: '20px',
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(135deg, rgba(165,138,255,0.7), rgba(99,102,241,0.45) 30%, rgba(56,189,248,0.18), rgba(165,138,255,0.05) 80%, rgba(165,138,255,0.7))',
        'card-gradient-hover': 'linear-gradient(135deg, rgba(165,138,255,0.9), rgba(99,102,241,0.65) 30%, rgba(56,189,248,0.32), rgba(165,138,255,0.15) 80%, rgba(165,138,255,0.9))',
        'card-gradient-subtle': 'linear-gradient(135deg, rgba(165,138,255,0.4), rgba(99,102,241,0.2), rgba(165,138,255,0.1))',
        'card-glow': 'radial-gradient(ellipse 100% 80% at 10% 0%, rgba(99,102,241,0.18), transparent 60%)',
      },
      boxShadow: {
        card: '0 4px 30px rgba(0,0,0,0.35)',
        'card-lg': '0 25px 50px -12px rgba(0,0,0,0.5)',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--marquee-duration, 40s) linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
