/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        // Simple 8 row grid
        'fit': 'repeat(auto-fit, minmax(200px, 1fr))',
        'fit1': 'repeat(auto-fit, minmax(150px, 1fr))',
        'collection': 'repeat(auto-fit, minmax(176px, 1fr))',
        'cp': 'repeat(2, minmax(0, 1fr))'
        // Complex site-specific row configuration
       
      },
      screens: {
        cpsize: '490px',
        cpsize1: '492px',
      },
      boxShadow: {
        '3xl': '0 0 15px 3px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}
