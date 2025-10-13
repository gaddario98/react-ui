"use client";
import React from 'react';
import { useComposeClassNames } from '../../hooks';
import { Text } from '../text';
import { Icon } from '../icon';

let menuSettings = {
    trigger: {
        className: 'inline-flex items-center gap-2',
    },
    panel: {
        className: 'mt-2 min-w-[12rem] rounded-md border p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur',
    },
    item: {
        className: 'flex items-center gap-2 px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5',
    },
    icon: {
        className: 'w-4 h-4',
    },
};

export const setMenuSettings = (settings: Partial<typeof menuSettings>) => {
    menuSettings = {
        trigger: { ...menuSettings.trigger, ...settings.trigger },
        panel: { ...menuSettings.panel, ...settings.panel },
        item: { ...menuSettings.item, ...settings.item },
        icon: { ...menuSettings.icon, ...settings.icon },
    };
};

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

export const Menu: React.FC<MenuProps> = ({ trigger, items, className, ...props }) => {
    const containerClasses = useComposeClassNames({
        baseClasses: 'relative inline-block text-left',
        additionalClasses: className,
    });
    const triggerClasses = useComposeClassNames({
        baseClasses: menuSettings.trigger.className,
    });
    const panelClasses = useComposeClassNames({
        baseClasses: menuSettings.panel.className,
    });

    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(v => !v);
    const close = () => setOpen(false);

    return (
        <div className={containerClasses} {...props}>
            <button className={triggerClasses} onClick={toggle} aria-expanded={open}>
                {trigger || (
                    <>
                        <Text text="Menu" />
                        <Icon icon="ChevronDown" className={menuSettings.icon.className} />
                    </>
                )}
            </button>
            {open && (
                <div className={panelClasses} role="menu">
                    {items.map(item => (
                        <button
                            key={item.id}
                            className={menuSettings.item.className}
                            role="menuitem"
                            onClick={() => {
                                item.onSelect?.();
                                close();
                            }}
                        >
                            {item.icon && <Icon icon={item.icon as any} className={menuSettings.icon.className} />}
                            <Text text={item.label} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

