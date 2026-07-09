export default Markdown;
type Markdown = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Markdown: import("svelte").Component<{
    content: any;
    tag?: string;
    class: any;
}, {}, "">;
type $$ComponentProps = {
    content: any;
    tag?: string;
    class: any;
};
