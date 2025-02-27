import { useEffect, useState } from 'react';
import { DataTable, type ColumnDef } from './DataTable';
import { type HTMLMotionProps } from 'motion/react';

export enum AssetClass {
	Equities = 'Equities',
	Macro = 'Macro',
	Credit = 'Credit',
}

export type FinancialInstrument = {
	id: string | number;
	ticker: string;
	price: number;
	assetClass: AssetClass;
};

const assetClassOrder: Record<AssetClass, number> = {
	[AssetClass.Equities]: 1,
	[AssetClass.Macro]: 2,
	[AssetClass.Credit]: 3,
};

const columns: ColumnDef<FinancialInstrument>[] = [
	{ header: 'Ticker', accessor: 'ticker', sortFn: (a, b) => a.ticker.localeCompare(b.ticker) },
	{
		header: 'Price',
		accessor: 'price',
		sortFn: (a, b) => b.price - a.price,
		editable: true,
		Cell: (row: FinancialInstrument) => <span className={`${row.price >= 0 ? 'text-blue-600' : 'text-red-600'}`}>{row.price.toFixed(2)}</span>,
	},
	{
		header: 'Asset Class',
		accessor: 'assetClass',
		sortFn: (a, b) => assetClassOrder[a.assetClass] - assetClassOrder[b.assetClass],
	},
];

const rowProps = (row: FinancialInstrument): HTMLMotionProps<'tr'> => {
	let className;
	switch (row.assetClass) {
		case AssetClass.Macro:
			className = 'bg-white';
			break;
		case AssetClass.Equities:
			className = 'bg-sky-400 text-white';
			break;
		case AssetClass.Credit:
			className = 'bg-green-400 text-white';
			break;
		default:
	}
	return { className };
};

export default function FinancialTable({ data }: { data: FinancialInstrument[] }) {
	const [tableData, setTableData] = useState<FinancialInstrument[]>(data);

	useEffect(() => {
		setTableData(data);
	}, [data]);

	const handleCellChange = (row: FinancialInstrument, key: keyof FinancialInstrument, value: string) => {
		console.log('Financial handleCellChange', row, key, value);
		setTableData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [key]: value } : item)));
	};

	return <DataTable data={tableData} columns={columns} onCellChange={handleCellChange} rowProps={rowProps} />;
}
