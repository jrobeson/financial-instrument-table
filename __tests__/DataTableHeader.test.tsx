import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTableHeader from '../src/components/DataTableHeader';
import { type ColumnDef } from '../src/components/DataTable';

describe('DataTableHeader', () => {
	const columns: ColumnDef<{ name: string; age: string }>[] = [
		{ header: 'Name', accessor: 'name' },
		{ header: 'Age', accessor: 'age' },
	];
	it('renders header cells and calls sort handler on click', () => {
		const sortHandler = vi.fn(() => vi.fn());
		render(<DataTableHeader columns={columns} handleSort={sortHandler} />);
		const nameHeader = screen.getByText('Name');
		const ageHeader = screen.getByText('Age');
		expect(nameHeader).toBeInTheDocument();
		expect(ageHeader).toBeInTheDocument();
		fireEvent.click(nameHeader);
		expect(sortHandler).toHaveBeenCalledTimes(2);
	});
});
