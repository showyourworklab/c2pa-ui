export default ManifestPreview;
type ManifestPreview = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ManifestPreview: import("svelte").Component<{
    manifest: any;
    tabKeys: any;
    open: any;
}, {}, "">;
type $$ComponentProps = {
    manifest: any;
    tabKeys: any;
    open: any;
};
