import { createElementType } from "@core/create-element-type";
import { createSegmentDefs } from "@core/create-segment-defs";
import { createSegmentRefs } from "@core/create-segment-refs";
import { getArrayTypeString } from "@core/get-array-type-string";
import { chunkArray } from "@utils/chunk-array";
import { join } from "@utils/join";
import { replacer } from "@utils/replacer";
import { sortMixed } from "@utils/sort";

import type { GeneratedDefs } from "@/types/def.types";
import type { ElementBase } from "@/types/field.types";
import type { Primitive } from "@/types/gen.types";
import type { TypeGenConfig } from "@/types/gen-config.types";

type GenerateLanguageNameTypeParams<T extends Primitive, TName extends string, TBase extends ElementBase> = {
	languageNames: T[];
	typeName: TName;
	baseType: TBase;
	config: TypeGenConfig;
};

type GenerateLanguageNameTypeType = <T extends Primitive, TName extends string, TBase extends ElementBase>(
	params: GenerateLanguageNameTypeParams<T, TName, TBase>,
) => GeneratedDefs<T, TName, TBase>;

const generateLanguageNameType: GenerateLanguageNameTypeType = ({ languageNames, typeName, config, baseType }) => {
	//

	const sortedNames = sortMixed(languageNames);

	const shouldSplit = config.splitLargeTypes && sortedNames.length >= config.minItemsForSplit;

	if (!shouldSplit) {
		//

		const literals = sortedNames.map((name) => {
			const template = `${name}` as const;

			const escapedQuotes = replacer(template, '"' as const, '\\"' as const);
			const escapedQuotesAndNewlines = replacer(escapedQuotes, "\n" as const, "\\n" as const);

			return `"${escapedQuotesAndNewlines}"` as const;
		});

		const joinedLits = join(literals, " | " as const);

		const typeDef = createElementType({
			combined: joinedLits,
			base: baseType,
			flexible: config.allowFlexibleTypes,
		});

		return {
			typeDef,
			segmentDefs: [],
		};
	}

	const chunks = chunkArray(sortedNames, config.itemsPerSegment);

	const segmentDefs = createSegmentDefs({ chunks, typeName });
	const segmentRefs = createSegmentRefs({ chunks, typeName });

	const combinedType = join(segmentRefs, " | " as const);

	const elementType = createElementType({
		combined: combinedType,
		base: baseType,
		flexible: config.allowFlexibleTypes,
	});

	const typeDef = getArrayTypeString({ elementType, readonly: config.allowFlexibleTypes });

	return {
		typeDef,
		segmentDefs,
	};
};

export { generateLanguageNameType };
export type { GenerateLanguageNameTypeParams, GenerateLanguageNameTypeType };
