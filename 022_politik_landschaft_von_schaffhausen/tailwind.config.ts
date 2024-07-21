import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{html,js,svelte,ts}", './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

    darkMode: 'class', // or 'media' or 'class'

    theme: {
        extend: {}
    },

    plugins: []
} as Config;