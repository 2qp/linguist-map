import { join } from "@utils/join";
import { stringify } from "@utils/stringify";

import type { Primitive, SegmentDef } from "@/types/gen.types";

type CreateSegmentDefsParams<T extends Primitive, TName extends string> = {
	typeName: TName;
	chunks: ReadonlyArray<ReadonlyArray<T>>;
};

type CreateSegmentDefsType = <T extends Primitive, TName extends string>(
	params: CreateSegmentDefsParams<T, TName>,
) => ReadonlyArray<SegmentDef<T, TName>>;

const createSegmentDefs: CreateSegmentDefsType = ({ chunks, typeName }) => {
	//

	const segmentDefs = chunks.map((chunk, index) => {
		const segmentName = `${typeName}_${index + 1}` as const;

		const stringified = chunk.map((value) => stringify(value));

		const constArray = join(stringified, ", " as const);

		const template = `const ${segmentName} = [${constArray}] as const;` as const;

		return template;
	});

	return segmentDefs;
};

export { createSegmentDefs };
export type { CreateSegmentDefsParams, CreateSegmentDefsType };
