import { MetricsPanel } from "./components/MetricsPanel";
import { TasksPanel } from "./components/TasksPanel";
import { SocialPanel } from "./components/SocialPanel";
import { EmailPanel } from "./components/EmailPanel";
import { AdsPanel } from "./components/AdsPanel";
import { ChatPanel } from "./components/ChatPanel";

function App() {
  const now = new Date();
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
          <div className="dashboard-date">
            <span className="live-dot" />
            {dateStr}
          </div>
        </header>
        <div className="content-grid">
          <MetricsPanel />
          <TasksPanel />
          <SocialPanel />
          <EmailPanel />
          <AdsPanel />
        </div>
      </div>
      <ChatPanel />
    </div>
  );
}

export default App;
