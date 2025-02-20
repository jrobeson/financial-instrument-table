interface DataTableFooterProps {
	columnLength: number;
	rowLength: number;
}

export default function DataTableFooter({ columnLength, rowLength }: DataTableFooterProps) {
	return (
		<div className='w-full'>
			<table className='min-w-full'>
				<tfoot className='bg-gray-50'>
					<tr>
						<td colSpan={columnLength} className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
							Total rows: {rowLength}
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
