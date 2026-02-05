export default Figure;
type Figure = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Figure: import("svelte").Component<{
    children: any;
}, {}, "">;
type $$ComponentProps = {
    children: any;
};
