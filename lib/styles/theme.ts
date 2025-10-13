// src/styles/theme.ts
import { useMemo } from "react";

// Color palette with reorganized structure
export const Colors = {
  light: {
    // Raw color values
    palette: {
      primary: '#3b82f6', // Modern blue
      secondary: '#6366f1', // Indigo
      tertiary: '#8b5cf6', // Violet
      success: '#10b981', // Emerald
      warning: '#f59e0b', // Amber
      error: '#ef4444', // Red
      surface: '#ffffff',
      surfaceVariant: '#f9fafb', // gray-50
      outline: '#e2e8f0', // gray-200
    },
    
    // Text styles
    text: {
      primary: 'text-blue-600',
      secondary: 'text-indigo-600',
      tertiary: 'text-violet-600',
      success: 'text-emerald-600',
      warning: 'text-amber-600',
      error: 'text-red-600',
      surface: 'text-gray-900',
      muted: 'text-gray-500',
      onPrimaryContainer: 'text-blue-900',
      onSecondaryContainer: 'text-indigo-900',
      onTertiaryContainer: 'text-violet-900',
      onSuccessContainer: 'text-emerald-900',
      onWarningContainer: 'text-amber-900',
      onErrorContainer: 'text-red-900',
      onSurfaceVariant: 'text-gray-900',
    },
    
    // Background styles
    bg: {
      primary: 'bg-blue-600',
      secondary: 'bg-indigo-600',
      tertiary: 'bg-violet-600',
      success: 'bg-emerald-600',
      warning: 'bg-amber-600',
      error: 'bg-red-600',
      surface: 'bg-white',
      surfaceVariant: 'bg-gray-50',
      primaryContainer: 'bg-blue-50/80',
      secondaryContainer: 'bg-indigo-50/80',
      tertiaryContainer: 'bg-violet-50/80',
      successContainer: 'bg-emerald-50/80',
      warningContainer: 'bg-amber-50/80',
      errorContainer: 'bg-red-50/80',
    },
    
    // Interactive states
    states: {
      hover: {
        primary: 'hover:bg-blue-700 transition-colors',
        secondary: 'hover:bg-indigo-700 transition-colors',
        tertiary: 'hover:bg-violet-700 transition-colors',
        success: 'hover:bg-emerald-700 transition-colors',
        warning: 'hover:bg-amber-700 transition-colors',
        error: 'hover:bg-red-700 transition-colors',
        surface: 'hover:bg-gray-50/70 transition-colors',
      },
      focus: {
        primary: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        secondary: 'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        tertiary: 'focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
        success: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
        warning: 'focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
        error: 'focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
        surface: 'focus:ring-2 focus:ring-gray-200',
      },
      active: {
        primary: 'active:bg-blue-800',
        secondary: 'active:bg-indigo-800',
        tertiary: 'active:bg-violet-800',
        success: 'active:bg-emerald-800',
        warning: 'active:bg-amber-800',
        error: 'active:bg-red-800',
        surface: 'active:bg-gray-100',
      },
      disabled: 'opacity-60 cursor-not-allowed',
    },
    
    // UI elements
    ui: {
      border: 'border border-gray-200',
      outlineVariant: 'border-gray-200',
      shadow: {
        sm: 'shadow-sm',
        DEFAULT: 'shadow',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        inner: 'shadow-inner',
        none: 'shadow-none',
      },
      backdrop: {
        blur: 'backdrop-blur-sm bg-white/30',
        fixed: 'fixed inset-0 bg-black bg-opacity-25',
        overlay: 'bg-black/50',
      },
      elevation: {
        level0: 'shadow-none bg-transparent',
        level1: 'shadow-sm bg-white',
        level2: 'shadow bg-white',
        level3: 'shadow-md bg-white',
        level4: 'shadow-lg bg-white',
        level5: 'shadow-xl bg-white',
        card: 'shadow-md rounded-lg bg-white border border-gray-100',
        dropdown: 'shadow-lg rounded-md bg-white border border-gray-100',
        toast: 'shadow-lg rounded-md bg-white border-l-4',
      }
    }
  },
  dark: {
    // Raw color values
    palette: {
      primary: '#60a5fa', // Blue 400
      secondary: '#818cf8', // Indigo 400
      tertiary: '#a78bfa', // Violet 400
      success: '#34d399', // Emerald 400
      warning: '#fbbf24', // Amber 400
      error: '#f87171', // Red 400
      surface: '#1f2937', // Gray 800
      surfaceVariant: '#111827', // Gray 900
      outline: '#374151', // Gray 700
    },
    
    // Text styles
    text: {
      primary: 'text-blue-400',
      secondary: 'text-indigo-400',
      tertiary: 'text-violet-400',
      success: 'text-emerald-400',
      warning: 'text-amber-400',
      error: 'text-red-400',
      surface: 'text-gray-100',
      muted: 'text-gray-400',
      onPrimaryContainer: 'text-blue-200',
      onSecondaryContainer: 'text-indigo-200',
      onTertiaryContainer: 'text-violet-200',
      onSuccessContainer: 'text-emerald-200',
      onWarningContainer: 'text-amber-200',
      onErrorContainer: 'text-red-200',
      onSurfaceVariant: 'text-gray-100',
    },
    
    // Background styles
    bg: {
      primary: 'bg-blue-600',
      secondary: 'bg-indigo-600',
      tertiary: 'bg-violet-600',
      success: 'bg-emerald-600',
      warning: 'bg-amber-600',
      error: 'bg-red-600',
      surface: 'bg-gray-800',
      surfaceVariant: 'bg-gray-900',
      primaryContainer: 'bg-blue-900/40',
      secondaryContainer: 'bg-indigo-900/40',
      tertiaryContainer: 'bg-violet-900/40',
      successContainer: 'bg-emerald-900/40',
      warningContainer: 'bg-amber-900/40',
      errorContainer: 'bg-red-900/40',
    },
    
    // Interactive states
    states: {
      hover: {
        primary: 'hover:bg-blue-500 transition-colors',
        secondary: 'hover:bg-indigo-500 transition-colors',
        tertiary: 'hover:bg-violet-500 transition-colors',
        success: 'hover:bg-emerald-500 transition-colors',
        warning: 'hover:bg-amber-500 transition-colors',
        error: 'hover:bg-red-500 transition-colors',
        surface: 'hover:bg-gray-700 transition-colors',
      },
      focus: {
        primary: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ring-offset-gray-900',
        secondary: 'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ring-offset-gray-900',
        tertiary: 'focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ring-offset-gray-900',
        success: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ring-offset-gray-900',
        warning: 'focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ring-offset-gray-900',
        error: 'focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ring-offset-gray-900',
        surface: 'focus:ring-2 focus:ring-gray-600',
      },
      active: {
        primary: 'active:bg-blue-700',
        secondary: 'active:bg-indigo-700',
        tertiary: 'active:bg-violet-700',
        success: 'active:bg-emerald-700',
        warning: 'active:bg-amber-700',
        error: 'active:bg-red-700',
        surface: 'active:bg-gray-700',
      },
      disabled: 'opacity-60 cursor-not-allowed',
    },
    
    // UI elements
    ui: {
      border: 'border border-gray-700',
      outlineVariant: 'border-gray-700',
      shadow: {
        sm: 'shadow-sm shadow-gray-900',
        DEFAULT: 'shadow shadow-gray-900',
        md: 'shadow-md shadow-gray-900',
        lg: 'shadow-lg shadow-gray-900',
        xl: 'shadow-xl shadow-gray-900',
        inner: 'shadow-inner shadow-gray-900',
        none: 'shadow-none',
      },
      backdrop: {
        blur: 'backdrop-blur-sm bg-black/30',
        fixed: 'fixed inset-0 bg-black bg-opacity-50',
        overlay: 'bg-black/70',
      },
      elevation: {
        level0: 'shadow-none bg-transparent',
        level1: 'shadow-sm bg-gray-800',
        level2: 'shadow bg-gray-800',
        level3: 'shadow-md bg-gray-800',
        level4: 'shadow-lg bg-gray-800',
        level5: 'shadow-xl bg-gray-800',
        card: 'shadow-md rounded-lg bg-gray-800 border border-gray-700',
        dropdown: 'shadow-lg rounded-md bg-gray-800 border border-gray-700',
        toast: 'shadow-lg rounded-md bg-gray-800 border-l-4',
      }
    }
  },
  disableDarkMode: true,
};

// Updated types for new structure
export type SemanticColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'surface';
export type ThemeMode = keyof Omit<typeof Colors, 'disableDarkMode'>;
export type ElevationLevel = keyof typeof Colors.light.ui.elevation;

// Types for accessing specific style categories
export type PaletteColors = keyof typeof Colors.light.palette;
export type TextStyles = keyof typeof Colors.light.text;
export type BgStyles = keyof typeof Colors.light.bg;
export type StateTypes = keyof typeof Colors.light.states;
export type HoverStates = keyof typeof Colors.light.states.hover;
export type FocusStates = keyof typeof Colors.light.states.focus;
export type ActiveStates = keyof typeof Colors.light.states.active;

/**
 * Updates the global Colors object
 */
const setColors = (colors: Partial<typeof Colors>) => {
  Object.assign(Colors, colors);
};

/**
 * Hook to access current theme colors based on system preference or settings
 */
export const useThemeColors = () => {
  // For web, we'll detect theme from system/browser preference
  const prefersDarkMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  return useMemo(
    () => !Colors.disableDarkMode && prefersDarkMode ? Colors.dark : Colors.light,
    [prefersDarkMode]
  );
};

/**
 * Helper functions to access specific style categories
 */
// Utility type for component variants
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'surface';

// Interface for component base props
export interface BaseComponentProps {
  variant?: ComponentVariant;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  className?: string;
}

// Custom hook for component styles
export const useComponentStyles = (props: BaseComponentProps) => {
  const theme = useThemeColors();
  const {
    variant = 'primary',
    disabled,
    error,
    className = '',
  } = props;

  return {
    // Base container styles
    container: `${theme.bg.surface} ${theme.ui.border} ${className}
      ${disabled ? theme.states.disabled : ''}
      ${error ? `border-2 ${theme.text.error}` : ''}`,
      
    // Interactive states
    interactive: {
      hover: !disabled && theme.states.hover[variant],
      focus: !disabled && theme.states.focus[variant],
      active: !disabled && theme.states.active[variant],
    },
    
    // Text and background colors
    colors: {
      text: theme.text[variant],
      bg: theme.bg[variant],
      container: theme.bg[`${variant}Container` as BgStyles],
      onContainer: theme.text[`on${variant.charAt(0).toUpperCase() + variant.slice(1)}Container` as TextStyles],
    },
    
    // Helper and error text
    helper: {
      error: `text-xs ${theme.text.error} mt-1`,
      text: `text-xs ${theme.text.muted} mt-1`,
    },
    
    // UI elements
    ui: {
      border: theme.ui.border,
      surface: theme.bg.surface,
      surfaceVariant: theme.bg.surfaceVariant,
      elevation: theme.ui.elevation,
    }
  };
};

export const useColorHelpers = () => {
  const theme = useThemeColors();
  
  return {
    // Get raw hex color values
    getColor: (colorName: PaletteColors) => theme.palette[colorName],
    
    // Get text style classes
    getText: (textStyle: TextStyles) => theme.text[textStyle],
    
    // Get background style classes
    getBg: (bgStyle: BgStyles) => theme.bg[bgStyle],
    
    // Get interactive state classes
    getHoverState: (element: HoverStates) => theme.states.hover[element],
    getFocusState: (element: FocusStates) => theme.states.focus[element],
    getActiveState: (element: ActiveStates) => theme.states.active[element],
    getDisabledState: () => theme.states.disabled,
    
    // Get full set of styles for a semantic color
    getSemanticStyles: (color: SemanticColor) => ({
      color: theme.palette[color],
      text: theme.text[color],
      bg: theme.bg[color],
      hover: theme.states.hover[color],
      focus: theme.states.focus[color],
      active: theme.states.active[color],
      container: theme.bg[`${color}Container` as BgStyles] || '',
      onContainer: theme.text[`on${color.charAt(0).toUpperCase() + color.slice(1)}Container` as TextStyles] || '',
    }),
    
    // Get UI related styles
    getUIStyles: () => theme.ui,
  };
};

export { setColors };