import { type ReactNode, type ReactElement, useCallback } from 'react';
import { useSortableData } from '../hooks/useSortableData';
import DataTableBody from './DataTableBody';
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';
import { type HTMLMotionProps } from 'motion/react';

export interface ColumnDef<T> {
	header: string;
	accessor: keyof T | ((row: T) => ReactNode);
	editable?: boolean;
	validate?: (value: string) => boolean;
	sortFn?: (a: T, b: T) => number;
	Cell?: (row: T) => ReactElement;
	onCellChange?: (row: T, value: string) => void;
}

export interface DataTableProps<T> {
	data: T[];
	columns: ColumnDef<T>[];
	rowProps?: (row: T, rowIndex: number) => HTMLMotionProps<'tr'>;
	onCellChange?: (row: T, key: keyof T, value: string) => void;
}

function DataTableComponent<T>({ data, columns, rowProps, onCellChange }: DataTableProps<T>) {
	const { sortedData, setSortConfig, sortConfig } = useSortableData(data);

	const handleSort = useCallback(
		(col: ColumnDef<T>) => () => {
			if (col.accessor === sortConfig?.sortKey) return;
			if (col.sortFn) {
				setSortConfig({ sortFn: col.sortFn, sortKey: col.accessor as keyof T });
			} else if (typeof col.accessor === 'string') {
				const key = col.accessor;
				const sampleSortValue = data[0]?.[key];
				if (typeof sampleSortValue === 'number') {
					setSortConfig({ sortFn: (a, b) => (a[key] as number) - (b[key] as number), sortKey: key });
				} else {
					setSortConfig({ sortFn: (a, b) => String(a[key]).localeCompare(String(b[key])), sortKey: key });
				}
			} else {
				console.warn('Column is not sortable');
			}
		},
		[data, setSortConfig, sortConfig]
	);

	return (
		<div>
			<DataTableHeader columns={columns} handleSort={handleSort} />
			<DataTableBody data={sortedData} columns={columns} rowProps={rowProps} onCellChange={onCellChange} />
			<DataTableFooter columnLength={columns.length} rowLength={data.length} />
		</div>
	);
}

export const DataTable = DataTableComponent as <T>(props: DataTableProps<T>) => React.ReactElement;
