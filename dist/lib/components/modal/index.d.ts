import React from 'react';
export interface ModalProps extends React.ComponentProps<'div'> {
    open: boolean;
    title?: string;
    onClose?: () => void;
}
declare let modalSettings: {
    backdrop: string;
    container: string;
    panel: string;
    header: string;
    body: string;
};
export declare const setModalSettings: (settings: Partial<typeof modalSettings>) => void;
export declare const Modal: React.FC<ModalProps>;
export {};
