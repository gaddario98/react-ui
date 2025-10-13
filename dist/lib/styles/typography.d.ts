export declare const typography: {
    readonly fontFamily: {
        readonly regular: "font-sans";
        readonly medium: "font-sans font-medium";
        readonly light: "font-sans font-light";
        readonly mono: "font-mono";
        readonly display: "font-display";
        readonly alt: "font-sans font-semibold";
        readonly rounded: "font-sans rounded-full";
    };
    readonly text: {
        readonly hero: "text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight font-display";
        readonly header: "text-4xl md:text-5xl font-bold tracking-tight font-display";
        readonly sectionTitle: "text-2xl md:text-3xl font-semibold tracking-tight font-sans";
        readonly sectionSubtitle: "text-xl md:text-2xl font-medium tracking-normal font-sans";
        readonly listItem: "text-base md:text-lg font-normal font-sans";
        readonly paragraph: "text-lg md:text-xl text-gray-700 dark:text-gray-300 font-sans leading-relaxed";
        readonly caption: "text-sm text-gray-500 dark:text-gray-400 font-sans";
        readonly overline: "text-xs uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 font-sans";
        readonly tabLabel: "text-base font-semibold font-sans";
        readonly button: "text-base font-semibold font-sans tracking-wide";
        readonly buttonSmall: "text-sm font-semibold font-sans";
        readonly code: "text-sm font-mono bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-2 py-1 rounded-lg";
        readonly quote: "text-xl md:text-2xl italic font-light border-l-4 border-primary/60 dark:border-primary/40 pl-6 py-2 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900";
        readonly badge: "text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-gradient-to-r from-primary/80 to-secondary/80 text-white";
        readonly highlight: "bg-yellow-200 dark:bg-yellow-600 px-1.5 py-0.5 rounded";
    };
    readonly weight: {
        readonly thin: "font-thin";
        readonly light: "font-light";
        readonly normal: "font-normal";
        readonly medium: "font-medium";
        readonly semibold: "font-semibold";
        readonly bold: "font-bold";
        readonly extrabold: "font-extrabold";
    };
    readonly align: {
        readonly left: "text-left";
        readonly center: "text-center";
        readonly right: "text-right";
        readonly justify: "text-justify";
    };
    readonly lineHeight: {
        readonly none: "leading-none";
        readonly tight: "leading-tight";
        readonly normal: "leading-normal";
        readonly relaxed: "leading-relaxed";
        readonly loose: "leading-loose";
    };
    readonly icon: {
        readonly xs: "w-4 h-4";
        readonly sm: "w-5 h-5";
        readonly base: "w-6 h-6";
        readonly lg: "w-7 h-7";
        readonly xl: "w-8 h-8";
        readonly '2xl': "w-10 h-10";
    };
    readonly truncate: "truncate";
    readonly ellipsis: "overflow-hidden overflow-ellipsis whitespace-nowrap";
    readonly wrap: "whitespace-normal break-words";
    readonly nowrap: "whitespace-nowrap";
};
export type TypographyKey = keyof typeof typography;
