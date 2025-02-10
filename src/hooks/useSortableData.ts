import { useMemo, useState } from 'react';

export type SortConfig<T> = {
	comparator: (a: T, b: T) => number;
} | null;

export function useSortableData<T>(data: T[], initalSortConfig: SortConfig<T> = null) {
	const [sortConfig, setSortConfig] = useState<SortConfig<T>>(initalSortConfig);

	const sortedData = useMemo(() => {
		const sortableData = [...data];

		if (sortConfig !== null) {
			sortableData.sort(sortConfig.comparator);
		}
		return sortableData;
	}, [data, sortConfig]);

	return { sortedData, setSortConfig, sortConfig };
}
