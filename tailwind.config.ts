import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // enables class-based dark mode
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // files Tailwind scans for class names
};

export default config;
