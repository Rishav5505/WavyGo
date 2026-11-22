/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#035c3e", // Success Green (Premium)
                    light: "#047d54",
                    dark: "#023d29",
                },
                secondary: {
                    DEFAULT: "#facc15", // Golden Yellow (Accent)
                    light: "#fde047",
                    dark: "#a16207",
                },
                slate: {
                    950: "#020617",
                },
                accent: "#10b981", // Emerald 500
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            transitionTimingFunction: {
                'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
                '6xl': '4rem',
            },
            boxShadow: {
                '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
                'premium-sm': '0 1px 2px rgba(2, 44, 30, 0.06), 0 4px 12px -2px rgba(2, 44, 30, 0.10)',
                'premium': '0 2px 4px rgba(2, 44, 30, 0.04), 0 12px 32px -8px rgba(2, 44, 30, 0.18)',
                'premium-lg': '0 4px 8px rgba(2, 44, 30, 0.04), 0 32px 64px -16px rgba(2, 44, 30, 0.22)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 12s linear infinite',
                'loader-bar': 'loader-bar 1.2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
            },
            keyframes: {
                'loader-bar': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(300%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}


