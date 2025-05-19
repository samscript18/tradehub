import { useState } from 'react';

type UseQueryInputType<T extends object = object> = {
	defaultValues?: T;
	onChangeQuery?(query: T): void;
};

type UseQueryReturnType<T extends object = object> = {
	query: T;
	changeQuery(key: keyof T, value: T[keyof T]): void;
	reset(): void;
};

export function useApiQuery<T extends object = object>({
	defaultValues,
	onChangeQuery,
}: UseQueryInputType<T>): UseQueryReturnType<T> {
	const [query, setQuery] = useState<T>(defaultValues || ({} as T));

	const changeQuery = (key: keyof T, value: T[keyof T]) => {
		const newData = { ...query, [key]: value };
		setQuery(newData);
		onChangeQuery?.(newData);
	};

	const reset = () => setQuery(defaultValues || ({} as T));

	return {
		query,
		changeQuery,
		reset,
	};
}
