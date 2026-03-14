export default Video;
type Video = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<Record<string, never>>): void;
};
declare const Video: import("svelte").Component<Record<string, never>, {}, "">;
