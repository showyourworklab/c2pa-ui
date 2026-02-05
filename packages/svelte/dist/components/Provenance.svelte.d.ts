export default Provenance;
type Provenance = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<Record<string, never>>): void;
};
declare const Provenance: import("svelte").Component<Record<string, never>, {}, "">;
