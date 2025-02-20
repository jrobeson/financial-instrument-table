import { FinancialInstrument, AssetClass } from './components/FinancialTable';
import sampleData from './data/sampleData.json';

export const fetchFinancialData = (): Promise<FinancialInstrument[]> => {
	const data: FinancialInstrument[] = sampleData.map((item) => ({
		...item,
		assetClass: item.assetClass as AssetClass,
	}));

	return new Promise((resolve) => {
		setTimeout(() => resolve(data), 500);
	});
};
