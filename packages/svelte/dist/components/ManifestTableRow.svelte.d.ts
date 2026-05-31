export default ManifestTableRow;
type ManifestTableRow = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ManifestTableRow: import("svelte").Component<{
    type: any;
    value: any;
}, {}, "">;
type $$ComponentProps = {
    type: any;
    value: any;
};
