import { useId } from "react";
import {
    Funnel, EnvelopeOpen, CalendarCheck, Handshake, CurrencyDollar,
    TrendUp, TrendDown, Timer, Lightning, ArrowRight, Buildings,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type DealStage =
    | "identified"
    | "contacted"
    | "replied"
    | "meeting_booked"
    | "opportunity"
    | "negotiation"
    | "closed_won"
    | "closed_lost";

interface FunnelStageData {
    key: DealStage;
    label: string;
    count: number;
    value: number;
    color: string;
}

interface VelocityData {
    from: string;
    to: string;
    avgDays: number;
    color: string;
}

interface ActivityItem {
    id: string;
    company: string;
    fromStage: string;
    toStage: string;
    date: string;
    contactName: string;
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const FUNNEL_STAGES: FunnelStageData[] = [
    { key: "identified", label: "Identified", count: 25, value: 4424000, color: "var(--accent-emerald)" },
    { key: "contacted", label: "Contacted", count: 20, value: 3640000, color: "var(--accent-blue)" },
    { key: "replied", label: "Replied", count: 9, value: 1640000, color: "var(--accent-violet)" },
    { key: "meeting_booked", label: "Meeting", count: 6, value: 1168000, color: "var(--accent-gold)" },
    { key: "opportunity", label: "Opportunity", count: 5, value: 1064000, color: "var(--accent-teal)" },
    { key: "closed_won", label: "Closed-Won", count: 3, value: 656000, color: "var(--accent-coral)" },
];

const STAGE_VELOCITY: VelocityData[] = [
    { from: "Identified", to: "Contacted", avgDays: 2.1, color: "var(--accent-emerald)" },
    { from: "Contacted", to: "Replied", avgDays: 5.8, color: "var(--accent-blue)" },
    { from: "Replied", to: "Meeting", avgDays: 3.2, color: "var(--accent-violet)" },
    { from: "Meeting", to: "Opportunity", avgDays: 8.5, color: "var(--accent-gold)" },
    { from: "Opportunity", to: "Closed-Won", avgDays: 18.4, color: "var(--accent-teal)" },
];

const RECENT_ACTIVITY: ActivityItem[] = [
    { id: "a1", company: "HSBC", fromStage: "Meeting", toStage: "Opportunity", date: "Mar 1", contactName: "Claire Dubois" },
    { id: "a2", company: "Klarna", fromStage: "Replied", toStage: "Meeting", date: "Mar 18", contactName: "Erik Lindgren" },
    { id: "a3", company: "Zurich Insurance", fromStage: "Contacted", toStage: "Replied", date: "Mar 8", contactName: "Hans Mueller" },
    { id: "a4", company: "Cerner", fromStage: "Contacted", toStage: "Replied", date: "Mar 5", contactName: "Robert Walsh" },
    { id: "a5", company: "Stripe", fromStage: "Opportunity", toStage: "Negotiation", date: "Feb 10", contactName: "Maria Santos" },
    { id: "a6", company: "Cigna", fromStage: "Replied", toStage: "Meeting", date: "Mar 20", contactName: "Patricia Nguyen" },
    { id: "a7", company: "Plaid", fromStage: "Contacted", toStage: "Replied", date: "Mar 1", contactName: "Jenny Kim" },
    { id: "a8", company: "Standard Chartered", fromStage: "Replied", toStage: "Meeting", date: "Mar 22", contactName: "Raj Mehta" },
];

const FUNNEL_METRICS = [
    {
        label: "Reply Rate",
        value: "45%",
        change: "+3.2%",
        direction: "up" as const,
        icon: EnvelopeOpen,
        color: "var(--accent-emerald)",
    },
    {
        label: "Meeting Rate",
        value: "30%",
        change: "-1.1%",
        direction: "down" as const,
        icon: CalendarCheck,
        color: "var(--accent-blue)",
    },
    {
        label: "Meetings This Week",
        value: "4",
        change: "+2",
        direction: "up" as const,
        icon: Handshake,
        color: "var(--accent-gold)",
    },
    {
        label: "Avg Deal Size",
        value: "$128K",
        change: "+8.4%",
        direction: "up" as const,
        icon: CurrencyDollar,
        color: "var(--accent-violet)",
    },
];

/* ------------------------------------------------------------------ */
/*  Stage color helpers                                                */
/* ------------------------------------------------------------------ */

const STAGE_COLOR_MAP: Record<string, string> = {
    Identified: "var(--accent-emerald)",
    Contacted: "var(--accent-blue)",
    Replied: "var(--accent-violet)",
    Meeting: "var(--accent-gold)",
    Opportunity: "var(--accent-teal)",
    Negotiation: "var(--accent-coral)",
    "Closed-Won": "var(--accent-emerald)",
};

function stageColor(stage: string): string {
    return STAGE_COLOR_MAP[stage] ?? "var(--text-muted)";
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FunnelMetricsStrip() {
    return (
        <div className="funnel-metrics-strip">
            {FUNNEL_METRICS.map((m, i) => {
                const Icon = m.icon;
                return (
                    <div
                        className="funnel-metric-card"
                        key={m.label}
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        <div className="funnel-metric-label">
                            <Icon size={12} weight="bold" style={{ color: m.color }} />
                            {m.label}
                        </div>
                        <div className="funnel-metric-value">{m.value}</div>
                        <div className={`funnel-metric-change ${m.direction}`}>
                            {m.direction === "up" ? (
                                <TrendUp size={11} weight="bold" />
                            ) : (
                                <TrendDown size={11} weight="bold" />
                            )}
                            {m.change} vs last month
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function FunnelWaterfall() {
    const id = useId();
    const maxCount = FUNNEL_STAGES[0].count;
    const barH = 32;
    const gap = 14;
    const padLeft = 100;
    const padRight = 80;
    const barAreaW = 420;
    const totalW = padLeft + barAreaW + padRight;
    const totalH = FUNNEL_STAGES.length * (barH + gap) - gap + 20;

    return (
        <div className="panel" style={{ animationDelay: "0.1s" }}>
            <div className="panel-header">
                <div className="panel-label" style={{ padding: "12px 18px 0" }}>
                    <Funnel size={14} weight="bold" />
                    Outbound conversion waterfall
                </div>
                <span className="panel-badge badge-blue">{maxCount} total</span>
            </div>
            <div className="panel-body" style={{ padding: "16px 18px 18px", overflow: "visible" }}>
                <svg
                    width="100%"
                    height={totalH}
                    viewBox={`0 0 ${totalW} ${totalH}`}
                    style={{ display: "block" }}
                >
                    {/* Gradient definitions */}
                    <defs>
                        {FUNNEL_STAGES.map((stage, i) => (
                            <linearGradient key={stage.key} id={`bar-${id}-${i}`} x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor={stage.color} stopOpacity="0.9" />
                                <stop offset="100%" stopColor={stage.color} stopOpacity="0.5" />
                            </linearGradient>
                        ))}
                    </defs>

                    {FUNNEL_STAGES.map((stage, i) => {
                        const y = i * (barH + gap);
                        const barW = (stage.count / maxCount) * barAreaW;
                        const conversionRate =
                            i < FUNNEL_STAGES.length - 1
                                ? ((FUNNEL_STAGES[i + 1].count / stage.count) * 100).toFixed(0)
                                : null;
                        const gradId = `bar-${id}-${i}`;

                        return (
                            <g key={stage.key}>
                                {/* Stage label */}
                                <text
                                    x={padLeft - 10}
                                    y={y + barH / 2 + 1}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fill="var(--text-secondary)"
                                    fontSize="12"
                                    fontFamily="var(--font-mono)"
                                    fontWeight="500"
                                >
                                    {stage.label}
                                </text>

                                {/* Bar track */}
                                <rect
                                    x={padLeft}
                                    y={y}
                                    width={barAreaW}
                                    height={barH}
                                    rx={6}
                                    fill="var(--bg-elevated)"
                                />

                                {/* Bar fill */}
                                <rect
                                    x={padLeft}
                                    y={y}
                                    width={barW}
                                    height={barH}
                                    rx={6}
                                    fill={`url(#${gradId})`}
                                />

                                {/* Count inside bar */}
                                <text
                                    x={padLeft + Math.max(barW - 10, 30)}
                                    y={y + barH / 2 + 1}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fill="var(--text-primary)"
                                    fontSize="12"
                                    fontFamily="var(--font-mono)"
                                    fontWeight="700"
                                >
                                    {stage.count}
                                </text>

                                {/* Conversion arrow & rate */}
                                {conversionRate && (
                                    <>
                                        <text
                                            x={padLeft + barAreaW + 14}
                                            y={y + barH / 2 + gap / 2 + 1}
                                            textAnchor="start"
                                            dominantBaseline="middle"
                                            fill="var(--text-muted)"
                                            fontSize="11"
                                            fontFamily="var(--font-mono)"
                                        >
                                            {conversionRate}%
                                        </text>
                                        {/* Connector line */}
                                        <line
                                            x1={padLeft + barAreaW + 8}
                                            y1={y + barH}
                                            x2={padLeft + barAreaW + 8}
                                            y2={y + barH + gap}
                                            stroke="var(--border-bright)"
                                            strokeWidth="1"
                                            strokeDasharray="2,2"
                                        />
                                    </>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

function StageVelocity() {
    const maxDays = Math.max(...STAGE_VELOCITY.map((v) => v.avgDays));

    return (
        <div className="panel" style={{ animationDelay: "0.2s" }}>
            <div className="panel-header">
                <div className="panel-label" style={{ padding: "12px 18px 0" }}>
                    <Timer size={14} weight="bold" />
                    Stage velocity
                </div>
                <span className="panel-badge badge-gold">avg days</span>
            </div>
            <div className="panel-body" style={{ padding: "12px 18px 18px" }}>
                <div className="velocity-list">
                    {STAGE_VELOCITY.map((v, i) => (
                        <div className="velocity-row" key={i} style={{ animationDelay: `${0.25 + i * 0.04}s` }}>
                            <div className="velocity-label">
                                {v.from} <ArrowRight size={10} weight="bold" style={{ opacity: 0.4 }} /> {v.to}
                            </div>
                            <div className="velocity-bar-track">
                                <div
                                    className="velocity-bar-fill"
                                    style={{
                                        width: `${(v.avgDays / maxDays) * 100}%`,
                                        background: v.color,
                                    }}
                                />
                            </div>
                            <div className="velocity-days">{v.avgDays}d</div>
                        </div>
                    ))}
                </div>

                <div className="velocity-total">
                    <span className="velocity-total-label">Full cycle avg</span>
                    <span className="velocity-total-value">
                        {STAGE_VELOCITY.reduce((s, v) => s + v.avgDays, 0).toFixed(0)} days
                    </span>
                </div>
            </div>
        </div>
    );
}

function RecentActivityFeed() {
    return (
        <div className="panel" style={{ animationDelay: "0.25s" }}>
            <div className="panel-header">
                <div className="panel-label" style={{ padding: "12px 18px 0" }}>
                    <Lightning size={14} weight="bold" />
                    Recent activity
                </div>
                <span className="panel-badge badge-green">{RECENT_ACTIVITY.length} events</span>
            </div>
            <div className="panel-body" style={{ padding: "8px 18px 14px" }}>
                <div className="activity-feed">
                    {RECENT_ACTIVITY.map((a, i) => (
                        <div
                            className="activity-item"
                            key={a.id}
                            style={{ animationDelay: `${0.3 + i * 0.03}s` }}
                        >
                            <div className="activity-dot" style={{ background: stageColor(a.toStage) }} />
                            <div className="activity-content">
                                <div className="activity-company">
                                    <Buildings size={11} weight="bold" style={{ opacity: 0.5 }} />
                                    {a.company}
                                </div>
                                <div className="activity-transition">
                                    <span className="activity-stage" style={{ color: stageColor(a.fromStage) }}>
                                        {a.fromStage}
                                    </span>
                                    <ArrowRight size={9} weight="bold" style={{ opacity: 0.3 }} />
                                    <span className="activity-stage" style={{ color: stageColor(a.toStage) }}>
                                        {a.toStage}
                                    </span>
                                    <span className="activity-contact">{a.contactName}</span>
                                </div>
                            </div>
                            <div className="activity-date">{a.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function OutboundFunnelPage() {
    return (
        <div className="outbound-page">
            <FunnelMetricsStrip />

            <div className="outbound-grid">
                <FunnelWaterfall />
                <div className="outbound-side">
                    <StageVelocity />
                    <RecentActivityFeed />
                </div>
            </div>
        </div>
    );
}
