/** @type {import('tailwindcss').Config} */
/**
 * 重要，要在mui使用必須加入important這行
 * 或是在index.js加入StyledEngineProvider
 * important: '#root',
 * 為避免沒完全覆蓋，可以以上2者都加入
 * 此外還可以註解index.css的@tailwind base;
 * 這樣可以tailwind為主的情況保有原mui的style
 */
// 重要，要在mui使用必須加入important這行
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
};
