import type { ElementBase } from "./field.types";

type Primitive = string | number | bigint | boolean;

type Flex<T extends ElementBase = "string"> = `${T} & {}`;

type EleType<T extends Primitive, TBase extends ElementBase = "string"> = `((${T}) | (${Flex<TBase>}))` | `(${T})`;

type TNameId<TName extends string> = `${TName}_${number}`;

type SegmentDef<T extends Primitive, TName extends string> = `const ${TNameId<TName>} = [${T}, ${T}] as const;`;

export type { EleType, Primitive, SegmentDef, TNameId };
