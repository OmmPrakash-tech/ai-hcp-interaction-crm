import { Bot, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  isThinking: boolean;
  onClearHistory: () => void;
}

export function ChatHeader({
  isThinking,
  onClearHistory,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 z-10">

      {/* Left */}
      <div className="flex items-center gap-3">

        {/* AI Avatar */}
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-lg ${
              isThinking ? "animate-pulse-ring" : ""
            }`}
          >
            <Bot size={18} />
          </div>

          {/* Online Status */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-success rounded-full border-2 border-bg-surface" />
        </div>

        {/* Title */}
        <div>
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
            AI CRM Assistant
            <Sparkles size={12} className="text-brand-accent" />
          </h3>

          <p className="text-[10px] text-text-sec">
            {isThinking
              ? "Thinking & Extracting..."
              : "LangGraph Agent Online"}
          </p>
        </div>

      </div>

      {/* Right */}
      <button
        id="clear-chat-history"
        onClick={onClearHistory}
        className="text-[10px] text-text-sec hover:text-white px-2 py-1 rounded-md hover:bg-white/5 transition-all duration-200"
      >
        New Interaction
      </button>
    </div>
  );
}