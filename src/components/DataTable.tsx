import { type ReactNode, type HTMLAttributes, type ReactElement } from 'react';
import { useSortableData } from '../hooks/useSortableData';
import DataTableBody from './DataTableBody';

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

	return (
		<div>
			<div className='w-full'>
				<table className='min-w-full'>
					<thead className='bg-gray-50 sticky top-0 z-10'>
						<tr>
							{columns.map((col, i) => (
								<th
									key={i}
									className='border-r border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
									onClick={handleSort(col)}
								>
									{col.header}
								</th>
							))}
						</tr>
					</thead>
				</table>
			</div>
			<div className='overflow-x-auto max-h-[45rem]'>
				<table className='min-w-full divide-y divide-gray-200'>
					<DataTableBody data={sortedData} columns={columns} rowProps={rowProps} />
				</table>
			</div>
		</div>
	);
}

export const DataTable = DataTableComponent as <T>(props: DataTableProps<T>) => React.ReactElement;
