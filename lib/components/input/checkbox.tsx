"use client";
import { ComponentProps } from "react";
import { useComposeClassNames } from "../../hooks";
import { Text } from "../../components/text";

let checkboxSettings = {
  base: {
    className: "w-4 h-4 rounded border",
    variant: {
      primary: {
        filled: "accent-blue-500 border-blue-400",
        outlined: "border-blue-400",
        text: "border-transparent",
      },
      secondary: {
        filled: "accent-gray-500 border-gray-400",
        outlined: "border-gray-400",
        text: "border-transparent",
      },
      danger: {
        filled: "accent-red-500 border-red-400",
        outlined: "border-red-400",
        text: "border-transparent",
      },
      warning: {
        filled: "accent-yellow-500 border-yellow-400",
        outlined: "border-yellow-400",
        text: "border-transparent",
      },
      success: {
        filled: "accent-green-500 border-green-400",
        outlined: "border-green-400",
        text: "border-transparent",
      },
      base: {
        filled: "accent-white border-white/40",
        outlined: "border-white/60",
        text: "border-transparent",
      },
    },
  },
  label: {
    className: "text-sm",
  },
};

export const setCheckboxSettings = (settings: Partial<typeof checkboxSettings>) => {
  checkboxSettings = {
    base: {
      ...checkboxSettings.base,
      ...settings.base,
      variant: {
        primary: settings?.base?.variant?.primary || checkboxSettings.base.variant.primary,
        secondary: settings?.base?.variant?.secondary || checkboxSettings.base.variant.secondary,
        success: settings?.base?.variant?.success || checkboxSettings.base.variant.success,
        danger: settings?.base?.variant?.danger || checkboxSettings.base.variant.danger,
        warning: settings?.base?.variant?.warning || checkboxSettings.base.variant.warning,
        base: settings?.base?.variant?.base || checkboxSettings.base.variant.base,
      },
    },
    label: {
      ...checkboxSettings.label,
      ...settings.label,
    },
  };
};

export interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  label?: ComponentProps<typeof Text>;
  containerClassName?: string;
  variant?: "text" | "outlined" | "filled";
  color?: keyof typeof checkboxSettings.base.variant;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  containerClassName,
  variant = "outlined",
  color = "base",
  ...props
}) => {
  const containerClasses = useComposeClassNames({
    baseClasses: "flex items-center gap-2",
    additionalClasses: containerClassName,
  });

  const inputClassNames = useComposeClassNames({
    baseClasses: checkboxSettings.base.className,
    additionalClasses: className,
    conditionalClasses: {
      [checkboxSettings.base.variant[color].text]: variant === "text",
      [checkboxSettings.base.variant[color].outlined]: variant === "outlined",
      [checkboxSettings.base.variant[color].filled]: variant === "filled",
    },
  });

  const labelClassNames = useComposeClassNames({
    baseClasses: checkboxSettings.label.className,
    additionalClasses: label?.className,
  });

  return (
    <label className={containerClasses}>
      <input type="checkbox" className={inputClassNames} {...props} />
      {label && <Text {...label} className={labelClassNames} />}
    </label>
  );
};