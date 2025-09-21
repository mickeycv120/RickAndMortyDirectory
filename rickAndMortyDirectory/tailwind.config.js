/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  safelist: [
    'bg-background',
    'text-foreground',
    'font-sans',
    'antialiased',
    'bg-[oklch(0.05_0.01_240)]',
  ],
  theme: {
    extend: {
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring))',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary))',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive))',
          foreground: 'oklch(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted))',
          foreground: 'oklch(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          foreground: 'oklch(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'stellar-pulse': {
          '0%, 100%': {
            boxShadow:
              '0 0 8px oklch(0.6 0.12 180 / 0.15), 0 0 16px oklch(0.6 0.12 180 / 0.05), inset 0 0 8px oklch(0.6 0.12 180 / 0.02)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow:
              '0 0 12px oklch(0.6 0.12 180 / 0.2), 0 0 24px oklch(0.6 0.12 180 / 0.08), inset 0 0 12px oklch(0.6 0.12 180 / 0.03)',
            transform: 'scale(1.005)',
          },
        },
        'nebula-drift': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-1px) rotate(0.2deg)' },
          '66%': { transform: 'translateY(0.5px) rotate(-0.1deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
        'cosmic-glow': {
          '0%, 100%': { boxShadow: '0 0 6px oklch(0.65 0.08 300 / 0.1)' },
          '50%': { boxShadow: '0 0 10px oklch(0.65 0.08 300 / 0.15)' },
        },
      },
      animation: {
        'stellar-pulse': 'stellar-pulse 4s ease-in-out infinite',
        'nebula-drift': 'nebula-drift 6s ease-in-out infinite',
        'cosmic-glow': 'cosmic-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
