export default Modal;
type Modal = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Modal: import("svelte").Component<{
    open: any;
    title: any;
    description: any;
    onOpenChange: any;
    className: any;
    children: any;
}, {}, "">;
type $$ComponentProps = {
    open: any;
    title: any;
    description: any;
    onOpenChange: any;
    className: any;
    children: any;
};
