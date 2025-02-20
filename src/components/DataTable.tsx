import { ReactNode, useMemo, type HTMLAttributes, type ReactElement } from 'react';
import { useSortableData } from '../hooks/useSortableData';

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

	const handleSort = (col: ColumnDef<T>) => () => {
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
	};

	const rows = useMemo(() => {
		return sortedData.map((row, rowIndex) => {
			const additionalProps = rowProps ? rowProps(row, rowIndex) : {};
			const { className, ...rest } = additionalProps;
			return (
				<tr key={rowIndex} {...rest} className={`hover:bg-gray-100 hover:text-gray-900 ${className || ''}`}>
					{columns.map((col, colIndex) => (
						<td key={colIndex} className='px-6 py-3 whitespace-nowrap text-sm font-medium'>
							{col.Cell ? col.Cell(row) : typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as ReactNode)}
						</td>
					))}
				</tr>
			);
		});
	}, [sortedData, rowProps, columns]);

	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						{columns.map((col, i) => (
							<th
								key={i}
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
								onClick={handleSort(col)}
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>{rows}</tbody>
			</table>
		</div>
	);
}

export const DataTable = DataTableComponent as <T>(props: DataTableProps<T>) => React.ReactElement;
