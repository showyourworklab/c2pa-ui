import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip';
import type { ComponentProps, ReactNode } from 'react';
export interface TooltipProps {
    content?: ReactNode;
    disabled?: boolean;
    ContentProps?: ComponentProps<typeof ArkTooltip.Content>;
    children: ReactNode;
    className?: string;
}
declare const Tooltip: ({ content, disabled, ContentProps, children, className }: TooltipProps) => string | number | boolean | Iterable<ReactNode> | import("react").JSX.Element | null | undefined;
export default Tooltip;
