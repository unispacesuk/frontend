module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        '$error': '#ef5e5e',
        '$error-hover': '#eb3b3b',
        '$error-active': '#e81717',
        '$success': '#5dc96a',
        '$success-hover': '#40bf4f',
        '$success-active': '#36a243',
        '$primary': '#5fcaee',
        '$primary-hover': '#3cbeea',
        '$primary-active': '#18b2e7',
        '$plain': '#a7a7a7',
        '$plain-hover': '#939393',
        '$plain-active': '#808080',
      },
    },
  },
  plugins: [],
};
