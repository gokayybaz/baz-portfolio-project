/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 0.8s step-end infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-delay': 'float-delay 8s ease-in-out infinite',
        pulse: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        tilt: 'tilt 10s infinite linear',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(20px)' },
        },
        'float-delay': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(20px) translateX(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        'neon-blue': '#4361EE',
        'neon-purple': '#7209B7',
        'neon-pink': '#F72585',
        'cyber-teal': '#4CC9F0',
        'space-gray': {
          900: '#0F1121',
          800: '#1A1B2E',
          700: '#2A2C42',
        },
      },
      boxShadow: {
        'neon': '0 0 5px rgba(66, 153, 225, 0.5), 0 0 20px rgba(66, 153, 225, 0.3)',
        'neon-purple': '0 0 5px rgba(128, 90, 213, 0.5), 0 0 20px rgba(128, 90, 213, 0.3)',
      },
    },
  },
  plugins: [],
}