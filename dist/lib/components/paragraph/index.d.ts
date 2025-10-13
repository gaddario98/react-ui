export interface ParagraphProps {
    text?: string;
    tag?: "p" | "span";
    className?: string;
}
declare let paragraphSettings: {
    tag: {
        p: string;
        span: string;
    };
};
export declare const setParagraphSettings: (settings: Partial<typeof paragraphSettings>) => void;
export declare const Paragraph: React.FC<ParagraphProps>;
export {};
