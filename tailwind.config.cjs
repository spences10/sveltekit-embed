const typography = require('@tailwindcss/typography')
const daisyui = require('daisyui')

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
	},

	daisyui: {
		themes: ['night', 'winter'],
	},

	plugins: [typography, daisyui],
}

module.exports = config
