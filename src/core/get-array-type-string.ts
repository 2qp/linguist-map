import type { ArrayTypeDef, Primitive } from "@/types/gen.types";

type GetArrayTypeStringParams<T extends Primitive> = {
	elementType: T;
	readonly: boolean;
};

type GetArrayTypeStringType = <T extends Primitive>(params: GetArrayTypeStringParams<T>) => ArrayTypeDef<T> & {};

const getArrayTypeString: GetArrayTypeStringType = ({ elementType, readonly }) => {
	return readonly ? (`readonly ${elementType}[]` as const) : (`${elementType}[]` as const);
};

export { getArrayTypeString };
export type { GetArrayTypeStringParams, GetArrayTypeStringType };
