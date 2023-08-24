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
        'collection': 'repeat(auto-fit, minmax(150px, 1fr))',
        'collectioncp': 'repeat(2,1fr)',
        'collectiontablet': 'repeat(3,1fr)',
        'cp': 'repeat(2, minmax(0, 1fr))',
        'moreCast': 'repeat(auto-fit, minmax(138px, 1fr))',
        'morePosters': 'repeat(auto-fill, minmax(150px, 1fr))',
        'personalInfo': 'repeat(4, minmax(0, 150px))',
        'smallscreenpersonal_info': 'repeat(1, minmax(0, 150px))',
        'allmovies': 'repeat(auto-fit, minmax(250px, 1fr))',
        'searchresults': 'repeat(auto-fill, minmax(150px, 1fr))',
        // Complex site-specific row configuration
       
      },
      screens: {
        xsmallcpsize: '326px',
        cpsize: '490px',
        cpsize1: '492px',
        collectionscreen: '523px',
        cpcollectionscreen: '425px',
        tabletcollectionscreen: '480px',
        collectionsmallscreen: '360px',
        semibigscreens: '1920px',
        bigscreens: '2700px'
      },
      boxShadow: {
        '3xl': '0 0 15px 3px rgba(0, 0, 0, 1)',
        
      },
    },
  },
  plugins: [],
}
