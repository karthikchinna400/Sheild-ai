/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shield: {
          dark: '#0a0f1d',
          card: '#111827',
          surface: '#1e293b',
          border: '#334155',
          primary: '#0ea5e9',
          accent: '#06b6d4',
          safe: '#10b981',
          low: '#3b82f6',
          medium: '#f59e0b',
          high: '#f97316',
          critical: '#ef4444',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(14, 165, 233, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}

