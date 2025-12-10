import type { ElementBase } from "./field.types";

type Primitive = string | number | bigint | boolean;

type Flex<T extends ElementBase = "string"> = `${T} & {}`;

type EleType<T extends Primitive, TBase extends ElementBase = "string"> = `((${T}) | (${Flex<TBase>}))` | `(${T})`;

type TNameId<TName extends string> = `${TName}_${number}`;

type SegmentDef<T extends Primitive, TName extends string> = `const ${TNameId<TName>} = [${T}, ${T}] as const;`;

type IdElement<TName extends string> = `${TNameId<TName>}[number]`;

type IdType<TName extends string> = `typeof ${IdElement<TName>}`;

type EmptyArrTypeDef<T extends Primitive> = `readonly ${T}[]` | `${T}[]`;

export type { EleType, EmptyArrTypeDef, IdElement, IdType, Primitive, SegmentDef, TNameId };
