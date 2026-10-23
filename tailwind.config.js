/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mughlai: {
          red: '#8C231C',
          maroon: '#4A0E17',
          crimson: '#5D0D0D',
          ruby: '#A81C24',
          flame: '#FC4B17',
          amber: '#E65100',
          gold: '#D4AF37',
          goldLight: '#DCCC7B',
          goldDark: '#997B24',
          charcoal: '#121212',
          surface: '#181616',
          card: '#1F1C1C',
          cardHover: '#262222',
          border: '#332B2B',
          borderGold: '#D4AF3740',
          parchment: '#FAF6F0',
          cream: '#F4ECE1',
        }
      },
      fontFamily: {
        display: ['"Alice"', 'Georgia', 'serif'],
        alice: ['"Alice"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        proxima: ['"Proxima Nova"', '"proxima-nova"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
        swiss: ['"Proxima Nova"', '"proxima-nova"', '"Swiss-721"', '"Swiss 721"', 'system-ui', '-apple-system', 'Arial', 'sans-serif'],
        sans: ['"Proxima Nova"', '"proxima-nova"', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'Arial', 'sans-serif'],
        serif: ['"Alice"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(140, 35, 28, 0.3)',
        'gold': '0 10px 30px -10px rgba(212, 175, 55, 0.25)',
        'card': '0 4px 20px 0 rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, #4A0E17 0%, #1A0508 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5D77F 0%, #D4AF37 50%, #997B24 100%)',
        'flame-gradient': 'linear-gradient(135deg, #FC4B17 0%, #8C231C 100%)',
      }
    },
  },
  plugins: [],
}
