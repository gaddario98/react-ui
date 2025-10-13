import { useCallback, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const Image: React.FC<ImageProps> = ({ src, fallbackSrc, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = useCallback(() => {
    if (fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  }, [fallbackSrc]);

  return <img src={currentSrc} onError={handleError} {...props} />;
};
