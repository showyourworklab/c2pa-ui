export default Map;
type Map = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Map: import("svelte").Component<{
    location: any;
}, {}, "">;
type $$ComponentProps = {
    location: any;
};
