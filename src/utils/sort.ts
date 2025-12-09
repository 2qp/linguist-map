import type { Primitive } from "@/types/gen.types";

type ComparePrimitivesType = (a: Primitive, b: Primitive) => number;

const comparePrimitives: ComparePrimitivesType = (a, b) => {
	//
	if (typeof a === "string" && typeof b === "string") {
		return a.localeCompare(b);
	}

	if (typeof a === "number" && typeof b === "number") {
		return a - b;
	}

	if (typeof a === "bigint" && typeof b === "bigint") {
		return a < b ? -1 : a > b ? 1 : 0;
	}

	if (typeof a === "boolean" && typeof b === "boolean") {
		return Number(a) - Number(b);
	}

	return String(a).localeCompare(String(b));
};

type SortMixedType = <T extends Primitive>(values: T[]) => T[];

const sortMixed: SortMixedType = (values) => {
	return values.sort(comparePrimitives);
};

export { comparePrimitives, sortMixed };
export type { ComparePrimitivesType, SortMixedType };
