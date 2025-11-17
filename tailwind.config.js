/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-brand-teal',
    'bg-brand-yellow',
    'bg-brand-red',
    'text-brand-teal',
    'text-brand-yellow',
    'text-brand-red',
    'border-brand-teal',
    'border-brand-yellow',
    'border-brand-red',
    'hover:bg-brand-teal',
    'hover:bg-brand-yellow',
    'hover:bg-brand-red',
    'hover:text-brand-teal',
    'hover:text-brand-yellow',
    'hover:text-brand-red',
    'hover:border-brand-teal',
    'hover:border-brand-yellow',
    'hover:border-brand-red',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#007c74',
          yellow: '#F6D02F',
          red: '#ec1c23',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
