import { defineConfig } from "tsup";

const config = defineConfig({
	entry: ["src/index.ts"],
	clean: true,
	format: ["cjs", "esm"],
	dts: true,
});

export default config;
