
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const { locale } = params;
	const dictionaries = {
		no_NO: {
			caption: 'Over tusen norske supportere samlet seg på Times Square i New York for å være med på «Viking-roingen» to dager før Norges kamp mot Brasil.',
			feedback_prompt: 'Åpne tilbakemeldingsskjemaet',
			feedback_url: 'https://forms.gle/oM3UuhDfmpjNujQYA',
		},
		en_US: {
			caption: 'More than a thousand Norwegian football fans gathered in New York’s Times Square to take part in the “Viking row” two days before Norway’s match against Brazil.',
			feedback_prompt: 'Open feedback form',
			feedback_url: 'https://forms.gle/qCGVc81bQqZ2xjH59',
		},
	}
	const dictionary = dictionaries[locale];
	if(dictionary) return { dictionary };
	error(404, 'Not found');
};