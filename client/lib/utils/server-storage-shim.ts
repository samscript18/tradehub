if (typeof window === "undefined") {
	const createStorageStub = () => {
		const store = new Map<string, string>();

		return {
			get length() {
				return store.size;
			},
			clear() {
				store.clear();
			},
			getItem(key: string) {
				return store.get(String(key)) ?? null;
			},
			key(index: number) {
				return Array.from(store.keys())[index] ?? null;
			},
			removeItem(key: string) {
				store.delete(String(key));
			},
			setItem(key: string, value: string) {
				store.set(String(key), String(value));
			},
		};
	};

	const globalWithStorage = globalThis as typeof globalThis & {
		localStorage?: Storage;
		sessionStorage?: Storage;
	};

	if (typeof globalWithStorage.localStorage?.getItem !== "function") {
		globalWithStorage.localStorage = createStorageStub() as Storage;
	}

	if (typeof globalWithStorage.sessionStorage?.getItem !== "function") {
		globalWithStorage.sessionStorage = createStorageStub() as Storage;
	}
}

export {};
