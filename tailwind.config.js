/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        white: {
          '50': '#ffffff',
          '100': '#efefef',
          '200': '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929',
        },
        ceruleanBlue: {
          '50': '#f0f7fe',
          '100': '#deecfb',
          '200': '#c4dff9',
          '300': '#9bcaf5',
          '400': '#6caeee',
          '500': '#4a8fe7',
          '600': '#3573db',
          '700': '#2a5ac0',
          '800': '#2a4da3',
          '900': '#274381',
          '950': '#1c2b4f',
        },
        orange: {
        '50': '#fff4ed',
        '100': '#ffe7d4',
        '200': '#ffcaa8',
        '300': '#ffa571',
        '400': '#ff6725',
        '500': '#fe4f11',
        '600': '#ef3507',
        '700': '#c62308',
        '800': '#9d1e0f',
        '900': '#7e1c10',
        '950': '#440a06',
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

