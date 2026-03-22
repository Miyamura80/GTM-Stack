import { CheckSquare } from "@phosphor-icons/react";

const TASKS = [
    {
        title: "Finalize Q2 pricing strategy deck for board review",
        priority: "critical" as const,
        due: "Today, 5:00 PM",
        assignee: "You",
        tag: "Strategy",
    },
    {
        title: "Review and approve new landing page A/B test variants",
        priority: "high" as const,
        due: "Tomorrow",
        assignee: "Marketing",
        tag: "Growth",
    },
    {
        title: "Schedule partner integration call with Stripe team",
        priority: "medium" as const,
        due: "Mar 24",
        assignee: "Partnerships",
        tag: "Ops",
    },
];

export function TasksPanel() {
    return (
        <div className="panel panel-tasks">
            <div className="panel-header">
                <div className="panel-label">
                    <CheckSquare size={14} weight="bold" />
                    Top priorities
                </div>
                <span className="panel-badge badge-coral">3 urgent</span>
            </div>
            <div className="panel-body">
                {TASKS.map((t) => (
                    <div className="task-item" key={t.title}>
                        <div className={`task-priority priority-${t.priority}`} />
                        <div className="task-content">
                            <div className="task-title">{t.title}</div>
                            <div className="task-meta">
                                <span className={t.due.startsWith("Today") ? "task-due" : ""}>{t.due}</span>
                                <span>{t.assignee}</span>
                                <span>{t.tag}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
