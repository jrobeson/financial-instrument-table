import { type ColumnDef } from './DataTable';

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
	{ header: 'Asset Class', accessor: 'assetClass', comparator: (a, b) => (assetClassOrder[a.assetClass] = assetClassOrder[b.assetClass]) },
];

export default function FInancialTable() {
	return <div>FinancialTable</div>;
}
