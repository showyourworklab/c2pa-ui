import type { ReactNode } from 'react';
interface I18nProviderProps {
    locale: string;
    children: ReactNode;
}
declare const I18nProvider: ({ locale, children }: I18nProviderProps) => import("react").JSX.Element;
export default I18nProvider;
