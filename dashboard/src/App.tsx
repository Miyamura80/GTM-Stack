import { useState, useEffect } from "react";
import { Robot } from "@phosphor-icons/react";
import { MetricsPanel } from "./components/MetricsPanel";
import { TasksPanel } from "./components/TasksPanel";
import { SocialPanel } from "./components/SocialPanel";
import { EmailPanel } from "./components/EmailPanel";
import { AdsPanel } from "./components/AdsPanel";
import { ChatPanel } from "./components/ChatPanel";
import { DistributionChannelsPage } from "./components/DistributionChannelsPage";
import { CompetitorsPage } from "./components/CompetitorsPage";
import { OutboundFunnelPage } from "./components/OutboundFunnelPage";

type Page = "dashboard" | "channels" | "competitors" | "outbound";

function App() {
    const [page, setPage] = useState<Page>("dashboard");
    const [chatOpen, setChatOpen] = useState(false);
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (!chatOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setChatOpen(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [chatOpen]);

    const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="dashboard">
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">
                        <span>GTM</span> Command Center
                    </h1>
                    <nav className="dashboard-nav">
                        <button
                            className={`nav-tab ${page === "dashboard" ? "active" : ""}`}
                            onClick={() => setPage("dashboard")}
                        >
                            Dashboard
                        </button>
                        <button
                            className={`nav-tab ${page === "channels" ? "active" : ""}`}
                            onClick={() => setPage("channels")}
                        >
                            <span className="nav-tab-full">Distribution Channels</span>
                            <span className="nav-tab-short">Channels</span>
                        </button>
                        <button
                            className={`nav-tab ${page === "outbound" ? "active" : ""}`}
                            onClick={() => setPage("outbound")}
                        >
                            <span className="nav-tab-full">Outbound Funnel</span>
                            <span className="nav-tab-short">Outbound</span>
                        </button>
                        <button
                            className={`nav-tab ${page === "competitors" ? "active" : ""}`}
                            onClick={() => setPage("competitors")}
                        >
                            Competitors
                        </button>
                    </nav>
                    <div className="dashboard-date">
                        <span className="live-dot" />
                        {dateStr}
                    </div>
                </header>
                {page === "dashboard" ? (
                    <div className="content-grid">
                        <MetricsPanel />
                        <TasksPanel />
                        <SocialPanel />
                        <EmailPanel />
                        <AdsPanel />
                    </div>
                ) : page === "channels" ? (
                    <DistributionChannelsPage />
                ) : page === "outbound" ? (
                    <OutboundFunnelPage />
                ) : (
                    <CompetitorsPage />
                )}
            </div>
            <div className={`chat-overlay-backdrop ${chatOpen ? "visible" : ""}`} role="presentation" onClick={() => setChatOpen(false)} />
            <div className={`chat-container ${chatOpen ? "open" : ""}`}>
                <ChatPanel />
            </div>
            <button
                className="chat-fab"
                onClick={() => setChatOpen(!chatOpen)}
                aria-label={chatOpen ? "Close agent chat" : "Open agent chat"}
                aria-expanded={chatOpen}
            >
                <Robot size={22} weight="bold" />
            </button>
        </div>
    );
}

export default App;
