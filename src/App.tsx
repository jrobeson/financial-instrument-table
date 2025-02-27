import React, { useEffect, useState } from 'react';
import FinancialTable, { type FinancialInstrument } from './components/FinancialTable';
import { fetchFinancialData } from './api';

const App: React.FC = () => {
	const [data, setData] = useState<FinancialInstrument[]>([]);

	useEffect(() => {
		fetchFinancialData().then((result) => {
			setData(result);
		});
	}, []);

	return (
		<div className='p-6'>
			<FinancialTable data={data} />
		</div>
	);
};

export default App;
