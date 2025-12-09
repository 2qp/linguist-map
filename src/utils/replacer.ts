import type { Primitive } from "@/types/gen.types";

type ReplacerType = <T extends Primitive>(value: T, searchValue: string | RegExp, replaceValue: string) => `${T}`;

const replacer: ReplacerType = (value, searchValue, replaceValue) => {
	return String(value).replaceAll(searchValue, replaceValue) as unknown as `${typeof value}`;
};

export { replacer };
export type { ReplacerType };
