export default ManifestContent;
type ManifestContent = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ManifestContent: import("svelte").Component<{
    tabKeys?: any[];
    manifest?: Record<string, any>;
}, {}, "">;
type $$ComponentProps = {
    tabKeys?: any[];
    manifest?: Record<string, any>;
};
