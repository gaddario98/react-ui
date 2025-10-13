interface UseConfirmDialogReturn {
    showConfirmDialog: (title: string, message: string) => Promise<boolean>;
}
export declare const useConfirmDialog: () => UseConfirmDialogReturn;
export {};
