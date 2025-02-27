import { useMemo, useState } from 'react';

export type SortConfig<T> = {
	sortFn: (a: T, b: T) => number;
	sortKey?: keyof T;
} | null;

export function useSortableData<T>(data: T[], initalSortConfig: SortConfig<T> = null) {
	const [sortConfig, setSortConfig] = useState<SortConfig<T>>(initalSortConfig);
	const sortedData = useMemo(() => {
		const sortableData = [...data];
		if (sortConfig !== null) {
			sortableData.sort(sortConfig.sortFn);
		}
		return sortableData;
	}, [data, sortConfig]);

	return { sortedData, setSortConfig, sortConfig };
}
