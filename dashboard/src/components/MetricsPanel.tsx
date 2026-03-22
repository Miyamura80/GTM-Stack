import { useState } from "react";
import { TrendUp, TrendDown, UsersThree, CurrencyDollar, Crosshair, ShoppingCart } from "@phosphor-icons/react";

type Period = "7d" | "30d" | "90d";

function ExpandedChart({ data, color, labels }: { data: number[]; color: string; labels: string[] }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const w = 280;
    const h = 100;
    const padTop = 8;
    const padBottom = 20;
    const chartH = h - padTop - padBottom;

    const points = data.map((v, i) => ({
        x: (i / (data.length - 1)) * w,
        y: padTop + chartH - ((v - min) / range) * chartH,
        value: v,
    }));

    const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

    const gradientId = `grad-${color.replace(/[^a-z]/gi, "")}`;

    const areaPath = `M${points[0].x},${points[0].y} ${points.map((p) => `L${p.x},${p.y}`).join(" ")} L${points[points.length - 1].x},${padTop + chartH} L${points[0].x},${padTop + chartH} Z`;

    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 1, 2, 3].map((i) => {
                const y = padTop + (chartH / 3) * i;
                return (
                    <line key={i} x1={0} y1={y} x2={w} y2={y} stroke="var(--border)" strokeWidth="0.5" />
                );
            })}

            {/* Area fill */}
            <path d={areaPath} fill={`url(#${gradientId})`} />

            {/* Line */}
            <polyline
                points={polyline}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Data points */}
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="var(--bg-surface)" stroke={color} strokeWidth="1.5" />
            ))}

            {/* X-axis labels - aligned to corresponding data point positions */}
            {labels.map((label, i) => {
                const dataIndex = Math.round((i / (labels.length - 1)) * (data.length - 1));
                const x = (dataIndex / (data.length - 1)) * w;
                return (
                    <text
                        key={i}
                        x={x}
                        y={h - 2}
                        textAnchor="middle"
                        fill="var(--text-muted)"
                        fontSize="8"
                        fontFamily="var(--font-mono)"
                    >
                        {label}
                    </text>
                );
            })}
        </svg>
    );
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const w = 60;
    const h = 24;
    const points = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((v - min) / range) * h;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <svg className="sparkline" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const METRICS = [
    {
        label: "Site Visitors",
        icon: UsersThree,
        color: "var(--accent-emerald)",
        periods: {
            "7d": {
                value: "14,823",
                change: "+12.4%",
                direction: "up" as const,
                data: [12200, 13100, 12800, 14200, 13900, 14500, 14823],
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            "30d": {
                value: "58,412",
                change: "+18.7%",
                direction: "up" as const,
                data: [42000, 44500, 43800, 46200, 48100, 47300, 51200, 53800, 52100, 55400, 54200, 58412],
                labels: ["W1", "W2", "W3", "W4"],
            },
            "90d": {
                value: "168,930",
                change: "+34.2%",
                direction: "up" as const,
                data: [105000, 112000, 118000, 125000, 122000, 134000, 140000, 148000, 155000, 160000, 162000, 168930],
                labels: ["Jan", "Feb", "Mar"],
            },
        },
    },
    {
        label: "Revenue",
        icon: CurrencyDollar,
        color: "var(--accent-gold)",
        periods: {
            "7d": {
                value: "$284K",
                change: "+8.2%",
                direction: "up" as const,
                data: [240, 255, 248, 262, 270, 265, 284],
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            "30d": {
                value: "$1.1M",
                change: "+15.3%",
                direction: "up" as const,
                data: [820, 860, 890, 870, 920, 940, 960, 980, 1020, 1050, 1080, 1100],
                labels: ["W1", "W2", "W3", "W4"],
            },
            "90d": {
                value: "$3.2M",
                change: "+28.6%",
                direction: "up" as const,
                data: [2100, 2250, 2400, 2380, 2520, 2650, 2700, 2800, 2900, 3000, 3100, 3200],
                labels: ["Jan", "Feb", "Mar"],
            },
        },
    },
    {
        label: "Conversion",
        icon: Crosshair,
        color: "var(--accent-coral)",
        periods: {
            "7d": {
                value: "3.24%",
                change: "-0.3%",
                direction: "down" as const,
                data: [3.5, 3.4, 3.6, 3.3, 3.2, 3.35, 3.24],
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            "30d": {
                value: "3.41%",
                change: "-0.1%",
                direction: "down" as const,
                data: [3.6, 3.55, 3.5, 3.48, 3.52, 3.45, 3.42, 3.48, 3.44, 3.40, 3.38, 3.41],
                labels: ["W1", "W2", "W3", "W4"],
            },
            "90d": {
                value: "3.52%",
                change: "+0.2%",
                direction: "up" as const,
                data: [3.3, 3.35, 3.4, 3.38, 3.42, 3.45, 3.5, 3.48, 3.55, 3.5, 3.48, 3.52],
                labels: ["Jan", "Feb", "Mar"],
            },
        },
    },
    {
        label: "Pipeline",
        icon: ShoppingCart,
        color: "var(--accent-blue)",
        periods: {
            "7d": {
                value: "$1.2M",
                change: "+22.1%",
                direction: "up" as const,
                data: [820, 880, 920, 960, 1020, 1100, 1200],
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            "30d": {
                value: "$4.8M",
                change: "+31.5%",
                direction: "up" as const,
                data: [3200, 3400, 3500, 3600, 3800, 3900, 4100, 4200, 4400, 4500, 4650, 4800],
                labels: ["W1", "W2", "W3", "W4"],
            },
            "90d": {
                value: "$12.4M",
                change: "+42.8%",
                direction: "up" as const,
                data: [7800, 8200, 8800, 9200, 9600, 10100, 10500, 11000, 11400, 11800, 12100, 12400],
                labels: ["Jan", "Feb", "Mar"],
            },
        },
    },
];

const PERIOD_LABELS: Record<Period, string> = { "7d": "7 days", "30d": "30 days", "90d": "Quarter" };

export function MetricsPanel() {
    const [activePeriod, setActivePeriod] = useState<Period>("7d");
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <div className="panel panel-metrics">
            <div className="metrics-toolbar">
                <div className="panel-label" style={{ padding: "12px 18px 0" }}>
                    <UsersThree size={14} weight="bold" />
                    Key metrics
                </div>
                <div className="period-selector">
                    {(["7d", "30d", "90d"] as Period[]).map((p) => (
                        <button
                            key={p}
                            className={`period-btn ${activePeriod === p ? "active" : ""}`}
                            onClick={() => setActivePeriod(p)}
                        >
                            {PERIOD_LABELS[p]}
                        </button>
                    ))}
                </div>
            </div>
            <div className="metrics-grid">
                {METRICS.map((m) => {
                    const Icon = m.icon;
                    const pd = m.periods[activePeriod];
                    const isHovered = hoveredCard === m.label;

                    return (
                        <div
                            className="metric-card"
                            key={m.label}
                            onMouseEnter={() => setHoveredCard(m.label)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="metric-label">
                                <Icon size={12} weight="bold" style={{ marginRight: 4, verticalAlign: -1 }} />
                                {m.label}
                            </div>
                            <div className="metric-value">{pd.value}</div>
                            <div className={`metric-change ${pd.direction}`}>
                                {pd.direction === "up" ? <TrendUp size={12} weight="bold" /> : <TrendDown size={12} weight="bold" />}
                                {pd.change} vs prev {PERIOD_LABELS[activePeriod]}
                            </div>
                            {!isHovered && (
                                <div className="metric-sparkline">
                                    <MiniSparkline data={pd.data} color={m.color} />
                                </div>
                            )}
                            {isHovered && (
                                <div className="metric-expanded-chart">
                                    <ExpandedChart data={pd.data} color={m.color} labels={pd.labels} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
