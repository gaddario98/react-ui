import { ComponentProps } from "react";
import { Text } from "../../components/text";
declare let checkboxSettings: {
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
export declare const setCheckboxSettings: (settings: Partial<typeof checkboxSettings>) => void;
export interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
    label?: ComponentProps<typeof Text>;
    containerClassName?: string;
    variant?: "text" | "outlined" | "filled";
    color?: keyof typeof checkboxSettings.base.variant;
}
export declare const Checkbox: React.FC<CheckboxProps>;
export {};
