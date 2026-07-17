
import { error } from '@sveltejs/kit';
import { DICTIONARIES } from './constants';

export const load = ({ params }) => {
	const { locale } = params;
	const dictionary = DICTIONARIES[locale];
	if(dictionary) return { dictionary };
	error(404, 'Not found');
};