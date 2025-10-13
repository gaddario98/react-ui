import React from 'react';
import { Icon } from '../icon';
declare let menuSettings: {
    trigger: {
        className: string;
    };
    panel: {
        className: string;
    };
    item: {
        className: string;
    };
    icon: {
        className: string;
    };
};
export declare const setMenuSettings: (settings: Partial<typeof menuSettings>) => void;
export interface MenuItem {
    id: string;
    label: string;
    icon?: Parameters<typeof Icon>[0]['icon'];
    onSelect?: () => void;
}
export interface MenuProps extends React.ComponentProps<'div'> {
    trigger?: React.ReactNode;
    items: MenuItem[];
}
export declare const Menu: React.FC<MenuProps>;
export {};
