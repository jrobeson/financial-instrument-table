import { type ReactNode } from 'react';
import { type DataTableProps as DataTableBodyProps } from './DataTable';

export default function DataTableBody<T>({ data, columns, rowProps }: DataTableBodyProps<T>) {
	if (!data || data.length === 0) {
		return (
			<tbody>
				<tr style={{ height: '100px' }}>
					<td colSpan={columns.length} className='text-center align-middle text-gray-500'>
						{data ? 'No data to show' : 'Loading...'}
					</td>
				</tr>
			</tbody>
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
	return <tbody>{content}</tbody>;
}
