import { Hash } from "@phosphor-icons/react";

const FEED = [
    {
        platform: "twitter" as const,
        author: "@ycombinator",
        text: "Excited to announce our latest batch - 240 companies building the future. Applications for S26 are now open.",
        time: "2h ago",
        engagement: "4.2K",
    },
    {
        platform: "linkedin" as const,
        author: "Sarah Chen",
        text: "Just published our GTM playbook for enterprise SaaS. The key insight: outbound is dead, ecosystem-led growth is the future.",
        time: "4h ago",
        engagement: "892",
    },
    {
        platform: "twitter" as const,
        author: "@ProductHunt",
        text: "Top product of the day: An AI-powered sales copilot that learns your ICP and auto-qualifies leads.",
        time: "5h ago",
        engagement: "1.8K",
    },
    {
        platform: "linkedin" as const,
        author: "Marc Randolph",
        text: "Stop optimizing for MQLs. Start optimizing for time-to-value. Your customers will thank you.",
        time: "6h ago",
        engagement: "2.1K",
    },
];

function PlatformIcon({ platform }: { platform: "twitter" | "linkedin" }) {
    if (platform === "twitter") {
        return (
            <div className="social-icon twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </div>
        );
    }
    return (
        <div className="social-icon linkedin">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        </div>
    );
}

export function SocialPanel() {
    return (
        <div className="panel panel-social">
            <div className="panel-header">
                <div className="panel-label">
                    <Hash size={14} weight="bold" />
                    Social feed
                </div>
                <span className="panel-badge badge-blue">{FEED.length} mentions</span>
            </div>
            <div className="panel-body">
                <div className="social-feed">
                    {FEED.map((item) => (
                        <div className="social-item" key={item.author + item.time}>
                            <PlatformIcon platform={item.platform} />
                            <div className="social-content">
                                <div className="social-author">{item.author}</div>
                                <div className="social-text">{item.text}</div>
                                <div className="social-time">{item.time} &middot; {item.engagement} engagements</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
