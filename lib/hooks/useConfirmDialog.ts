import { useCallback } from "react";

interface UseConfirmDialogReturn {
  showConfirmDialog: (title: string, message: string) => Promise<boolean>;
}

export const useConfirmDialog = (): UseConfirmDialogReturn => {
  const showConfirmDialog = useCallback(
    (title: string, message: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const confirmed = window.confirm(`${title}\n${message}`);
        resolve(confirmed);
      });
    },
    []
  );

  return { showConfirmDialog };
};
