import type { ElementBase } from "./field.types";

type Primitive = string | number | bigint | boolean;

type Flex<T extends ElementBase = "string"> = `${T} & {}`;

type EleType<T extends Primitive, TBase extends ElementBase = "string"> = `((${T}) | (${Flex<TBase>}))` | `(${T})`;

export type { EleType, Primitive };
