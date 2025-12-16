/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-green': '#39ff14',
        background: '#000000',
        foreground: '#ffffff',
      },
      fontFamily: {
        heading: ['ui-sans-serif', 'system-ui', 'sans-serif'], // أو الخط اللي كنت مستخدمه
        paragraph: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
