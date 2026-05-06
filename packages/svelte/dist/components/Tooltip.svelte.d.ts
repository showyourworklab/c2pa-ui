export default Tooltip;
type Tooltip = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Tooltip: import("svelte").Component<{
    content: any;
    ContentProps?: Record<string, any>;
    className: any;
    children: any;
}, {}, "">;
type $$ComponentProps = {
    content: any;
    ContentProps?: Record<string, any>;
    className: any;
    children: any;
};
