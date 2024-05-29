const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
	},

	daisyui: {
		themes: ['night', 'winter'],
	},

	plugins: [typography, daisyui],
};

module.exports = config;
