import { CheckSquare } from "@phosphor-icons/react";

const TASKS = [
    {
        id: "t1",
        title: "Finalize Q2 pricing strategy deck for board review",
        priority: "critical" as const,
        due: "Today, 5:00 PM",
        assignee: "You",
        tag: "Strategy",
    },
    {
        id: "t2",
        title: "Review and approve new landing page A/B test variants",
        priority: "high" as const,
        due: "Tomorrow",
        assignee: "Marketing",
        tag: "Growth",
    },
    {
        id: "t3",
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
                <span className="panel-badge badge-coral">{TASKS.filter(t => t.priority === "critical" || t.priority === "high").length} urgent</span>
            </div>
            <div className="panel-body">
                {TASKS.map((t) => (
                    <div className="task-item" key={t.id}>
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
