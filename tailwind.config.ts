import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: '#F0F0F0',
				foreground: 'var(--foreground)',
				'primary': {
					DEFAULT: '#1AA6F1',
					50: '#D9F1FD',
					100: '#D9F1FD',
					200: '#A9DCF7',
					300: '#7ECEF8',
					400: '#53BDF5',
					500: '#1AA6F1',
					600: '#0083C9',
					700: '#006296',
					800: '#013958',
					900: '#012436',
					950: '#001926',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
