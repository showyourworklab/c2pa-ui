import { FC } from 'react';
import { Manifest as Manifest$1, ManifestStore } from '@contentauth/c2pa-types';
import { Config, Reader } from '@contentauth/c2pa-web';

declare const C2PA_PHASES = {
	IDLE: 'idle',
	LOADING: 'loading',
	READY: 'ready',
	ERROR: 'error',
} as const
declare const C2PA_STATUSES = {
	VALIDATING: 'validating',
	UNKNOWN: 'unknown',
	TRUSTED: 'trusted',
	VALID: 'valid',
	INVALID: 'invalid',
} as const

type C2paPhase = typeof C2PA_PHASES[keyof typeof C2PA_PHASES]
type C2paStatus = typeof C2PA_STATUSES[keyof typeof C2PA_STATUSES]

type C2paOptions = Partial<Config>

interface C2paProvenance {
	manifestStore: ManifestStore
}

type ManifestId = string

type ManifestTypeKey = 'camera' | 'edit' | 'ai'

interface ManifestType {
	key: ManifestTypeKey
	iptc: ManifestTypeIptc
}

interface ManifestTypeIptc {
	key?: string
	label?: string
	definition?: string
}

type ManifestStatus = C2paStatus

interface ManifestTimestamp {
	date: Date
	offset?: string | null
}

type ManifestProducer = unknown

type ManifestSignator = string | null

interface ManifestGeneratorEntry {
	name?: string | null
	icon?: {
		identifier?: string
		format?: string
	}
}
type ManifestGenerator = ManifestGeneratorEntry[]

type ManifestActions = string[]

type ManifestThumbnail = string | null

interface ManifestLocation {
	lat: number
	lng: number
}

type ManifestVerifyUrl = string

interface Manifest {
	id?: ManifestId
	type: ManifestType | null
	status: ManifestStatus
	timestamp: ManifestTimestamp | null
	producer: ManifestProducer
	signator?: ManifestSignator
	generator: ManifestGenerator
	actions?: ManifestActions
	thumbnail: ManifestThumbnail
	location: ManifestLocation | null
	verifyUrl: ManifestVerifyUrl
	original: Manifest$1
}

interface SywData {
	phase: C2paPhase
	status: C2paStatus
	manifests: Manifest[]
	types: ManifestType[]
	provenance?: C2paProvenance | null
	reader: Reader | null
	error: Error | null
}

//////////////// Variants ///////////////
declare const VARIANT_KEYS = [
	'expand',
	'modal'
] as const

type Variant = typeof VARIANT_KEYS[number]

type UiEventType =
	| 'image.hover'
	| 'image.unhover'
	| 'provenance.open'
	| 'provenance.close'
	| 'explainer.open'
	| 'explainer.close'
	| 'manifest.open'
	| 'manifest.close'
	| 'manifest.thumbnail.open'
	| 'manifest.thumbnail.close'
	| 'manifest.thumbnail.add'
	| 'manifest.thumbnail.remove'

type UiEventHandler = (type: UiEventType | string, event: unknown, ...args: unknown[]) => void

interface SywReactProps {
    locale?: string;
    src: string;
    alt?: string;
    caption?: string;
    byline?: string;
    variant?: Variant | string;
    c2paOptions?: C2paOptions;
    mapOptions?: Record<string, unknown> | null;
    onEvent?: UiEventHandler;
}

declare const SywReact: FC<SywReactProps>;

declare const parseSywData: (src: string, options?: {
    locale?: string;
    c2paOptions?: SywReactProps["c2paOptions"];
}) => Promise<SywData>;

export { SywReact, SywReact as default, parseSywData };
export type { SywReactProps };
