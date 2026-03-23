/* ------------------------------------------------------------------ */
/*  Competitor data loader                                             */
/*  Loads YAML files from data/competitors/ via Vite's import.meta.glob */
/* ------------------------------------------------------------------ */

import metaRaw from "../../../data/competitors/_meta.yaml";
import icpSegmentsRaw from "../../../data/competitors/icp/segments.yaml";
import icpInsightsRaw from "../../../data/competitors/icp/insights.yaml";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type CompetitorCategory = "direct" | "adjacent" | "emerging";
export type SignalType = "product" | "pricing" | "content" | "hiring" | "partnerships" | "funding";
export type ActionTag = "opportunity" | "watch" | "respond";
export type SignalFilter = "all" | SignalType;

export interface Competitor {
    id: string;
    name: string;
    category: CompetitorCategory;
    positioning: string;
    overlapLevel: number;
    color: string;
}

export interface IntelSignal {
    id: string;
    competitorId: string;
    type: SignalType;
    date: string;
    description: string;
    actionTag: ActionTag;
    insight?: string;
}

export interface ICPSegment {
    id: string;
    name: string;
    competitors: string[];
    ourPresence: "yes" | "partial" | "no";
    opportunityNote: string;
}

export interface ICPInsight {
    id: string;
    title: string;
    body: string;
    accentColor: string;
}

export interface CategoryGroup {
    key: CompetitorCategory;
    label: string;
}

export interface SignalTypeEntry {
    key: SignalType;
    label: string;
}

/* ------------------------------------------------------------------ */
/*  Meta                                                               */
/* ------------------------------------------------------------------ */

const meta = metaRaw as {
    colors: Record<string, string>;
    categories: { key: string; label: string }[];
    signal_types: { key: string; label: string }[];
};

export const COLOR_MAP: Record<string, string> = meta.colors;
export const CATEGORY_GROUPS: CategoryGroup[] = meta.categories as CategoryGroup[];
export const SIGNAL_TYPE_ENTRIES: SignalTypeEntry[] = meta.signal_types as SignalTypeEntry[];

export const SIGNAL_TYPE_LABELS: Record<SignalType, string> = Object.fromEntries(
    SIGNAL_TYPE_ENTRIES.map(e => [e.key, e.label])
) as Record<SignalType, string>;

export const FILTER_OPTIONS: { key: SignalFilter; label: string }[] = [
    { key: "all", label: "All" },
    ...SIGNAL_TYPE_ENTRIES.map(e => ({ key: e.key as SignalFilter, label: e.label })),
];

/* ------------------------------------------------------------------ */
/*  Competitor profiles                                                */
/* ------------------------------------------------------------------ */

const profileModules = import.meta.glob<{ default: Record<string, unknown> }>(
    "../../../data/competitors/*/profile.yaml",
    { eager: true },
);

function resolveColor(key: string): string {
    return COLOR_MAP[key] ?? key;
}

export const COMPETITORS: Competitor[] = Object.entries(profileModules).map(
    ([path, mod]) => {
        const raw = mod.default;
        const parts = path.split("/");
        const id = parts[parts.length - 2];
        return {
            id,
            name: raw.name as string,
            category: raw.category as CompetitorCategory,
            positioning: raw.positioning as string,
            overlapLevel: raw.overlap as number,
            color: resolveColor(raw.color as string),
        };
    },
);

/* ------------------------------------------------------------------ */
/*  Signals                                                            */
/* ------------------------------------------------------------------ */

const signalModules = import.meta.glob<{ default: { signals: Record<string, unknown>[] } }>(
    "../../../data/competitors/signals/*.yaml",
    { eager: true },
);

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const SIGNALS: IntelSignal[] = Object.values(signalModules)
    .flatMap(mod => mod.default.signals ?? [])
    .sort((a, b) =>
        new Date(b.date as string).getTime() - new Date(a.date as string).getTime()
    )
    .map((raw, i) => ({
        id: `s${i + 1}`,
        competitorId: raw.competitor as string,
        type: raw.type as SignalType,
        date: formatDate(raw.date as string),
        description: (raw.description as string).trim(),
        actionTag: raw.action as ActionTag,
        insight: raw.insight ? (raw.insight as string).trim() : undefined,
    }));

/* ------------------------------------------------------------------ */
/*  ICP segments & insights                                            */
/* ------------------------------------------------------------------ */

const segRaw = icpSegmentsRaw as { segments: Record<string, unknown>[] };
export const ICP_SEGMENTS: ICPSegment[] = segRaw.segments.map((raw, i) => ({
    id: `seg${i + 1}`,
    name: raw.name as string,
    competitors: raw.competitors as string[],
    ourPresence: raw.our_presence as "yes" | "partial" | "no",
    opportunityNote: (raw.opportunity_note as string).trim(),
}));

const insRaw = icpInsightsRaw as { insights: Record<string, unknown>[] };
export const ICP_INSIGHTS: ICPInsight[] = insRaw.insights.map((raw, i) => ({
    id: `i${i + 1}`,
    title: raw.title as string,
    body: (raw.body as string).trim(),
    accentColor: resolveColor(raw.accent_color as string),
}));

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getCompetitor(id: string): Competitor {
    const found = COMPETITORS.find(c => c.id === id);
    if (!found) throw new Error(`Unknown competitor id: "${id}"`);
    return found;
}
