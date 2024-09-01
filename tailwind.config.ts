import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Adding custom blur values
      blur: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        'custom': '8px', // Example custom blur value
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

export default config;
