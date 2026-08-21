import type { ComponentPropsWithoutRef } from 'react';
import 'syw-common/css/styles.css';
import type { MapOptions, UiEventHandler } from 'syw-common/types/ui';
interface AppProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    mapOptions: MapOptions;
    onEvent?: UiEventHandler;
}
declare function App({ mapOptions, onEvent, className, ...props }: AppProps): import("react").JSX.Element;
export default App;
