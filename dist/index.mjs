import { useMemo, useCallback, forwardRef, memo } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import i18n from 'i18next';
import clsx from 'clsx';
import { icons } from 'lucide-react';

// src/styles/theme.ts
// Color palette with reorganized structure
const Colors = {
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
/**
 * Updates the global Colors object
 */
const setColors = (colors) => {
    Object.assign(Colors, colors);
};
/**
 * Hook to access current theme colors based on system preference or settings
 */
const useThemeColors = () => {
    // For web, we'll detect theme from system/browser preference
    const prefersDarkMode = useMemo(() => {
        if (typeof window === 'undefined')
            return false;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }, []);
    return useMemo(() => !Colors.disableDarkMode && prefersDarkMode ? Colors.dark : Colors.light, [prefersDarkMode]);
};
// Custom hook for component styles
const useComponentStyles = (props) => {
    const theme = useThemeColors();
    const { variant = 'primary', disabled, error, className = '', } = props;
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
            container: theme.bg[`${variant}Container`],
            onContainer: theme.text[`on${variant.charAt(0).toUpperCase() + variant.slice(1)}Container`],
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
const useColorHelpers = () => {
    const theme = useThemeColors();
    return {
        // Get raw hex color values
        getColor: (colorName) => theme.palette[colorName],
        // Get text style classes
        getText: (textStyle) => theme.text[textStyle],
        // Get background style classes
        getBg: (bgStyle) => theme.bg[bgStyle],
        // Get interactive state classes
        getHoverState: (element) => theme.states.hover[element],
        getFocusState: (element) => theme.states.focus[element],
        getActiveState: (element) => theme.states.active[element],
        getDisabledState: () => theme.states.disabled,
        // Get full set of styles for a semantic color
        getSemanticStyles: (color) => ({
            color: theme.palette[color],
            text: theme.text[color],
            bg: theme.bg[color],
            hover: theme.states.hover[color],
            focus: theme.states.focus[color],
            active: theme.states.active[color],
            container: theme.bg[`${color}Container`] || '',
            onContainer: theme.text[`on${color.charAt(0).toUpperCase() + color.slice(1)}Container`] || '',
        }),
        // Get UI related styles
        getUIStyles: () => theme.ui,
    };
};

let Layout = {
    // Spacing system
    spacing: {
        xs: "p-1", // 4px
        sm: "p-2", // 8px
        md: "p-4", // 16px
        lg: "p-6", // 24px
        xl: "p-8", // 32px
        "2xl": "p-10", // 40px
        // Directional variants
        x: {
            xs: "px-1",
            sm: "px-2",
            md: "px-4",
            lg: "px-6",
            xl: "px-8",
            "2xl": "px-10",
        },
        y: {
            xs: "py-1",
            sm: "py-2",
            md: "py-4",
            lg: "py-6",
            xl: "py-8",
            "2xl": "py-10",
        },
        base: "p-2 md:p-4 lg:p-6 xl:p-8 2xl:p-10",
        xBase: "px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10",
        yBase: "py-1 sm:py-2 md:py-4 lg:py-6 xl:py-8 2xl:py-10",
    },
    // Gap system
    gap: {
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-10",
    },
    // Modern layout patterns
    page: "flex flex-col min-h-screen w-full items-center",
    section: "w-full py-12 sm:py-16 md:py-24 rounded-3xl shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all",
    header: "sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 shadow-md transition-all",
    footer: "w-full border-t border-gray-200 dark:border-gray-800 py-8 mt-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md",
    // Content layouts
    content: "px-4 sm:px-6 lg:px-8 flex flex-col gap-6 max-w-7xl mx-auto w-full py-4 sm:py-5 lg:py-6",
    contentRow: "flex flex-row items-center gap-3",
    contentCol: "flex flex-col gap-3",
    paragraph: "max-w-prose",
    // Grids
    grid: {
        cols1: "grid grid-cols-1 gap-4",
        cols2: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        cols3: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
        cols4: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
    },
    // Container styles with responsive variants
    container: {
        base: "w-full mx-auto",
        padding: "px-4 sm:px-6 lg:px-8",
        maxWidth: "max-w-7xl",
        centered: "flex items-center justify-center",
        fluid: "w-full max-w-none",
        responsive: {
            sm: "max-w-screen-sm",
            md: "max-w-screen-md",
            lg: "max-w-screen-lg",
            xl: "max-w-screen-xl",
            "2xl": "max-w-screen-2xl",
        },
    },
    // Card layouts
    card: {
        base: "rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-800/90 shadow-lg overflow-hidden backdrop-blur-md",
        header: "px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80",
        body: "px-8 py-6",
        footer: "px-8 py-6 border-t border-gray-100 dark:border-gray-700",
        hover: "transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]",
    },
    // Responsive visibility
    responsive: {
        hideOnMobile: "hidden sm:block",
        hideOnDesktop: "sm:hidden",
        onlyMobile: "block sm:hidden",
        onlyTablet: "hidden sm:block md:hidden",
        onlyDesktop: "hidden md:block",
        showOnHover: "opacity-0 group-hover:opacity-100 transition-opacity",
    },
    // Z-index system
    zIndex: {
        0: "z-0",
        10: "z-10",
        20: "z-20",
        30: "z-30",
        40: "z-40",
        50: "z-50",
        auto: "z-auto",
    },
};
const setlayout = (props) => {
    Object.assign(layout, props);
};
const layout = Layout;

const typography = {
    // Font families - Using system font stack for better performance and modern look
    fontFamily: {
        regular: 'font-sans',
        medium: 'font-sans font-medium',
        light: 'font-sans font-light',
        mono: 'font-mono',
        display: 'font-display', // Usa una variabile custom per display se disponibile
        alt: 'font-sans font-semibold',
        rounded: 'font-sans rounded-full',
    },
    // Text styles with modern scale and responsive classes
    text: {
        // Headings
        hero: 'text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight font-display',
        header: 'text-4xl md:text-5xl font-bold tracking-tight font-display',
        sectionTitle: 'text-2xl md:text-3xl font-semibold tracking-tight font-sans',
        sectionSubtitle: 'text-xl md:text-2xl font-medium tracking-normal font-sans',
        // Content
        listItem: 'text-base md:text-lg font-normal font-sans',
        paragraph: 'text-lg md:text-xl text-gray-700 dark:text-gray-300 font-sans leading-relaxed',
        caption: 'text-sm text-gray-500 dark:text-gray-400 font-sans',
        overline: 'text-xs uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 font-sans',
        // Interactive
        tabLabel: 'text-base font-semibold font-sans',
        button: 'text-base font-semibold font-sans tracking-wide',
        buttonSmall: 'text-sm font-semibold font-sans',
        // Special
        code: 'text-sm font-mono bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-2 py-1 rounded-lg',
        quote: 'text-xl md:text-2xl italic font-light border-l-4 border-primary/60 dark:border-primary/40 pl-6 py-2 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900',
        badge: 'text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-gradient-to-r from-primary/80 to-secondary/80 text-white',
        highlight: 'bg-yellow-200 dark:bg-yellow-600 px-1.5 py-0.5 rounded',
    },
    // Text weights for more flexibility
    weight: {
        thin: 'font-thin',
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
    },
    // Text alignment
    align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    },
    // Line heights
    lineHeight: {
        none: 'leading-none',
        tight: 'leading-tight',
        normal: 'leading-normal',
        relaxed: 'leading-relaxed',
        loose: 'leading-loose',
    },
    // Icon sizes
    icon: {
        xs: 'w-4 h-4',
        sm: 'w-5 h-5',
        base: 'w-6 h-6',
        lg: 'w-7 h-7',
        xl: 'w-8 h-8',
        '2xl': 'w-10 h-10'
    },
    // Text truncation and overflow
    truncate: 'truncate',
    ellipsis: 'overflow-hidden overflow-ellipsis whitespace-nowrap',
    wrap: 'whitespace-normal break-words',
    nowrap: 'whitespace-nowrap'
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var polyfill = {};

var factory;
var hasRequiredFactory;

function requireFactory () {
	if (hasRequiredFactory) return factory;
	hasRequiredFactory = 1;

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}
	function _toPrimitive(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];
	  if (prim !== undefined) {
	    var res = prim.call(input, hint);
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (String )(input);
	}
	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");
	  return typeof key === "symbol" ? key : String(key);
	}
	function _classPrivateFieldGet(receiver, privateMap) {
	  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
	  return _classApplyDescriptorGet(receiver, descriptor);
	}
	function _classPrivateFieldSet(receiver, privateMap, value) {
	  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
	  _classApplyDescriptorSet(receiver, descriptor, value);
	  return value;
	}
	function _classExtractFieldDescriptor(receiver, privateMap, action) {
	  if (!privateMap.has(receiver)) {
	    throw new TypeError("attempted to " + action + " private field on non-instance");
	  }
	  return privateMap.get(receiver);
	}
	function _classApplyDescriptorGet(receiver, descriptor) {
	  if (descriptor.get) {
	    return descriptor.get.call(receiver);
	  }
	  return descriptor.value;
	}
	function _classApplyDescriptorSet(receiver, descriptor, value) {
	  if (descriptor.set) {
	    descriptor.set.call(receiver, value);
	  } else {
	    if (!descriptor.writable) {
	      throw new TypeError("attempted to set read only private field");
	    }
	    descriptor.value = value;
	  }
	}
	function _checkPrivateRedeclaration(obj, privateCollection) {
	  if (privateCollection.has(obj)) {
	    throw new TypeError("Cannot initialize the same private elements twice on an object");
	  }
	}
	function _classPrivateFieldInitSpec(obj, privateMap, value) {
	  _checkPrivateRedeclaration(obj, privateMap);
	  privateMap.set(obj, value);
	}

	var canonicalizeLocaleList = function canonicalizeLocaleList(locales) {
	  if (!locales) return [];
	  if (!Array.isArray(locales)) locales = [locales];
	  var res = {};
	  for (var i = 0; i < locales.length; ++i) {
	    var _in$iw$ji$lc;
	    var tag = locales[i];
	    if (tag && _typeof(tag) === 'object') tag = String(tag);
	    if (typeof tag !== 'string') {
	      // Requiring tag to be a String or Object means that the Number value
	      // NaN will not be interpreted as the language tag "nan", which stands
	      // for Min Nan Chinese.
	      var msg = "Locales should be strings, ".concat(JSON.stringify(tag), " isn't.");
	      throw new TypeError(msg);
	    }
	    var parts = tag.split('-');

	    // does not check for duplicate subtags
	    if (!parts.every(function (subtag) {
	      return /[a-z0-9]+/i.test(subtag);
	    })) {
	      var strTag = JSON.stringify(tag);
	      var _msg = "The locale ".concat(strTag, " is not a structurally valid BCP 47 language tag.");
	      throw new RangeError(_msg);
	    }

	    // always use lower case for primary language subtag
	    var lc = parts[0].toLowerCase();
	    // replace deprecated codes for Indonesian, Hebrew & Yiddish
	    parts[0] = (_in$iw$ji$lc = {
	      in: 'id',
	      iw: 'he',
	      ji: 'yi'
	    }[lc]) !== null && _in$iw$ji$lc !== void 0 ? _in$iw$ji$lc : lc;
	    res[parts.join('-')] = true;
	  }
	  return Object.keys(res);
	};
	function getType(opt) {
	  var type = Object.prototype.hasOwnProperty.call(opt, 'type') && opt.type;
	  if (!type) return 'cardinal';
	  if (type === 'cardinal' || type === 'ordinal') return type;
	  throw new RangeError('Not a valid plural type: ' + JSON.stringify(type));
	}
	function toNumber(value) {
	  switch (_typeof(value)) {
	    case 'number':
	      return value;
	    case 'bigint':
	      throw new TypeError('Cannot convert a BigInt value to a number');
	    default:
	      return Number(value);
	  }
	}
	function getPluralRules(NumberFormat, getSelector, getCategories, getRangeSelector) {
	  var findLocale = function findLocale(locale) {
	    do {
	      if (getSelector(locale)) return locale;
	      locale = locale.replace(/-?[^-]*$/, '');
	    } while (locale);
	    return null;
	  };
	  var resolveLocale = function resolveLocale(locales) {
	    var canonicalLocales = canonicalizeLocaleList(locales);
	    for (var i = 0; i < canonicalLocales.length; ++i) {
	      var _lc = findLocale(canonicalLocales[i]);
	      if (_lc) return _lc;
	    }
	    var lc = new NumberFormat().resolvedOptions().locale;
	    return findLocale(lc);
	  };
	  var _locale = /*#__PURE__*/new WeakMap();
	  var _range = /*#__PURE__*/new WeakMap();
	  var _select = /*#__PURE__*/new WeakMap();
	  var _type = /*#__PURE__*/new WeakMap();
	  var _nf = /*#__PURE__*/new WeakMap();
	  var PluralRules = /*#__PURE__*/function () {
	    function PluralRules() {
	      var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      _classCallCheck(this, PluralRules);
	      _classPrivateFieldInitSpec(this, _locale, {
	        writable: true,
	        value: void 0
	      });
	      _classPrivateFieldInitSpec(this, _range, {
	        writable: true,
	        value: void 0
	      });
	      _classPrivateFieldInitSpec(this, _select, {
	        writable: true,
	        value: void 0
	      });
	      _classPrivateFieldInitSpec(this, _type, {
	        writable: true,
	        value: void 0
	      });
	      _classPrivateFieldInitSpec(this, _nf, {
	        writable: true,
	        value: void 0
	      });
	      _classPrivateFieldSet(this, _locale, resolveLocale(locales));
	      _classPrivateFieldSet(this, _select, getSelector(_classPrivateFieldGet(this, _locale)));
	      _classPrivateFieldSet(this, _range, getRangeSelector(_classPrivateFieldGet(this, _locale)));
	      _classPrivateFieldSet(this, _type, getType(opt));
	      _classPrivateFieldSet(this, _nf, new NumberFormat('en', opt)); // make-plural expects latin digits with . decimal separator
	    }
	    _createClass(PluralRules, [{
	      key: "resolvedOptions",
	      value: function resolvedOptions() {
	        var _classPrivateFieldGet2 = _classPrivateFieldGet(this, _nf).resolvedOptions(),
	          minimumIntegerDigits = _classPrivateFieldGet2.minimumIntegerDigits,
	          minimumFractionDigits = _classPrivateFieldGet2.minimumFractionDigits,
	          maximumFractionDigits = _classPrivateFieldGet2.maximumFractionDigits,
	          minimumSignificantDigits = _classPrivateFieldGet2.minimumSignificantDigits,
	          maximumSignificantDigits = _classPrivateFieldGet2.maximumSignificantDigits,
	          roundingPriority = _classPrivateFieldGet2.roundingPriority;
	        var opt = {
	          locale: _classPrivateFieldGet(this, _locale),
	          type: _classPrivateFieldGet(this, _type),
	          minimumIntegerDigits: minimumIntegerDigits,
	          minimumFractionDigits: minimumFractionDigits,
	          maximumFractionDigits: maximumFractionDigits
	        };
	        if (typeof minimumSignificantDigits === 'number') {
	          opt.minimumSignificantDigits = minimumSignificantDigits;
	          opt.maximumSignificantDigits = maximumSignificantDigits;
	        }
	        opt.pluralCategories = getCategories(_classPrivateFieldGet(this, _locale), _classPrivateFieldGet(this, _type) === 'ordinal').slice(0);
	        opt.roundingPriority = roundingPriority || 'auto';
	        return opt;
	      }
	    }, {
	      key: "select",
	      value: function select(number) {
	        if (!(this instanceof PluralRules)) throw new TypeError("select() called on incompatible ".concat(this));
	        if (typeof number !== 'number') number = Number(number);
	        if (!isFinite(number)) return 'other';
	        var fmt = _classPrivateFieldGet(this, _nf).format(Math.abs(number));
	        return _classPrivateFieldGet(this, _select).call(this, fmt, _classPrivateFieldGet(this, _type) === 'ordinal');
	      }
	    }, {
	      key: "selectRange",
	      value: function selectRange(start, end) {
	        if (!(this instanceof PluralRules)) throw new TypeError("selectRange() called on incompatible ".concat(this));
	        if (start === undefined) throw new TypeError('start is undefined');
	        if (end === undefined) throw new TypeError('end is undefined');
	        var start_ = toNumber(start);
	        var end_ = toNumber(end);
	        if (!isFinite(start_)) throw new RangeError('start must be finite');
	        if (!isFinite(end_)) throw new RangeError('end must be finite');
	        return _classPrivateFieldGet(this, _range).call(this, this.select(start_), this.select(end_));
	      }
	    }], [{
	      key: "supportedLocalesOf",
	      value: function supportedLocalesOf(locales) {
	        return canonicalizeLocaleList(locales).filter(findLocale);
	      }
	    }]);
	    return PluralRules;
	  }();
	  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	    Object.defineProperty(PluralRules.prototype, Symbol.toStringTag, {
	      value: 'Intl.PluralRules',
	      writable: false,
	      configurable: true
	    });
	  }
	  Object.defineProperty(PluralRules, 'prototype', {
	    writable: false
	  });
	  return PluralRules;
	}

	factory = getPluralRules;
	return factory;
}

var pluralRules;
var hasRequiredPluralRules;

function requirePluralRules () {
	if (hasRequiredPluralRules) return pluralRules;
	hasRequiredPluralRules = 1;

	var getPluralRules = requireFactory();

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	function _mergeNamespaces(n, m) {
		m.forEach(function (e) {
			e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
				if (k !== 'default' && !(k in n)) {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		});
		return Object.freeze(n);
	}

	var getPluralRules__default = /*#__PURE__*/_interopDefaultLegacy(getPluralRules);

	var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var plurals$1 = {exports: {}};

	(function (module, exports) {
	  var a = function a(n, ord) {
	    if (ord) return 'other';
	    return n == 1 ? 'one' : 'other';
	  };
	  var b = function b(n, ord) {
	    if (ord) return 'other';
	    return n == 0 || n == 1 ? 'one' : 'other';
	  };
	  var c = function c(n, ord) {
	    if (ord) return 'other';
	    return n >= 0 && n <= 1 ? 'one' : 'other';
	  };
	  var d = function d(n, ord) {
	    var s = String(n).split('.'),
	      v0 = !s[1];
	    if (ord) return 'other';
	    return n == 1 && v0 ? 'one' : 'other';
	  };
	  var e = function e(n, ord) {
	    return 'other';
	  };
	  var f = function f(n, ord) {
	    if (ord) return 'other';
	    return n == 1 ? 'one' : n == 2 ? 'two' : 'other';
	  };
	  (function (root, plurals) {
	    Object.defineProperty(plurals, '__esModule', {
	      value: true
	    });
	    module.exports = plurals;
	  })(commonjsGlobal$1, {
	    af: a,
	    ak: b,
	    am: c,
	    an: a,
	    ar: function ar(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return 'other';
	      return n == 0 ? 'zero' : n == 1 ? 'one' : n == 2 ? 'two' : n100 >= 3 && n100 <= 10 ? 'few' : n100 >= 11 && n100 <= 99 ? 'many' : 'other';
	    },
	    ars: function ars(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return 'other';
	      return n == 0 ? 'zero' : n == 1 ? 'one' : n == 2 ? 'two' : n100 >= 3 && n100 <= 10 ? 'few' : n100 >= 11 && n100 <= 99 ? 'many' : 'other';
	    },
	    as: function as(n, ord) {
	      if (ord) return n == 1 || n == 5 || n == 7 || n == 8 || n == 9 || n == 10 ? 'one' : n == 2 || n == 3 ? 'two' : n == 4 ? 'few' : n == 6 ? 'many' : 'other';
	      return n >= 0 && n <= 1 ? 'one' : 'other';
	    },
	    asa: a,
	    ast: d,
	    az: function az(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2),
	        i1000 = i.slice(-3);
	      if (ord) return i10 == 1 || i10 == 2 || i10 == 5 || i10 == 7 || i10 == 8 || i100 == 20 || i100 == 50 || i100 == 70 || i100 == 80 ? 'one' : i10 == 3 || i10 == 4 || i1000 == 100 || i1000 == 200 || i1000 == 300 || i1000 == 400 || i1000 == 500 || i1000 == 600 || i1000 == 700 || i1000 == 800 || i1000 == 900 ? 'few' : i == 0 || i10 == 6 || i100 == 40 || i100 == 60 || i100 == 90 ? 'many' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    bal: function bal(n, ord) {
	      return n == 1 ? 'one' : 'other';
	    },
	    be: function be(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return (n10 == 2 || n10 == 3) && n100 != 12 && n100 != 13 ? 'few' : 'other';
	      return n10 == 1 && n100 != 11 ? 'one' : n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14) ? 'few' : t0 && n10 == 0 || n10 >= 5 && n10 <= 9 || n100 >= 11 && n100 <= 14 ? 'many' : 'other';
	    },
	    bem: a,
	    bez: a,
	    bg: a,
	    bho: b,
	    bm: e,
	    bn: function bn(n, ord) {
	      if (ord) return n == 1 || n == 5 || n == 7 || n == 8 || n == 9 || n == 10 ? 'one' : n == 2 || n == 3 ? 'two' : n == 4 ? 'few' : n == 6 ? 'many' : 'other';
	      return n >= 0 && n <= 1 ? 'one' : 'other';
	    },
	    bo: e,
	    br: function br(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2),
	        n1000000 = t0 && s[0].slice(-6);
	      if (ord) return 'other';
	      return n10 == 1 && n100 != 11 && n100 != 71 && n100 != 91 ? 'one' : n10 == 2 && n100 != 12 && n100 != 72 && n100 != 92 ? 'two' : (n10 == 3 || n10 == 4 || n10 == 9) && (n100 < 10 || n100 > 19) && (n100 < 70 || n100 > 79) && (n100 < 90 || n100 > 99) ? 'few' : n != 0 && t0 && n1000000 == 0 ? 'many' : 'other';
	    },
	    brx: a,
	    bs: function bs(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2),
	        f10 = f.slice(-1),
	        f100 = f.slice(-2);
	      if (ord) return 'other';
	      return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11 ? 'one' : v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14) ? 'few' : 'other';
	    },
	    ca: function ca(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i1000000 = i.slice(-6);
	      if (ord) return n == 1 || n == 3 ? 'one' : n == 2 ? 'two' : n == 4 ? 'few' : 'other';
	      return n == 1 && v0 ? 'one' : i != 0 && i1000000 == 0 && v0 ? 'many' : 'other';
	    },
	    ce: a,
	    ceb: function ceb(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        f10 = f.slice(-1);
	      if (ord) return 'other';
	      return v0 && (i == 1 || i == 2 || i == 3) || v0 && i10 != 4 && i10 != 6 && i10 != 9 || !v0 && f10 != 4 && f10 != 6 && f10 != 9 ? 'one' : 'other';
	    },
	    cgg: a,
	    chr: a,
	    ckb: a,
	    cs: function cs(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1];
	      if (ord) return 'other';
	      return n == 1 && v0 ? 'one' : i >= 2 && i <= 4 && v0 ? 'few' : !v0 ? 'many' : 'other';
	    },
	    cy: function cy(n, ord) {
	      if (ord) return n == 0 || n == 7 || n == 8 || n == 9 ? 'zero' : n == 1 ? 'one' : n == 2 ? 'two' : n == 3 || n == 4 ? 'few' : n == 5 || n == 6 ? 'many' : 'other';
	      return n == 0 ? 'zero' : n == 1 ? 'one' : n == 2 ? 'two' : n == 3 ? 'few' : n == 6 ? 'many' : 'other';
	    },
	    da: function da(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        t0 = Number(s[0]) == n;
	      if (ord) return 'other';
	      return n == 1 || !t0 && (i == 0 || i == 1) ? 'one' : 'other';
	    },
	    de: d,
	    doi: c,
	    dsb: function dsb(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i100 = i.slice(-2),
	        f100 = f.slice(-2);
	      if (ord) return 'other';
	      return v0 && i100 == 1 || f100 == 1 ? 'one' : v0 && i100 == 2 || f100 == 2 ? 'two' : v0 && (i100 == 3 || i100 == 4) || f100 == 3 || f100 == 4 ? 'few' : 'other';
	    },
	    dv: a,
	    dz: e,
	    ee: a,
	    el: a,
	    en: function en(n, ord) {
	      var s = String(n).split('.'),
	        v0 = !s[1],
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
	      return n == 1 && v0 ? 'one' : 'other';
	    },
	    eo: a,
	    es: function es(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i1000000 = i.slice(-6);
	      if (ord) return 'other';
	      return n == 1 ? 'one' : i != 0 && i1000000 == 0 && v0 ? 'many' : 'other';
	    },
	    et: d,
	    eu: a,
	    fa: c,
	    ff: function ff(n, ord) {
	      if (ord) return 'other';
	      return n >= 0 && n < 2 ? 'one' : 'other';
	    },
	    fi: d,
	    fil: function fil(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        f10 = f.slice(-1);
	      if (ord) return n == 1 ? 'one' : 'other';
	      return v0 && (i == 1 || i == 2 || i == 3) || v0 && i10 != 4 && i10 != 6 && i10 != 9 || !v0 && f10 != 4 && f10 != 6 && f10 != 9 ? 'one' : 'other';
	    },
	    fo: a,
	    fr: function fr(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i1000000 = i.slice(-6);
	      if (ord) return n == 1 ? 'one' : 'other';
	      return n >= 0 && n < 2 ? 'one' : i != 0 && i1000000 == 0 && v0 ? 'many' : 'other';
	    },
	    fur: a,
	    fy: d,
	    ga: function ga(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n;
	      if (ord) return n == 1 ? 'one' : 'other';
	      return n == 1 ? 'one' : n == 2 ? 'two' : t0 && n >= 3 && n <= 6 ? 'few' : t0 && n >= 7 && n <= 10 ? 'many' : 'other';
	    },
	    gd: function gd(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n;
	      if (ord) return n == 1 || n == 11 ? 'one' : n == 2 || n == 12 ? 'two' : n == 3 || n == 13 ? 'few' : 'other';
	      return n == 1 || n == 11 ? 'one' : n == 2 || n == 12 ? 'two' : t0 && n >= 3 && n <= 10 || t0 && n >= 13 && n <= 19 ? 'few' : 'other';
	    },
	    gl: d,
	    gsw: a,
	    gu: function gu(n, ord) {
	      if (ord) return n == 1 ? 'one' : n == 2 || n == 3 ? 'two' : n == 4 ? 'few' : n == 6 ? 'many' : 'other';
	      return n >= 0 && n <= 1 ? 'one' : 'other';
	    },
	    guw: b,
	    gv: function gv(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2);
	      if (ord) return 'other';
	      return v0 && i10 == 1 ? 'one' : v0 && i10 == 2 ? 'two' : v0 && (i100 == 0 || i100 == 20 || i100 == 40 || i100 == 60 || i100 == 80) ? 'few' : !v0 ? 'many' : 'other';
	    },
	    ha: a,
	    haw: a,
	    he: function he(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1];
	      if (ord) return 'other';
	      return i == 1 && v0 || i == 0 && !v0 ? 'one' : i == 2 && v0 ? 'two' : 'other';
	    },
	    hi: function hi(n, ord) {
	      if (ord) return n == 1 ? 'one' : n == 2 || n == 3 ? 'two' : n == 4 ? 'few' : n == 6 ? 'many' : 'other';
	      return n >= 0 && n <= 1 ? 'one' : 'other';
	    },
	    hnj: e,
	    hr: function hr(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2),
	        f10 = f.slice(-1),
	        f100 = f.slice(-2);
	      if (ord) return 'other';
	      return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11 ? 'one' : v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14) ? 'few' : 'other';
	    },
	    hsb: function hsb(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i100 = i.slice(-2),
	        f100 = f.slice(-2);
	      if (ord) return 'other';
	      return v0 && i100 == 1 || f100 == 1 ? 'one' : v0 && i100 == 2 || f100 == 2 ? 'two' : v0 && (i100 == 3 || i100 == 4) || f100 == 3 || f100 == 4 ? 'few' : 'other';
	    },
	    hu: function hu(n, ord) {
	      if (ord) return n == 1 || n == 5 ? 'one' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    hy: function hy(n, ord) {
	      if (ord) return n == 1 ? 'one' : 'other';
	      return n >= 0 && n < 2 ? 'one' : 'other';
	    },
	    ia: d,
	    id: e,
	    ig: e,
	    ii: e,
	    io: d,
	    is: function is(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        t = (s[1] || '').replace(/0+$/, ''),
	        t0 = Number(s[0]) == n,
	        i10 = i.slice(-1),
	        i100 = i.slice(-2);
	      if (ord) return 'other';
	      return t0 && i10 == 1 && i100 != 11 || t % 10 == 1 && t % 100 != 11 ? 'one' : 'other';
	    },
	    it: function it(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i1000000 = i.slice(-6);
	      if (ord) return n == 11 || n == 8 || n == 80 || n == 800 ? 'many' : 'other';
	      return n == 1 && v0 ? 'one' : i != 0 && i1000000 == 0 && v0 ? 'many' : 'other';
	    },
	    iu: f,
	    ja: e,
	    jbo: e,
	    jgo: a,
	    jmc: a,
	    jv: e,
	    jw: e,
	    ka: function ka(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        i100 = i.slice(-2);
	      if (ord) return i == 1 ? 'one' : i == 0 || i100 >= 2 && i100 <= 20 || i100 == 40 || i100 == 60 || i100 == 80 ? 'many' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    kab: function kab(n, ord) {
	      if (ord) return 'other';
	      return n >= 0 && n < 2 ? 'one' : 'other';
	    },
	    kaj: a,
	    kcg: a,
	    kde: e,
	    kea: e,
	    kk: function kk(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1);
	      if (ord) return n10 == 6 || n10 == 9 || t0 && n10 == 0 && n != 0 ? 'many' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    kkj: a,
	    kl: a,
	    km: e,
	    kn: c,
	    ko: e,
	    ks: a,
	    ksb: a,
	    ksh: function ksh(n, ord) {
	      if (ord) return 'other';
	      return n == 0 ? 'zero' : n == 1 ? 'one' : 'other';
	    },
	    ku: a,
	    kw: function kw(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n100 = t0 && s[0].slice(-2),
	        n1000 = t0 && s[0].slice(-3),
	        n100000 = t0 && s[0].slice(-5),
	        n1000000 = t0 && s[0].slice(-6);
	      if (ord) return t0 && n >= 1 && n <= 4 || n100 >= 1 && n100 <= 4 || n100 >= 21 && n100 <= 24 || n100 >= 41 && n100 <= 44 || n100 >= 61 && n100 <= 64 || n100 >= 81 && n100 <= 84 ? 'one' : n == 5 || n100 == 5 ? 'many' : 'other';
	      return n == 0 ? 'zero' : n == 1 ? 'one' : n100 == 2 || n100 == 22 || n100 == 42 || n100 == 62 || n100 == 82 || t0 && n1000 == 0 && (n100000 >= 1000 && n100000 <= 20000 || n100000 == 40000 || n100000 == 60000 || n100000 == 80000) || n != 0 && n1000000 == 100000 ? 'two' : n100 == 3 || n100 == 23 || n100 == 43 || n100 == 63 || n100 == 83 ? 'few' : n != 1 && (n100 == 1 || n100 == 21 || n100 == 41 || n100 == 61 || n100 == 81) ? 'many' : 'other';
	    },
	    ky: a,
	    lag: function lag(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0];
	      if (ord) return 'other';
	      return n == 0 ? 'zero' : (i == 0 || i == 1) && n != 0 ? 'one' : 'other';
	    },
	    lb: a,
	    lg: a,
	    lij: function lij(n, ord) {
	      var s = String(n).split('.'),
	        v0 = !s[1],
	        t0 = Number(s[0]) == n;
	      if (ord) return n == 11 || n == 8 || t0 && n >= 80 && n <= 89 || t0 && n >= 800 && n <= 899 ? 'many' : 'other';
	      return n == 1 && v0 ? 'one' : 'other';
	    },
	    lkt: e,
	    ln: b,
	    lo: function lo(n, ord) {
	      if (ord) return n == 1 ? 'one' : 'other';
	      return 'other';
	    },
	    lt: function lt(n, ord) {
	      var s = String(n).split('.'),
	        f = s[1] || '',
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return 'other';
	      return n10 == 1 && (n100 < 11 || n100 > 19) ? 'one' : n10 >= 2 && n10 <= 9 && (n100 < 11 || n100 > 19) ? 'few' : f != 0 ? 'many' : 'other';
	    },
	    lv: function lv(n, ord) {
	      var s = String(n).split('.'),
	        f = s[1] || '',
	        v = f.length,
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2),
	        f100 = f.slice(-2),
	        f10 = f.slice(-1);
	      if (ord) return 'other';
	      return t0 && n10 == 0 || n100 >= 11 && n100 <= 19 || v == 2 && f100 >= 11 && f100 <= 19 ? 'zero' : n10 == 1 && n100 != 11 || v == 2 && f10 == 1 && f100 != 11 || v != 2 && f10 == 1 ? 'one' : 'other';
	    },
	    mas: a,
	    mg: b,
	    mgo: a,
	    mk: function mk(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2),
	        f10 = f.slice(-1),
	        f100 = f.slice(-2);
	      if (ord) return i10 == 1 && i100 != 11 ? 'one' : i10 == 2 && i100 != 12 ? 'two' : (i10 == 7 || i10 == 8) && i100 != 17 && i100 != 18 ? 'many' : 'other';
	      return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11 ? 'one' : 'other';
	    },
	    ml: a,
	    mn: a,
	    mo: function mo(n, ord) {
	      var s = String(n).split('.'),
	        v0 = !s[1],
	        t0 = Number(s[0]) == n,
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return n == 1 ? 'one' : 'other';
	      return n == 1 && v0 ? 'one' : !v0 || n == 0 || n != 1 && n100 >= 1 && n100 <= 19 ? 'few' : 'other';
	    },
	    mr: function mr(n, ord) {
	      if (ord) return n == 1 ? 'one' : n == 2 || n == 3 ? 'two' : n == 4 ? 'few' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    ms: function ms(n, ord) {
	      if (ord) return n == 1 ? 'one' : 'other';
	      return 'other';
	    },
	    mt: function mt(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return 'other';
	      return n == 1 ? 'one' : n == 2 ? 'two' : n == 0 || n100 >= 3 && n100 <= 10 ? 'few' : n100 >= 11 && n100 <= 19 ? 'many' : 'other';
	    },
	    my: e,
	    nah: a,
	    naq: f,
	    nb: a,
	    nd: a,
	    ne: function ne(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n;
	      if (ord) return t0 && n >= 1 && n <= 4 ? 'one' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    nl: d,
	    nn: a,
	    nnh: a,
	    no: a,
	    nqo: e,
	    nr: a,
	    nso: b,
	    ny: a,
	    nyn: a,
	    om: a,
	    or: function or(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n;
	      if (ord) return n == 1 || n == 5 || t0 && n >= 7 && n <= 9 ? 'one' : n == 2 || n == 3 ? 'two' : n == 4 ? 'few' : n == 6 ? 'many' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    os: a,
	    osa: e,
	    pa: b,
	    pap: a,
	    pcm: c,
	    pl: function pl(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2);
	      if (ord) return 'other';
	      return n == 1 && v0 ? 'one' : v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) ? 'few' : v0 && i != 1 && (i10 == 0 || i10 == 1) || v0 && i10 >= 5 && i10 <= 9 || v0 && i100 >= 12 && i100 <= 14 ? 'many' : 'other';
	    },
	    prg: function prg(n, ord) {
	      var s = String(n).split('.'),
	        f = s[1] || '',
	        v = f.length,
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2),
	        f100 = f.slice(-2),
	        f10 = f.slice(-1);
	      if (ord) return 'other';
	      return t0 && n10 == 0 || n100 >= 11 && n100 <= 19 || v == 2 && f100 >= 11 && f100 <= 19 ? 'zero' : n10 == 1 && n100 != 11 || v == 2 && f10 == 1 && f100 != 11 || v != 2 && f10 == 1 ? 'one' : 'other';
	    },
	    ps: a,
	    pt: function pt(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i1000000 = i.slice(-6);
	      if (ord) return 'other';
	      return i == 0 || i == 1 ? 'one' : i != 0 && i1000000 == 0 && v0 ? 'many' : 'other';
	    },
	    pt_PT: function pt_PT(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i1000000 = i.slice(-6);
	      if (ord) return 'other';
	      return n == 1 && v0 ? 'one' : i != 0 && i1000000 == 0 && v0 ? 'many' : 'other';
	    },
	    rm: a,
	    ro: function ro(n, ord) {
	      var s = String(n).split('.'),
	        v0 = !s[1],
	        t0 = Number(s[0]) == n,
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return n == 1 ? 'one' : 'other';
	      return n == 1 && v0 ? 'one' : !v0 || n == 0 || n != 1 && n100 >= 1 && n100 <= 19 ? 'few' : 'other';
	    },
	    rof: a,
	    ru: function ru(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2);
	      if (ord) return 'other';
	      return v0 && i10 == 1 && i100 != 11 ? 'one' : v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) ? 'few' : v0 && i10 == 0 || v0 && i10 >= 5 && i10 <= 9 || v0 && i100 >= 11 && i100 <= 14 ? 'many' : 'other';
	    },
	    rwk: a,
	    sah: e,
	    saq: a,
	    sat: f,
	    sc: function sc(n, ord) {
	      var s = String(n).split('.'),
	        v0 = !s[1];
	      if (ord) return n == 11 || n == 8 || n == 80 || n == 800 ? 'many' : 'other';
	      return n == 1 && v0 ? 'one' : 'other';
	    },
	    scn: function scn(n, ord) {
	      var s = String(n).split('.'),
	        v0 = !s[1];
	      if (ord) return n == 11 || n == 8 || n == 80 || n == 800 ? 'many' : 'other';
	      return n == 1 && v0 ? 'one' : 'other';
	    },
	    sd: a,
	    sdh: a,
	    se: f,
	    seh: a,
	    ses: e,
	    sg: e,
	    sh: function sh(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2),
	        f10 = f.slice(-1),
	        f100 = f.slice(-2);
	      if (ord) return 'other';
	      return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11 ? 'one' : v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14) ? 'few' : 'other';
	    },
	    shi: function shi(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n;
	      if (ord) return 'other';
	      return n >= 0 && n <= 1 ? 'one' : t0 && n >= 2 && n <= 10 ? 'few' : 'other';
	    },
	    si: function si(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '';
	      if (ord) return 'other';
	      return n == 0 || n == 1 || i == 0 && f == 1 ? 'one' : 'other';
	    },
	    sk: function sk(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1];
	      if (ord) return 'other';
	      return n == 1 && v0 ? 'one' : i >= 2 && i <= 4 && v0 ? 'few' : !v0 ? 'many' : 'other';
	    },
	    sl: function sl(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i100 = i.slice(-2);
	      if (ord) return 'other';
	      return v0 && i100 == 1 ? 'one' : v0 && i100 == 2 ? 'two' : v0 && (i100 == 3 || i100 == 4) || !v0 ? 'few' : 'other';
	    },
	    sma: f,
	    smi: f,
	    smj: f,
	    smn: f,
	    sms: f,
	    sn: a,
	    so: a,
	    sq: function sq(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return n == 1 ? 'one' : n10 == 4 && n100 != 14 ? 'many' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    sr: function sr(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        i100 = i.slice(-2),
	        f10 = f.slice(-1),
	        f100 = f.slice(-2);
	      if (ord) return 'other';
	      return v0 && i10 == 1 && i100 != 11 || f10 == 1 && f100 != 11 ? 'one' : v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) || f10 >= 2 && f10 <= 4 && (f100 < 12 || f100 > 14) ? 'few' : 'other';
	    },
	    ss: a,
	    ssy: a,
	    st: a,
	    su: e,
	    sv: function sv(n, ord) {
	      var s = String(n).split('.'),
	        v0 = !s[1],
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2);
	      if (ord) return (n10 == 1 || n10 == 2) && n100 != 11 && n100 != 12 ? 'one' : 'other';
	      return n == 1 && v0 ? 'one' : 'other';
	    },
	    sw: d,
	    syr: a,
	    ta: a,
	    te: a,
	    teo: a,
	    th: e,
	    ti: b,
	    tig: a,
	    tk: function tk(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1);
	      if (ord) return n10 == 6 || n10 == 9 || n == 10 ? 'few' : 'other';
	      return n == 1 ? 'one' : 'other';
	    },
	    tl: function tl(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        f = s[1] || '',
	        v0 = !s[1],
	        i10 = i.slice(-1),
	        f10 = f.slice(-1);
	      if (ord) return n == 1 ? 'one' : 'other';
	      return v0 && (i == 1 || i == 2 || i == 3) || v0 && i10 != 4 && i10 != 6 && i10 != 9 || !v0 && f10 != 4 && f10 != 6 && f10 != 9 ? 'one' : 'other';
	    },
	    tn: a,
	    to: e,
	    tpi: e,
	    tr: a,
	    ts: a,
	    tzm: function tzm(n, ord) {
	      var s = String(n).split('.'),
	        t0 = Number(s[0]) == n;
	      if (ord) return 'other';
	      return n == 0 || n == 1 || t0 && n >= 11 && n <= 99 ? 'one' : 'other';
	    },
	    ug: a,
	    uk: function uk(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2),
	        i10 = i.slice(-1),
	        i100 = i.slice(-2);
	      if (ord) return n10 == 3 && n100 != 13 ? 'few' : 'other';
	      return v0 && i10 == 1 && i100 != 11 ? 'one' : v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14) ? 'few' : v0 && i10 == 0 || v0 && i10 >= 5 && i10 <= 9 || v0 && i100 >= 11 && i100 <= 14 ? 'many' : 'other';
	    },
	    und: e,
	    ur: d,
	    uz: a,
	    ve: a,
	    vec: function vec(n, ord) {
	      var s = String(n).split('.'),
	        i = s[0],
	        v0 = !s[1],
	        i1000000 = i.slice(-6);
	      if (ord) return n == 11 || n == 8 || n == 80 || n == 800 ? 'many' : 'other';
	      return n == 1 && v0 ? 'one' : i != 0 && i1000000 == 0 && v0 ? 'many' : 'other';
	    },
	    vi: function vi(n, ord) {
	      if (ord) return n == 1 ? 'one' : 'other';
	      return 'other';
	    },
	    vo: a,
	    vun: a,
	    wa: b,
	    wae: a,
	    wo: e,
	    xh: a,
	    xog: a,
	    yi: d,
	    yo: e,
	    yue: e,
	    zh: e,
	    zu: c
	  });
	})(plurals$1);
	var plurals = /*@__PURE__*/getDefaultExportFromCjs(plurals$1.exports);

	var P = /*#__PURE__*/_mergeNamespaces({
		__proto__: null,
		'default': plurals
	}, [plurals$1.exports]);

	var pluralCategories$1 = {exports: {}};

	(function (module, exports) {
	  var z = "zero",
	    o = "one",
	    t = "two",
	    f = "few",
	    m = "many",
	    x = "other";
	  var a = {
	    cardinal: [o, x],
	    ordinal: [x]
	  };
	  var b = {
	    cardinal: [o, x],
	    ordinal: [o, x]
	  };
	  var c = {
	    cardinal: [x],
	    ordinal: [x]
	  };
	  var d = {
	    cardinal: [o, t, x],
	    ordinal: [x]
	  };
	  (function (root, pluralCategories) {
	    Object.defineProperty(pluralCategories, '__esModule', {
	      value: true
	    });
	    module.exports = pluralCategories;
	  })(commonjsGlobal$1, {
	    af: a,
	    ak: a,
	    am: a,
	    an: a,
	    ar: {
	      cardinal: [z, o, t, f, m, x],
	      ordinal: [x]
	    },
	    ars: {
	      cardinal: [z, o, t, f, m, x],
	      ordinal: [x]
	    },
	    as: {
	      cardinal: [o, x],
	      ordinal: [o, t, f, m, x]
	    },
	    asa: a,
	    ast: a,
	    az: {
	      cardinal: [o, x],
	      ordinal: [o, f, m, x]
	    },
	    bal: b,
	    be: {
	      cardinal: [o, f, m, x],
	      ordinal: [f, x]
	    },
	    bem: a,
	    bez: a,
	    bg: a,
	    bho: a,
	    bm: c,
	    bn: {
	      cardinal: [o, x],
	      ordinal: [o, t, f, m, x]
	    },
	    bo: c,
	    br: {
	      cardinal: [o, t, f, m, x],
	      ordinal: [x]
	    },
	    brx: a,
	    bs: {
	      cardinal: [o, f, x],
	      ordinal: [x]
	    },
	    ca: {
	      cardinal: [o, m, x],
	      ordinal: [o, t, f, x]
	    },
	    ce: a,
	    ceb: a,
	    cgg: a,
	    chr: a,
	    ckb: a,
	    cs: {
	      cardinal: [o, f, m, x],
	      ordinal: [x]
	    },
	    cy: {
	      cardinal: [z, o, t, f, m, x],
	      ordinal: [z, o, t, f, m, x]
	    },
	    da: a,
	    de: a,
	    doi: a,
	    dsb: {
	      cardinal: [o, t, f, x],
	      ordinal: [x]
	    },
	    dv: a,
	    dz: c,
	    ee: a,
	    el: a,
	    en: {
	      cardinal: [o, x],
	      ordinal: [o, t, f, x]
	    },
	    eo: a,
	    es: {
	      cardinal: [o, m, x],
	      ordinal: [x]
	    },
	    et: a,
	    eu: a,
	    fa: a,
	    ff: a,
	    fi: a,
	    fil: b,
	    fo: a,
	    fr: {
	      cardinal: [o, m, x],
	      ordinal: [o, x]
	    },
	    fur: a,
	    fy: a,
	    ga: {
	      cardinal: [o, t, f, m, x],
	      ordinal: [o, x]
	    },
	    gd: {
	      cardinal: [o, t, f, x],
	      ordinal: [o, t, f, x]
	    },
	    gl: a,
	    gsw: a,
	    gu: {
	      cardinal: [o, x],
	      ordinal: [o, t, f, m, x]
	    },
	    guw: a,
	    gv: {
	      cardinal: [o, t, f, m, x],
	      ordinal: [x]
	    },
	    ha: a,
	    haw: a,
	    he: d,
	    hi: {
	      cardinal: [o, x],
	      ordinal: [o, t, f, m, x]
	    },
	    hnj: c,
	    hr: {
	      cardinal: [o, f, x],
	      ordinal: [x]
	    },
	    hsb: {
	      cardinal: [o, t, f, x],
	      ordinal: [x]
	    },
	    hu: b,
	    hy: b,
	    ia: a,
	    id: c,
	    ig: c,
	    ii: c,
	    io: a,
	    is: a,
	    it: {
	      cardinal: [o, m, x],
	      ordinal: [m, x]
	    },
	    iu: d,
	    ja: c,
	    jbo: c,
	    jgo: a,
	    jmc: a,
	    jv: c,
	    jw: c,
	    ka: {
	      cardinal: [o, x],
	      ordinal: [o, m, x]
	    },
	    kab: a,
	    kaj: a,
	    kcg: a,
	    kde: c,
	    kea: c,
	    kk: {
	      cardinal: [o, x],
	      ordinal: [m, x]
	    },
	    kkj: a,
	    kl: a,
	    km: c,
	    kn: a,
	    ko: c,
	    ks: a,
	    ksb: a,
	    ksh: {
	      cardinal: [z, o, x],
	      ordinal: [x]
	    },
	    ku: a,
	    kw: {
	      cardinal: [z, o, t, f, m, x],
	      ordinal: [o, m, x]
	    },
	    ky: a,
	    lag: {
	      cardinal: [z, o, x],
	      ordinal: [x]
	    },
	    lb: a,
	    lg: a,
	    lij: {
	      cardinal: [o, x],
	      ordinal: [m, x]
	    },
	    lkt: c,
	    ln: a,
	    lo: {
	      cardinal: [x],
	      ordinal: [o, x]
	    },
	    lt: {
	      cardinal: [o, f, m, x],
	      ordinal: [x]
	    },
	    lv: {
	      cardinal: [z, o, x],
	      ordinal: [x]
	    },
	    mas: a,
	    mg: a,
	    mgo: a,
	    mk: {
	      cardinal: [o, x],
	      ordinal: [o, t, m, x]
	    },
	    ml: a,
	    mn: a,
	    mo: {
	      cardinal: [o, f, x],
	      ordinal: [o, x]
	    },
	    mr: {
	      cardinal: [o, x],
	      ordinal: [o, t, f, x]
	    },
	    ms: {
	      cardinal: [x],
	      ordinal: [o, x]
	    },
	    mt: {
	      cardinal: [o, t, f, m, x],
	      ordinal: [x]
	    },
	    my: c,
	    nah: a,
	    naq: d,
	    nb: a,
	    nd: a,
	    ne: b,
	    nl: a,
	    nn: a,
	    nnh: a,
	    no: a,
	    nqo: c,
	    nr: a,
	    nso: a,
	    ny: a,
	    nyn: a,
	    om: a,
	    or: {
	      cardinal: [o, x],
	      ordinal: [o, t, f, m, x]
	    },
	    os: a,
	    osa: c,
	    pa: a,
	    pap: a,
	    pcm: a,
	    pl: {
	      cardinal: [o, f, m, x],
	      ordinal: [x]
	    },
	    prg: {
	      cardinal: [z, o, x],
	      ordinal: [x]
	    },
	    ps: a,
	    pt: {
	      cardinal: [o, m, x],
	      ordinal: [x]
	    },
	    pt_PT: {
	      cardinal: [o, m, x],
	      ordinal: [x]
	    },
	    rm: a,
	    ro: {
	      cardinal: [o, f, x],
	      ordinal: [o, x]
	    },
	    rof: a,
	    ru: {
	      cardinal: [o, f, m, x],
	      ordinal: [x]
	    },
	    rwk: a,
	    sah: c,
	    saq: a,
	    sat: d,
	    sc: {
	      cardinal: [o, x],
	      ordinal: [m, x]
	    },
	    scn: {
	      cardinal: [o, x],
	      ordinal: [m, x]
	    },
	    sd: a,
	    sdh: a,
	    se: d,
	    seh: a,
	    ses: c,
	    sg: c,
	    sh: {
	      cardinal: [o, f, x],
	      ordinal: [x]
	    },
	    shi: {
	      cardinal: [o, f, x],
	      ordinal: [x]
	    },
	    si: a,
	    sk: {
	      cardinal: [o, f, m, x],
	      ordinal: [x]
	    },
	    sl: {
	      cardinal: [o, t, f, x],
	      ordinal: [x]
	    },
	    sma: d,
	    smi: d,
	    smj: d,
	    smn: d,
	    sms: d,
	    sn: a,
	    so: a,
	    sq: {
	      cardinal: [o, x],
	      ordinal: [o, m, x]
	    },
	    sr: {
	      cardinal: [o, f, x],
	      ordinal: [x]
	    },
	    ss: a,
	    ssy: a,
	    st: a,
	    su: c,
	    sv: b,
	    sw: a,
	    syr: a,
	    ta: a,
	    te: a,
	    teo: a,
	    th: c,
	    ti: a,
	    tig: a,
	    tk: {
	      cardinal: [o, x],
	      ordinal: [f, x]
	    },
	    tl: b,
	    tn: a,
	    to: c,
	    tpi: c,
	    tr: a,
	    ts: a,
	    tzm: a,
	    ug: a,
	    uk: {
	      cardinal: [o, f, m, x],
	      ordinal: [f, x]
	    },
	    und: c,
	    ur: a,
	    uz: a,
	    ve: a,
	    vec: {
	      cardinal: [o, m, x],
	      ordinal: [m, x]
	    },
	    vi: {
	      cardinal: [x],
	      ordinal: [o, x]
	    },
	    vo: a,
	    vun: a,
	    wa: a,
	    wae: a,
	    wo: c,
	    xh: a,
	    xog: a,
	    yi: a,
	    yo: c,
	    yue: c,
	    zh: c,
	    zu: a
	  });
	})(pluralCategories$1);
	var pluralCategories = /*@__PURE__*/getDefaultExportFromCjs(pluralCategories$1.exports);

	var C = /*#__PURE__*/_mergeNamespaces({
		__proto__: null,
		'default': pluralCategories
	}, [pluralCategories$1.exports]);

	var ranges$1 = {exports: {}};

	(function (module, exports) {
	  var a = function a(start, end) {
	    return "other";
	  };
	  var b = function b(start, end) {
	    return start === "other" && end === "one" ? "one" : "other";
	  };
	  var c = function c(start, end) {
	    return end || "other";
	  };
	  (function (root, pluralRanges) {
	    Object.defineProperty(pluralRanges, '__esModule', {
	      value: true
	    });
	    module.exports = pluralRanges;
	  })(commonjsGlobal$1, {
	    af: a,
	    ak: b,
	    am: c,
	    an: a,
	    ar: function ar(start, end) {
	      return end === "few" ? "few" : end === "many" ? "many" : start === "zero" && end === "one" ? "zero" : start === "zero" && end === "two" ? "zero" : "other";
	    },
	    as: c,
	    az: c,
	    be: c,
	    bg: a,
	    bn: c,
	    bs: c,
	    ca: a,
	    cs: c,
	    cy: c,
	    da: c,
	    de: c,
	    el: c,
	    en: a,
	    es: a,
	    et: a,
	    eu: a,
	    fa: b,
	    fi: a,
	    fil: c,
	    fr: c,
	    ga: c,
	    gl: c,
	    gsw: c,
	    gu: c,
	    he: a,
	    hi: c,
	    hr: c,
	    hu: c,
	    hy: c,
	    ia: a,
	    id: a,
	    io: a,
	    is: c,
	    it: c,
	    ja: a,
	    ka: function ka(start, end) {
	      return start || "other";
	    },
	    kk: c,
	    km: a,
	    kn: c,
	    ko: a,
	    ky: c,
	    lij: c,
	    lo: a,
	    lt: c,
	    lv: function lv(start, end) {
	      return end === "one" ? "one" : "other";
	    },
	    mk: a,
	    ml: c,
	    mn: c,
	    mr: c,
	    ms: a,
	    my: a,
	    nb: a,
	    ne: c,
	    nl: c,
	    no: a,
	    or: b,
	    pa: c,
	    pcm: a,
	    pl: c,
	    ps: c,
	    pt: c,
	    ro: function ro(start, end) {
	      return end === "few" ? "few" : end === "one" ? "few" : "other";
	    },
	    ru: c,
	    sc: c,
	    scn: c,
	    sd: b,
	    si: function si(start, end) {
	      return start === "one" && end === "one" ? "one" : "other";
	    },
	    sk: c,
	    sl: function sl(start, end) {
	      return end === "few" ? "few" : end === "one" ? "few" : end === "two" ? "two" : "other";
	    },
	    sq: c,
	    sr: c,
	    sv: a,
	    sw: c,
	    ta: c,
	    te: c,
	    th: a,
	    tk: c,
	    tr: c,
	    ug: c,
	    uk: c,
	    ur: a,
	    uz: c,
	    vi: a,
	    yue: a,
	    zh: a,
	    zu: c
	  });
	})(ranges$1);
	var ranges = /*@__PURE__*/getDefaultExportFromCjs(ranges$1.exports);

	var R = /*#__PURE__*/_mergeNamespaces({
		__proto__: null,
		'default': ranges
	}, [ranges$1.exports]);

	// In a .mjs context, CommonJS imports only expose the default endpoint. We're
	// using them here because with this many small functions, bundlers produce less
	// cruft than for ES module exports.
	var Plurals = plurals || P;
	var Categories = pluralCategories || C;
	var RangePlurals = ranges || R;

	// make-plural exports are cast with safe-identifier to be valid JS identifiers
	var id = function id(lc) {
	  return lc === 'pt-PT' ? 'pt_PT' : lc;
	};
	var getSelector = function getSelector(lc) {
	  return Plurals[id(lc)];
	};
	var getCategories = function getCategories(lc, ord) {
	  return Categories[id(lc)][ord ? 'ordinal' : 'cardinal'];
	};
	var getRangeSelector = function getRangeSelector(lc) {
	  return RangePlurals[id(lc)];
	};
	var PluralRules = getPluralRules__default["default"](Intl.NumberFormat, getSelector, getCategories, getRangeSelector);

	pluralRules = PluralRules;
	return pluralRules;
}

var hasRequiredPolyfill;

function requirePolyfill () {
	if (hasRequiredPolyfill) return polyfill;
	hasRequiredPolyfill = 1;

	var PluralRules = requirePluralRules();

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var PluralRules__default = /*#__PURE__*/_interopDefaultLegacy(PluralRules);

	if (typeof Intl === 'undefined') {
	  if (typeof commonjsGlobal !== 'undefined') {
	    commonjsGlobal.Intl = {
	      PluralRules: PluralRules__default["default"]
	    };
	  } else if (typeof window !== 'undefined') {
	    window.Intl = {
	      PluralRules: PluralRules__default["default"]
	    };
	  } else {
	    polyfill.Intl = {
	      PluralRules: PluralRules__default["default"]
	    };
	  }
	  PluralRules__default["default"].polyfill = true;
	} else if (!Intl.PluralRules || !Intl.PluralRules.prototype.selectRange) {
	  Intl.PluralRules = PluralRules__default["default"];
	  PluralRules__default["default"].polyfill = true;
	} else {
	  var test = ['en', 'es', 'ru', 'zh'];
	  var supported = Intl.PluralRules.supportedLocalesOf(test);
	  if (supported.length < test.length) {
	    Intl.PluralRules = PluralRules__default["default"];
	    PluralRules__default["default"].polyfill = true;
	  }
	}
	return polyfill;
}

requirePolyfill();

// Funzione di inizializzazione predefinita
let i18nInitializer = (resources, options = {}) => {
    const lngs = Object.keys(resources);
    const defaultLng = options.defaultLanguage || lngs[0];
    const fallbackLng = options.fallbackLanguage || { default: lngs };
    const { initReactI18next } = require('next-i18next');
    i18n.use(initReactI18next).init(Object.assign({ lng: defaultLng, resources: Object.entries(resources).reduce((prev, [key, val]) => (Object.assign(Object.assign({}, prev), { [key]: val })), {}), interpolation: Object.assign({ escapeValue: false }, options.interpolation), supportedLngs: lngs, fallbackLng, debug: options.debug || false, detection: options.detection, backend: options.backend }, options));
    return i18n;
};
/**
 * Configura un inizializzatore personalizzato per i18n
 * @param initializer - Funzione personalizzata per inizializzare i18n
 */
const setI18nInitializer = (initializer) => {
    i18nInitializer = initializer;
};
/**
 * Inizializza i18n con le risorse di traduzione e opzioni personalizzate
 * @param resources - Dizionario delle risorse di traduzione per lingua
 * @param options - Opzioni di configurazione
 * @returns L'istanza i18n inizializzata
 */
const initializeI18n = (resources, options = {}) => {
    return i18nInitializer(resources, options);
};

// Adapter predefinito per react-i18next
let translationAdapter = {
    getTranslator: (namespace) => {
        try {
            // Import dinamico per evitare problemi in ambiente server
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { useTranslation } = require("react-i18next");
            const { t } = useTranslation(namespace);
            return { translate: t };
        }
        catch (error) {
            // Fallback nel caso react-i18next non sia disponibile
            console.warn("react-i18next non disponibile, usando traduzione di fallback");
            return {
                translate: (key) => key,
            };
        }
    },
    name: "base",
};
/**
 * Imposta un adapter personalizzato per le traduzioni
 * @param adapter - Adapter personalizzato che fornisce il traduttore
 */
const setTranslationAdapter = (adapter) => {
    translationAdapter = adapter;
};
/**
 * Hook per tradurre testi che si adatta al sistema di traduzione configurato
 * @param ns - Namespace opzionale per le traduzioni
 * @returns Un oggetto con la funzione traslateText
 */
const useTranslatedText = (ns) => {
    const { translate } = translationAdapter.getTranslator(ns);
    const traslateText = useCallback((text, options) => {
        if (!text)
            return "";
        return translate(text, options);
    }, [translate, ns]);
    return { traslateText };
};

/**
 * Crea un adapter per i18next che funziona sia lato client che server
 * @param instance - Opzionale: istanza i18n da utilizzare
 * @returns L'adapter configurato
 */
const createI18nextAdapter = (instance = i18n) => {
    return {
        getTranslator: (namespace) => {
            return {
                translate: (key, options) => {
                    const ns = namespace || 'common';
                    try {
                        return instance.t(key, Object.assign(Object.assign({}, options), { ns }));
                    }
                    catch (error) {
                        console.warn(`Translation key not found: ${key} in namespace: ${ns}`);
                        return key;
                    }
                }
            };
        }
    };
};
/**
 * Crea un adapter per react-i18next (ambiente React)
 */
const createReactI18nextAdapter = () => {
    return {
        getTranslator: (namespace) => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { useTranslation } = require('react-i18next');
                const { t } = useTranslation(namespace);
                return { translate: t };
            }
            catch (error) {
                console.warn('react-i18next non disponibile, usando fallback');
                return { translate: (key) => key };
            }
        }
    };
};
/**
 * Crea un adapter che utilizza un dizionario statico di traduzioni
 * @param translations - Dizionario delle traduzioni per namespace
 */
const createStaticAdapter = (translations) => {
    return {
        getTranslator: (namespace) => {
            const ns = namespace || 'common';
            return {
                translate: (key, options) => {
                    const nsTranslations = translations[ns] || {};
                    const translation = nsTranslations[key];
                    if (!translation) {
                        return key;
                    }
                    // Sostituzione dei parametri
                    if (options) {
                        return Object.entries(options).reduce((acc, [paramKey, paramValue]) => acc.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue)), translation);
                    }
                    return translation;
                }
            };
        }
    };
};

/**
 * Crea un adapter per next-intl
 * Funziona solo in ambiente Next.js con next-intl installato
 */
const createNextIntlAdapter = () => {
    return {
        getTranslator: (namespace) => {
            try {
                // Tentativo di importare next-intl
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const nextIntl = require("next-intl");
                const useTranslations = nextIntl.useTranslations;
                try {
                    const t = useTranslations(namespace || "");
                    return {
                        translate: (key, options) => {
                            try {
                                return t(key, options);
                            }
                            catch (error) {
                                console.warn(`Translation key not found: ${key}`);
                                return key;
                            }
                        },
                    };
                }
                catch (error) {
                    // Errore nell'usare useTranslations
                    console.warn("Errore nell'utilizzare useTranslations di next-intl", error);
                    return { translate: (key) => key };
                }
            }
            catch (error) {
                // next-intl non è installato
                console.warn("next-intl non è installato, usando traduzione di fallback");
                return { translate: (key) => key };
            }
        },
        name: "intl",
    };
};
/**
 * Crea un adapter per next-i18next
 * Funziona solo in ambiente Next.js con next-i18next installato
 */
const createNextI18nextAdapter = () => {
    return {
        getTranslator: (namespace) => {
            try {
                // Tentativo di importare next-i18next
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { useTranslation } = require("next-i18next");
                const { t } = useTranslation(namespace || "common");
                return { translate: t };
            }
            catch (error) {
                // next-i18next non è installato
                console.warn("next-i18next non è installato, usando traduzione di fallback");
                return { translate: (key) => key };
            }
        },
    };
};

// Esportazioni degli adapter predefiniti
const adapters = {
    i18next: createI18nextAdapter,
    reactI18next: createReactI18nextAdapter,
    static: createStaticAdapter,
    nextIntl: createNextIntlAdapter,
    nextI18next: createNextI18nextAdapter,
};

const useTruncateStyle = ({ numberOfLines }) => {
    return useMemo(() => {
        if (!numberOfLines)
            return {};
        return {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: numberOfLines,
            WebkitBoxOrient: 'vertical',
        };
    }, [numberOfLines]);
};

const useComposeClassNames = ({ baseClasses, additionalClasses, conditionalClasses = {} }) => {
    return useMemo(() => {
        return clsx(baseClasses, additionalClasses, conditionalClasses);
    }, [baseClasses, additionalClasses, conditionalClasses]);
};

const useConfirmDialog = () => {
    const showConfirmDialog = useCallback((title, message) => {
        return new Promise((resolve) => {
            const confirmed = window.confirm(`${title}\n${message}`);
            resolve(confirmed);
        });
    }, []);
    return { showConfirmDialog };
};

let textSettings = {
    tag: {
        p: "text-base md:text-lg",
        span: "text-sm md:text-base",
        h1: "text-4xl md:text-5xl font-bold",
        h2: "text-2xl md:text-3xl font-semibold",
        h3: "text-xl md:text-2xl font-semibold",
        h4: "text-lg md:text-xl font-semibold",
        h5: "text-base md:text-lg font-semibold",
        h6: "text-sm md:text-base font-semibold",
    },
};
const Text = ({ text, tag: Tag = "span", className, }) => {
    const classNames = useComposeClassNames({
        baseClasses: textSettings.tag[Tag] || "text-base",
        additionalClasses: `${className || ""} ${textSettings.tag[Tag] || ""}`,
    });
    if (!text)
        return null;
    return jsx(Tag, { className: classNames, children: text });
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const IconComponent = forwardRef((_a, ref) => {
    var { icon = "ArrowUp", size = "base", className, iconVariant = "default", disabled = false, // Default disabled state
    animated = false, animationType = "spin", ariaLabel, ariaHidden = !ariaLabel, focusable = false } = _a, props = __rest(_a, ["icon", "size", "className", "iconVariant", "disabled", "animated", "animationType", "ariaLabel", "ariaHidden", "focusable"]);
    const LucideIcon = icons[icon];
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
    }, [props.stroke, disabled]);
    // Define animation classes
    const animationClasses = useMemo(() => {
        if (!animated)
            return "";
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
            [typeof size === "string" && size in typography.icon ? typography.icon[size] : ""]: typeof size === "string",
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
    if (!LucideIcon)
        return null;
    return (jsx(LucideIcon, Object.assign({ ref: ref, size: iconSize, className: iconClasses, "aria-label": ariaLabel, "aria-hidden": ariaHidden, focusable: focusable }, props)));
});
IconComponent.displayName = "Icon";
const Icon = memo(IconComponent);

let buttonSettings = {
    base: {
        className: "px-2 md:px-3 lg:px-4 py-2 md:py-2 rounded-lg cursor-pointer transition-colors focus:outline-none flex justify-between items-center gap-2",
        variant: {
            primary: {
                filled: "bg-blue-300/20 hover:bg-blue-300/30 dark:bg-blue-400/20 dark:hover:bg-blue-400/30 dark:text-blue-300 backdrop-blur-[1px] border border-blue-400/20",
                outlined: "border border-blue-400 text-blue-400 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300 hover:dark:bg-blue-400/10",
                text: "text-blue-400 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-400/10",
            },
            secondary: {
                filled: "bg-gray-300/20 hover:bg-gray-300/30 dark:bg-gray-400/20 dark:hover:bg-gray-400/30 dark:text-gray-300 backdrop-blur-[1px] border border-gray-400/20",
                outlined: "border border-gray-400 text-gray-400 hover:bg-gray-50 dark:border-gray-300 dark:text-gray-300 hover:dark:bg-gray-400/10",
                text: "text-gray-400 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-400/10",
            },
            danger: {
                filled: "bg-red-300/20 hover:bg-red-300/30 dark:bg-red-400/20 dark:hover:bg-red-400/30 dark:text-red-300 backdrop-blur-[1px] border border-red-400/20",
                outlined: "border border-red-400 text-red-400 hover:bg-red-50 dark:border-red-300 dark:text-red-300 hover:dark:bg-red-400/10",
                text: "text-red-400 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-400/10",
            },
            warning: {
                filled: "bg-yellow-300/20 hover:bg-yellow-300/30 dark:bg-yellow-400/20 dark:hover:bg-yellow-400/30 dark:text-yellow-300 backdrop-blur-[1px] border border-yellow-400/20",
                outlined: "border border-yellow-400 text-yellow-400 hover:bg-yellow-50 dark:border-yellow-300 dark:text-yellow-300 hover:dark:bg-yellow-400/10",
                text: "text-yellow-400 hover:bg-yellow-50 dark:text-yellow-300 dark:hover:bg-yellow-400/10",
            },
            success: {
                filled: "bg-green-300/20 hover:bg-green-300/30 dark:bg-green-400/20 dark:hover:bg-green-400/30 dark:text-green-300 backdrop-blur-[1px] border border-green-400/20",
                outlined: "border border-green-400 text-green-400 hover:bg-green-50 dark:border-green-300 dark:text-green-300 hover:dark:bg-green-400/10",
                text: "text-green-400 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-400/10",
            },
            base: {
                filled: "bg-white/20 hover:bg-white/30 dark:bg-gray-800/20 dark:hover:bg-gray-800/30 dark:text-gray-300 backdrop-blur-[1px] border border-gray-400/20",
                outlined: "border border-white/30 hover:border-white/50 text-white hover:bg-white/30 dark:border-gray-300 dark:text-gray-300 hover:dark:bg-gray-400/10",
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
const setButtonSettings = (settings) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    buttonSettings = {
        base: Object.assign(Object.assign(Object.assign({}, buttonSettings.base), settings.base), { variant: {
                primary: ((_b = (_a = settings === null || settings === void 0 ? void 0 : settings.base) === null || _a === void 0 ? void 0 : _a.variant) === null || _b === void 0 ? void 0 : _b.primary) ||
                    buttonSettings.base.variant.primary,
                secondary: ((_d = (_c = settings === null || settings === void 0 ? void 0 : settings.base) === null || _c === void 0 ? void 0 : _c.variant) === null || _d === void 0 ? void 0 : _d.secondary) ||
                    buttonSettings.base.variant.secondary,
                success: ((_f = (_e = settings === null || settings === void 0 ? void 0 : settings.base) === null || _e === void 0 ? void 0 : _e.variant) === null || _f === void 0 ? void 0 : _f.success) ||
                    buttonSettings.base.variant.success,
                danger: ((_h = (_g = settings === null || settings === void 0 ? void 0 : settings.base) === null || _g === void 0 ? void 0 : _g.variant) === null || _h === void 0 ? void 0 : _h.danger) || buttonSettings.base.variant.danger,
                warning: ((_k = (_j = settings === null || settings === void 0 ? void 0 : settings.base) === null || _j === void 0 ? void 0 : _j.variant) === null || _k === void 0 ? void 0 : _k.warning) ||
                    buttonSettings.base.variant.warning,
                base: ((_m = (_l = settings === null || settings === void 0 ? void 0 : settings.base) === null || _l === void 0 ? void 0 : _l.variant) === null || _m === void 0 ? void 0 : _m.base) || buttonSettings.base.variant.base,
            } }),
        text: Object.assign(Object.assign({}, buttonSettings.text), settings.text),
        icon: Object.assign(Object.assign({}, buttonSettings.icon), settings.icon),
    };
};
const Button = (_a) => {
    var { text, className, icon, endIcon, variant = "filled", color = "primary" } = _a, props = __rest(_a, ["text", "className", "icon", "endIcon", "variant", "color"]);
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
        additionalClasses: text === null || text === void 0 ? void 0 : text.className,
    });
    const iconClassNames = useComposeClassNames({
        baseClasses: buttonSettings.icon.className,
        additionalClasses: icon === null || icon === void 0 ? void 0 : icon.className,
    });
    const endIconClassNames = useComposeClassNames({
        baseClasses: buttonSettings.icon.className,
        additionalClasses: endIcon === null || endIcon === void 0 ? void 0 : endIcon.className,
    });
    if (!text && !icon)
        return null;
    return (jsxs("button", Object.assign({ className: buttonClassNames }, props, { children: [icon && jsx(Icon, Object.assign({}, icon, { className: iconClassNames })), text && jsx(Text, Object.assign({}, text, { className: textClassNames })), endIcon && jsx(Icon, Object.assign({}, endIcon, { className: endIconClassNames }))] })));
};

let headerSettings = {
    base: {
        className: "flex items-center justify-between md:justify-around px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 relative duration-200 transition-colors border-0 max-w-7xl mx-auto w-full backdrop-blur-xl", //bg-blue-600/20 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-700
    },
    section: {
        className: "flex flex-col md:flex-row md:items-center gap-3",
        itemClassName: "flex flex-col md:flex-row md:items-center gap-3 cursor-pointer",
        subItemClassName: "flex flex-col md:flex-row md:items-center gap-3",
    },
    color: {
        primary: "bg-blue-300/20 hover:bg-blue-300/30 dark:bg-blue-400/20 dark:hover:bg-blue-400/30 dark:text-blue-300 backdrop-blur-[1px] border border-blue-400/20",
        secondary: "bg-gray-300/20 hover:bg-gray-300/30 dark:bg-gray-400/20 dark:hover:bg-gray-400/30 dark:text-gray-300 backdrop-blur-[1px] border border-gray-400/20",
        success: "bg-green-300/20 hover:bg-green-300/30 dark:bg-green-400/20 dark:hover:bg-green-400/30 dark:text-green-300 backdrop-blur-[1px] border border-green-400/20",
        danger: "bg-red-300/20 hover:bg-red-300/30 dark:bg-red-400/20 dark:hover:bg-red-400/30 dark:text-red-300 backdrop-blur-[1px] border border-red-400/20",
        warning: "bg-yellow-300/20 hover:bg-yellow-300/30 dark:bg-yellow-400/20 dark:hover:bg-yellow-400/30 dark:text-yellow-300 backdrop-blur-[1px] border border-yellow-400/20",
        base: "bg-white/20 hover:bg-white/30 dark:bg-gray-800/20 dark:hover:bg-gray-800/30 dark:text-gray-300 backdrop-blur-[1px] border border-gray-400/20",
    },
};
const setHeaderSettings = (settings) => {
    var _a, _b, _c, _d, _e, _f;
    headerSettings = {
        base: Object.assign(Object.assign({}, headerSettings.base), settings === null || settings === void 0 ? void 0 : settings.base),
        section: Object.assign(Object.assign({}, headerSettings.section), settings === null || settings === void 0 ? void 0 : settings.section),
        color: {
            primary: ((_a = settings === null || settings === void 0 ? void 0 : settings.color) === null || _a === void 0 ? void 0 : _a.primary) || headerSettings.color.primary,
            secondary: ((_b = settings === null || settings === void 0 ? void 0 : settings.color) === null || _b === void 0 ? void 0 : _b.secondary) || headerSettings.color.secondary,
            success: ((_c = settings === null || settings === void 0 ? void 0 : settings.color) === null || _c === void 0 ? void 0 : _c.success) || headerSettings.color.success,
            danger: ((_d = settings === null || settings === void 0 ? void 0 : settings.color) === null || _d === void 0 ? void 0 : _d.danger) || headerSettings.color.danger,
            warning: ((_e = settings === null || settings === void 0 ? void 0 : settings.color) === null || _e === void 0 ? void 0 : _e.warning) || headerSettings.color.warning,
            base: ((_f = settings === null || settings === void 0 ? void 0 : settings.color) === null || _f === void 0 ? void 0 : _f.base) || headerSettings.color.base,
        },
    };
};
const Header = ({ section, className, color = "primary", icon, title, component, }) => {
    const classNames = useComposeClassNames({
        baseClasses: headerSettings.base.className,
        additionalClasses: `${className || ""} ${headerSettings.color[color]}`,
    });
    return (jsxs("header", { className: classNames, children: [icon && jsx(Icon, Object.assign({}, icon)), title && jsx(Text, Object.assign({}, title)), !!component && component, !!(section === null || section === void 0 ? void 0 : section.length) && (jsxs(Fragment, { children: [jsx("input", { type: "checkbox", id: "menu-toggle", className: "hidden" }), jsx("label", { htmlFor: "menu-toggle", className: "block md:hidden cursor-pointer", children: jsx(Icon, { icon: "Menu", className: "w-6 h-6 text-gray-600 dark:text-gray-300" }) }), jsx("div", { className: "md:block hidden", id: "header-section", children: section.map((sec, index) => (jsx("div", { className: `${headerSettings.section.className} ${sec.className || ""}`, children: sec.items.map((item) => (jsxs("div", { className: `${headerSettings.section.itemClassName} ${item.className || ""}`, children: [item.icon && jsx(Icon, Object.assign({}, item.icon)), item.text && jsx(Text, Object.assign({}, item.text)), item.button && jsx(Button, Object.assign({}, item.button)), !!item.component && item.component] }, item.id))) }, index))) }), jsx("div", { className: `block md:!hidden bg-white`, id: "header-section-mobile", style: {
                            position: "absolute",
                            top: "110%",
                            left: 0,
                            right: 0,
                            zIndex: 50,
                        }, children: jsx("div", { className: classNames, children: section.map((sec, index) => (jsx("div", { className: `${headerSettings.section.className} ${sec.className || ""}`, children: sec.items.map((item) => (jsxs("div", { className: `${headerSettings.section.itemClassName} ${item.className || ""}`, children: [item.icon && jsx(Icon, Object.assign({}, item.icon)), item.text && jsx(Text, Object.assign({}, item.text)), item.button && jsx(Button, Object.assign({}, item.button)), !!item.component && item.component] }, item.id))) }, index))) }) })] }))] }));
};

let inputSettings = {
    base: {
        className: "w-full px-3 py-2 rounded-lg border focus:outline-none transition-colors",
        variant: {
            primary: {
                filled: "bg-blue-300/10 border-blue-400/30 focus:ring-1 focus:ring-blue-400/50",
                outlined: "border-blue-400/60 focus:border-blue-400",
                text: "border-transparent",
            },
            secondary: {
                filled: "bg-gray-300/10 border-gray-400/30 focus:ring-1 focus:ring-gray-400/50",
                outlined: "border-gray-400/60 focus:border-gray-400",
                text: "border-transparent",
            },
            danger: {
                filled: "bg-red-300/10 border-red-400/30 focus:ring-1 focus:ring-red-400/50",
                outlined: "border-red-400/60 focus:border-red-400",
                text: "border-transparent",
            },
            warning: {
                filled: "bg-yellow-300/10 border-yellow-400/30 focus:ring-1 focus:ring-yellow-400/50",
                outlined: "border-yellow-400/60 focus:border-yellow-400",
                text: "border-transparent",
            },
            success: {
                filled: "bg-green-300/10 border-green-400/30 focus:ring-1 focus:ring-green-400/50",
                outlined: "border-green-400/60 focus:border-green-400",
                text: "border-transparent",
            },
            base: {
                filled: "bg-white/10 border-white/20 focus:ring-1 focus:ring-white/30",
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
const setInputSettings = (settings) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    inputSettings = {
        base: Object.assign(Object.assign(Object.assign({}, inputSettings.base), settings.base), { variant: {
                primary: ((_b = (_a = settings === null || settings === void 0 ? void 0 : settings.base) === null || _a === void 0 ? void 0 : _a.variant) === null || _b === void 0 ? void 0 : _b.primary) || inputSettings.base.variant.primary,
                secondary: ((_d = (_c = settings === null || settings === void 0 ? void 0 : settings.base) === null || _c === void 0 ? void 0 : _c.variant) === null || _d === void 0 ? void 0 : _d.secondary) || inputSettings.base.variant.secondary,
                success: ((_f = (_e = settings === null || settings === void 0 ? void 0 : settings.base) === null || _e === void 0 ? void 0 : _e.variant) === null || _f === void 0 ? void 0 : _f.success) || inputSettings.base.variant.success,
                danger: ((_h = (_g = settings === null || settings === void 0 ? void 0 : settings.base) === null || _g === void 0 ? void 0 : _g.variant) === null || _h === void 0 ? void 0 : _h.danger) || inputSettings.base.variant.danger,
                warning: ((_k = (_j = settings === null || settings === void 0 ? void 0 : settings.base) === null || _j === void 0 ? void 0 : _j.variant) === null || _k === void 0 ? void 0 : _k.warning) || inputSettings.base.variant.warning,
                base: ((_m = (_l = settings === null || settings === void 0 ? void 0 : settings.base) === null || _l === void 0 ? void 0 : _l.variant) === null || _m === void 0 ? void 0 : _m.base) || inputSettings.base.variant.base,
            } }),
        label: Object.assign(Object.assign({}, inputSettings.label), settings.label),
        icon: Object.assign(Object.assign({}, inputSettings.icon), settings.icon),
    };
};
const TextInput = (_a) => {
    var { label, className, containerClassName, icon, endIcon, variant = "outlined", color = "base", type = "text" } = _a, props = __rest(_a, ["label", "className", "containerClassName", "icon", "endIcon", "variant", "color", "type"]);
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
        additionalClasses: label === null || label === void 0 ? void 0 : label.className,
    });
    const iconClassNames = useComposeClassNames({
        baseClasses: inputSettings.icon.className,
        additionalClasses: icon === null || icon === void 0 ? void 0 : icon.className,
    });
    const endIconClassNames = useComposeClassNames({
        baseClasses: inputSettings.icon.className,
        additionalClasses: endIcon === null || endIcon === void 0 ? void 0 : endIcon.className,
    });
    return (jsxs("div", { className: containerClasses, children: [label && jsx(Text, Object.assign({}, label, { className: labelClassNames })), icon && jsx(Icon, Object.assign({}, icon, { className: iconClassNames })), jsx("input", Object.assign({ type: type, className: inputClassNames }, props)), endIcon && jsx(Icon, Object.assign({}, endIcon, { className: endIconClassNames }))] }));
};

let selectSettings = {
    base: {
        className: "appearance-none w-full px-3 py-2 rounded-lg border bg-transparent focus:outline-none",
        variant: {
            primary: {
                filled: "bg-blue-300/10 border-blue-400/30 focus:ring-1 focus:ring-blue-400/50",
                outlined: "border-blue-400/60 focus:border-blue-400",
                text: "border-transparent",
            },
            secondary: {
                filled: "bg-gray-300/10 border-gray-400/30 focus:ring-1 focus:ring-gray-400/50",
                outlined: "border-gray-400/60 focus:border-gray-400",
                text: "border-transparent",
            },
            danger: {
                filled: "bg-red-300/10 border-red-400/30 focus:ring-1 focus:ring-red-400/50",
                outlined: "border-red-400/60 focus:border-red-400",
                text: "border-transparent",
            },
            warning: {
                filled: "bg-yellow-300/10 border-yellow-400/30 focus:ring-1 focus:ring-yellow-400/50",
                outlined: "border-yellow-400/60 focus:border-yellow-400",
                text: "border-transparent",
            },
            success: {
                filled: "bg-green-300/10 border-green-400/30 focus:ring-1 focus:ring-green-400/50",
                outlined: "border-green-400/60 focus:border-green-400",
                text: "border-transparent",
            },
            base: {
                filled: "bg-white/10 border-white/20 focus:ring-1 focus:ring-white/30",
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
const setSelectSettings = (settings) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    selectSettings = {
        base: Object.assign(Object.assign(Object.assign({}, selectSettings.base), settings.base), { variant: {
                primary: ((_b = (_a = settings === null || settings === void 0 ? void 0 : settings.base) === null || _a === void 0 ? void 0 : _a.variant) === null || _b === void 0 ? void 0 : _b.primary) || selectSettings.base.variant.primary,
                secondary: ((_d = (_c = settings === null || settings === void 0 ? void 0 : settings.base) === null || _c === void 0 ? void 0 : _c.variant) === null || _d === void 0 ? void 0 : _d.secondary) || selectSettings.base.variant.secondary,
                success: ((_f = (_e = settings === null || settings === void 0 ? void 0 : settings.base) === null || _e === void 0 ? void 0 : _e.variant) === null || _f === void 0 ? void 0 : _f.success) || selectSettings.base.variant.success,
                danger: ((_h = (_g = settings === null || settings === void 0 ? void 0 : settings.base) === null || _g === void 0 ? void 0 : _g.variant) === null || _h === void 0 ? void 0 : _h.danger) || selectSettings.base.variant.danger,
                warning: ((_k = (_j = settings === null || settings === void 0 ? void 0 : settings.base) === null || _j === void 0 ? void 0 : _j.variant) === null || _k === void 0 ? void 0 : _k.warning) || selectSettings.base.variant.warning,
                base: ((_m = (_l = settings === null || settings === void 0 ? void 0 : settings.base) === null || _l === void 0 ? void 0 : _l.variant) === null || _m === void 0 ? void 0 : _m.base) || selectSettings.base.variant.base,
            } }),
        label: Object.assign(Object.assign({}, selectSettings.label), settings.label),
        icon: Object.assign(Object.assign({}, selectSettings.icon), settings.icon),
    };
};
const SelectInput = (_a) => {
    var { label, className, containerClassName, icon, variant = "outlined", color = "base", children } = _a, props = __rest(_a, ["label", "className", "containerClassName", "icon", "variant", "color", "children"]);
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
        additionalClasses: label === null || label === void 0 ? void 0 : label.className,
    });
    const iconClassNames = useComposeClassNames({
        baseClasses: selectSettings.icon.className,
        additionalClasses: icon === null || icon === void 0 ? void 0 : icon.className,
    });
    return (jsxs("div", { className: containerClasses, children: [label && jsx(Text, Object.assign({}, label, { className: labelClassNames })), icon && jsx(Icon, Object.assign({}, icon, { className: iconClassNames })), jsx("select", Object.assign({ className: selectClassNames }, props, { children: children })), jsx("div", { className: "pointer-events-none absolute inset-y-0 right-2 flex items-center", children: jsx(Icon, { icon: "ChevronDown", size: 16, className: "opacity-70" }) })] }));
};

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
const setCheckboxSettings = (settings) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    checkboxSettings = {
        base: Object.assign(Object.assign(Object.assign({}, checkboxSettings.base), settings.base), { variant: {
                primary: ((_b = (_a = settings === null || settings === void 0 ? void 0 : settings.base) === null || _a === void 0 ? void 0 : _a.variant) === null || _b === void 0 ? void 0 : _b.primary) || checkboxSettings.base.variant.primary,
                secondary: ((_d = (_c = settings === null || settings === void 0 ? void 0 : settings.base) === null || _c === void 0 ? void 0 : _c.variant) === null || _d === void 0 ? void 0 : _d.secondary) || checkboxSettings.base.variant.secondary,
                success: ((_f = (_e = settings === null || settings === void 0 ? void 0 : settings.base) === null || _e === void 0 ? void 0 : _e.variant) === null || _f === void 0 ? void 0 : _f.success) || checkboxSettings.base.variant.success,
                danger: ((_h = (_g = settings === null || settings === void 0 ? void 0 : settings.base) === null || _g === void 0 ? void 0 : _g.variant) === null || _h === void 0 ? void 0 : _h.danger) || checkboxSettings.base.variant.danger,
                warning: ((_k = (_j = settings === null || settings === void 0 ? void 0 : settings.base) === null || _j === void 0 ? void 0 : _j.variant) === null || _k === void 0 ? void 0 : _k.warning) || checkboxSettings.base.variant.warning,
                base: ((_m = (_l = settings === null || settings === void 0 ? void 0 : settings.base) === null || _l === void 0 ? void 0 : _l.variant) === null || _m === void 0 ? void 0 : _m.base) || checkboxSettings.base.variant.base,
            } }),
        label: Object.assign(Object.assign({}, checkboxSettings.label), settings.label),
    };
};
const Checkbox = (_a) => {
    var { label, className, containerClassName, variant = "outlined", color = "base" } = _a, props = __rest(_a, ["label", "className", "containerClassName", "variant", "color"]);
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
        additionalClasses: label === null || label === void 0 ? void 0 : label.className,
    });
    return (jsxs("label", { className: containerClasses, children: [jsx("input", Object.assign({ type: "checkbox", className: inputClassNames }, props)), label && jsx(Text, Object.assign({}, label, { className: labelClassNames }))] }));
};

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
const setRadioSettings = (settings) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    radioSettings = {
        base: Object.assign(Object.assign(Object.assign({}, radioSettings.base), settings.base), { variant: {
                primary: ((_b = (_a = settings === null || settings === void 0 ? void 0 : settings.base) === null || _a === void 0 ? void 0 : _a.variant) === null || _b === void 0 ? void 0 : _b.primary) || radioSettings.base.variant.primary,
                secondary: ((_d = (_c = settings === null || settings === void 0 ? void 0 : settings.base) === null || _c === void 0 ? void 0 : _c.variant) === null || _d === void 0 ? void 0 : _d.secondary) || radioSettings.base.variant.secondary,
                success: ((_f = (_e = settings === null || settings === void 0 ? void 0 : settings.base) === null || _e === void 0 ? void 0 : _e.variant) === null || _f === void 0 ? void 0 : _f.success) || radioSettings.base.variant.success,
                danger: ((_h = (_g = settings === null || settings === void 0 ? void 0 : settings.base) === null || _g === void 0 ? void 0 : _g.variant) === null || _h === void 0 ? void 0 : _h.danger) || radioSettings.base.variant.danger,
                warning: ((_k = (_j = settings === null || settings === void 0 ? void 0 : settings.base) === null || _j === void 0 ? void 0 : _j.variant) === null || _k === void 0 ? void 0 : _k.warning) || radioSettings.base.variant.warning,
                base: ((_m = (_l = settings === null || settings === void 0 ? void 0 : settings.base) === null || _l === void 0 ? void 0 : _l.variant) === null || _m === void 0 ? void 0 : _m.base) || radioSettings.base.variant.base,
            } }),
        label: Object.assign(Object.assign({}, radioSettings.label), settings.label),
    };
};
const Radio = (_a) => {
    var { label, className, containerClassName, variant = "outlined", color = "base" } = _a, props = __rest(_a, ["label", "className", "containerClassName", "variant", "color"]);
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
        additionalClasses: label === null || label === void 0 ? void 0 : label.className,
    });
    return (jsxs("label", { className: containerClasses, children: [jsx("input", Object.assign({ type: "radio", className: inputClassNames }, props)), label && jsx(Text, Object.assign({}, label, { className: labelClassNames }))] }));
};

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
const setSwitchSettings = (settings) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    switchSettings = {
        base: Object.assign(Object.assign(Object.assign({}, switchSettings.base), settings.base), { variant: {
                primary: ((_b = (_a = settings === null || settings === void 0 ? void 0 : settings.base) === null || _a === void 0 ? void 0 : _a.variant) === null || _b === void 0 ? void 0 : _b.primary) || switchSettings.base.variant.primary,
                secondary: ((_d = (_c = settings === null || settings === void 0 ? void 0 : settings.base) === null || _c === void 0 ? void 0 : _c.variant) === null || _d === void 0 ? void 0 : _d.secondary) || switchSettings.base.variant.secondary,
                success: ((_f = (_e = settings === null || settings === void 0 ? void 0 : settings.base) === null || _e === void 0 ? void 0 : _e.variant) === null || _f === void 0 ? void 0 : _f.success) || switchSettings.base.variant.success,
                danger: ((_h = (_g = settings === null || settings === void 0 ? void 0 : settings.base) === null || _g === void 0 ? void 0 : _g.variant) === null || _h === void 0 ? void 0 : _h.danger) || switchSettings.base.variant.danger,
                warning: ((_k = (_j = settings === null || settings === void 0 ? void 0 : settings.base) === null || _j === void 0 ? void 0 : _j.variant) === null || _k === void 0 ? void 0 : _k.warning) || switchSettings.base.variant.warning,
                base: ((_m = (_l = settings === null || settings === void 0 ? void 0 : settings.base) === null || _l === void 0 ? void 0 : _l.variant) === null || _m === void 0 ? void 0 : _m.base) || switchSettings.base.variant.base,
            } }),
        label: Object.assign(Object.assign({}, switchSettings.label), settings.label),
    };
};
const Switch = (_a) => {
    var { label, className, containerClassName, variant = "filled", color = "base", checked } = _a, props = __rest(_a, ["label", "className", "containerClassName", "variant", "color", "checked"]);
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
    return (jsxs("label", { className: containerClasses, children: [jsx("input", Object.assign({ type: "checkbox", className: "sr-only", checked: checked }, props)), jsxs("span", { className: `${switchSettings.base.className}`, children: [jsx("span", { className: trackClasses }), jsx("span", { className: thumbClasses, style: { transform: checked ? "translateX(20px)" : "translateX(0px)" } })] }), label && jsx(Text, Object.assign({}, label, { className: switchSettings.label.className }))] }));
};

export { Button, Checkbox, Colors, Header, Icon, Radio, SelectInput, Switch, Text, TextInput, adapters, initializeI18n, layout, setButtonSettings, setCheckboxSettings, setColors, setHeaderSettings, setI18nInitializer, setInputSettings, setRadioSettings, setSelectSettings, setSwitchSettings, setTranslationAdapter, setlayout, typography, useColorHelpers, useComponentStyles, useComposeClassNames, useConfirmDialog, useThemeColors, useTranslatedText, useTruncateStyle };
//# sourceMappingURL=index.mjs.map
