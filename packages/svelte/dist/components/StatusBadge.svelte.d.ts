export default StatusBadge;
type StatusBadge = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const StatusBadge: import("svelte").Component<{
    value: any;
}, {}, "">;
type $$ComponentProps = {
    value: any;
};
