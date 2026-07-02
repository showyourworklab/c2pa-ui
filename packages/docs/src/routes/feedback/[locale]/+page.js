
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const { locale } = params;
	const dictionaries = {
		en_US: {
			caption: 'Revelers fill Washington Square Park in New York City on Sunday, June 28, 2026, as crowds gathered following the Queer Liberation March, held alongside the official NYC Pride March.',
			feedback_prompt: 'Return to feedback form',
			feedback_url: 'https://forms.gle/qCGVc81bQqZ2xjH59',
		},
		no_NO: {
			caption: 'Festdeltakere fylte Washington Square Park i New York City søndag 28. juni 2026, da folkemengder samlet seg etter den skeive frigjøringsmarsjen, som ble holdt samtidig med den offisielle NYC Pride-marsjen.',
			feedback_prompt: 'Gå tilbake til tilbakemeldingsskjemaet',
			feedback_url: 'https://forms.gle/oM3UuhDfmpjNujQYA',
		}
	}
	const dictionary = dictionaries[locale];
	if(dictionary) return { dictionary };
	error(404, 'Not found');
};