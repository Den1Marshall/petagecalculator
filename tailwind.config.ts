import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import tailwindcssReactAriaComponents from 'tailwindcss-react-aria-components';
import tailwindcssSafeArea from 'tailwindcss-safe-area';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    // nextui
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['var(--font-pacifico)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [tailwindcssReactAriaComponents, tailwindcssSafeArea, nextui()],
} satisfies Config;
