import { ComponentProps, ReactNode } from 'react';
import { Text } from '../../components/text';
declare let listSettings: {
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
    item: {
        className: string;
    };
};
export declare const setListSettings: (settings: Partial<typeof listSettings>) => void;
export interface ListProps extends Omit<ComponentProps<'ul'>, 'title'> {
    title?: ComponentProps<typeof Text>;
    items?: ReactNode[];
    variant?: 'text' | 'outlined' | 'filled';
    color?: keyof typeof listSettings.base.variant;
    itemClassName?: string;
}
export declare const List: React.FC<ListProps>;
export {};
