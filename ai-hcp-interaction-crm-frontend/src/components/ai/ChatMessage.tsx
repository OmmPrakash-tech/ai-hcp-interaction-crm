import { motion } from "motion/react";
import { Bot, User } from "lucide-react";
import { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
  index: number;
}

export function ChatMessage({
  message,
  index,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-brand-primary flex-shrink-0">
          <Bot size={14} />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
          isUser
            ? "bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 border border-brand-primary/30 text-white rounded-tr-none"
            : "bg-white/5 border border-white/8 text-text-sec rounded-tl-none"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message.content}
        </p>

        {message.timestamp && (
          <div className="text-[9px] text-text-sec/40 text-right mt-1.5 font-mono">
            {message.timestamp}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center text-white flex-shrink-0">
          <User size={14} />
        </div>
      )}
    </motion.div>
  );
}