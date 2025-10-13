export declare const setlayout: (props: Partial<typeof layout>) => void;
export declare const layout: {
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        x: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            "2xl": string;
        };
        y: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            "2xl": string;
        };
        base: string;
        xBase: string;
        yBase: string;
    };
    gap: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
    };
    page: string;
    section: string;
    header: string;
    footer: string;
    content: string;
    contentRow: string;
    contentCol: string;
    paragraph: string;
    grid: {
        cols1: string;
        cols2: string;
        cols3: string;
        cols4: string;
    };
    container: {
        base: string;
        padding: string;
        maxWidth: string;
        centered: string;
        fluid: string;
        responsive: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
            "2xl": string;
        };
    };
    card: {
        base: string;
        header: string;
        body: string;
        footer: string;
        hover: string;
    };
    responsive: {
        hideOnMobile: string;
        hideOnDesktop: string;
        onlyMobile: string;
        onlyTablet: string;
        onlyDesktop: string;
        showOnHover: string;
    };
    zIndex: {
        0: string;
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        auto: string;
    };
};
export type LayoutKey = keyof typeof layout;
export type SpacingSize = keyof typeof layout.spacing;
export type GapSize = keyof typeof layout.gap;
export type GridVariant = keyof typeof layout.grid;
export type ContainerSize = keyof typeof layout.container.responsive;
export type ZIndexLevel = keyof typeof layout.zIndex;
