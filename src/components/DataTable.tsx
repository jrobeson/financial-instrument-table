import { ReactNode, type HTMLAttributes, type ReactElement } from 'react';
import { useSortableData } from '../hooks/useSortableData';

export interface ColumnDef<T> {
	header: string;
	accessor: keyof T | ((row: T) => ReactNode);
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

	function handleSort(col: ColumnDef<T>) {
		console.log(col);
		if (col.comparator) {
			setSortConfig({ comparator: col.comparator });
		} else if (typeof col.accessor === 'string') {
			const key = col.accessor;
			const sampleSortValue = data[0]?.[key];
			if (typeof sampleSortValue === 'number') {
				setSortConfig({ comparator: (a, b) => (a[key] as number) - (b[key] as number) });
			} else {
				setSortConfig({ comparator: (a, b) => String(a[key]).localeCompare(String(b[key])) });
			}
		} else {
			console.warn('Column is not sotrtable');
		}
	}

	return (
		<table className='w-full text-left border-collapse'>
			<thead>
				<tr>
					{columns.map((col, i) => (
						<th key={i} className='text-slate-700 cursor-pointer py-2' onClick={() => handleSort(col)}>
							{col.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{sortedData.map((row, rowIndex) => {
					const additionalProps = rowProps ? rowProps(row, rowIndex) : {};
					return (
						<tr key={rowIndex} {...additionalProps} className='border-slate-400 border border-r-0 border-l-0 '>
							{columns.map((col, colIndex) => (
								<td key={colIndex}>
									{col.Cell ? col.Cell(row) : typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as ReactNode)}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export const DataTable = DataTableComponent as <T>(props: DataTableProps<T>) => React.ReactElement;
