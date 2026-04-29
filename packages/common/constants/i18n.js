export const LANG_DEFAULT = 'en'
export const LOCALE_DEFAULT = 'en_US'
export const LOCALE_DEFAULTS = {
	en: 'en_US',
	no: 'no_NO',
	sv: 'sv_SE'
}

export const DICTIONARY_EN_US = {
	producer: 'Produced by',
	timestamp: 'Timestamp',
	signator: 'Issued by',
	generator: 'Produced with',
	generator_actions: 'Made {count} actions. See details .',
	location: 'Location',
	ingredients: 'Ingredients',
	provenance_toggle: 'View Image Origin',
	explainer_toggle: 'What is this?',
	explainer_toggle_close: 'Close',
	explainer_methods_pre: 'Read about',
	explainer_methods_link: 'our methods',
	explainer_methods_url: '#',
	status_trusted: 'Trusted',
	status_valid: 'Valid',
	status_invalid: 'Invalid',
	status_unknown: 'Unknown',
	status_validating: 'Validating...',
	status_trusted_definition: 'All C2PA data below is valid and trusted',
	status_valid_definition: 'All C2PA data below is valid',
	status_invalid_definition: 'We found some invalid C2PA data',
	status_unknown_definition: 'We cannot find any C2PA provenance data to validate',
	type_camera: 'Camera',
	type_camera_definition: 'This image was captured by a camera',
	type_ai: 'AI',
	type_ai_definition: 'This image was generated using AI',
	thumbnail_missing: 'No thumbnail available',
	verify_pre: 'See more at',
}

export const DICTIONARY_NO_NO = {
	producer: 'Produsent',
	timestamp: 'Tidsstempel',
	signator: 'Signert av',
	generator: 'Produsert med',
	generator_actions: 'Made {count} actions. See details .',
	location: 'Sted',
	ingredients: 'Ingredienser',
	provenance_toggle: 'Se bildeopprinnelse',
	explainer_toggle: 'Hva er dette?',
	explainer_toggle_close: 'Lukke',
	explainer_methods_pre: 'Les om',
	explainer_methods_link: 'våre metoder',
	explainer_methods_url: '#',
	status_trusted: 'Trusted',
	status_valid: 'Valid',
	status_invalid: 'Invalid',
	status_unknown: 'Unknown',
	status_validating: 'Validating...',
	type_camera: 'Camera',
	thumbnail_missing: 'Ingen miniatyrbilder tilgjengelig',
	verify_pre: 'Se mer på',
}

export const DICTIONARY_SV_SE = {
	producer: 'Producent',
	timestamp: 'Tidsstämpel',
	signator: 'Undertecknad av',
	generator: 'Producerad med',
	generator_actions: 'Made {count} actions. See details .',
	location: 'Plats',
	ingredients: 'Ingredienser',
	provenance_toggle: 'Visa bildens ursprung',
	explainer_toggle: 'Vad är det här?',
	explainer_toggle_close: 'Stäng',
	explainer_methods_pre: 'Läs om',
	explainer_methods_link: 'våra metoder',
	explainer_methods_url: '#',
	status_trusted: 'Trusted',
	status_valid: 'Valid',
	status_invalid: 'Invalid',
	status_unknown: 'Unknown',
	status_validating: 'Validating...',
	type_camera: 'Camera',
	thumbnail_missing: 'Ingen miniatyrbild tillgänglig',
	verify_pre: 'Visa mer på',
}

export const DICTIONARY_DEFAULT = DICTIONARY_EN_US

export const DICTIONARIES = {
	en_US: DICTIONARY_EN_US,
	no_NO: DICTIONARY_NO_NO,
	sv_SE: DICTIONARY_SV_SE
}