import { ComponentProps } from "react";
import { Icon } from "../../components/icon";
import { Text } from "../../components/text";
declare let inputSettings: {
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
    label: {
        className: string;
    };
    icon: {
        className: string;
    };
};
export declare const setInputSettings: (settings: Partial<typeof inputSettings>) => void;
export interface TextInputProps extends ComponentProps<"input"> {
    label?: ComponentProps<typeof Text>;
    containerClassName?: string;
    icon?: ComponentProps<typeof Icon>;
    endIcon?: ComponentProps<typeof Icon>;
    variant?: "text" | "outlined" | "filled";
    color?: keyof typeof inputSettings.base.variant;
}
export declare const TextInput: React.FC<TextInputProps>;
export {};
