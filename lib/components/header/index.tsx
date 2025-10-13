import { ComponentProps } from "react";
import { Text } from "../text";
import { useComposeClassNames } from "../../hooks";
import {Icon} from "../icon";
import { Button } from "../button";

export interface HeaderProps {
  section: HeaderSection[];
  className?: string;
  color?: keyof typeof headerSettings.color;
  title?: ComponentProps<typeof Text>;
  icon?: ComponentProps<typeof Icon>;
  component?: React.JSX.Element;
}

interface HeaderSection {
  items: HeaderSectionItem[];
  className?: string;
}

interface HeaderSectionItem {
  id: string;
  text?: ComponentProps<typeof Text>;
  button?: ComponentProps<typeof Button>;
  icon?: ComponentProps<typeof Icon>;
  subItems?: HeaderSectionItem[];
  onClick?: () => void;
  className?: string;
  component?: React.JSX.Element;
}

let headerSettings = {
  base: {
    className:
      "flex items-center justify-between md:justify-around px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 relative duration-200 transition-colors border-0 max-w-7xl mx-auto w-full backdrop-blur-xl", //bg-blue-600/20 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-700
  },
  section: {
    className: "flex flex-col md:flex-row md:items-center gap-3",
    itemClassName:
      "flex flex-col md:flex-row md:items-center gap-3 cursor-pointer",
    subItemClassName: "flex flex-col md:flex-row md:items-center gap-3",
  },
  color: {
    primary:
      "bg-blue-300/20 hover:bg-blue-300/30 dark:bg-blue-400/20 dark:hover:bg-blue-400/30 dark:text-blue-300 backdrop-blur-[1px] border border-blue-400/20",
    secondary:
      "bg-gray-300/20 hover:bg-gray-300/30 dark:bg-gray-400/20 dark:hover:bg-gray-400/30 dark:text-gray-300 backdrop-blur-[1px] border border-gray-400/20",
    success:
      "bg-green-300/20 hover:bg-green-300/30 dark:bg-green-400/20 dark:hover:bg-green-400/30 dark:text-green-300 backdrop-blur-[1px] border border-green-400/20",
    danger:
      "bg-red-300/20 hover:bg-red-300/30 dark:bg-red-400/20 dark:hover:bg-red-400/30 dark:text-red-300 backdrop-blur-[1px] border border-red-400/20",
    warning:
      "bg-yellow-300/20 hover:bg-yellow-300/30 dark:bg-yellow-400/20 dark:hover:bg-yellow-400/30 dark:text-yellow-300 backdrop-blur-[1px] border border-yellow-400/20",
    base: "bg-white/20 hover:bg-white/30 dark:bg-gray-800/20 dark:hover:bg-gray-800/30 dark:text-gray-300 backdrop-blur-[1px] border border-gray-400/20",
  },
};

export const setHeaderSettings = (settings: Partial<typeof headerSettings>) => {
  headerSettings = {
    base: {
      ...headerSettings.base,
      ...settings?.base,
    },
    section: {
      ...headerSettings.section,
      ...settings?.section,
    },
    color: {
      primary: settings?.color?.primary || headerSettings.color.primary,
      secondary: settings?.color?.secondary || headerSettings.color.secondary,
      success: settings?.color?.success || headerSettings.color.success,
      danger: settings?.color?.danger || headerSettings.color.danger,
      warning: settings?.color?.warning || headerSettings.color.warning,
      base: settings?.color?.base || headerSettings.color.base,
    },
  };
};
export const Header: React.FC<HeaderProps> = ({
  section,
  className,
  color = "primary",
  icon,
  title,
  component,
}) => {
  const classNames = useComposeClassNames({
    baseClasses: headerSettings.base.className,
    additionalClasses: `${className || ""} ${headerSettings.color[color]}`,
  });

  return (
    <header className={classNames}>
      {icon && <Icon {...icon} />}
      {title && <Text {...title} />}
      {!!component && component}
      {!!section?.length && (
        <>
          <input type="checkbox" id="menu-toggle" className="hidden" />
          <label
            htmlFor="menu-toggle"
            className="block md:hidden cursor-pointer"
          >
            <Icon
              icon="Menu"
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
            />
          </label>
          <div className="md:block hidden" id="header-section">
            {section.map((sec, index) => (
              <div
                key={index}
                className={`${headerSettings.section.className} ${sec.className || ""}`}
              >
                {sec.items.map((item) => (
                  <div
                    key={item.id}
                    className={`${headerSettings.section.itemClassName} ${item.className || ""}`}
                  >
                    {item.icon && <Icon {...item.icon} />}
                    {item.text && <Text {...item.text} />}
                    {item.button && <Button {...item.button} />}
                    {!!item.component && item.component}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Mobile menu, visibile solo se il checkbox è attivo */}
          <div
            className={`block md:!hidden bg-white`}
            id="header-section-mobile"
            style={{
              position: "absolute",
              top: "110%",
              left: 0,
              right: 0,
              zIndex: 50,
            }}
          >
            <div className={classNames}>
              {section.map((sec, index) => (
                <div
                  key={index}
                  className={`${headerSettings.section.className} ${sec.className || ""}`}
                >
                  {sec.items.map((item) => (
                    <div
                      key={item.id}
                      className={`${headerSettings.section.itemClassName} ${item.className || ""}`}
                    >
                      {item.icon && <Icon {...item.icon} />}
                      {item.text && <Text {...item.text} />}
                      {item.button && <Button {...item.button} />}
                      {!!item.component && item.component}
                      {/*item.subItems && item.subItems.length > 0 && (
                    <div className="ml-4">
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.id}
                          className={`${headerSettings.section.subItemClassName} ${subItem.className || ""}`}
                        >
                          {subItem.icon && <Icon {...subItem.icon} />}
                          {subItem.text && <Text {...subItem.text} />}
                          {subItem.button && <Button {...subItem.button} />}
                        </div>
                      ))}
                    </div>
                  )*/}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
};
