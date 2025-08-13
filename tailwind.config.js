/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        yellow: {
          main: "#FFE58F",
          point: "#FFC400",
        },
        red: {
          essential: "#E43F2D",
        },
        grey: {
          border: "#C9C9C9",
        }
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
      },

      screens: {
        xs: "320px", 
      },
      
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite'
      }
    },
  },
  plugins: [],
}

