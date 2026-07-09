export default App;
type App = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const App: import("svelte").Component<{
    variant?: typeof VARIANT_DEFAULT;
    src?: string;
    alt?: string;
    caption?: string;
    byline?: string;
    locale?: string;
    mapOptions?: any;
    onEvent?: any;
}, {}, "">;
type $$ComponentProps = {
    variant?: typeof VARIANT_DEFAULT;
    src?: string;
    alt?: string;
    caption?: string;
    byline?: string;
    locale?: string;
    mapOptions?: any;
    onEvent?: any;
};
