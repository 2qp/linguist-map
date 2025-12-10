import type { Primitive } from "@/types/gen.types";

type StringifyType = <T extends Primitive = string>(value: T) => `${T}`;

const stringify: StringifyType = (value) => {
	return JSON.stringify(value) as `${typeof value}`;
};

export { stringify };
export type { StringifyType };
