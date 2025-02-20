import { type ColumnDef } from './DataTable';

interface DataTableHeaderProps<T> {
	columns: ColumnDef<T>[];
	handleSort: (col: ColumnDef<T>) => () => void;
}

export default function DataTableHeader<T>({ columns, handleSort }: DataTableHeaderProps<T>) {
	return (
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
	);
}
