/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Using CSS variables defined in index.css
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'accent': 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'bg-main': 'var(--bg-main)',
        'bg-card': 'var(--bg-card)',
        'border-color': 'var(--border-color)',
        'error': 'var(--error)',
      },
      keyframes: {
        // Text scramble/glitch
        scramble: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2px, 2px)' },
          '50%': { transform: 'translate(2px, -2px)' },
          '75%': { transform: 'translate(2px, 2px)' },
        },
        // Aurora background waves
        aurora: {
          '0%, 100%': { background-position: '0% 50%' },
          '50%': { background-position: '100% 50%' },
        },
        // Neon pulse for buttons/borders
        pulse_neon: {
          '0%, 100%': { 'box-shadow': '0 0 2px var(--accent), 0 0 5px var(--accent), 0 0 10px var(--accent)' },
          '50%': { 'box-shadow': '0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 40px var(--accent)' },
        },
        // Reveal items
        fade_slide_in: {
          'from': { opacity: 0, transform: 'translateY(20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        // Ripple effect
        ripple: {
          'to': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
         // Particle drift
         drift: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(var(--drift-x), var(--drift-y))' },
          '100%': { transform: 'translate(0, 0)' },
        },
        // Morphing blobs for mesh gradient
        morph: {
          '0%': { 'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { 'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { 'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
      },
      animation: {
        'scramble': 'scramble 0.2s infinite',
        'aurora': 'aurora 20s ease infinite',
        'pulse-neon': 'pulse_neon 4s ease-in-out infinite',
        'fade-slide-in': 'fade_slide_in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'ripple': 'ripple 0.6s linear',
        'drift': 'drift 20s ease-in-out infinite alternate',
        'morph': 'morph 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
