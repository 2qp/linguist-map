import type { TypeGenConfig } from "@/types/gen-config.types";

type ShouldSplitTypesType = <T>(config: TypeGenConfig, names: T[]) => boolean;

const shouldSplitTypes: ShouldSplitTypesType = (config, names) => {
	return config.splitLargeTypes && names.length >= config.minItemsForSplit;
};

export { shouldSplitTypes };
export type { ShouldSplitTypesType };
