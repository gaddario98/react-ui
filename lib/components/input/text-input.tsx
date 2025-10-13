"use client";
import { ComponentProps } from "react";
import { useComposeClassNames } from "../../hooks";
import { Icon } from "../../components/icon";
import { Text } from "../../components/text";

let inputSettings = {
  base: {
    className:
      "w-full px-3 py-2 rounded-lg border focus:outline-none transition-colors",
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

export const setInputSettings = (settings: Partial<typeof inputSettings>) => {
  inputSettings = {
    base: {
      ...inputSettings.base,
      ...settings.base,
      variant: {
        primary: settings?.base?.variant?.primary || inputSettings.base.variant.primary,
        secondary: settings?.base?.variant?.secondary || inputSettings.base.variant.secondary,
        success: settings?.base?.variant?.success || inputSettings.base.variant.success,
        danger: settings?.base?.variant?.danger || inputSettings.base.variant.danger,
        warning: settings?.base?.variant?.warning || inputSettings.base.variant.warning,
        base: settings?.base?.variant?.base || inputSettings.base.variant.base,
      },
    },
    label: {
      ...inputSettings.label,
      ...settings.label,
    },
    icon: {
      ...inputSettings.icon,
      ...settings.icon,
    },
  };
};

export interface TextInputProps extends ComponentProps<"input"> {
  label?: ComponentProps<typeof Text>;
  containerClassName?: string;
  icon?: ComponentProps<typeof Icon>;
  endIcon?: ComponentProps<typeof Icon>;
  variant?: "text" | "outlined" | "filled";
  color?: keyof typeof inputSettings.base.variant;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  className,
  containerClassName,
  icon,
  endIcon,
  variant = "outlined",
  color = "base",
  type = "text",
  ...props
}) => {
  const containerClasses = useComposeClassNames({
    baseClasses: "flex gap-2 w-full flex-col",
    additionalClasses: containerClassName,
  });

  const inputClassNames = useComposeClassNames({
    baseClasses: inputSettings.base.className,
    additionalClasses: className,
    conditionalClasses: {
      [inputSettings.base.variant[color].text]: variant === "text",
      [inputSettings.base.variant[color].outlined]: variant === "outlined",
      [inputSettings.base.variant[color].filled]: variant === "filled",
    },
  });

  const labelClassNames = useComposeClassNames({
    baseClasses: inputSettings.label.className,
    additionalClasses: label?.className,
  });

  const iconClassNames = useComposeClassNames({
    baseClasses: inputSettings.icon.className,
    additionalClasses: icon?.className,
  });

  const endIconClassNames = useComposeClassNames({
    baseClasses: inputSettings.icon.className,
    additionalClasses: endIcon?.className,
  });

  return (
    <div className={containerClasses}>
      {label && <Text {...label} className={labelClassNames} />}
      {icon && <Icon {...icon} className={iconClassNames} />}
      <input type={type} className={inputClassNames} {...props} />
      {endIcon && <Icon {...endIcon} className={endIconClassNames} />}
    </div>
  );
};
