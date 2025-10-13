import { ComponentProps, ReactNode } from "react";
import { Text } from "../../components/text";
declare let cardSettings: {
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
    header: {
        className: string;
    };
    body: {
        className: string;
    };
    footer: {
        className: string;
    };
    title: {
        className: string;
    };
    subtitle: {
        className: string;
    };
};
export declare const setCardSettings: (settings: Partial<typeof cardSettings>) => void;
export interface CardProps extends Omit<ComponentProps<"div">, "title"> {
    title?: ComponentProps<typeof Text>;
    subtitle?: ComponentProps<typeof Text>;
    headerClassName?: string;
    bodyClassName?: string;
    footerClassName?: string;
    footer?: ReactNode;
    variant?: "text" | "outlined" | "filled";
    color?: keyof typeof cardSettings.base.variant;
}
export declare const Card: React.FC<CardProps>;
export {};
