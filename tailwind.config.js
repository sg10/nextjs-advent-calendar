import {nextui} from '@nextui-org/theme'

const colors = {'guardsman-red': {
  '50': '#FCF6F0', 
  '100': '#FAEEE3', 
  '200': '#F0CEB9', 
  '300': '#E6AA91', 
  '400': '#D4614C', 
  '500': '#C21010', 
  '600': '#AD0C0C', 
  '700': '#910909', 
  '800': '#750606', 
  '900': '#570303', 
  '950': '#380101'
}}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          default: colors['guardsman-red'][300],
          background: colors['guardsman-red'][50],
          primary: colors['guardsman-red'][500],
          secondary: colors['guardsman-red'][400],
          text: colors['guardsman-red'][900],
          textInvert: colors['guardsman-red'][50],
          border: colors['guardsman-red'][300],
          divider: colors['guardsman-red'][300]     
            
        }
      }
    }
  })],
}
