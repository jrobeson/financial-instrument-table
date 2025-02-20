import { type ReactNode } from 'react';
import { type DataTableProps as DataTableBodyProps } from './DataTable';

export default function DataTableBody<T>({ data, columns, rowProps }: DataTableBodyProps<T>) {
	if (!data || data.length === 0) {
		return (
			<div className='overflow-x-auto max-h-[45rem]'>
				<table className='min-w-full divide-y divide-gray-200'>
					<tbody>
						<tr className='h-24'>
							<td colSpan={columns.length} className='text-center align-middle text-gray-500'>
								{data ? 'No data to show' : 'Loading...'}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
	const content = data.map((row, rowIndex) => {
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
	return (
		<div className='overflow-x-auto max-h-[45rem]'>
			<table className='min-w-full divide-y divide-gray-200'>
				<tbody className='bg-white divide-y divide-gray-200'>{content}</tbody>
			</table>
		</div>
	);
}
