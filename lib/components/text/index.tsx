import { useComposeClassNames } from "../../hooks";

export interface TextProps {
  text?: string;
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

let textSettings = {
  tag: {
    p: "text-base md:text-lg",
    span: "text-sm md:text-base",
    h1: "text-4xl md:text-5xl font-bold",
    h2: "text-2xl md:text-3xl font-semibold",
    h3: "text-xl md:text-2xl font-semibold",
    h4: "text-lg md:text-xl font-semibold",
    h5: "text-base md:text-lg font-semibold",
    h6: "text-sm md:text-base font-semibold",
  },
};

export const Text: React.FC<TextProps> = ({
  text,
  tag: Tag = "span",
  className,
}) => {
  const classNames = useComposeClassNames({
    baseClasses: textSettings.tag[Tag] || "text-base",
    additionalClasses: `${className || ""} ${textSettings.tag[Tag] || ""}`,
  });
  if (!text) return null;

  return <Tag className={classNames}>{text}</Tag>;
};
