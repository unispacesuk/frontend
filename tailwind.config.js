module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        $action: '#69EA9D',
        '$action-hover': '#42D97E',
        '$action-active': '#79D29D',
        $accent: '#1E293B',
        $error: '#ef5e5e',
        '$error-hover': '#eb3b3b',
        '$error-active': '#e81717',
        $success: '#5dc96a',
        '$success-hover': '#40bf4f',
        '$success-active': '#36a243',
        $primary: '#5fcaee',
        '$primary-hover': '#3cbeea',
        '$primary-active': '#18b2e7',
        $plain: '#a7a7a7',
        '$plain-hover': '#939393',
        '$plain-active': '#808080',
      },
    },
    screens: {
      dashboard: '1250px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
