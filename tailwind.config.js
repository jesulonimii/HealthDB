/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        x: {
          blue: "#07135b"
        },
        primary: "#1f8318",
      },
      fontFamily: {
        ['outfit']: ['Outfit-Regular'],
        ['outfit-bold']: ['Outfit-Bold'],
        ['outfit-medium']: ['Outfit-Medium'],
        ['outfit-semibold']: ['Outfit-SemiBold'],
      }
    },
  },
  plugins: [],
}

