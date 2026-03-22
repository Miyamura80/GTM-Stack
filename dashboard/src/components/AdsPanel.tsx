import { Megaphone } from "@phosphor-icons/react";

const campaigns = [
  {
    name: "Enterprise SaaS - LinkedIn Ads",
    status: "active" as const,
    spend: "$4,280",
    leads: "142",
    cpl: "$30.14",
    budgetUsed: 68,
  },
  {
    name: "Product Launch - Google Search",
    status: "active" as const,
    spend: "$2,150",
    leads: "89",
    cpl: "$24.16",
    budgetUsed: 43,
  },
  {
    name: "Retargeting - Meta Ads",
    status: "paused" as const,
    spend: "$890",
    leads: "34",
    cpl: "$26.18",
    budgetUsed: 22,
  },
];

export function AdsPanel() {
  return (
    <div className="panel panel-ads">
      <div className="panel-header">
        <div className="panel-label">
          <Megaphone size={14} weight="bold" />
          Ad campaigns
        </div>
        <span className="panel-badge badge-green">2 active</span>
      </div>
      <div className="panel-body">
        <div className="campaign-list">
          {campaigns.map((c) => (
            <div className="campaign-item" key={c.name}>
              <div className="campaign-header">
                <div className="campaign-name">{c.name}</div>
                <div className={`campaign-status ${c.status}`}>{c.status}</div>
              </div>
              <div className="campaign-stats">
                <div>
                  <div className="campaign-stat-label">Spend</div>
                  <div className="campaign-stat-value">{c.spend}</div>
                </div>
                <div>
                  <div className="campaign-stat-label">Leads</div>
                  <div className="campaign-stat-value">{c.leads}</div>
                </div>
                <div>
                  <div className="campaign-stat-label">CPL</div>
                  <div className="campaign-stat-value">{c.cpl}</div>
                </div>
              </div>
              <div className="campaign-bar">
                <div className="campaign-bar-fill" style={{ width: `${c.budgetUsed}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
