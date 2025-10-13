import React, { useMemo } from "react";
import {
  useReactTable,
  TableOptions,
  Table as TanStackTable,
  RowData,
  ColumnDef,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

// Tipo base per la shape della configurazione UI
export type TableUIConfigShape = {
  columns: any[];
  rowActions: any[];
  headerActions: any[];
  styles: {
    header: { className: string; textClassName?: string };
    row: { className: string };
    cell: { className: string };
    table: { className: string };
  };
  pagination: { enabled: boolean; pageSize: number; className: string };
  selection: { enabled: boolean; multi: boolean; className: string };
  emptyMessage: string;
  typography?: any;
  layout?: any;
};

export const TABLE_UI_CONFIG: TableUIConfigShape = {
  columns: [],
  rowActions: [],
  headerActions: [],
  styles: {
    header: {
      className: "bg-white border-b border-gray-200 ",
      textClassName: "!text-xl font-semibold text-gray-900",  
    },
    row: {
      className:
        "bg-white hover:bg-gray-50 border-b border-gray-100 transition-all",
    },
    cell: {
      className: "py-2 px-4 text-base text-gray-800",
    },
    table: {
      className: "w-full rounded-lg overflow-hidden shadow-md",
    },
  },
  pagination: {
    enabled: true,
    pageSize: 10,
    className: "flex justify-end items-center gap-2 py-2",
  },
  selection: {
    enabled: false,
    multi: false,
    className: "w-4 h-4 text-primary",
  },
  emptyMessage: "Nessun dato disponibile",
};

// Funzione per estendere/sovrascrivere la configurazione di default
export function setTableConfig<T = any>(
  customConfig: Partial<TableConfig<T>> = {}
) {
  return {
    ...TABLE_UI_CONFIG,
    ...customConfig,
    columns: customConfig.columns || TABLE_UI_CONFIG.columns,
    rowActions: customConfig.rowActions || TABLE_UI_CONFIG.rowActions,
    headerActions: customConfig.headerActions || TABLE_UI_CONFIG.headerActions,
    styles: {
      ...TABLE_UI_CONFIG.styles,
      ...(customConfig.styles || {}),
    },
    pagination: {
      ...TABLE_UI_CONFIG.pagination,
      ...(customConfig.pagination || {}),
    },
    selection: {
      ...TABLE_UI_CONFIG.selection,
      ...(customConfig.selection || {}),
    },
  };
}

// Componenti custom per il rendering (agnostici)
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
  // Componenti custom per il rendering
  components?: TableRenderComponents;
  // ...altre proprietà custom
};

// Tipi base per la configurazione (estensibili)
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

// Props per il componente TableInstance: unione manuale dei tipi senza duplicare 'columns'
export type TableInstanceProps<T extends RowData = any> = Omit<TableConfig<T>, 'columns'> &
  Omit<TableOptions<T>, 'columns'> & {
    columns: TableColumn<T>[];
  };

/**
 * Hook che restituisce direttamente il rendering della tabella,
 * ricevendo tutte le impostazioni e i componenti custom dalla config.
 */
export function useTableInstance<T extends RowData = any>(
  config: TableConfig<T> & TableOptions<T>
): { Table: JSX.Element; instance: TanStackTable<T> } {
  const instance = useReactTable<T>({
    ...config,
    columns: config.columns,
  });

  // Recupera i componenti custom o fallback
  const components = useMemo(
    () => config.components || {},
    [config.components]
  );
  const TableContainer = useMemo(
    () =>
      components.TableContainer ||
      (({ children }: any) => (
        <div className={config.styles?.table?.className}>{children}</div>
      )),
    [components.TableContainer, config?.styles?.table?.className]
  );
  const HeaderRow = useMemo(
    () =>
      components.HeaderRow ||
      (({ children }: any) => (
        <div className={config?.styles?.header?.className}>{children}</div>
      )),
    [components.HeaderRow, config?.styles?.header?.className]
  );
  const HeaderCell = useMemo(
    () =>
      components.HeaderCell ||
      (({ children }: any) => (
        <div className={config.styles?.header?.textClassName}>{children}</div>
      )),
    [components.HeaderCell, config.styles?.header?.textClassName]
  );
  const BodyRow = useMemo(
    () =>
      components.BodyRow ||
      (({ children }: any) => (
        <div className={config.styles?.row?.className}>{children}</div>
      )),
    [components.BodyRow, config.styles?.row?.className]
  );
  const BodyCell = useMemo(
    () =>
      components.BodyCell ||
      (({ children }: any) => (
        <div className={config.styles?.cell?.className}>{children}</div>
      )),
    [components.BodyCell, config.styles?.cell?.className]
  );
  const ActionButton = useMemo(
    () =>
      components.ActionButton ||
      (({ action, row }: any) => (
        <button onClick={() => action?.onPress?.(row?.original)}>
          {action.label}
        </button>
      )),
    [components.ActionButton]
  );
  const EmptyComponent = useMemo(
    () => components.EmptyComponent || (() => <div>Nessun dato</div>),
    [components.EmptyComponent]
  );
  const headerGroups = useMemo(() => instance.getHeaderGroups(), [instance]);
  const rows = useMemo(() => instance.getRowModel().rows, [instance]);

  // Componente tabella pronto al render
  const Table = useMemo(
    () => (
      <TableContainer>
        {/* Header */}
        {headerGroups.map((headerGroup) => (
          <HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <HeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : (header.column.columnDef as any).label}
              </HeaderCell>
            ))}
            {/* Azioni globali */}
            {(config.headerActions as TableAction<T>[] | undefined)?.map(
              (action) => <ActionButton key={action.id} action={action} />
            )}
          </HeaderRow>
        ))}
        {/* Body */}
        {rows.length === 0 ? (
          <EmptyComponent />
        ) : (
          rows.map((row) => (
            <BodyRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <BodyCell key={cell.id}>
                  {(cell.column.columnDef as any).renderCell
                    ? (cell.column.columnDef as any).renderCell(row.original)
                    : cell.getValue()}
                </BodyCell>
              ))}
              {/* Azioni per riga */}
              {(config.rowActions as TableAction<T>[] | undefined)?.map(
                (action) => (
                  <ActionButton key={action.id} action={action} row={row} />
                )
              )}
            </BodyRow>
          ))
        )}
      </TableContainer>
    ),
    [
      config.headerActions,
      config.rowActions,
      TableContainer,
      HeaderRow,
      HeaderCell,
      BodyRow,
      BodyCell,
      ActionButton,
      EmptyComponent,
    ]
  );

  return { Table, instance };
}

export function TableInstance<T extends RowData = any>(props: TableInstanceProps<T>) {
  const { Table } = useTableInstance<T>(props);
  return Table;
}
