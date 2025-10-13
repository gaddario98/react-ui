"use client";
import React from 'react';
import { useComposeClassNames } from '../../hooks';
import { Text } from '../../components/text';
import { Icon } from '../../components/icon';

export interface ModalProps extends React.ComponentProps<'div'> {
  open: boolean;
  title?: string;
  onClose?: () => void;
}

let modalSettings = {
  backdrop: 'fixed inset-0 bg-black/50',
  container: 'fixed inset-0 z-50 flex items-center justify-center p-4',
  panel: 'w-full max-w-lg rounded-lg border bg-white/90 dark:bg-gray-900/90 backdrop-blur',
  header: 'flex items-center justify-between p-4 border-b',
  body: 'p-4',
};

export const setModalSettings = (settings: Partial<typeof modalSettings>) => {
  modalSettings = { ...modalSettings, ...settings };
};

export const Modal: React.FC<ModalProps> = ({ open, title, onClose, children, className, ...props }) => {
  if (!open) return null;

  const panelClasses = useComposeClassNames({
    baseClasses: modalSettings.panel,
    additionalClasses: className,
  });

  return (
    <div className={modalSettings.container} {...props}>
      <div className={modalSettings.backdrop} onClick={onClose} />
      <div className={panelClasses} onClick={(e) => e.stopPropagation()}>
        {(title || onClose) && (
          <div className={modalSettings.header}>
            {title && <Text text={title} tag="h3" />}
            {onClose && (
              <button onClick={onClose} aria-label="Close">
                <Icon icon="X" />
              </button>
            )}
          </div>
        )}
        <div className={modalSettings.body}>{children}</div>
      </div>
    </div>
  );
};
