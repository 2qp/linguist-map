import type { ElementBase } from "@/types/field.types";
import type { EleType, Primitive } from "@/types/gen.types";

type CreateElementTypeParams<T, TBase extends ElementBase> = {
	combined: T;
	base: TBase;
	flexible: boolean;
};

type CreateElementTypeType = <T extends Primitive, TBase extends ElementBase>(
	params: CreateElementTypeParams<T, TBase>,
) => EleType<T, TBase> & {};

const createElementType: CreateElementTypeType = ({ base, combined, flexible }) => {
	//

	if (flexible) {
		return `((${combined}) | (${base} & {}))` as const;
	}

	return `(${combined})` as const;
};

export { createElementType };
export type { CreateElementTypeParams, CreateElementTypeType };
