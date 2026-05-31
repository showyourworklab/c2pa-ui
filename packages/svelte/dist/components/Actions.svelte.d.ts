export default Actions;
type Actions = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Actions: import("svelte").Component<{
    actions: any;
}, {}, "">;
type $$ComponentProps = {
    actions: any;
};
