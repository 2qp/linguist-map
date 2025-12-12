import type { ElementBase } from "@/types/field.types";
import type { EleExpr, Primitive } from "@/types/gen.types";
import type { TypeGenConfig } from "@/types/gen-config.types";

type CreateElementTypeParams<T, TBase extends ElementBase> = {
	combined: T;
	base: TBase;
	config: TypeGenConfig;
};

type CreateElementTypeType = <T extends Primitive, TBase extends ElementBase>(
	params: CreateElementTypeParams<T, TBase>,
) => EleExpr<T, TBase> & {};

const createElementType: CreateElementTypeType = ({ base, combined, config }) => {
	//

	if (config.allowFlexibleTypes) {
		return `((${combined}) | (${base} & {}))` as const;
	}

	return `(${combined})` as const;
};

export { createElementType };
export type { CreateElementTypeParams, CreateElementTypeType };
