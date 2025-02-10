import React, { useEffect, useState } from 'react';
import FinancialTable, { FinancialInstrument } from './components/FinancialTable';
import { fetchFinancialData } from './api';

const App: React.FC = () => {
	const [data, setData] = useState<FinancialInstrument[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchFinancialData().then((result) => {
			setData(result);
			setLoading(false);
		});
	}, []);

	return (
		<div style={{ padding: '20px' }}>
			<h1>Financial Instruments</h1>
			{loading ? <p>Loading data...</p> : <FinancialTable data={data} />}
		</div>
	);
};

export default App;
