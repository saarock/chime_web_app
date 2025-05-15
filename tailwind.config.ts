/// <reference types="node" />

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // already needed
  safelist: [
    'bg-primary-background',
    'bg-secondary-background',
    'bg-primary-btn',
    'bg-primary-btn-hover',
    'text-primary-text',
    'text-secondary-text',
    'shadow-btn',
    'text-primary-btn',
    'text-secondary-btn',
    'bg-secondary-btn',
    'bg-little',
    'bg-primary-hover',
    'border-little',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
