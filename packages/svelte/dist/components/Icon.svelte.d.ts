import BadgeInfo from '@lucide/svelte/icons/badge-info';
import type { IconProps } from 'syw-common/types/components';
import type { IconType } from 'syw-common/types/ui';
declare const Icon: import("svelte").Component<IconProps, {
    ICONS: Record<IconType, typeof BadgeInfo>;
}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
