"use client";
import { ComponentProps, ReactNode } from 'react';
import { useComposeClassNames } from '../../hooks';
import { Text } from '../../components/text';

let listSettings = {
  base: {
    className: 'flex flex-col gap-2',
    variant: {
      primary: {
        filled: 'bg-blue-300/5',
        outlined: '',
        text: '',
      },
      secondary: {
        filled: 'bg-gray-300/5',
        outlined: '',
        text: '',
      },
      danger: {
        filled: 'bg-red-300/5',
        outlined: '',
        text: '',
      },
      warning: {
        filled: 'bg-yellow-300/5',
        outlined: '',
        text: '',
      },
      success: {
        filled: 'bg-green-300/5',
        outlined: '',
        text: '',
      },
      base: {
        filled: 'bg-white/5',
        outlined: '',
        text: '',
      },
    }
  },
  item: {
    className: 'px-3 py-2 rounded border',
  },
};

export const setListSettings = (settings: Partial<typeof listSettings>) => {
  listSettings = {
    base: {
      ...listSettings.base,
      ...settings.base,
      variant: {
        primary: settings?.base?.variant?.primary || listSettings.base.variant.primary,
        secondary: settings?.base?.variant?.secondary || listSettings.base.variant.secondary,
        success: settings?.base?.variant?.success || listSettings.base.variant.success,
        danger: settings?.base?.variant?.danger || listSettings.base.variant.danger,
        warning: settings?.base?.variant?.warning || listSettings.base.variant.warning,
        base: settings?.base?.variant?.base || listSettings.base.variant.base,
      },
    },
    item: { ...listSettings.item, ...settings.item },
  };
};

export interface ListProps extends Omit<ComponentProps<'ul'>, 'title'> {
  title?: ComponentProps<typeof Text>;
  items?: ReactNode[];
  variant?: 'text' | 'outlined' | 'filled';
  color?: keyof typeof listSettings.base.variant;
  itemClassName?: string;
}

export const List: React.FC<ListProps> = ({
  className,
  title,
  items,
  children,
  variant = 'text',
  color = 'base',
  itemClassName,
  ...props
}) => {
  const containerClasses = useComposeClassNames({
    baseClasses: listSettings.base.className,
    additionalClasses: className,
    conditionalClasses: {
      [listSettings.base.variant[color].text]: variant === 'text',
      [listSettings.base.variant[color].outlined]: variant === 'outlined',
      [listSettings.base.variant[color].filled]: variant === 'filled',
    },
  });

  const liClasses = useComposeClassNames({
    baseClasses: listSettings.item.className,
    additionalClasses: itemClassName,
  });

  return (
    <div>
      {title && <Text {...title} />}
      <ul className={containerClasses} {...props}>
        {(items || []).map((node, i) => (
          <li key={i} className={liClasses}>{node}</li>
        ))}
        {children}
      </ul>
    </div>
  );
};