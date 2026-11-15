import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ChaosBro brand colors
        primary: {
          50: '#f0fdf9',
          100: '#ccfff1',
          200: '#99ffe3',
          300: '#5fffd4',
          400: '#1fffc5',
          500: '#00FFAA', // Primary brand color
          600: '#00e699',
          700: '#00cc88',
          800: '#00b377',
          900: '#009966',
        },
        // Dark theme colors
        dark: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        // Accent colors for different sections
        accent: {
          blue: '#00d4ff',
          purple: '#8b5cf6',
          pink: '#ec4899',
          orange: '#f97316',
        }
      },
      fontFamily: {
        'orbitron': ['var(--font-orbitron)', 'monospace'],
        'rajdhani': ['var(--font-rajdhani)', 'sans-serif'],
        'sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glitch': 'glitch 0.5s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 170, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 255, 170, 0.6)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        'gradient-y': {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #00FFAA 0%, #00d4ff 100%)',
        'gradient-dark': 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
        'mesh-gradient': 'radial-gradient(circle at 25% 25%, rgba(0, 255, 170, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 255, 170, 0.3)',
        'glow-md': '0 0 20px rgba(0, 255, 170, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 255, 170, 0.5)',
        'glow-xl': '0 0 40px rgba(0, 255, 170, 0.6)',
        'neon': '0 0 5px theme(colors.primary.500), 0 0 20px theme(colors.primary.500), 0 0 35px theme(colors.primary.500)',
        'neon-blue': '0 0 5px theme(colors.accent.blue), 0 0 20px theme(colors.accent.blue), 0 0 35px theme(colors.accent.blue)',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/forms'),
  ],
};

export default config; 