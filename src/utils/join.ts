type JoinType = <T extends readonly string[], TSep extends string>(arr: T, sep: TSep) => JoinRelaxed<T, TSep>;

const join: JoinType = (arr, sep) => arr.join(sep) as JoinRelaxed<typeof arr, typeof sep>;

type JoinRelaxed<T extends readonly string[], TSep extends string, Result extends string = ""> = T extends readonly []
	? Result
	: T extends readonly [infer First extends string, ...infer Rest extends readonly string[]]
		? JoinRelaxed<Rest, TSep, `${Result}${Result extends "" ? "" : TSep}${First}`>
		: T extends ReadonlyArray<infer Element extends string>
			? `${Element}${TSep}${Element}`
			: string;

export { join };
export type { JoinType };
