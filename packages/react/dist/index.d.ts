import SywReact from './SywReact';
import type { SywData } from 'syw-common/types/c2pa';
import type { SywReactProps } from './types';
declare const parseSywData: (src: string, options?: {
    locale?: string;
    c2paOptions?: SywReactProps["c2paOptions"];
}) => Promise<SywData>;
export type { SywReactProps };
export { SywReact as default, SywReact, parseSywData };
