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
        rihlah: {
          dark: '#07261E',
          deep: '#0A382C',
          primary: '#0F4C3A',
          emerald: '#16624C',
          light: '#E6F4F0',
          accent: '#E27A18',
          amber: '#F59E0B',
          gold: '#D4AF37',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
          hover: '#20BA56',
        },
        surface: {
          light: '#F8FAF8',
          card: '#FFFFFF',
          muted: '#F0F5F2',
        },
        ink: {
          main: '#0D1F1A',
          muted: '#4B635B',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        bengali: ['var(--font-hind-siliguri)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 76, 58, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 14px 30px -4px rgba(15, 76, 58, 0.16), 0 6px 12px -2px rgba(226, 122, 24, 0.12)',
        'glow-orange': '0 0 25px -4px rgba(226, 122, 24, 0.35)',
        'glow-green': '0 0 25px -4px rgba(15, 76, 58, 0.35)',
      }
    },
  },
  plugins: [],
};
export default config;
