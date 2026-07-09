export default Manifest;
type Manifest = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Manifest: import("svelte").Component<{
    manifest?: Record<string, any>;
    previewRef: any;
}, {}, "">;
type $$ComponentProps = {
    manifest?: Record<string, any>;
    previewRef: any;
};
