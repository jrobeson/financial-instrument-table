import { type HTMLAttributes } from 'react';
import { DataTable, type ColumnDef } from './DataTable';

export enum AssetClass {
	Equities = 'Equities',
	Macro = 'Macro',
	Credit = 'Credit',
}

export type FinancialInstrument = {
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
	{ header: 'Ticker', accessor: 'ticker', comparator: (a, b) => a.ticker.localeCompare(b.ticker) },
	{
		header: 'Price',
		accessor: 'price',
		comparator: (a, b) => b.price - a.price,
		Cell: (row: FinancialInstrument) => <span className={`${row.price >= 0 ? 'text-blue-600' : 'text-red-600'}`}>{row.price.toFixed(2)}</span>,
	},
	{
		header: 'Asset Class',
		accessor: 'assetClass',
		comparator: (a, b) => assetClassOrder[a.assetClass] - assetClassOrder[b.assetClass],
	},
];

const rowProps = (row: FinancialInstrument): HTMLAttributes<HTMLTableRowElement> => {
	let backgroundColor;
	let color;
	switch (row.assetClass) {
		case AssetClass.Macro:
			backgroundColor = 'white';
			color = 'black';
			break;
		case AssetClass.Equities:
			backgroundColor = 'blue';
			color = 'white';
			break;
		case AssetClass.Credit:
			backgroundColor = 'green';
			break;
		default:
			backgroundColor = 'white';
	}
	return { style: { backgroundColor, color } };
};

export default function FinancialTable({ data }: { data: FinancialInstrument[] }) {
	return <DataTable data={data} columns={columns} rowProps={rowProps} />;
}
