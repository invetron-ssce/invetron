/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'electric-blue': '#0066FF',
                'cyber-purple': '#7B2FFF',
                'neon-aqua': '#00FFE5',
                'dark-bg': '#050510',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
