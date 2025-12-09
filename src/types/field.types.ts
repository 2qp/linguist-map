type FieldAnalysis = {
	isOptional: boolean;
	isArray: boolean;
	isBoolean: boolean;
	isNumber: boolean;
	isString: boolean;
	uniqueValues: Set<unknown>;
	totalOccurrences: number;
	languagesUsing: number;
	itemType?: "string" | "number" | "boolean" | "mixed";
	shouldBeLiteral: boolean;
	shouldBeLiteralArray: boolean;
	sampleValues: unknown[];
};

type FieldAnalysisMap = Map<string, FieldAnalysis>;

type ElementType = FieldAnalysis["itemType"];
type ElementBase = Exclude<ElementType, "mixed" | undefined>;

export type { FieldAnalysis, FieldAnalysisMap, ElementType, ElementBase };
