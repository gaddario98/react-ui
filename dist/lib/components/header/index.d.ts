import { ComponentProps } from "react";
import { Text } from "../text";
import { Icon } from "../icon";
import { Button } from "../button";
export interface HeaderProps {
    section: HeaderSection[];
    className?: string;
    color?: keyof typeof headerSettings.color;
    title?: ComponentProps<typeof Text>;
    icon?: ComponentProps<typeof Icon>;
    component?: React.JSX.Element;
}
interface HeaderSection {
    items: HeaderSectionItem[];
    className?: string;
}
interface HeaderSectionItem {
    id: string;
    text?: ComponentProps<typeof Text>;
    button?: ComponentProps<typeof Button>;
    icon?: ComponentProps<typeof Icon>;
    subItems?: HeaderSectionItem[];
    onClick?: () => void;
    className?: string;
    component?: React.JSX.Element;
}
declare let headerSettings: {
    base: {
        className: string;
    };
    section: {
        className: string;
        itemClassName: string;
        subItemClassName: string;
    };
    color: {
        primary: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        base: string;
    };
};
export declare const setHeaderSettings: (settings: Partial<typeof headerSettings>) => void;
export declare const Header: React.FC<HeaderProps>;
export {};
