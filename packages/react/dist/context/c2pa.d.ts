import type { C2paSdk } from '@contentauth/c2pa-web';
interface C2paContextValue {
    c2pa: C2paSdk | null;
}
declare const C2paContext: import("react").Context<C2paContextValue>;
declare const useC2paContext: () => C2paContextValue;
export { C2paContext, useC2paContext };
