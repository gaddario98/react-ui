import { useMemo } from 'react';
import clsx from "clsx";

interface UseComposeClassNamesProps {
  baseClasses: string;
  additionalClasses?: string;
  conditionalClasses?: Record<string, boolean>;
}

export const useComposeClassNames = ({
  baseClasses,
  additionalClasses,
  conditionalClasses = {}
}: UseComposeClassNamesProps) => {
  return useMemo(() => {
    return clsx(
      baseClasses,
      additionalClasses,
      conditionalClasses
    );
  }, [baseClasses, additionalClasses, conditionalClasses]);
};

