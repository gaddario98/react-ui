"use client";
import { useComposeClassNames } from "../../hooks";

export interface ParagraphProps {
  text?: string;
  tag?: "p" | "span";
  className?: string;
}

let paragraphSettings = {
  tag: {
    p: "text-base md:text-lg leading-relaxed",
    span: "text-sm md:text-base",
  },
};

export const setParagraphSettings = (
  settings: Partial<typeof paragraphSettings>
) => {
  paragraphSettings = {
    tag: {
      ...paragraphSettings.tag,
      ...settings.tag,
    },
  };
};

export const Paragraph: React.FC<ParagraphProps> = ({
  text,
  tag: Tag = "p",
  className,
}) => {
  const classNames = useComposeClassNames({
    baseClasses: paragraphSettings.tag[Tag] || "text-base",
    additionalClasses: `${className || ""} ${paragraphSettings.tag[Tag] || ""}`,
  });

  if (!text) return null;
  return <Tag className={classNames}>{text}</Tag>;
};
