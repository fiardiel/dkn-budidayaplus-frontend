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
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				'primary': {
					DEFAULT:'#4682B4',
					50: '#C8DAEA',
					100: '#B9D1E4',
					200: '#9CBDD8',
					300: '#7FA9CD',
					400: '#6196C2',
					500: '#4682B4',
					600: '#36658C',
					700: '#274863',
					800: '#172A3B',
					900: '#070D12',
					950: '#000000'
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
