import React from "react";
import { TableOptions, Table as TanStackTable, RowData, ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";
export type TableUIConfigShape = {
    columns: any[];
    rowActions: any[];
    headerActions: any[];
    styles: {
        header: {
            className: string;
            textClassName?: string;
        };
        row: {
            className: string;
        };
        cell: {
            className: string;
        };
        table: {
            className: string;
        };
    };
    pagination: {
        enabled: boolean;
        pageSize: number;
        className: string;
    };
    selection: {
        enabled: boolean;
        multi: boolean;
        className: string;
    };
    emptyMessage: string;
    typography?: any;
    layout?: any;
};
export declare const TABLE_UI_CONFIG: TableUIConfigShape;
export declare function setTableConfig<T = any>(customConfig?: Partial<TableConfig<T>>): {
    columns: any[];
    rowActions: any[];
    headerActions: any[];
    styles: {
        header: {
            className: string;
            textClassName?: string;
        };
        row: {
            className: string;
        };
        cell: {
            className: string;
        };
        table: {
            className: string;
        };
    };
    pagination: {
        enabled: boolean;
        pageSize: number;
        className: string;
    };
    selection: {
        enabled: boolean;
        multi: boolean;
        className: string;
    };
    layout?: any;
    emptyMessage: string;
    typography?: any;
    components?: TableRenderComponents | undefined;
};
export type TableRenderComponents = {
    TableContainer?: React.ComponentType<any>;
    HeaderRow?: React.ComponentType<any>;
    HeaderCell?: React.ComponentType<any>;
    BodyRow?: React.ComponentType<any>;
    BodyCell?: React.ComponentType<any>;
    ActionButton?: React.ComponentType<any>;
    EmptyComponent?: React.ComponentType<any>;
};
export type TableConfig<T = any> = Omit<TableUIConfigShape, 'columns' | 'rowActions' | 'headerActions'> & {
    columns: TableColumn<T>[];
    rowActions?: TableAction<T>[];
    headerActions?: TableAction<T>[];
    components?: TableRenderComponents;
};
export type TableColumn<T = any> = ColumnDef<T> & {
    id: string;
    label: string;
    accessorKey?: string;
    renderCell?: (row: T) => ReactNode;
    width?: number | string;
    align?: "left" | "center" | "right";
};
export type TableAction<T = any> = {
    id: string;
    label: string;
    icon?: string;
    onPress: (row?: T) => void;
    color?: string;
};
export type TableInstanceProps<T extends RowData = any> = Omit<TableConfig<T>, 'columns'> & Omit<TableOptions<T>, 'columns'> & {
    columns: TableColumn<T>[];
};
/**
 * Hook che restituisce direttamente il rendering della tabella,
 * ricevendo tutte le impostazioni e i componenti custom dalla config.
 */
export declare function useTableInstance<T extends RowData = any>(config: TableConfig<T> & TableOptions<T>): {
    Table: JSX.Element;
    instance: TanStackTable<T>;
};
export declare function TableInstance<T extends RowData = any>(props: TableInstanceProps<T>): JSX.Element;
