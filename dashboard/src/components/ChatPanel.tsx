import { useState, useRef, useEffect, type FormEvent } from "react";
import { PaperPlaneRight, Robot } from "@phosphor-icons/react";

type Message = {
    role: "user" | "agent";
    time: string;
    text: string;
};

const WELCOME_MESSAGES: Message[] = [
    {
        role: "agent",
        time: "9:00 AM",
        text: "Good morning. I've reviewed your overnight metrics - site traffic is up 12.4% and 3 new enterprise leads came in from the webinar follow-up. What would you like to focus on today?",
    },
];

const INITIAL_MESSAGE_COUNT = WELCOME_MESSAGES.length;

function getTimeStr() {
    return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

const AGENT_RESPONSES = [
    "Got it. I'll look into that and surface the key insights for you.",
    "Based on current pipeline data, I'd recommend prioritizing the enterprise leads - they have a 3x higher close rate this quarter.",
    "I've flagged that for review. You'll see it in your priorities panel once confirmed.",
    "The LinkedIn campaign is outperforming benchmarks by 2x. I can draft a budget increase proposal if you'd like.",
    "Noted. I'll compile that report and have it ready before your afternoon meeting.",
    "I've cross-referenced the competitor data - their launch doesn't overlap with our core positioning. We're in good shape.",
];

export function ChatPanel() {
    const [messages, setMessages] = useState<Message[]>(WELCOME_MESSAGES);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const responseIndex = useRef(0);
    const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        return () => {
            if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
        };
    }, []);

    function handleSend(e: FormEvent) {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = {
            role: "user",
            time: getTimeStr(),
            text: input.trim(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
        pendingTimerRef.current = setTimeout(() => {
            const reply = AGENT_RESPONSES[responseIndex.current % AGENT_RESPONSES.length];
            responseIndex.current++;
            setMessages((prev) => [
                ...prev,
                { role: "agent", time: getTimeStr(), text: reply },
            ]);
        }, 800);
    }

    return (
        <div className="chat-panel">
            <div className="chat-header">
                <div className="chat-header-left">
                    <Robot size={16} weight="bold" style={{ color: "var(--accent-gold)", opacity: 0.7 }} />
                    <span className="chat-title">Agent</span>
                </div>
                <div className="chat-online-count">
                    <span className="live-dot" style={{ marginRight: 0, width: 5, height: 5 }} />
                    Online
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg, i) => {
                    const delay = i < INITIAL_MESSAGE_COUNT ? `${0.4 + i * 0.05}s` : "0.05s";
                    return (
                        <div className="chat-message" key={i} style={{ animationDelay: delay }}>
                            {msg.role === "agent" ? (
                                <div className="chat-avatar avatar-1">
                                    <Robot size={14} weight="bold" />
                                </div>
                            ) : (
                                <div className="chat-avatar avatar-4">You</div>
                            )}
                            <div className="chat-msg-content">
                                <div className="chat-msg-header">
                                    <span className="chat-msg-name">{msg.role === "agent" ? "GTM Agent" : "You"}</span>
                                    <span className="chat-msg-time">{msg.time}</span>
                                </div>
                                <div className="chat-msg-text">{msg.text}</div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <form className="chat-input-wrapper" onSubmit={handleSend}>
                    <input
                        className="chat-input"
                        type="text"
                        placeholder="Ask the agent..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="chat-send-btn" type="submit">
                        <PaperPlaneRight size={14} weight="bold" />
                    </button>
                </form>
            </div>
        </div>
    );
}
