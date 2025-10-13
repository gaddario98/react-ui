import { icons, LucideProps } from "lucide-react";
import { memo, useMemo, forwardRef } from "react";
import { typography } from "../../styles";
import { useComposeClassNames } from "../../hooks";
import { BaseComponentProps } from "../../styles/theme";

export type LucideIconName = keyof typeof icons;
export type IconSize = keyof typeof typography.icon;
export type IconVariant = "default" | "outline" | "solid" | "mini" | "duotone";

export interface IconProps extends Omit<LucideProps, 'color'>, 
  Pick<BaseComponentProps, 'variant' | 'disabled' | 'className'> {
  icon?: LucideIconName;
  size?: number | IconSize;
  iconVariant?: IconVariant; // Renamed from variant to iconVariant to avoid conflicts
  animated?: boolean;
  animationType?: "pulse" | "spin" | "bounce" | "wiggle";
  ariaLabel?: string;
  ariaHidden?: boolean;
  focusable?: boolean;
}

const IconComponent = forwardRef<SVGSVGElement, IconProps>(({ 
  icon = "ArrowUp", 
  size = "base",
  className,
  iconVariant = "default",
  disabled = false,    // Default disabled state
  animated = false,
  animationType = "spin",
  ariaLabel,
  ariaHidden = !ariaLabel,
  focusable = false,
  ...props 
}, ref) => {
  const LucideIcon = icons[icon] as React.ElementType;

  // Calculate actual size based on string or number
  const iconSize = useMemo(() => {
    if (typeof size === "number") {
      return size;
    }
    // Get the tailwind class from typography.icon
    return size in typography.icon ? undefined : 24;
  }, [size]);

  // Get color from theme if colorVariant is provided
  const iconColor = useMemo(() => {
    // If explicitly disabled, use gray color
    if (disabled) {
      return "#9CA3AF"; // gray-400
    }
    
    // Otherwise use the component's variant color
    return props.stroke || '';
  }, [ props.stroke, disabled]);

  // Define animation classes
  const animationClasses = useMemo(() => {
    if (!animated) return "";
    
    const animations = {
      pulse: "animate-pulse",
      spin: "animate-spin",
      bounce: "animate-bounce",
      wiggle: "animate-wiggle" // Requires custom animation in your tailwind config
    };
    
    return animations[animationType] || "";
  }, [animated, animationType]);

  // Compose classes for the icon
  const iconClasses = useComposeClassNames({
    baseClasses: iconColor,
    additionalClasses: className,
    conditionalClasses: {
      [typeof size === "string" && size in typography.icon ? typography.icon[size as IconSize] : ""]: typeof size === "string",
      "opacity-75": iconVariant === "outline",
      "stroke-1": iconVariant === "outline",
      "stroke-2": iconVariant === "default",
      "fill-current stroke-0": iconVariant === "solid",
      "stroke-[1.5px]": iconVariant === "mini",
      "fill-current stroke-[0.5px] opacity-90": iconVariant === "duotone",
      "opacity-60": disabled, // Add disabled state
      "transition-all duration-300": animated || true, // Always add transition for smoother UX
      "hover:scale-110": animated && !disabled,
      [animationClasses]: !!animationClasses && !disabled
    }
  });

  if (!LucideIcon) return null; 

  return (
    <LucideIcon
      ref={ref}
      size={iconSize}
      className={iconClasses}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      focusable={focusable}
      {...props}
    />
  );
});

IconComponent.displayName = "Icon";

export const Icon = memo(IconComponent);
