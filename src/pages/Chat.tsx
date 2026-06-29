import React, { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Send, Hash, Folder, MessageSquare, Plus } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  type: "channel" | "project";
  unread?: number;
}

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const GENERAL_CHANNELS: Channel[] = [
  { id: "general", name: "כללי", type: "channel", unread: 0 },
];

const PROJECT_CHANNELS: Channel[] = [
  { id: "p1", name: "אורנשטיין - שיפוץ מסדרון", type: "project" },
  { id: "p2", name: "לוי - בניית תוספת", type: "project" },
  { id: "p3", name: "כהן - שיפוץ מטבח", type: "project" },
  { id: "p4", name: "גולדברג - חידוש חדר אמבטיה", type: "project" },
  { id: "p5", name: "פרידמן - בניית גדר", type: "project" },
  { id: "p6", name: "רוזנברג - צביעת דירה", type: "project" },
  { id: "p7", name: "שפירו - התקנת ריצוף", type: "project" },
  { id: "p8", name: "ויס - שיפוץ סלון", type: "project" },
  { id: "p9", name: "מזרחי - בניית מרפסת", type: "project" },
  { id: "p10", name: "אברמוביץ - שיפוץ כללי", type: "project" },
  { id: "p11", name: "שטיין - התקנת חלונות", type: "project" },
  { id: "p12", name: "כץ - שיפוץ חדר שינה", type: "project" },
  { id: "p13", name: "הורוביץ - בניית מחסן", type: "project" },
  { id: "p14", name: "בלום - שיפוץ חדר ילדים", type: "project" },
  { id: "p15", name: "גרינברג - התקנת מזגן", type: "project" },
  { id: "p16", name: "שוורץ - שיפוץ גג", type: "project" },
  { id: "p17", name: "קליין - בניית מדרגות", type: "project" },
  { id: "p18", name: "ברקוביץ - שיפוץ חצר", type: "project" },
  { id: "p19", name: "זילברמן - חידוש פרקט", type: "project" },
  { id: "p20", name: "רוט - התקנת תאורה", type: "project" },
  { id: "p21", name: "אדלר - שיפוץ מרתף", type: "project" },
  { id: "p22", name: "נוימן - בניית גינה", type: "project" },
  { id: "p23", name: "פולק - שיפוץ עליית גג", type: "project" },
  { id: "p24", name: "הרמן - התקנת אינסטלציה", type: "project" },
  { id: "p25", name: "ברנשטיין - שיפוץ חנות", type: "project" },
  { id: "p26", name: "זוסמן - בניית קיר גבס", type: "project" },
  { id: "p27", name: "לנדאו - שיפוץ משרד", type: "project" },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  general: [],
};

export default function Chat() {
  const [selectedChannel, setSelectedChannel] = useState<string>("general");
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  const visibleProjects = showAllProjects ? PROJECT_CHANNELS : PROJECT_CHANNELS.slice(0, 10);

  const currentChannel =
    GENERAL_CHANNELS.find((c) => c.id === selectedChannel) ||
    PROJECT_CHANNELS.find((c) => c.id === selectedChannel);

  const currentMessages = messages[selectedChannel] || [];

  const handleSend = () => {
    const text = messageInput.trim();
    if (!text) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "אני",
      text,
      timestamp: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedChannel]: [...(prev[selectedChannel] || []), newMessage],
    }));
    setMessageInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div dir="rtl">
      <PageHeader title="צ'אט פנימי" />

      <div className="p-4 md:p-6">
        <div className="flex h-[calc(100vh-8rem)] gap-0 rounded-[var(--radius-xl)] border border-border overflow-hidden bg-surface">
          {/* Left Panel: Chat Messages */}
          <div className="flex flex-col flex-1">
            {/* Channel Header */}
            <div className="border-b border-border p-4 flex items-center gap-2">
              {currentChannel?.type === "project" ? (
                <Folder className="w-5 h-5 text-muted-foreground shrink-0" />
              ) : (
                <Hash className="w-5 h-5 text-muted-foreground shrink-0" />
              )}
              <span className="text-h3">{currentChannel?.name || "כללי"}</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {currentMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground opacity-40" />
                  <p className="text-muted-foreground">אין הודעות עדיין. שלח הודעה ראשונה!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {currentMessages.map((msg) => (
                    <div key={msg.id} className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-body-sm">{msg.sender}</span>
                        <span className="text-caption text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-body">{msg.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="border-t border-border p-3 flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="הקלד הודעה..."
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <button
                onClick={handleSend}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
                aria-label="שלח הודעה"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel: Channel List */}
          <div className="w-64 border-r border-border bg-surface-sunken flex flex-col shrink-0">
            {/* Panel Header */}
            <div className="p-4 border-b border-border">
              <span className="text-h3">צ'אט פנימי</span>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* General Channels Section */}
              <div className="px-4 py-2">
                <span className="text-caption text-muted-foreground uppercase tracking-wide">ערוצים</span>
              </div>
              {GENERAL_CHANNELS.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`flex items-center gap-2 p-2 px-4 rounded-lg mx-2 my-0.5 cursor-pointer transition-colors ${
                    selectedChannel === channel.id
                      ? "bg-primary-subtle text-primary"
                      : "hover:bg-surface text-foreground"
                  }`}
                >
                  <Hash className="w-4 h-4 shrink-0" />
                  <span className="text-body-sm truncate">{channel.name}</span>
                </div>
              ))}

              {/* Projects Section */}
              <div className="px-4 py-2 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-caption text-muted-foreground uppercase tracking-wide">פרויקטים</span>
              </div>
              {visibleProjects.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`flex items-center gap-2 p-2 px-4 rounded-lg mx-2 my-0.5 cursor-pointer transition-colors ${
                    selectedChannel === channel.id
                      ? "bg-primary-subtle text-primary"
                      : "hover:bg-surface text-foreground"
                  }`}
                >
                  <Folder className="w-4 h-4 shrink-0" />
                  <span className="text-body-sm truncate">{channel.name}</span>
                </div>
              ))}

              {!showAllProjects && PROJECT_CHANNELS.length > 10 && (
                <div
                  onClick={() => setShowAllProjects(true)}
                  className="flex items-center gap-2 p-2 px-4 rounded-lg mx-2 my-0.5 cursor-pointer transition-colors hover:bg-surface text-muted-foreground"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span className="text-body-sm">הצג עוד ({PROJECT_CHANNELS.length - 10})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
