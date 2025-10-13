import { ComponentProps } from "react";
import { Icon } from "../../components/icon";
import { Text } from "../../components/text";
declare let selectSettings: {
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
export declare const setSelectSettings: (settings: Partial<typeof selectSettings>) => void;
export interface SelectInputProps extends ComponentProps<"select"> {
    label?: ComponentProps<typeof Text>;
    containerClassName?: string;
    icon?: ComponentProps<typeof Icon>;
    variant?: "text" | "outlined" | "filled";
    color?: keyof typeof selectSettings.base.variant;
}
export declare const SelectInput: React.FC<SelectInputProps>;
export {};
