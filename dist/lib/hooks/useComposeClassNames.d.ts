interface UseComposeClassNamesProps {
    baseClasses: string;
    additionalClasses?: string;
    conditionalClasses?: Record<string, boolean>;
}
export declare const useComposeClassNames: ({ baseClasses, additionalClasses, conditionalClasses }: UseComposeClassNamesProps) => string;
export {};
