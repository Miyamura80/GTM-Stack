import { useState } from "react";
import type { ReactNode } from "react";
import {
    Binoculars, Eye, Target, Lightbulb, CaretRight,
    Code, CurrencyDollar, Article, UserPlus, Handshake, ChartLineUp,
} from "@phosphor-icons/react";
import {
    COMPETITORS, SIGNALS, ICP_SEGMENTS, ICP_INSIGHTS,
    CATEGORY_GROUPS, FILTER_OPTIONS, SIGNAL_TYPE_LABELS,
    getCompetitor,
} from "../data/competitors";
import type {
    Competitor, IntelSignal, SignalType, ActionTag, SignalFilter,
} from "../data/competitors";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TYPE_ICONS: Record<SignalType, ReactNode> = {
    product: <Code size={10} weight="bold" />,
    pricing: <CurrencyDollar size={10} weight="bold" />,
    content: <Article size={10} weight="bold" />,
    hiring: <UserPlus size={10} weight="bold" />,
    partnerships: <Handshake size={10} weight="bold" />,
    funding: <ChartLineUp size={10} weight="bold" />,
};

function actionTagClass(tag: ActionTag): string {
    switch (tag) {
        case "opportunity": return "badge-green";
        case "watch": return "badge-gold";
        case "respond": return "badge-coral";
        default: { const _exhaustive: never = tag; throw new Error(`Unknown action tag: ${_exhaustive}`); }
    }
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CompetitorChip({ competitor }: { competitor: Competitor }) {
    return (
        <div className="competitor-chip">
            <div
                className="competitor-avatar"
                style={{ background: competitor.color, color: "#08080a" }}
            >
                {competitor.name[0]}
            </div>
            <div className="competitor-chip-info">
                <div className="competitor-chip-name">{competitor.name}</div>
                <div className="competitor-chip-pos">{competitor.positioning}</div>
            </div>
            <div className="overlap-dots">
                {Array.from({ length: 5 }, (_, i) => (
                    <div
                        key={i}
                        className={`overlap-dot${i < competitor.overlapLevel ? " filled" : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}

function CompetitorStrip() {
    return (
        <div className="panel competitors-strip" style={{ animationDelay: "0.05s" }}>
            <div className="panel-header">
                <div className="panel-label">
                    <Eye size={14} weight="bold" />
                    Competitive Landscape
                </div>
                <span className="panel-badge badge-coral">
                    {COMPETITORS.length} tracked
                </span>
            </div>
            <div className="panel-body">
                {CATEGORY_GROUPS.map(cat => (
                    <div key={cat.key} className="competitor-category-group">
                        <div className="competitor-category-label">{cat.label}</div>
                        <div className="competitor-row">
                            {COMPETITORS
                                .filter(c => c.category === cat.key)
                                .map(comp => <CompetitorChip key={comp.id} competitor={comp} />)
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SignalFilters({ active, onChange }: { active: SignalFilter; onChange: (f: SignalFilter) => void }) {
    return (
        <div className="signal-filters">
            {FILTER_OPTIONS.map(opt => (
                <button
                    key={opt.key}
                    className={`signal-filter-btn${active === opt.key ? " active" : ""}`}
                    onClick={() => onChange(opt.key)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

function SignalCard({ signal }: { signal: IntelSignal }) {
    const comp = getCompetitor(signal.competitorId);
    if (!comp) return null;

    return (
        <div className="signal-card">
            <div className="signal-card-header">
                <div className="signal-competitor">
                    <div
                        className="competitor-avatar competitor-avatar--sm"
                        style={{ background: comp.color, color: "#08080a" }}
                    >
                        {comp.name[0]}
                    </div>
                    <span className="signal-competitor-name">{comp.name}</span>
                </div>
                <span className="signal-date">{signal.date}</span>
            </div>
            <div className="signal-meta">
                <span className={`signal-type-badge signal-type-${signal.type}`}>
                    {TYPE_ICONS[signal.type]} {SIGNAL_TYPE_LABELS[signal.type]}
                </span>
            </div>
            <div className="signal-description">{signal.description}</div>
            <div className="signal-footer">
                <span className={`signal-action-tag ${actionTagClass(signal.actionTag)}`}>
                    {signal.actionTag}
                </span>
            </div>
            {signal.insight && (
                <div className="signal-insight">
                    <CaretRight size={12} weight="bold" />
                    <span>{signal.insight}</span>
                </div>
            )}
        </div>
    );
}

function ICPOverlapSection() {
    return (
        <div className="icp-overlap-section">
            <div className="icp-segments-list">
                {ICP_SEGMENTS.map(seg => (
                    <div key={seg.id} className="icp-segment-row">
                        <div className="icp-segment-name">{seg.name}</div>
                        <div className="icp-segment-competitors">
                            {seg.competitors.map(cId => {
                                const c = getCompetitor(cId);
                                if (!c) return null;
                                return (
                                    <div
                                        key={cId}
                                        className="icp-competitor-dot"
                                        style={{ background: c.color, color: "#08080a" }}
                                        title={c.name}
                                    >
                                        {c.name[0]}
                                    </div>
                                );
                            })}
                        </div>
                        <span className={`icp-presence icp-presence-${seg.ourPresence}`}>
                            {seg.ourPresence === "yes" ? "Active" : seg.ourPresence === "partial" ? "Partial" : "Not yet"}
                        </span>
                        <div className="icp-opportunity-note">{seg.opportunityNote}</div>
                    </div>
                ))}
            </div>

            <div className="icp-insights-header">
                <Lightbulb size={14} weight="bold" />
                Key Insights
            </div>
            <div className="icp-insights-grid">
                {ICP_INSIGHTS.map(ins => (
                    <div
                        key={ins.id}
                        className="icp-insight-card"
                        style={{ borderLeftColor: ins.accentColor }}
                    >
                        <div className="icp-insight-title">
                            <Lightbulb size={14} weight="bold" />
                            {ins.title}
                        </div>
                        <div className="icp-insight-body">{ins.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function CompetitorsPage() {
    const [signalFilter, setSignalFilter] = useState<SignalFilter>("all");

    const filteredSignals = signalFilter === "all"
        ? SIGNALS
        : SIGNALS.filter(s => s.type === signalFilter);

    return (
        <div className="competitors-page">
            <CompetitorStrip />

            <div className="panel" style={{ animationDelay: "0.1s" }}>
                <div className="panel-header">
                    <div className="panel-label">
                        <Binoculars size={14} weight="bold" />
                        Intelligence Signals
                    </div>
                    <span className="panel-badge badge-blue">
                        {filteredSignals.length} signals
                    </span>
                </div>
                <div className="panel-body">
                    <SignalFilters active={signalFilter} onChange={setSignalFilter} />
                    {filteredSignals.length === 0 ? (
                        <div className="signals-empty">No signals match this filter.</div>
                    ) : (
                        <div className="signals-grid">
                            {filteredSignals.map(signal => (
                                <SignalCard key={signal.id} signal={signal} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="panel" style={{ animationDelay: "0.2s" }}>
                <div className="panel-header">
                    <div className="panel-label">
                        <Target size={14} weight="bold" />
                        ICP Overlap & Insights
                    </div>
                    <span className="panel-badge badge-gold">
                        {ICP_SEGMENTS.length} segments
                    </span>
                </div>
                <div className="panel-body">
                    <ICPOverlapSection />
                </div>
            </div>
        </div>
    );
}
