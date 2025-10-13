import { ComponentProps } from "react";
import { Text } from "../../components/text";
declare let switchSettings: {
    base: {
        className: string;
        track: string;
        thumb: string;
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
export declare const setSwitchSettings: (settings: Partial<typeof switchSettings>) => void;
export interface SwitchProps extends Omit<ComponentProps<"input">, "type"> {
    label?: ComponentProps<typeof Text>;
    containerClassName?: string;
    variant?: "text" | "outlined" | "filled";
    color?: keyof typeof switchSettings.base.variant;
}
export declare const Switch: React.FC<SwitchProps>;
export {};
