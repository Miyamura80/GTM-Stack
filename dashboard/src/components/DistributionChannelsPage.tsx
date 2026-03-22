import { useState, useId } from "react";
import {
    MagnifyingGlass, Newspaper, VideoCamera, Users,
    Microphone, TrendUp, Siren, Gift, IdentificationBadge,
    Cookie, Funnel, Lightning, CalendarBlank, Handshake,
    GridFour, ListBullets,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

type ChannelCategory = "top-funnel" | "seasonal" | "mid-funnel" | "partnerships";
type ChannelStatus = "active" | "planned" | "opportunistic";

interface Channel {
    id: string;
    name: string;
    category: ChannelCategory;
    icon: Icon;
    effort: number;
    cost: number;
    timeToROI: string;
    pipelineROI: number;
    status: ChannelStatus;
    urgency: number;    // 1-5
    importance: number; // 1-5
    description: string;
}

const CHANNELS: Channel[] = [
    {
        id: "seo",
        name: "SEO & Content",
        category: "top-funnel",
        icon: MagnifyingGlass,
        effort: 4,
        cost: 1,
        timeToROI: "6-12mo",
        pipelineROI: 72,
        status: "active",
        urgency: 3,
        importance: 5,
        description: "Long-form technical content targeting CISO pain points and compliance keywords.",
    },
    {
        id: "newsletter",
        name: "Newsletter Ads",
        category: "top-funnel",
        icon: Newspaper,
        effort: 2,
        cost: 2,
        timeToROI: "1-3mo",
        pipelineROI: 45,
        status: "active",
        urgency: 4,
        importance: 3,
        description: "Sponsored placements in cybersecurity newsletters (tl;dr sec, SANS, etc.).",
    },
    {
        id: "ai-video",
        name: "AI-Generated Videos",
        category: "top-funnel",
        icon: VideoCamera,
        effort: 3,
        cost: 1,
        timeToROI: "3-6mo",
        pipelineROI: 38,
        status: "planned",
        urgency: 2,
        importance: 3,
        description: "Short explainer and demo videos generated with AI for LinkedIn and YouTube.",
    },
    {
        id: "conferences",
        name: "Conferences & Events",
        category: "top-funnel",
        icon: Users,
        effort: 5,
        cost: 3,
        timeToROI: "3-6mo",
        pipelineROI: 85,
        status: "active",
        urgency: 4,
        importance: 5,
        description: "RSA, Black Hat, BSides - booth presence, speaking slots, and after-parties.",
    },
    {
        id: "podcasts",
        name: "Podcast Appearances",
        category: "top-funnel",
        icon: Microphone,
        effort: 3,
        cost: 1,
        timeToROI: "3-6mo",
        pipelineROI: 55,
        status: "active",
        urgency: 2,
        importance: 4,
        description: "Guest spots on security podcasts (Darknet Diaries, CISO Series, etc.).",
    },
    {
        id: "social-trends",
        name: "Social Media Trends",
        category: "seasonal",
        icon: TrendUp,
        effort: 2,
        cost: 1,
        timeToROI: "1-3mo",
        pipelineROI: 30,
        status: "opportunistic",
        urgency: 5,
        importance: 2,
        description: "Rapid content riding viral security trends on LinkedIn and X.",
    },
    {
        id: "breaking-news",
        name: "Breaking News Response",
        category: "seasonal",
        icon: Siren,
        effort: 1,
        cost: 1,
        timeToROI: "1-3mo",
        pipelineROI: 60,
        status: "opportunistic",
        urgency: 5,
        importance: 4,
        description: "Fast thought-leadership posts after major breaches or enterprise incidents.",
    },
    {
        id: "giveaways",
        name: "Weekend Giveaways",
        category: "seasonal",
        icon: Gift,
        effort: 2,
        cost: 2,
        timeToROI: "1-3mo",
        pipelineROI: 25,
        status: "planned",
        urgency: 3,
        importance: 1,
        description: "Swag and license giveaways timed around holidays or awareness months.",
    },
    {
        id: "employee-ads",
        name: "Employee Advocacy Ads",
        category: "mid-funnel",
        icon: IdentificationBadge,
        effort: 3,
        cost: 2,
        timeToROI: "3-6mo",
        pipelineROI: 65,
        status: "active",
        urgency: 3,
        importance: 4,
        description: "Targeted ads served to every employee at prospect accounts via LinkedIn.",
    },
    {
        id: "branded-cookies",
        name: "Branded Cookies",
        category: "mid-funnel",
        icon: Cookie,
        effort: 2,
        cost: 3,
        timeToROI: "1-3mo",
        pipelineROI: 40,
        status: "planned",
        urgency: 2,
        importance: 2,
        description: "Physical branded cookie boxes sent to champion contacts during deal cycles.",
    },
    {
        id: "mssp-partners",
        name: "MSSP Partnerships",
        category: "partnerships",
        icon: Handshake,
        effort: 4,
        cost: 2,
        timeToROI: "6-12mo",
        pipelineROI: 78,
        status: "active",
        urgency: 3,
        importance: 5,
        description: "Co-sell and referral deals with managed security service providers.",
    },
    {
        id: "tech-integrations",
        name: "Tech Integrations",
        category: "partnerships",
        icon: Handshake,
        effort: 4,
        cost: 1,
        timeToROI: "3-6mo",
        pipelineROI: 62,
        status: "active",
        urgency: 4,
        importance: 5,
        description: "Native integrations with SIEM/SOAR vendors driving marketplace-sourced pipeline.",
    },
    {
        id: "channel-resellers",
        name: "Channel Resellers",
        category: "partnerships",
        icon: Handshake,
        effort: 3,
        cost: 2,
        timeToROI: "6-12mo",
        pipelineROI: 50,
        status: "planned",
        urgency: 2,
        importance: 4,
        description: "VAR and distributor relationships for enterprise procurement motions.",
    },
];

const CATEGORIES: { key: ChannelCategory; label: string; icon: Icon }[] = [
    { key: "top-funnel", label: "Top of Funnel (Ongoing)", icon: Funnel },
    { key: "seasonal", label: "One-off / Seasonal Opportunities", icon: Lightning },
    { key: "mid-funnel", label: "Middle of Funnel", icon: CalendarBlank },
    { key: "partnerships", label: "Partnerships", icon: Handshake },
];

const CATEGORY_COLORS: Record<ChannelCategory, string> = {
    "top-funnel": "var(--accent-emerald)",
    "seasonal": "var(--accent-gold)",
    "mid-funnel": "var(--accent-blue)",
    "partnerships": "var(--accent-violet)",
};

type ViewMode = "channels" | "matrix";

/* ── Effort vs ROI scatter chart ── */

function QuadrantChart() {
    const id = useId();
    const w = 600;
    const h = 220;
    const pad = { top: 30, right: 30, bottom: 35, left: 50 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    const midX = pad.left + cw / 2;
    const midY = pad.top + ch / 2;

    return (
        <div className="panel channels-summary">
            <div className="panel-header">
                <div className="panel-label">
                    <TrendUp size={14} weight="bold" />
                    Effort vs Pipeline ROI
                </div>
                <span className="panel-badge badge-green">{CHANNELS.length} channels</span>
            </div>
            <div className="panel-body" style={{ padding: "14px 18px" }}>
                <svg
                    width="100%"
                    height={h}
                    viewBox={`0 0 ${w} ${h}`}
                    style={{ display: "block" }}
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Quadrant fills */}
                    <rect x={pad.left} y={pad.top} width={cw / 2} height={ch / 2}
                        fill="var(--accent-emerald)" opacity="0.03" />
                    <rect x={midX} y={pad.top} width={cw / 2} height={ch / 2}
                        fill="var(--accent-gold)" opacity="0.02" />
                    <rect x={pad.left} y={midY} width={cw / 2} height={ch / 2}
                        fill="var(--accent-blue)" opacity="0.02" />
                    <rect x={midX} y={midY} width={cw / 2} height={ch / 2}
                        fill="var(--accent-coral)" opacity="0.03" />

                    {/* Grid lines */}
                    <line x1={midX} y1={pad.top} x2={midX} y2={pad.top + ch}
                        stroke="var(--border-bright)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1={pad.left} y1={midY} x2={pad.left + cw} y2={midY}
                        stroke="var(--border-bright)" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Axes */}
                    <line x1={pad.left} y1={pad.top + ch} x2={pad.left + cw} y2={pad.top + ch}
                        stroke="var(--border)" strokeWidth="1" />
                    <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + ch}
                        stroke="var(--border)" strokeWidth="1" />

                    {/* Axis labels */}
                    <text x={pad.left + cw / 2} y={h - 4} textAnchor="middle"
                        className="quadrant-axis-label">
                        EFFORT
                    </text>
                    <text x={12} y={pad.top + ch / 2} textAnchor="middle"
                        className="quadrant-axis-label"
                        transform={`rotate(-90, 12, ${pad.top + ch / 2})`}>
                        PIPELINE ROI
                    </text>

                    {/* Quadrant labels */}
                    <text x={pad.left + cw * 0.25} y={pad.top + 16} textAnchor="middle"
                        className="quadrant-label">
                        SWEET SPOT
                    </text>
                    <text x={pad.left + cw * 0.75} y={pad.top + ch - 8} textAnchor="middle"
                        className="quadrant-label">
                        HIGH EFFORT / LOW ROI
                    </text>

                    {/* Gradient definitions */}
                    <defs>
                        {CHANNELS.map((ch_item) => {
                            const color = CATEGORY_COLORS[ch_item.category];
                            const gradId = `dot-${id}-${ch_item.id}`;
                            return (
                                <radialGradient key={gradId} id={gradId}>
                                    <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                                    <stop offset="100%" stopColor={color} stopOpacity="0.3" />
                                </radialGradient>
                            );
                        })}
                    </defs>

                    {/* Data points */}
                    {CHANNELS.map((ch_item) => {
                        const cx = pad.left + ((ch_item.effort - 1) / 4) * cw;
                        const cy = pad.top + ch - (ch_item.pipelineROI / 100) * ch;
                        const gradId = `dot-${id}-${ch_item.id}`;
                        const color = CATEGORY_COLORS[ch_item.category];

                        return (
                            <g key={ch_item.id}>
                                <circle cx={cx} cy={cy} r={8} fill={`url(#${gradId})`} />
                                <circle cx={cx} cy={cy} r={3.5} fill={color} />
                                <text x={cx} y={cy - 12} textAnchor="middle"
                                    className="quadrant-dot-label">
                                    {ch_item.name}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

/* ── Eisenhower Matrix view ── */

const QUADRANTS = [
    { key: "do", label: "Do First", sublabel: "Urgent & Important", color: "var(--accent-coral)", filter: (c: Channel) => c.urgency >= 4 && c.importance >= 4 },
    { key: "schedule", label: "Schedule", sublabel: "Important, Not Urgent", color: "var(--accent-emerald)", filter: (c: Channel) => c.urgency < 4 && c.importance >= 4 },
    { key: "delegate", label: "Delegate", sublabel: "Urgent, Not Important", color: "var(--accent-gold)", filter: (c: Channel) => c.urgency >= 4 && c.importance < 4 },
    { key: "eliminate", label: "Reconsider", sublabel: "Neither Urgent nor Important", color: "var(--accent-blue)", filter: (c: Channel) => c.urgency < 4 && c.importance < 4 },
] as const;

function EisenhowerMatrix() {
    return (
        <div className="eisenhower-matrix">
            {/* Axis labels */}
            <div className="matrix-y-label">IMPORTANCE</div>
            <div className="matrix-x-label">URGENCY</div>

            <div className="matrix-grid">
                {QUADRANTS.map((q) => {
                    const items = CHANNELS.filter(q.filter);
                    return (
                        <div key={q.key} className={`matrix-quadrant matrix-${q.key}`}>
                            <div className="matrix-quadrant-header">
                                <span className="matrix-quadrant-title" style={{ color: q.color }}>{q.label}</span>
                                <span className="matrix-quadrant-sub">{q.sublabel}</span>
                            </div>
                            <div className="matrix-items">
                                {items.map((ch) => {
                                    const IconComp = ch.icon;
                                    const catColor = CATEGORY_COLORS[ch.category];
                                    return (
                                        <div key={ch.id} className="matrix-item">
                                            <div className="matrix-item-dot" style={{ background: catColor }} />
                                            <IconComp size={14} weight="bold" style={{ opacity: 0.6, flexShrink: 0 }} />
                                            <div className="matrix-item-info">
                                                <span className="matrix-item-name">{ch.name}</span>
                                                <span className="matrix-item-roi">ROI {ch.pipelineROI}%</span>
                                            </div>
                                            <div className={`campaign-status ${ch.status}`}>{ch.status}</div>
                                        </div>
                                    );
                                })}
                                {items.length === 0 && (
                                    <div className="matrix-empty">No channels</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ── Channel card ── */

function ChannelCard({ channel }: { channel: Channel }) {
    const IconComp = channel.icon;

    return (
        <div className="channel-card">
            <div className="channel-card-header">
                <div className="channel-name">
                    <IconComp size={16} weight="bold" />
                    {channel.name}
                </div>
                <div className={`campaign-status ${channel.status}`}>{channel.status}</div>
            </div>

            <div className="channel-stats">
                <div className="channel-stat">
                    <div className="channel-stat-label">Effort</div>
                    <div className="effort-bar">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`effort-segment ${i <= channel.effort ? "filled" : ""}`} />
                        ))}
                    </div>
                </div>
                <div className="channel-stat">
                    <div className="channel-stat-label">Cost</div>
                    <div className="channel-stat-value">{"$".repeat(channel.cost)}</div>
                </div>
                <div className="channel-stat">
                    <div className="channel-stat-label">Time to ROI</div>
                    <div className="channel-stat-value">{channel.timeToROI}</div>
                </div>
            </div>

            <div className="channel-roi-section">
                <div className="channel-roi-label">
                    <span>Pipeline ROI</span>
                    <span>{channel.pipelineROI}%</span>
                </div>
                <div className="channel-roi-bar">
                    <div className="channel-roi-fill" style={{ width: `${channel.pipelineROI}%` }} />
                </div>
            </div>

            <div className="channel-description">{channel.description}</div>
        </div>
    );
}

/* ── Page ── */

export function DistributionChannelsPage() {
    const [view, setView] = useState<ViewMode>("matrix");

    return (
        <div className="channels-page">
            <div className="channels-toolbar">
                <div className="view-toggle">
                    <button
                        className={`view-btn ${view === "channels" ? "active" : ""}`}
                        onClick={() => setView("channels")}
                    >
                        <ListBullets size={14} weight="bold" />
                        Channels
                    </button>
                    <button
                        className={`view-btn ${view === "matrix" ? "active" : ""}`}
                        onClick={() => setView("matrix")}
                    >
                        <GridFour size={14} weight="bold" />
                        Priority Matrix
                    </button>
                </div>
            </div>

            {view === "channels" ? (
                <>
                    <QuadrantChart />
                    {CATEGORIES.map((cat) => {
                        const channels = CHANNELS.filter((c) => c.category === cat.key);
                        const CatIcon = cat.icon;
                        return (
                            <div key={cat.key} className="category-section">
                                <div className="category-label">
                                    <CatIcon size={14} weight="bold" />
                                    {cat.label}
                                    <span className="category-count">{channels.length}</span>
                                </div>
                                <div className="channels-grid">
                                    {channels.map((ch) => (
                                        <ChannelCard key={ch.id} channel={ch} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <EisenhowerMatrix />
            )}
        </div>
    );
}
