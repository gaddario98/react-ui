import { icons, LucideProps } from "lucide-react";
import { typography } from "../../styles";
import { BaseComponentProps } from "../../styles/theme";
export type LucideIconName = keyof typeof icons;
export type IconSize = keyof typeof typography.icon;
export type IconVariant = "default" | "outline" | "solid" | "mini" | "duotone";
export interface IconProps extends Omit<LucideProps, 'color'>, Pick<BaseComponentProps, 'variant' | 'disabled' | 'className'> {
    icon?: LucideIconName;
    size?: number | IconSize;
    iconVariant?: IconVariant;
    animated?: boolean;
    animationType?: "pulse" | "spin" | "bounce" | "wiggle";
    ariaLabel?: string;
    ariaHidden?: boolean;
    focusable?: boolean;
}
export declare const Icon: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<Omit<IconProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>>;
