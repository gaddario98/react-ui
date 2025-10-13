import { ComponentProps } from "react";
import { Text } from "../text";
import { Icon } from "../icon";
declare let buttonSettings: {
    base: {
        className: string;
        variant: {
            primary: {
                filled: string;
                outlined: string;
                text: string;
            };
            secondary: {
                filled: string;
                outlined: string;
                text: string;
            };
            danger: {
                filled: string;
                outlined: string;
                text: string;
            };
            warning: {
                filled: string;
                outlined: string;
                text: string;
            };
            success: {
                filled: string;
                outlined: string;
                text: string;
            };
            base: {
                filled: string;
                outlined: string;
                text: string;
            };
        };
    };
    text: {
        className: string;
    };
    icon: {
        className: string;
    };
};
export declare const setButtonSettings: (settings: Partial<typeof buttonSettings>) => void;
export interface ButtonProps extends ComponentProps<"button"> {
    text?: ComponentProps<typeof Text>;
    className?: string;
    icon?: ComponentProps<typeof Icon>;
    endIcon?: ComponentProps<typeof Icon>;
    variant?: "text" | "outlined" | "filled";
    color?: keyof typeof buttonSettings.base.variant;
}
export declare const Button: React.FC<ButtonProps>;
export {};
