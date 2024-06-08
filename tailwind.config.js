/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#E46643',
        customredhover:'#F39765',
        mainblack:'#151619',
        customblack1:'#1D1F22',
        customblack2:'#2B2D3',
        customblack3:'#35393F',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },

      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray.400'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray.500'),
            '--tw-prose-bullets': '#E46643', // List bullets
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quotes': theme('colors.gray.400'),
            '--tw-prose-quote-borders': '#E46643', // Blockquote borders
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.gray.400'),
            '--tw-prose-pre-code': theme('colors.gray.400'),
            '--tw-prose-pre-bg': theme('colors.gray.800'),
            '--tw-prose-th-borders': theme('colors.gray.800'),
            '--tw-prose-td-borders': theme('colors.gray.700'),
            '--tw-prose-invert-body': theme('colors.gray.300'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.gray.400'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.gray.500'),
            '--tw-prose-invert-bullets': '#E46643', // List bullets
            '--tw-prose-invert-hr': theme('colors.gray.200'),
            '--tw-prose-invert-quotes': theme('colors.gray.400'),
            '--tw-prose-invert-quote-borders': '#E46643', // Blockquote borders
            '--tw-prose-invert-captions': theme('colors.gray.500'),
            '--tw-prose-invert-code': theme('colors.gray.400'),
            '--tw-prose-invert-pre-code': theme('colors.gray.800'),
            '--tw-prose-invert-pre-bg': theme('colors.gray.800'),
            '--tw-prose-invert-th-borders': theme('colors.gray.700'),
            '--tw-prose-invert-td-borders': theme('colors.gray.700'),
            // Custom styles for headers with 6#
            'h6': {
              color: '#E46643',
            },
            // Custom styles for bullets in list items
            'ul > li::before': {
              backgroundColor: '#E46643',
            },

            'blockquote': {
              fontStyle: 'normal', // Remove italics from blockquotes
            },
          },
        },
      })
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography")],
}