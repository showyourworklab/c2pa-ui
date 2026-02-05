export default Collapse;
type Collapse = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Collapse: import("svelte").Component<{
    open: any;
    children: any;
}, {}, "">;
type $$ComponentProps = {
    open: any;
    children: any;
};
