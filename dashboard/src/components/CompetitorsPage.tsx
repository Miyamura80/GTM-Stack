import { useState } from "react";
import type { ReactNode } from "react";
import {
    Binoculars, Eye, Target, Lightbulb, CaretRight,
    Code, CurrencyDollar, Article, UserPlus, Handshake,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CompetitorCategory = "direct" | "adjacent" | "emerging";
type SignalType = "product" | "pricing" | "content" | "hiring" | "partnerships";
type ActionTag = "opportunity" | "watch" | "respond";
type SignalFilter = "all" | SignalType;

interface Competitor {
    id: string;
    name: string;
    category: CompetitorCategory;
    positioning: string;
    overlapLevel: number;
    color: string;
}

interface IntelSignal {
    id: string;
    competitorId: string;
    type: SignalType;
    date: string;
    description: string;
    actionTag: ActionTag;
    insight?: string;
}

interface ICPSegment {
    id: string;
    name: string;
    competitors: string[];
    ourPresence: "yes" | "partial" | "no";
    opportunityNote: string;
}

interface ICPInsight {
    id: string;
    title: string;
    body: string;
    accentColor: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const COMPETITORS: Competitor[] = [
    { id: "nightfall", name: "Nightfall AI", category: "direct", positioning: "AI-native DLP for SaaS and cloud apps", overlapLevel: 5, color: "var(--accent-coral)" },
    { id: "polymer", name: "Polymer DLP", category: "direct", positioning: "Data governance and redaction for cloud collaboration", overlapLevel: 4, color: "var(--accent-gold)" },
    { id: "cyberhaven", name: "Cyberhaven", category: "direct", positioning: "Data lineage-based insider threat and DLP", overlapLevel: 5, color: "var(--accent-blue)" },
    { id: "metomic", name: "Metomic", category: "direct", positioning: "Automated sensitive data discovery for SaaS", overlapLevel: 3, color: "var(--accent-violet)" },
    { id: "varonis", name: "Varonis", category: "adjacent", positioning: "Data security and analytics for on-prem and cloud", overlapLevel: 3, color: "var(--accent-emerald)" },
    { id: "forcepoint", name: "Forcepoint", category: "adjacent", positioning: "Human-centric cybersecurity with legacy DLP", overlapLevel: 2, color: "var(--accent-blue)" },
    { id: "digital-guardian", name: "Digital Guardian", category: "adjacent", positioning: "Enterprise endpoint and network DLP", overlapLevel: 2, color: "var(--accent-gold)" },
    { id: "netskope", name: "Netskope", category: "adjacent", positioning: "SSE platform with inline cloud DLP", overlapLevel: 3, color: "var(--accent-coral)" },
    { id: "strac", name: "Strac", category: "emerging", positioning: "API-first DLP for developers and compliance", overlapLevel: 4, color: "var(--accent-emerald)" },
    { id: "sentra", name: "Sentra", category: "emerging", positioning: "Cloud-native data security posture management", overlapLevel: 3, color: "var(--accent-violet)" },
    { id: "flow-security", name: "Flow Security", category: "emerging", positioning: "Data-flow runtime security for cloud pipelines", overlapLevel: 2, color: "var(--accent-blue)" },
];

const SIGNALS: IntelSignal[] = [
    { id: "s1", competitorId: "nightfall", type: "product", date: "Mar 19, 2026", description: "Launched browser extension for real-time DLP scanning across all SaaS apps with on-device ML classification.", actionTag: "opportunity", insight: "We could differentiate with deeper API integrations vs. browser-layer approach." },
    { id: "s2", competitorId: "cyberhaven", type: "pricing", date: "Mar 17, 2026", description: "Raised $88M Series C at $450M valuation. Expanding enterprise sales team aggressively.", actionTag: "watch", insight: "Expect increased presence at RSA and more aggressive enterprise outbound." },
    { id: "s3", competitorId: "polymer", type: "product", date: "Mar 14, 2026", description: "Added Slack integration for auto-redaction of sensitive data in real time with admin override workflows.", actionTag: "respond", insight: "Our Slack coverage is partial - prioritize parity here." },
    { id: "s4", competitorId: "varonis", type: "product", date: "Mar 12, 2026", description: "Released AI-powered data classification engine that claims 95% accuracy on unstructured data.", actionTag: "watch" },
    { id: "s5", competitorId: "metomic", type: "content", date: "Mar 10, 2026", description: "Published comprehensive CISO guide to SaaS data security, gaining significant LinkedIn traction.", actionTag: "opportunity", insight: "Content gap - we should produce competing thought leadership for our ICP." },
    { id: "s6", competitorId: "netskope", type: "hiring", date: "Mar 8, 2026", description: "Hiring 15 ML engineers for DLP team, signaling major investment in AI-driven classification.", actionTag: "watch" },
    { id: "s7", competitorId: "strac", type: "partnerships", date: "Mar 5, 2026", description: "Announced SOC 2 compliance partnership with Vanta, offering bundled compliance-plus-DLP packages.", actionTag: "opportunity", insight: "Compliance bundling is a strong GTM motion for mid-market - explore similar partnerships." },
    { id: "s8", competitorId: "sentra", type: "product", date: "Mar 3, 2026", description: "Launched data security posture dashboard with risk scoring across AWS, GCP, and Azure.", actionTag: "watch", insight: "Multi-cloud posture visibility is becoming table stakes." },
    { id: "s9", competitorId: "forcepoint", type: "pricing", date: "Feb 28, 2026", description: "Introduced usage-based pricing tier targeting mid-market, undercutting traditional per-seat model.", actionTag: "respond", insight: "Legacy vendors moving downstream with flexible pricing - watch for deal pressure." },
    { id: "s10", competitorId: "nightfall", type: "content", date: "Feb 25, 2026", description: "Launched developer documentation hub and open-source SDK for custom DLP policy creation.", actionTag: "opportunity", insight: "Developer experience as a moat - our API docs could use a similar refresh." },
];

const ICP_SEGMENTS: ICPSegment[] = [
    { id: "seg1", name: "Mid-market SaaS (200-1000 emp)", competitors: ["nightfall", "polymer", "strac"], ourPresence: "yes", opportunityNote: "Core segment - differentiate on deployment speed and agentic automation" },
    { id: "seg2", name: "Enterprise financial services", competitors: ["cyberhaven", "varonis", "forcepoint"], ourPresence: "partial", opportunityNote: "Expand compliance storytelling; competitor activity signals strong demand" },
    { id: "seg3", name: "Healthcare / HIPAA compliance", competitors: ["metomic", "digital-guardian"], ourPresence: "partial", opportunityNote: "Underserved by AI-native solutions - high opportunity for us" },
    { id: "seg4", name: "Remote-first tech companies", competitors: ["nightfall", "polymer", "strac", "sentra"], ourPresence: "yes", opportunityNote: "Crowded segment - compete on developer experience and API-first approach" },
    { id: "seg5", name: "Regulated industries (gov)", competitors: ["forcepoint", "digital-guardian", "varonis"], ourPresence: "no", opportunityNote: "High barrier to entry but Forcepoint aging - consider as long-term play" },
];

const ICP_INSIGHTS: ICPInsight[] = [
    { id: "i1", title: "Developer-led buying is rising", body: "Mid-market SaaS companies increasingly let engineering teams evaluate and select security tools. Bottom-up adoption through free tiers and API-first DX is becoming the dominant GTM motion.", accentColor: "var(--accent-emerald)" },
    { id: "i2", title: "Compliance alone doesn't win deals", body: "Competitors leading with pure compliance messaging are losing to those showing productivity value. CISOs want to see how DLP reduces friction, not just checks boxes.", accentColor: "var(--accent-gold)" },
    { id: "i3", title: "Adjacent players moving downstream", body: "Enterprise vendors like Varonis and Forcepoint are introducing mid-market pricing. Expect increased competition in our core segment within 6-12 months.", accentColor: "var(--accent-coral)" },
    { id: "i4", title: "HIPAA is an underserved niche", body: "Only 2 competitors actively target healthcare. AI-native DLP with HIPAA-specific policies and audit trails could capture this segment with relatively low competition.", accentColor: "var(--accent-blue)" },
];

const SIGNAL_TYPE_LABELS: Record<SignalType, string> = {
    product: "Product",
    pricing: "Pricing",
    content: "Content",
    hiring: "Hiring",
    partnerships: "Partnerships",
};

const FILTER_OPTIONS: { key: SignalFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "product", label: "Product" },
    { key: "pricing", label: "Pricing" },
    { key: "content", label: "Content" },
    { key: "hiring", label: "Hiring" },
    { key: "partnerships", label: "Partners" },
];

const CATEGORY_GROUPS: { key: CompetitorCategory; label: string }[] = [
    { key: "direct", label: "Direct" },
    { key: "adjacent", label: "Adjacent" },
    { key: "emerging", label: "Emerging" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCompetitor(id: string): Competitor {
    const found = COMPETITORS.find(c => c.id === id);
    if (!found) throw new Error(`Unknown competitor id: "${id}"`);
    return found;
}

const TYPE_ICONS: Record<SignalType, ReactNode> = {
    product: <Code size={10} weight="bold" />,
    pricing: <CurrencyDollar size={10} weight="bold" />,
    content: <Article size={10} weight="bold" />,
    hiring: <UserPlus size={10} weight="bold" />,
    partnerships: <Handshake size={10} weight="bold" />,
};

function actionTagClass(tag: ActionTag): string {
    switch (tag) {
        case "opportunity": return "badge-green";
        case "watch": return "badge-gold";
        case "respond": return "badge-coral";
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

    return (
        <div className="signal-card">
            <div className="signal-card-header">
                <div className="signal-competitor">
                    <div
                        className="competitor-avatar"
                        style={{ background: comp.color, color: "#08080a", width: 22, height: 22, fontSize: 10, borderRadius: 4 }}
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
                    <div className="signals-grid">
                        {filteredSignals.map(signal => (
                            <SignalCard key={signal.id} signal={signal} />
                        ))}
                    </div>
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
