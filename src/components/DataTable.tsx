import { type ReactNode, type HTMLAttributes, type ReactElement, useCallback } from 'react';
import { useSortableData } from '../hooks/useSortableData';
import DataTableBody from './DataTableBody';
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';

export interface ColumnDef<T> {
	header: string;
	accessor: keyof T | ((row: T) => ReactNode);
	sortFn?: (a: T, b: T) => number;
	Cell?: (row: T) => ReactElement;
}

export interface DataTableProps<T> {
	data: T[];
	columns: ColumnDef<T>[];
	rowProps?: (row: T, rowIndex: number) => HTMLAttributes<HTMLTableRowElement>;
}

function DataTableComponent<T>({ data, columns, rowProps }: DataTableProps<T>) {
	const { sortedData, setSortConfig } = useSortableData(data);

	const handleSort = useCallback(
		(col: ColumnDef<T>) => () => {
			if (col.sortFn) {
				setSortConfig({ sortFn: col.sortFn });
			} else if (typeof col.accessor === 'string') {
				const key = col.accessor;
				const sampleSortValue = data[0]?.[key];
				if (typeof sampleSortValue === 'number') {
					setSortConfig({ sortFn: (a, b) => (a[key] as number) - (b[key] as number) });
				} else {
					setSortConfig({ sortFn: (a, b) => String(a[key]).localeCompare(String(b[key])) });
				}
			} else {
				console.warn('Column is not sortable');
			}
		},
		[data, setSortConfig]
	);

	return (
		<div>
			<DataTableHeader columns={columns} handleSort={handleSort} />
			<DataTableBody data={sortedData} columns={columns} rowProps={rowProps} />
			<DataTableFooter columnLength={columns.length} rowLength={data.length} />
		</div>
	);
}

export const DataTable = DataTableComponent as <T>(props: DataTableProps<T>) => React.ReactElement;
