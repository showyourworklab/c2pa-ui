export default ManifestContentTabsToggle;
type ManifestContentTabsToggle = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ManifestContentTabsToggle: import("svelte").Component<{
    keys?: any[];
    manifest?: Record<string, any>;
    class: any;
}, {}, "">;
type $$ComponentProps = {
    keys?: any[];
    manifest?: Record<string, any>;
    class: any;
};
