export const typography = {
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
} as const;

export type TypographyKey = keyof typeof typography;