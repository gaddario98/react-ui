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
  section:
    "w-full py-12 sm:py-16 md:py-24 rounded-3xl shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all",
  header:
    "sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 shadow-md transition-all",
  footer:
    "w-full border-t border-gray-200 dark:border-gray-800 py-8 mt-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md",

  // Content layouts
  content:
    "px-4 sm:px-6 lg:px-8 flex flex-col gap-6 max-w-7xl mx-auto w-full py-4 sm:py-5 lg:py-6",
  contentRow: "flex flex-row items-center gap-3",
  contentCol: "flex flex-col gap-3",
  paragraph: "max-w-prose",

  // Grids
  grid: {
    cols1: "grid grid-cols-1 gap-4",
    cols2: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    cols3: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
    cols4:
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
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
    header:
      "px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80",
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
export const setlayout = (props: Partial<typeof layout>) => {
  Object.assign(layout, props);
};

export const layout = Layout;

export type LayoutKey = keyof typeof layout;
export type SpacingSize = keyof typeof layout.spacing;
export type GapSize = keyof typeof layout.gap;
export type GridVariant = keyof typeof layout.grid;
export type ContainerSize = keyof typeof layout.container.responsive;
export type ZIndexLevel = keyof typeof layout.zIndex;
