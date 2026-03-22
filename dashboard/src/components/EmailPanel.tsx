import { EnvelopeSimple } from "@phosphor-icons/react";

const emails = [
  {
    from: "Alex Rivera",
    subject: "Re: Partnership proposal - ready for your sign-off",
    time: "10:32 AM",
    unread: true,
  },
  {
    from: "Investor Relations",
    subject: "Monthly board update draft attached",
    time: "9:15 AM",
    unread: true,
  },
  {
    from: "Clara Yang",
    subject: "Customer success metrics for Q1 review",
    time: "8:40 AM",
    unread: true,
  },
  {
    from: "Stripe Notifications",
    subject: "Your March payout has been initiated",
    time: "Yesterday",
    unread: false,
  },
  {
    from: "David Park",
    subject: "Competitor analysis - they just launched",
    time: "Yesterday",
    unread: false,
  },
];

export function EmailPanel() {
  return (
    <div className="panel panel-email">
      <div className="panel-header">
        <div className="panel-label">
          <EnvelopeSimple size={14} weight="bold" />
          Inbox
        </div>
        <span className="panel-badge badge-gold">3 unread</span>
      </div>
      <div className="panel-body">
        <div className="email-list">
          {emails.map((e) => (
            <div className="email-item" key={e.subject}>
              <div className={`email-unread-dot ${e.unread ? "" : "read"}`} />
              <div className="email-content">
                <div className="email-from">{e.from}</div>
                <div className="email-subject">{e.subject}</div>
              </div>
              <div className="email-time">{e.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
