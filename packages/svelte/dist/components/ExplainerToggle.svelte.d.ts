export default ExplainerToggle;
type ExplainerToggle = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ExplainerToggle: import("svelte").Component<{
    class: any;
}, {}, "">;
type $$ComponentProps = {
    class: any;
};
