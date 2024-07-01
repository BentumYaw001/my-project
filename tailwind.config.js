/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'between-xs-sm': '0.8rem',
      },
      screens: {
        'custom-md': '769px',
      },
      colors: {
        customRed: '#E46643',
        customredhover:'#F39765',
        mainblack:'#151619',
        customblack1:'#1D1F22',
        customblack2:'#2B2D31',
        customblack3:'#35393F',
        customgray:"#7C8187"
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },

      typography: (theme) => ({

        light: {
          css: {
            color: theme('colors.black'), // Set text color to black
            'h1, h2, h3, h4, h5': {
              color: '#2B2D31', // Set header colors to black
            },
      'pre': {
        backgroundColor: '#C1C4CB', // Set background color of code blocks to white
        color: theme('colors.black'), // Set text color of code blocks to black
      },
      'blockquote': {
        fontStyle: 'normal', 
        backgroundColor:'#E4E4E4',
        color:'#2B2D31',
        padding: '0.3rem',
        margin: '1rem 0',
        borderRadius: '0.5rem'
      },
      'a': {
        color: theme('colors.black'),
        textDecoration: 'underline',
      },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-lead': theme('colors.gray.400'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray.500'),
            '--tw-prose-bullets': '#E46643', 
            '--tw-prose-hr': theme('colors.gray.500'),
            '--tw-prose-quotes': theme('colors.gray.400'),
            '--tw-prose-quote-borders': '#E46643',
             '--tw-prose-quote-bg': theme('colors.white'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': '#E4E4E4',
            '--tw-prose-pre-bg':'#35393F',
            '--tw-prose-th-borders': theme('colors.gray.800'),
            '--tw-prose-td-borders': theme('colors.gray.700'),
            '--tw-prose-invert-body': theme('colors.gray.300'),
            '--tw-prose-invert-lead': theme('colors.gray.400'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.gray.500'),
            '--tw-prose-invert-bullets': '#E46643', // List bullets remain the same color
            '--tw-prose-invert-hr': theme('colors.gray.500'),
            '--tw-prose-invert-quotes': theme('colors.gray.400'),
            '--tw-prose-invert-quote-borders': '#E46643',
            '--tw-prose-invert-captions': theme('colors.gray.500'),
            '--tw-prose-invert-code': theme('colors.gray.400'),
            '--tw-prose-invert-pre-code': theme('colors.gray.800'),
            '--tw-prose-invert-pre-bg': theme('colors.gray.800'),
            '--tw-prose-invert-th-borders': theme('colors.gray.700'),
            '--tw-prose-invert-td-borders': theme('colors.gray.700'),
            'h6': {
              color: '#E46643', 
            },
           
            'blockquote': {
              fontStyle: 'normal', 
              backgroundColor:'#2B2D31',
              color:'#FFFFFF',
              padding: '0.3rem',
              margin: '1rem 0',
              borderRadius: '0.5rem'
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
