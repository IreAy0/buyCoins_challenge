// import { LazyResult } from './node_modules/postcss/lib/postcss'

const { LazyResult } = require("postcss");

module.exports = {
  purge: {
    mode: LazyResult,
    content: ['./public/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
       

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}