import { ComponentProps } from "react";
import { Text } from "../../components/text";
declare let radioSettings: {
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
};
export declare const setRadioSettings: (settings: Partial<typeof radioSettings>) => void;
export interface RadioProps extends Omit<ComponentProps<"input">, "type"> {
    label?: ComponentProps<typeof Text>;
    containerClassName?: string;
    variant?: "text" | "outlined" | "filled";
    color?: keyof typeof radioSettings.base.variant;
}
export declare const Radio: React.FC<RadioProps>;
export {};
