import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A1A2F', text: '#13243B' },
        paper: { DEFAULT: '#F3EFE5', 2: '#F6F3EC' },
        sand: { DEFAULT: '#EAE3D4', strong: '#E2DBCC' },
        amber: { DEFAULT: '#F2A937', light: '#FFC25A', deep: '#C98F1E' },
        navy: { DEFAULT: '#2A63A8', soft: '#E8F0FA' },
        mint: { DEFAULT: '#1F9C7F', soft: '#E7F4EF' },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Cairo', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
