// type ChunkArrayParams = {};

type ChunkArrayType = <T>(array: T[], chunkSize: number) => ReadonlyArray<ReadonlyArray<T>>;

const chunkArray: ChunkArrayType = (array, chunkSize) => {
	//

	if (chunkSize <= 0) throw new Error("chunkSize must be positive");

	const numChunks = Math.ceil(array.length / chunkSize);

	return Array.from({ length: numChunks }, (_, i) => array.slice(i * chunkSize, (i + 1) * chunkSize));
};

export { chunkArray };
export type { ChunkArrayType };
