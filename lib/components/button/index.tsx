"use client";
import { ComponentProps } from "react";
import { Text } from "../text";
import { useComposeClassNames } from "../../hooks";
import { Icon } from "../icon";

let buttonSettings = {
  base: {
    className:
      "px-2 md:px-3 lg:px-4 py-2 md:py-2 rounded-lg cursor-pointer transition-colors focus:outline-none flex justify-between items-center gap-2",
    variant: {
      primary: {
        filled:
          "bg-blue-300/20 hover:bg-blue-300/30 dark:bg-blue-400/20 dark:hover:bg-blue-400/30 dark:text-blue-300 backdrop-blur-[1px] border border-blue-400/20",
        outlined:
          "border border-blue-400 text-blue-400 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300 hover:dark:bg-blue-400/10",
        text: "text-blue-400 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-400/10",
      },
      secondary: {
        filled:
          "bg-gray-300/20 hover:bg-gray-300/30 dark:bg-gray-400/20 dark:hover:bg-gray-400/30 dark:text-gray-300 backdrop-blur-[1px] border border-gray-400/20",
        outlined:
          "border border-gray-400 text-gray-400 hover:bg-gray-50 dark:border-gray-300 dark:text-gray-300 hover:dark:bg-gray-400/10",
        text: "text-gray-400 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-400/10",
      },
      danger: {
        filled:
          "bg-red-300/20 hover:bg-red-300/30 dark:bg-red-400/20 dark:hover:bg-red-400/30 dark:text-red-300 backdrop-blur-[1px] border border-red-400/20",
        outlined:
          "border border-red-400 text-red-400 hover:bg-red-50 dark:border-red-300 dark:text-red-300 hover:dark:bg-red-400/10",
        text: "text-red-400 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-400/10",
      },
      warning: {
        filled:
          "bg-yellow-300/20 hover:bg-yellow-300/30 dark:bg-yellow-400/20 dark:hover:bg-yellow-400/30 dark:text-yellow-300 backdrop-blur-[1px] border border-yellow-400/20",
        outlined:
          "border border-yellow-400 text-yellow-400 hover:bg-yellow-50 dark:border-yellow-300 dark:text-yellow-300 hover:dark:bg-yellow-400/10",
        text: "text-yellow-400 hover:bg-yellow-50 dark:text-yellow-300 dark:hover:bg-yellow-400/10",
      },
      success: {
        filled:
          "bg-green-300/20 hover:bg-green-300/30 dark:bg-green-400/20 dark:hover:bg-green-400/30 dark:text-green-300 backdrop-blur-[1px] border border-green-400/20",
        outlined:
          "border border-green-400 text-green-400 hover:bg-green-50 dark:border-green-300 dark:text-green-300 hover:dark:bg-green-400/10",
        text: "text-green-400 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-400/10",
      },
      base: {
        filled:
          "bg-white/20 hover:bg-white/30 dark:bg-gray-800/20 dark:hover:bg-gray-800/30 dark:text-gray-300 backdrop-blur-[1px] border border-gray-400/20",
        outlined:
          "border border-white/30 hover:border-white/50 text-white hover:bg-white/30 dark:border-gray-300 dark:text-gray-300 hover:dark:bg-gray-400/10",
        text: "text-white hover:bg-white/30 dark:text-gray-300 dark:hover:bg-gray-400/10",
      },
    },
  },
  text: {
    className: "text-sm truncate font-semibold",
  },
  icon: {
    className: "w-4 h-4",
  },
};

export const setButtonSettings = (settings: Partial<typeof buttonSettings>) => {
  buttonSettings = {
    base: {
      ...buttonSettings.base,
      ...settings.base,
      variant: {
        primary:
          settings?.base?.variant?.primary ||
          buttonSettings.base.variant.primary,
        secondary:
          settings?.base?.variant?.secondary ||
          buttonSettings.base.variant.secondary,
        success:
          settings?.base?.variant?.success ||
          buttonSettings.base.variant.success,
        danger:
          settings?.base?.variant?.danger || buttonSettings.base.variant.danger,
        warning:
          settings?.base?.variant?.warning ||
          buttonSettings.base.variant.warning,
        base: settings?.base?.variant?.base || buttonSettings.base.variant.base,
      },
    },
    text: {
      ...buttonSettings.text,
      ...settings.text,
    },
    icon: {
      ...buttonSettings.icon,
      ...settings.icon,
    },
  };
};

export interface ButtonProps extends ComponentProps<"button"> {
  text?: ComponentProps<typeof Text>;
  className?: string;
  icon?: ComponentProps<typeof Icon>;
  endIcon?: ComponentProps<typeof Icon>;
  variant?: "text" | "outlined" | "filled";
  color?: keyof typeof buttonSettings.base.variant;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  className,
  icon,
  endIcon,
  variant = "filled",
  color = "primary",
  ...props
}) => {
  const buttonClassNames = useComposeClassNames({
    baseClasses: buttonSettings.base.className,
    additionalClasses: className,
    conditionalClasses: {
      [buttonSettings.base.variant[color].text]: variant === "text",
      [buttonSettings.base.variant[color].outlined]: variant === "outlined",
      [buttonSettings.base.variant[color].filled]: variant === "filled",
    },
  });

  const textClassNames = useComposeClassNames({
    baseClasses: buttonSettings.text.className,
    additionalClasses: text?.className,
  });

  const iconClassNames = useComposeClassNames({
    baseClasses: buttonSettings.icon.className,
    additionalClasses: icon?.className,
  });

  const endIconClassNames = useComposeClassNames({
    baseClasses: buttonSettings.icon.className,
    additionalClasses: endIcon?.className,
  });

  if (!text && !icon) return null;

  return (
    <button className={buttonClassNames} {...props}>
      {icon && <Icon {...icon} className={iconClassNames} />}
      {text && <Text {...text} className={textClassNames} />}
      {endIcon && <Icon {...endIcon} className={endIconClassNames} />}
    </button>
  );
};
