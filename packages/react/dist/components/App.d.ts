import 'syw-common/css/styles.css';
import type { UiState, UiEventHandler } from 'syw-common/types/ui';
interface AppProps extends Pick<UiState, 'mapOptions'> {
    onEvent?: UiEventHandler;
}
declare function App({ mapOptions, onEvent }: AppProps): import("react").JSX.Element;
export default App;
