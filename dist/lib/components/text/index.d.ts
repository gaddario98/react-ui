export interface TextProps {
    text?: string;
    tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
}
export declare const Text: React.FC<TextProps>;
