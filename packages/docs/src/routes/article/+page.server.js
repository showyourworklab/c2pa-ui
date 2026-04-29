export const prerender = false;

export function load({ redirect }) {
	redirect(301, '/syw');
}