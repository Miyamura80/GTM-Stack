import { useState, useEffect } from "react";
import { MetricsPanel } from "./components/MetricsPanel";
import { TasksPanel } from "./components/TasksPanel";
import { SocialPanel } from "./components/SocialPanel";
import { EmailPanel } from "./components/EmailPanel";
import { AdsPanel } from "./components/AdsPanel";
import { ChatPanel } from "./components/ChatPanel";
import { DistributionChannelsPage } from "./components/DistributionChannelsPage";

type Page = "dashboard" | "channels";

function App() {
    const [page, setPage] = useState<Page>("dashboard");
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(id);
    }, []);

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
                            Distribution Channels
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
                ) : (
                    <DistributionChannelsPage />
                )}
            </div>
            <ChatPanel />
        </div>
    );
}

export default App;
