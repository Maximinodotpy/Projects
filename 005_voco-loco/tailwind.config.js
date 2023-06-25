/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      borderWidth: {
        'normal': '1.5px',
        'large': '3px',
      },
      colors: {
        'dark': {
          '100': 'hsl(0,0%,16%)',
        }
      }
    },
  },
  plugins: [],
}

