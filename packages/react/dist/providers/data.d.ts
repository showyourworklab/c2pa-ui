import type { ReactNode } from 'react';
import type { SywMediaData } from 'syw-common/types/c2pa';
interface DataProviderProps extends Pick<SywMediaData, 'src' | 'alt' | 'caption' | 'byline'> {
    children: ReactNode;
}
declare const DataProvider: ({ src, alt, caption, byline, children }: DataProviderProps) => import("react").JSX.Element;
export default DataProvider;
