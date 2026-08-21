import type { HTMLAttributes } from 'svelte/elements';
import 'syw-common/css/styles.css';
import type { SywEmbedProps } from 'syw-common/types/embed';
type $$ComponentProps = SywEmbedProps & Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    class?: string | null;
};
declare const App: import("svelte").Component<$$ComponentProps, {}, "">;
type App = ReturnType<typeof App>;
export default App;
