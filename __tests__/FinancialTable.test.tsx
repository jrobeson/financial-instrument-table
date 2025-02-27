import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FinancialTable, { type FinancialInstrument, AssetClass } from '../src/components/FinancialTable';

describe('FinancialTable', () => {
	const sampleData: FinancialInstrument[] = [
		{ id: 1, ticker: 'ALPHA', price: 3150.67, assetClass: AssetClass.Credit },
		{ id: 2, ticker: 'BETA', price: 3791.37, assetClass: AssetClass.Equities },
		{ id: 3, ticker: 'GAMMA', price: 2299.1, assetClass: AssetClass.Equities },
	];

	it('renders the table with correct number of rows', () => {
		render(<FinancialTable data={sampleData} />);
		expect(screen.getByText('ALPHA')).toBeInTheDocument();
		expect(screen.getByText('BETA')).toBeInTheDocument();
		expect(screen.getByText('GAMMA')).toBeInTheDocument();
	});

	it('renders footer with correct total row count', () => {
		render(<FinancialTable data={sampleData} />);
		expect(screen.getByText(/Total rows: 3/)).toBeInTheDocument();
	});

	it('renders Price cell with correct color formatting', () => {
		render(<FinancialTable data={sampleData} />);
		const alphaPrice = screen.getByText('3150.67');
		expect(alphaPrice).toHaveClass('text-blue-600');
	});
});
