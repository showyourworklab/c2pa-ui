export default ManifestContentTabs;
type ManifestContentTabs = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ManifestContentTabs: import("svelte").Component<{
    manifest?: Record<string, any>;
    keys?: any[];
}, {}, "">;
type $$ComponentProps = {
    manifest?: Record<string, any>;
    keys?: any[];
};
