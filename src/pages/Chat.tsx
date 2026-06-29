import React, { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Send, Hash, Folder, MessageSquare, Plus } from "lucide-react";
import { useQuery } from "@/hooks/useQuery";
import { Skeleton } from "@/components/ui";
import { getChannels } from "@/data/channels";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Record<string, Message[]> = {
  general: [],
};

export default function Chat() {
  const { data, loading } = useQuery(getChannels);
  const generalChannels = data?.general ?? [];
  const projectChannels = data?.projects ?? [];

  const [selectedChannel, setSelectedChannel] = useState<string>("general");
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  const visibleProjects = showAllProjects ? projectChannels : projectChannels.slice(0, 10);

  const currentChannel =
    generalChannels.find((c) => c.id === selectedChannel) ||
    projectChannels.find((c) => c.id === selectedChannel);

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
              {loading ? (
                <div className="flex flex-col gap-2 p-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <>
              {/* General Channels Section */}
              <div className="px-4 py-2">
                <span className="text-caption text-muted-foreground uppercase tracking-wide">ערוצים</span>
              </div>
              {generalChannels.map((channel) => (
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

              {!showAllProjects && projectChannels.length > 10 && (
                <div
                  onClick={() => setShowAllProjects(true)}
                  className="flex items-center gap-2 p-2 px-4 rounded-lg mx-2 my-0.5 cursor-pointer transition-colors hover:bg-surface text-muted-foreground"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span className="text-body-sm">הצג עוד ({projectChannels.length - 10})</span>
                </div>
              )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
