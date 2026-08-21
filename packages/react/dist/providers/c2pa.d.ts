import type { ReactNode } from 'react';
import type { C2paOptions } from 'syw-common/types/c2pa';
interface C2paProviderProps {
    c2paOptions?: C2paOptions;
    children: ReactNode;
}
declare const C2paProvider: ({ c2paOptions, children }: C2paProviderProps) => import("react").JSX.Element;
export default C2paProvider;
