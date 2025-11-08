// This file tells TypeScript that when you import any file ending in
// '.module.css', it should be treated as an object containing strings.
declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}