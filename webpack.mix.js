const mix = require('laravel-mix')
const path = require('path')
require('dotenv').config()

module.exports = {
  output: {
    path:path.resolve(__dirname, 'public'),
  }
}

mix.alias({
  '@': path.resolve(__dirname, 'resources'),
  '@r': path.resolve(__dirname, 'resources/react'),
  '@pub': path.resolve(__dirname, 'public'),
})

mix.js('resources/js/app.js', 'public/js').react().sourceMaps()
mix.sass('resources/react/scss/style.scss', 'public/css/app.css')
