export default Badge;
type Badge = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Badge: import("svelte").Component<{
    type: any;
    value: any;
    icon: any;
    tooltip: any;
    TooltipProps?: Record<string, any>;
    children: any;
    className: any;
}, {}, "">;
type $$ComponentProps = {
    type: any;
    value: any;
    icon: any;
    tooltip: any;
    TooltipProps?: Record<string, any>;
    children: any;
    className: any;
};
