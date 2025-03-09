/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary-blue': 'var(--primary-blue)',
          'background-gray': 'var(--background-gray)',
          'text-dark': 'var(--text-dark)',
          'card-white': 'var(--card-white)',
          'accent-pink': 'var(--accent-pink)',
        }
      },
    },
    plugins: [],
  }