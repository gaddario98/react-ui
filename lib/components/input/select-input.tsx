"use client";
import { ComponentProps } from "react";
import { useComposeClassNames } from "../../hooks";
import { Icon } from "../../components/icon";
import { Text } from "../../components/text";

let selectSettings = {
  base: {
    className:
      "appearance-none w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none",
    variant: {
      primary: {
        filled:
          "bg-blue-300/10 border-blue-400/30 focus:ring-1 focus:ring-blue-400/50",
        outlined: "border-blue-400/60 focus:border-blue-400",
        text: "border-transparent",
      },
      secondary: {
        filled:
          "bg-gray-300/10 border-gray-400/30 focus:ring-1 focus:ring-gray-400/50",
        outlined: "border-gray-400/60 focus:border-gray-400",
        text: "border-transparent",
      },
      danger: {
        filled:
          "bg-red-300/10 border-red-400/30 focus:ring-1 focus:ring-red-400/50",
        outlined: "border-red-400/60 focus:border-red-400",
        text: "border-transparent",
      },
      warning: {
        filled:
          "bg-yellow-300/10 border-yellow-400/30 focus:ring-1 focus:ring-yellow-400/50",
        outlined: "border-yellow-400/60 focus:border-yellow-400",
        text: "border-transparent",
      },
      success: {
        filled:
          "bg-green-300/10 border-green-400/30 focus:ring-1 focus:ring-green-400/50",
        outlined: "border-green-400/60 focus:border-green-400",
        text: "border-transparent",
      },
      base: {
        filled:
          "bg-white/10 border-white/20 focus:ring-1 focus:ring-white/30",
        outlined: "border-white/40 focus:border-white/70",
        text: "border-transparent",
      },
    },
  },
  label: {
    className: "block text-sm font-medium mb-1.5",
  },
  icon: {
    className: "w-4 h-4 text-current",
  },
};

export const setSelectSettings = (settings: Partial<typeof selectSettings>) => {
  selectSettings = {
    base: {
      ...selectSettings.base,
      ...settings.base,
      variant: {
        primary: settings?.base?.variant?.primary || selectSettings.base.variant.primary,
        secondary: settings?.base?.variant?.secondary || selectSettings.base.variant.secondary,
        success: settings?.base?.variant?.success || selectSettings.base.variant.success,
        danger: settings?.base?.variant?.danger || selectSettings.base.variant.danger,
        warning: settings?.base?.variant?.warning || selectSettings.base.variant.warning,
        base: settings?.base?.variant?.base || selectSettings.base.variant.base,
      },
    },
    label: {
      ...selectSettings.label,
      ...settings.label,
    },
    icon: {
      ...selectSettings.icon,
      ...settings.icon,
    },
  };
};

export interface SelectInputProps extends ComponentProps<"select"> {
  label?: ComponentProps<typeof Text>;
  containerClassName?: string;
  icon?: ComponentProps<typeof Icon>;
  variant?: "text" | "outlined" | "filled";
  color?: keyof typeof selectSettings.base.variant;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  className,
  containerClassName,
  icon,
  variant = "outlined",
  color = "base",
  children,
  ...props
}) => {
  const containerClasses = useComposeClassNames({
    baseClasses: "flex items-center gap-2 w-full relative",
    additionalClasses: containerClassName,
  });

  const selectClassNames = useComposeClassNames({
    baseClasses: selectSettings.base.className,
    additionalClasses: className,
    conditionalClasses: {
      [selectSettings.base.variant[color].text]: variant === "text",
      [selectSettings.base.variant[color].outlined]: variant === "outlined",
      [selectSettings.base.variant[color].filled]: variant === "filled",
    },
  });

  const labelClassNames = useComposeClassNames({
    baseClasses: selectSettings.label.className,
    additionalClasses: label?.className,
  });

  const iconClassNames = useComposeClassNames({
    baseClasses: selectSettings.icon.className,
    additionalClasses: icon?.className,
  });

  return (
    <div className={containerClasses}>
      {label && <Text {...label} className={labelClassNames} />}
      {icon && <Icon {...icon} className={iconClassNames} />}
      <select className={selectClassNames} {...props}>
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <Icon icon="ChevronDown" size={16} className="opacity-70" />
      </div>
    </div>
  );
};