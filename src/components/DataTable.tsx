import { type HTMLAttributes, type ReactElement } from 'react';
import { useSortableData } from '../hooks/useSortableData';

export interface ColumnDef<T> {
	header: string;
	accessor: keyof T | ((row: T) => unknown);
	comparator?: (a: T, b: T) => number;
	Cell?: (row: T) => ReactElement;
}

export interface DataTableProps<T> {
	data: T[];
	columns: ColumnDef<T>[];
	rowProps?: (row: T, rowIndex: number) => HTMLAttributes<HTMLTableRowElement>;
}

function DataTableComponent<T>({ data, columns, rowProps }: DataTableProps<T>) {
	const { sortedData, setSortConfig } = useSortableData(data);

	return <>Data Table yall!</>;
}
