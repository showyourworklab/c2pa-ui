import type { ReactNode } from 'react';
import type { UiState } from 'syw-common/types/ui';
interface UiProviderProps extends Pick<Partial<UiState>, 'variant'> {
    children: ReactNode;
}
declare const UiProvider: ({ variant, children }: UiProviderProps) => import("react").JSX.Element;
export default UiProvider;
