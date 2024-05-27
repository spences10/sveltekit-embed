type Config = {
	[key: string]: string
}

const config: Config = {
	'1:1': `padding-top: 100%;`,
	'16:9': `padding-top: 56.25%;`,
	'4:3': `padding-top: 75%;`,
	'3:2': `padding-top: 66.66%;`,
	'8.5': `padding-top: 62.5%;`,
}

export const getPadding = (aspectRatio: keyof Config) => {
	return config[aspectRatio]
}
