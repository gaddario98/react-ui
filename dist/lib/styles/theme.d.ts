export declare const Colors: {
    light: {
        palette: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
            surfaceVariant: string;
            outline: string;
        };
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
            muted: string;
            onPrimaryContainer: string;
            onSecondaryContainer: string;
            onTertiaryContainer: string;
            onSuccessContainer: string;
            onWarningContainer: string;
            onErrorContainer: string;
            onSurfaceVariant: string;
        };
        bg: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
            surfaceVariant: string;
            primaryContainer: string;
            secondaryContainer: string;
            tertiaryContainer: string;
            successContainer: string;
            warningContainer: string;
            errorContainer: string;
        };
        states: {
            hover: {
                primary: string;
                secondary: string;
                tertiary: string;
                success: string;
                warning: string;
                error: string;
                surface: string;
            };
            focus: {
                primary: string;
                secondary: string;
                tertiary: string;
                success: string;
                warning: string;
                error: string;
                surface: string;
            };
            active: {
                primary: string;
                secondary: string;
                tertiary: string;
                success: string;
                warning: string;
                error: string;
                surface: string;
            };
            disabled: string;
        };
        ui: {
            border: string;
            outlineVariant: string;
            shadow: {
                sm: string;
                DEFAULT: string;
                md: string;
                lg: string;
                xl: string;
                inner: string;
                none: string;
            };
            backdrop: {
                blur: string;
                fixed: string;
                overlay: string;
            };
            elevation: {
                level0: string;
                level1: string;
                level2: string;
                level3: string;
                level4: string;
                level5: string;
                card: string;
                dropdown: string;
                toast: string;
            };
        };
    };
    dark: {
        palette: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
            surfaceVariant: string;
            outline: string;
        };
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
            muted: string;
            onPrimaryContainer: string;
            onSecondaryContainer: string;
            onTertiaryContainer: string;
            onSuccessContainer: string;
            onWarningContainer: string;
            onErrorContainer: string;
            onSurfaceVariant: string;
        };
        bg: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
            surfaceVariant: string;
            primaryContainer: string;
            secondaryContainer: string;
            tertiaryContainer: string;
            successContainer: string;
            warningContainer: string;
            errorContainer: string;
        };
        states: {
            hover: {
                primary: string;
                secondary: string;
                tertiary: string;
                success: string;
                warning: string;
                error: string;
                surface: string;
            };
            focus: {
                primary: string;
                secondary: string;
                tertiary: string;
                success: string;
                warning: string;
                error: string;
                surface: string;
            };
            active: {
                primary: string;
                secondary: string;
                tertiary: string;
                success: string;
                warning: string;
                error: string;
                surface: string;
            };
            disabled: string;
        };
        ui: {
            border: string;
            outlineVariant: string;
            shadow: {
                sm: string;
                DEFAULT: string;
                md: string;
                lg: string;
                xl: string;
                inner: string;
                none: string;
            };
            backdrop: {
                blur: string;
                fixed: string;
                overlay: string;
            };
            elevation: {
                level0: string;
                level1: string;
                level2: string;
                level3: string;
                level4: string;
                level5: string;
                card: string;
                dropdown: string;
                toast: string;
            };
        };
    };
    disableDarkMode: boolean;
};
export type SemanticColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'surface';
export type ThemeMode = keyof Omit<typeof Colors, 'disableDarkMode'>;
export type ElevationLevel = keyof typeof Colors.light.ui.elevation;
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
declare const setColors: (colors: Partial<typeof Colors>) => void;
/**
 * Hook to access current theme colors based on system preference or settings
 */
export declare const useThemeColors: () => {
    palette: {
        primary: string;
        secondary: string;
        tertiary: string;
        success: string;
        warning: string;
        error: string;
        surface: string;
        surfaceVariant: string;
        outline: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        success: string;
        warning: string;
        error: string;
        surface: string;
        muted: string;
        onPrimaryContainer: string;
        onSecondaryContainer: string;
        onTertiaryContainer: string;
        onSuccessContainer: string;
        onWarningContainer: string;
        onErrorContainer: string;
        onSurfaceVariant: string;
    };
    bg: {
        primary: string;
        secondary: string;
        tertiary: string;
        success: string;
        warning: string;
        error: string;
        surface: string;
        surfaceVariant: string;
        primaryContainer: string;
        secondaryContainer: string;
        tertiaryContainer: string;
        successContainer: string;
        warningContainer: string;
        errorContainer: string;
    };
    states: {
        hover: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
        };
        focus: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
        };
        active: {
            primary: string;
            secondary: string;
            tertiary: string;
            success: string;
            warning: string;
            error: string;
            surface: string;
        };
        disabled: string;
    };
    ui: {
        border: string;
        outlineVariant: string;
        shadow: {
            sm: string;
            DEFAULT: string;
            md: string;
            lg: string;
            xl: string;
            inner: string;
            none: string;
        };
        backdrop: {
            blur: string;
            fixed: string;
            overlay: string;
        };
        elevation: {
            level0: string;
            level1: string;
            level2: string;
            level3: string;
            level4: string;
            level5: string;
            card: string;
            dropdown: string;
            toast: string;
        };
    };
};
/**
 * Helper functions to access specific style categories
 */
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'surface';
export interface BaseComponentProps {
    variant?: ComponentVariant;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    className?: string;
}
export declare const useComponentStyles: (props: BaseComponentProps) => {
    container: string;
    interactive: {
        hover: string | false;
        focus: string | false;
        active: string | false;
    };
    colors: {
        text: string;
        bg: string;
        container: string;
        onContainer: string;
    };
    helper: {
        error: string;
        text: string;
    };
    ui: {
        border: string;
        surface: string;
        surfaceVariant: string;
        elevation: {
            level0: string;
            level1: string;
            level2: string;
            level3: string;
            level4: string;
            level5: string;
            card: string;
            dropdown: string;
            toast: string;
        };
    };
};
export declare const useColorHelpers: () => {
    getColor: (colorName: PaletteColors) => string;
    getText: (textStyle: TextStyles) => string;
    getBg: (bgStyle: BgStyles) => string;
    getHoverState: (element: HoverStates) => string;
    getFocusState: (element: FocusStates) => string;
    getActiveState: (element: ActiveStates) => string;
    getDisabledState: () => string;
    getSemanticStyles: (color: SemanticColor) => {
        color: string;
        text: string;
        bg: string;
        hover: string;
        focus: string;
        active: string;
        container: string;
        onContainer: string;
    };
    getUIStyles: () => {
        border: string;
        outlineVariant: string;
        shadow: {
            sm: string;
            DEFAULT: string;
            md: string;
            lg: string;
            xl: string;
            inner: string;
            none: string;
        };
        backdrop: {
            blur: string;
            fixed: string;
            overlay: string;
        };
        elevation: {
            level0: string;
            level1: string;
            level2: string;
            level3: string;
            level4: string;
            level5: string;
            card: string;
            dropdown: string;
            toast: string;
        };
    };
};
export { setColors };
