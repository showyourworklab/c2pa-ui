export default ProvenanceDrawer;
type ProvenanceDrawer = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ProvenanceDrawer: import("svelte").Component<{
    direction: any;
}, {}, "">;
type $$ComponentProps = {
    direction: any;
};
