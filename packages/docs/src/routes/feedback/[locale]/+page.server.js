import { DICTIONARIES } from "./constants";

export const entries = () => Object.keys(DICTIONARIES).map(locale => ({ locale }));
export const prerender = true;