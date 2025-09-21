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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
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
