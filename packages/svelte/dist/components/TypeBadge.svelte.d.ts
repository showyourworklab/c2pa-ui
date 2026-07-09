export default TypeBadge;
type TypeBadge = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const TypeBadge: import("svelte").Component<{
    value: any;
    status: any;
}, {}, "">;
type $$ComponentProps = {
    value: any;
    status: any;
};
