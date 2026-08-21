export default Drawer;
type Drawer = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Drawer: import("svelte").Component<{
    open?: boolean;
    title: any;
    description: any;
    direction?: string;
    onOpenChange: any;
    className: any;
    children: any;
}, {}, "">;
type $$ComponentProps = {
    open?: boolean;
    title: any;
    description: any;
    direction?: string;
    onOpenChange: any;
    className: any;
    children: any;
};
