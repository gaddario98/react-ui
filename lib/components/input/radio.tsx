"use client";
import { ComponentProps } from "react";
import { useComposeClassNames } from "../../hooks";
import { Text } from "../../components/text";

let radioSettings = {
    base: {
        className: "w-4 h-4 rounded-full border",
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

export const setRadioSettings = (settings: Partial<typeof radioSettings>) => {
    radioSettings = {
        base: {
            ...radioSettings.base,
            ...settings.base,
            variant: {
                primary: settings?.base?.variant?.primary || radioSettings.base.variant.primary,
                secondary: settings?.base?.variant?.secondary || radioSettings.base.variant.secondary,
                success: settings?.base?.variant?.success || radioSettings.base.variant.success,
                danger: settings?.base?.variant?.danger || radioSettings.base.variant.danger,
                warning: settings?.base?.variant?.warning || radioSettings.base.variant.warning,
                base: settings?.base?.variant?.base || radioSettings.base.variant.base,
            },
        },
        label: {
            ...radioSettings.label,
            ...settings.label,
        },
    };
};

export interface RadioProps extends Omit<ComponentProps<"input">, "type"> {
    label?: ComponentProps<typeof Text>;
    containerClassName?: string;
    variant?: "text" | "outlined" | "filled";
    color?: keyof typeof radioSettings.base.variant;
}

export const Radio: React.FC<RadioProps> = ({
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
        baseClasses: radioSettings.base.className,
        additionalClasses: className,
        conditionalClasses: {
            [radioSettings.base.variant[color].text]: variant === "text",
            [radioSettings.base.variant[color].outlined]: variant === "outlined",
            [radioSettings.base.variant[color].filled]: variant === "filled",
        },
    });

    const labelClassNames = useComposeClassNames({
        baseClasses: radioSettings.label.className,
        additionalClasses: label?.className,
    });

    return (
        <label className={containerClasses}>
            <input type="radio" className={inputClassNames} {...props} />
            {label && <Text {...label} className={labelClassNames} />}
        </label>
    );
};

