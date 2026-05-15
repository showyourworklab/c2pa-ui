interface C2paOptions {
	wasmSrc?: string
	settings?: {
		trust?: {
			trustAnchors?: string | string[]
		}
	}
};

interface ParseSywDataOptions {
	locale?: string
	c2paOptions?: C2paOptions
};

interface ParsedC2paData {
	src: string
	phase: string
	status: string
	manifests: any[]
	types: any[]
	provenance: any
	reader: any
	error: Error | null
};

export function parseSywData(
	src: string,
	options?: ParseSywDataOptions
) : Promise<ParsedC2paData>;