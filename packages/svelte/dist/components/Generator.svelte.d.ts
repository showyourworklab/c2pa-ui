export default Generator;
type Generator = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Generator: import("svelte").Component<{
    name: any;
    icon: any;
}, {}, "">;
type $$ComponentProps = {
    name: any;
    icon: any;
};
