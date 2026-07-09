export default ManifestPreview;
type ManifestPreview = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ManifestPreview: import("svelte").Component<{
    open: any;
    manifest: any;
    tabKeys: any;
    previewRef: any;
}, {}, "">;
type $$ComponentProps = {
    open: any;
    manifest: any;
    tabKeys: any;
    previewRef: any;
};
