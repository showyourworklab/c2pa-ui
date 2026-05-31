export default ManifestTable;
type ManifestTable = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ManifestTable: import("svelte").Component<{
    keys?: any[];
    manifest?: Record<string, any>;
}, {}, "">;
type $$ComponentProps = {
    keys?: any[];
    manifest?: Record<string, any>;
};
