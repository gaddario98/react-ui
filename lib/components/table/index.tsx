import React, { useMemo, useCallback } from "react";
import {
  useReactTable,
  TableOptions,
  Table as TanStackTable,
  RowData,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { layout, typography } from "../../styles";
import { BaseComponentProps, useComponentStyles, useColorHelpers, ComponentVariant } from "../../styles/theme";
import { useComposeClassNames } from "../../hooks";

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
  variant?: ComponentVariant;
};

export const TABLE_UI_CONFIG: TableUIConfigShape = {
  columns: [],
  rowActions: [],
  headerActions: [],
  styles: {
    header: {
      className: "border-b",
      textClassName: `${typography.text.sectionSubtitle} font-semibold`,  
    },
    row: {
      className: "border-b transition-all",
    },
    cell: {
      className: `py-2 px-4 ${typography.text.paragraph}`,
    },
    table: {
      className: "w-full rounded-lg overflow-hidden",
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
    className: "w-4 h-4",
  },
  emptyMessage: "Nessun dato disponibile",
  variant: "primary",
};// Funzione per estendere/sovrascrivere la configurazione di default
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
  Omit<TableOptions<T>, 'columns'> & 
  BaseComponentProps & {
    columns: TableColumn<T>[];
  };

/**
 * Hook che restituisce direttamente il rendering della tabella,
 * ricevendo tutte le impostazioni e i componenti custom dalla config.
 */
export function useTableInstance<T extends RowData = any>(
  config: TableConfig<T> & TableOptions<T> & BaseComponentProps
): { Table: JSX.Element; instance: TanStackTable<T>; componentProps: { variant: ComponentVariant; disabled: boolean } } {
  const variant = useMemo(() => config.variant || 'primary', [config.variant]);
  const disabled = useMemo(() => config.disabled || false, [config.disabled]);
  const styles = useComponentStyles({ variant, disabled, className: config.className });
  const { getText, getBg } = useColorHelpers();
  
  // Memo per le opzioni della tabella per evitare ricreare oggetti ad ogni render
  const tableOptions = useMemo(() => ({
    ...config,
    columns: config.columns,
  }), [config]);
  
  const instance = useReactTable<T>(tableOptions);

  // Recupera i componenti custom o fallback
  const components = useMemo(
    () => config.components || {},
    [config.components]
  );
  
  // Hook personalizzato per generare classi memo-izzate
  const useTableClassNames = () => {
    const tableClassName = useComposeClassNames({
      baseClasses: `${config.styles?.table?.className} shadow-md`,
      additionalClasses: ''
    });
    
    const headerRowClassName = useComposeClassNames({
      baseClasses: `${config?.styles?.header?.className} ${styles.ui.surface} ${styles.ui.border}`,
      additionalClasses: ''
    });
    
    const headerCellClassName = useComposeClassNames({
      baseClasses: `${config.styles?.header?.textClassName} ${styles.colors.text} p-4`,
      additionalClasses: ''
    });
    
    const bodyRowClassName = useComposeClassNames({
      baseClasses: `${config.styles?.row?.className} ${styles.ui.surface} hover:bg-gray-50 dark:hover:bg-gray-800 ${styles.ui.border}`,
      additionalClasses: disabled ? 'opacity-60 cursor-not-allowed' : ''
    });
    
    const bodyCellClassName = useComposeClassNames({
      baseClasses: `${config.styles?.cell?.className} ${styles.colors.text}`,
      additionalClasses: disabled ? 'opacity-60' : ''
    });
    
    const actionButtonClassName = useComposeClassNames({
      baseClasses: `px-3 py-1.5 rounded-md ${getText(variant)} ${styles.interactive.hover}`,
      additionalClasses: disabled ? 'opacity-60 cursor-not-allowed' : ''
    });
    
    const emptyMessageClassName = useComposeClassNames({
      baseClasses: `p-4 text-center text-gray-500 ${typography.text.paragraph}`,
      additionalClasses: ''
    });
    
    return {
      tableClassName,
      headerRowClassName,
      headerCellClassName,
      bodyRowClassName,
      bodyCellClassName,
      actionButtonClassName,
      emptyMessageClassName
    };
  };
  
  // Utilizziamo il hook per ottenere tutte le classi
  const classNames = useTableClassNames();
  
  // Componente ottimizzato con useCallback
  const TableContainer = useCallback(
    ({ children }: any) => 
      components.TableContainer ? 
        <components.TableContainer>{children}</components.TableContainer> : 
        <div className={classNames.tableClassName}>{children}</div>,
    [components.TableContainer, classNames.tableClassName]
  );
  // Ottimizziamo i componenti con useCallback
  const HeaderRow = useCallback(
    ({ children }: any) => 
      components.HeaderRow ? 
        <components.HeaderRow>{children}</components.HeaderRow> : 
        <div className={classNames.headerRowClassName}>{children}</div>,
    [components.HeaderRow, classNames.headerRowClassName]
  );
  
  const HeaderCell = useCallback(
    ({ children }: any) => 
      components.HeaderCell ? 
        <components.HeaderCell>{children}</components.HeaderCell> : 
        <div className={classNames.headerCellClassName}>{children}</div>,
    [components.HeaderCell, classNames.headerCellClassName]
  );
  
  const BodyRow = useCallback(
    ({ children }: any) => 
      components.BodyRow ? 
        <components.BodyRow>{children}</components.BodyRow> : 
        <div className={classNames.bodyRowClassName}>{children}</div>,
    [components.BodyRow, classNames.bodyRowClassName]
  );
  
  const BodyCell = useCallback(
    ({ children }: any) => 
      components.BodyCell ? 
        <components.BodyCell>{children}</components.BodyCell> : 
        <div className={classNames.bodyCellClassName}>{children}</div>,
    [components.BodyCell, classNames.bodyCellClassName]
  );
  // Gesture handlers ottimizzati
  const handleActionClick = useCallback((action: any, row?: any) => {
    return () => action?.onPress?.(row?.original);
  }, []);
  
  const ActionButton = useCallback(
    ({ action, row }: any) => {
      if (components.ActionButton) {
        return <components.ActionButton action={action} row={row} variant={variant} disabled={disabled} />;
      }
      return (
        <button 
          onClick={handleActionClick(action, row)}
          className={classNames.actionButtonClassName}
          disabled={disabled}
        >
          {action.label}
        </button>
      );
    },
    [components.ActionButton, classNames.actionButtonClassName, handleActionClick, variant, disabled]
  );
  
  const EmptyComponent = useCallback(() => {
    if (components.EmptyComponent) {
      return <components.EmptyComponent />;
    }
    return (
      <div className={classNames.emptyMessageClassName}>
        {config.emptyMessage || "Nessun dato disponibile"}
      </div>
    );
  }, [components.EmptyComponent, classNames.emptyMessageClassName, config.emptyMessage]);
  // Deriviamo i dati della tabella in modo ottimizzato
  const headerGroups = useMemo(() => instance.getHeaderGroups(), [instance]);
  const rows = useMemo(() => instance.getRowModel().rows, [instance]);
  
  // Funzioni di rendering ottimizzate
  const renderHeaderCell = useCallback((header: any) => {
    return header.isPlaceholder ? null : (header.column.columnDef as any).label;
  }, []);
  
  const renderCellContent = useCallback((cell: any, row: any) => {
    return (cell.column.columnDef as any).renderCell
      ? (cell.column.columnDef as any).renderCell(row.original)
      : flexRender(cell.column.columnDef.cell, cell.getContext());
  }, []);
  
  const renderHeaderActions = useCallback(() => {
    return (config.headerActions as TableAction<T>[] | undefined)?.map(
      (action) => <ActionButton key={action.id} action={action} />
    );
  }, [config.headerActions, ActionButton]);
  
  const renderRowActions = useCallback((row: any) => {
    return (config.rowActions as TableAction<T>[] | undefined)?.map(
      (action) => (
        <ActionButton key={action.id} action={action} row={row} />
      )
    );
  }, [config.rowActions, ActionButton]);

  // Componente tabella con performance ottimizzata
  const Table = useMemo(() => {
    const tableContent = rows.length === 0 ? (
      <EmptyComponent />
    ) : (
      <>
        {/* Header */}
        {headerGroups.map((headerGroup) => (
          <HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <HeaderCell key={header.id}>
                {renderHeaderCell(header)}
              </HeaderCell>
            ))}
            {renderHeaderActions()}
          </HeaderRow>
        ))}
        
        {/* Body */}
        {rows.map((row) => (
          <BodyRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <BodyCell key={cell.id}>
                {renderCellContent(cell, row)}
              </BodyCell>
            ))}
            {renderRowActions(row)}
          </BodyRow>
        ))}
      </>
    );
    
    return <TableContainer>{tableContent}</TableContainer>;
  }, [
    rows,
    headerGroups,
    TableContainer,
    HeaderRow,
    HeaderCell,
    BodyRow,
    BodyCell,
    EmptyComponent,
    renderHeaderCell,
    renderCellContent,
    renderHeaderActions,
    renderRowActions
  ]);

  // Passa lo stato disabled anche ai componenti custom
  const componentProps = { variant, disabled };

  return { Table, instance, componentProps };
}

// Componente funzionale ottimizzato con memo
const TableInstanceComponent = <T extends RowData = any>(props: TableInstanceProps<T>) => {
  // Passiamo le proprietà BaseComponentProps
  const { variant = 'primary', disabled = false, className, ...tableProps } = props;
  const { Table } = useTableInstance<T>({...tableProps, variant, disabled, className });
  return Table;
};

// Esporta il componente memoizzato per evitare rendering non necessari
export const TableInstance = React.memo(TableInstanceComponent) as typeof TableInstanceComponent;

// Alias principale per una migliore API
export const Table = TableInstance;
