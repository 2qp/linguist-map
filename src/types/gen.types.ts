import type { ElementBase } from "./field.types";

type Primitive = string | number | bigint | boolean;

type Flex<T extends ElementBase = "string"> = `${T} & {}`;

type EleExpr<T extends Primitive, TBase extends ElementBase = "string"> = `((${T}) | (${Flex<TBase>}))` | `(${T})`;

type EleListExpr<T extends Primitive, TBase extends ElementBase> = ArrayTypeDef<EleExpr<T, TBase>>;

type Parenthesize<T extends string> = `(${T})`;

type SelfPair<T extends ElementBase = ElementBase> = {
	[K in T]: `${Parenthesize<K>} | ${Parenthesize<Flex<K>>}`;
}[T] & {};

type TEleExpr<T extends ElementBase = ElementBase> = `${Parenthesize<SelfPair<T> & {}>}` | `${Parenthesize<T>}`;

type TEleListExpr<T extends ElementBase = ElementBase> = ArrayTypeDef<TEleExpr<T>>;

type TNameId<TName extends string> = `${TName}_${number}`;

type SegmentDef<T extends Primitive, TName extends string> = `const ${TNameId<TName>} = [${T}, ${T}] as const;`;

type IdElement<TName extends string> = `${TNameId<TName>}[number]`;

type IdType<TName extends string> = `typeof ${IdElement<TName>}`;

type ListExpr<T extends Primitive> = `${T}[]`;

type ReadonlyExpr<T extends Primitive> = `readonly ${T}`;

type ReadonlyListExpr<T extends Primitive> = `${ListExpr<ReadonlyExpr<T>>}`;

type ArrayTypeDef<T extends Primitive> = `${ReadonlyListExpr<T>}` | `${ListExpr<T>}`;

export type {
	ArrayTypeDef,
	EleExpr,
	EleListExpr,
	Flex,
	IdElement,
	IdType,
	Parenthesize,
	Primitive,
	SegmentDef,
	SelfPair,
	TEleExpr,
	TEleListExpr,
	TNameId,
};
