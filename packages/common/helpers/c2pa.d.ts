export function getProducer(data: any): string;
export function getProducerSocials(data: any): import("@contentauth/toolkit").Author[];
export function getGenerator(data: any): any;
export function getSignator(data: any): any;
export function getTimestamp(locale: any, data: any): string;
export function getIngredients(data: any): any;
export function getThumbnail(data: any): any;
export function getVerifyUrl(data: any): string;
export function prepareManifest(locale: any, data: any): {
    producer: string;
    generator: any;
    signator: any;
    timestamp: string;
    ingredients: any;
    thumbnail: any;
};
