"use client";
import { ComponentProps, ReactNode } from "react";
import { useComposeClassNames } from "../../hooks";
import { Text } from "../../components/text";

let cardSettings = {
  base: {
    className: "rounded-xl border overflow-hidden",
    variant: {
      primary: {
        filled: "bg-blue-300/10 border-blue-400/30",
        outlined: "border-blue-400/60",
        text: "border-transparent",
      },
      secondary: {
        filled: "bg-gray-300/10 border-gray-400/30",
        outlined: "border-gray-400/60",
        text: "border-transparent",
      },
      danger: {
        filled: "bg-red-300/10 border-red-400/30",
        outlined: "border-red-400/60",
        text: "border-transparent",
      },
      warning: {
        filled: "bg-yellow-300/10 border-yellow-400/30",
        outlined: "border-yellow-400/60",
        text: "border-transparent",
      },
      success: {
        filled: "bg-green-300/10 border-green-400/30",
        outlined: "border-green-400/60",
        text: "border-transparent",
      },
      base: {
        filled: "bg-white/10 border-white/20",
        outlined: "border-white/40",
        text: "border-transparent",
      },
    },
  },
  header: {
    className: "p-4 border-b",
  },
  body: {
    className: "p-4",
  },
  footer: {
    className: "p-3 border-t",
  },
  title: {
    className: "text-lg font-semibold",
  },
  subtitle: {
    className: "text-sm opacity-80",
  },
};

export const setCardSettings = (settings: Partial<typeof cardSettings>) => {
  cardSettings = {
    base: {
      ...cardSettings.base,
      ...settings.base,
      variant: {
        primary: settings?.base?.variant?.primary || cardSettings.base.variant.primary,
        secondary: settings?.base?.variant?.secondary || cardSettings.base.variant.secondary,
        success: settings?.base?.variant?.success || cardSettings.base.variant.success,
        danger: settings?.base?.variant?.danger || cardSettings.base.variant.danger,
        warning: settings?.base?.variant?.warning || cardSettings.base.variant.warning,
        base: settings?.base?.variant?.base || cardSettings.base.variant.base,
      },
    },
    header: { ...cardSettings.header, ...settings.header },
    body: { ...cardSettings.body, ...settings.body },
    footer: { ...cardSettings.footer, ...settings.footer },
    title: { ...cardSettings.title, ...settings.title },
    subtitle: { ...cardSettings.subtitle, ...settings.subtitle },
  };
};

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

export const Card: React.FC<CardProps> = ({
  className,
  title,
  subtitle,
  headerClassName,
  bodyClassName,
  footerClassName,
  footer,
  variant = "outlined",
  color = "base",
  children,
  ...props
}) => {
  const containerClasses = useComposeClassNames({
    baseClasses: cardSettings.base.className,
    additionalClasses: className,
    conditionalClasses: {
      [cardSettings.base.variant[color].text]: variant === "text",
      [cardSettings.base.variant[color].outlined]: variant === "outlined",
      [cardSettings.base.variant[color].filled]: variant === "filled",
    },
  });

  const headerClasses = useComposeClassNames({
    baseClasses: cardSettings.header.className,
    additionalClasses: headerClassName,
  });

  const bodyClasses = useComposeClassNames({
    baseClasses: cardSettings.body.className,
    additionalClasses: bodyClassName,
  });

  const footerClasses = useComposeClassNames({
    baseClasses: cardSettings.footer.className,
    additionalClasses: footerClassName,
  });

  return (
    <div className={containerClasses} {...props}>
      {(title || subtitle) && (
        <div className={headerClasses}>
          {title && <Text {...title} className={cardSettings.title.className} />}
          {subtitle && (
            <Text {...subtitle} className={cardSettings.subtitle.className} />
          )}
        </div>
      )}
      <div className={bodyClasses}>{children}</div>
      {footer && <div className={footerClasses}>{footer}</div>}
    </div>
  );
};
