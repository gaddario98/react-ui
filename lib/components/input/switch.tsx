"use client";
import { ComponentProps } from "react";
import { useComposeClassNames } from "../../hooks";
import { Text } from "../../components/text";

let switchSettings = {
  base: {
    className: "relative inline-flex items-center w-11 h-6",
    track: "w-full h-full rounded-full transition-colors",
    thumb: "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
    variant: {
      primary: {
        filled: "bg-blue-500",
        outlined: "bg-blue-500/60",
        text: "bg-transparent",
      },
      secondary: {
        filled: "bg-gray-500",
        outlined: "bg-gray-500/60",
        text: "bg-transparent",
      },
      danger: {
        filled: "bg-red-500",
        outlined: "bg-red-500/60",
        text: "bg-transparent",
      },
      warning: {
        filled: "bg-yellow-500",
        outlined: "bg-yellow-500/60",
        text: "bg-transparent",
      },
      success: {
        filled: "bg-green-500",
        outlined: "bg-green-500/60",
        text: "bg-transparent",
      },
      base: {
        filled: "bg-white/70",
        outlined: "bg-white/40",
        text: "bg-transparent",
      },
    },
  },
  label: {
    className: "ml-3 text-sm",
  },
};

export const setSwitchSettings = (settings: Partial<typeof switchSettings>) => {
  switchSettings = {
    base: {
      ...switchSettings.base,
      ...settings.base,
      variant: {
        primary: settings?.base?.variant?.primary || switchSettings.base.variant.primary,
        secondary: settings?.base?.variant?.secondary || switchSettings.base.variant.secondary,
        success: settings?.base?.variant?.success || switchSettings.base.variant.success,
        danger: settings?.base?.variant?.danger || switchSettings.base.variant.danger,
        warning: settings?.base?.variant?.warning || switchSettings.base.variant.warning,
        base: settings?.base?.variant?.base || switchSettings.base.variant.base,
      },
    },
    label: {
      ...switchSettings.label,
      ...settings.label,
    },
  };
};

export interface SwitchProps extends Omit<ComponentProps<"input">, "type"> {
  label?: ComponentProps<typeof Text>;
  containerClassName?: string;
  variant?: "text" | "outlined" | "filled";
  color?: keyof typeof switchSettings.base.variant;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  className,
  containerClassName,
  variant = "filled",
  color = "base",
  checked,
  ...props
}) => {
  const containerClasses = useComposeClassNames({
    baseClasses: "flex items-center",
    additionalClasses: containerClassName,
  });

  const trackClasses = useComposeClassNames({
    baseClasses: `${switchSettings.base.track}`,
    conditionalClasses: {
      [switchSettings.base.variant[color].text]: variant === "text",
      [switchSettings.base.variant[color].outlined]: variant === "outlined",
      [switchSettings.base.variant[color].filled]: variant === "filled",
    },
  });

  const thumbClasses = useComposeClassNames({
    baseClasses: switchSettings.base.thumb,
  });

  return (
    <label className={containerClasses}>
      <input type="checkbox" className="sr-only" checked={checked} {...props} />
      <span className={`${switchSettings.base.className}`}>
        <span className={trackClasses} />
        <span
          className={thumbClasses}
          style={{ transform: checked ? "translateX(20px)" : "translateX(0px)" }}
        />
      </span>
      {label && <Text {...label} className={switchSettings.label.className} />}
    </label>
  );
};
