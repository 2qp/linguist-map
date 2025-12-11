import type { ElementBase } from "./field.types";
import type { ArrayTypeDef, EleExpr, Flex, IdType, Primitive, SegmentDef } from "./gen.types";

type TypeDefUnion<T extends Primitive> = `"${T}" | "${T}"`;

type InLineExpr<T extends Primitive, TBase extends ElementBase> = EleExpr<TypeDefUnion<T>, TBase>;

type InLineListExpr<T extends Primitive, TBase extends ElementBase> = ArrayTypeDef<EleExpr<TypeDefUnion<T>, TBase>>;

type SplitTypeDef<TName extends string, TBase extends ElementBase = "string"> = Readonly<
	`((${IdType<TName>} | ${IdType<TName>}) | (${Flex<TBase>}))[]` | `(${IdType<TName>} | ${IdType<TName>})[]`
>;

type SplitReadonlyTypeDef<TName extends string, TBase extends ElementBase = "string"> = Readonly<
	| `readonly ((${IdType<TName>} | ${IdType<TName>}) | (${Flex<TBase>}))[]`
	| `readonly (${IdType<TName>} | ${IdType<TName>})[]`
>;

type TypeDef<TName extends string, T extends Primitive, TBase extends ElementBase> =
	| ((SplitTypeDef<TName, TBase> & {}) | (SplitReadonlyTypeDef<TName, TBase> & {}))
	| (ArrayTypeDef<TBase> & {})
	| (InLineExpr<T, TBase> & {})
	| (InLineListExpr<T, TBase> & {});

type GeneratedDefs<T extends Primitive, TName extends string, TBase extends ElementBase = ElementBase> = {
	typeDef: TypeDef<TName, T, TBase> & {};
	// woah w/o Prettify :0

	segmentDefs: ReadonlyArray<SegmentDef<T, TName>> | never[];
};

export type { GeneratedDefs };
