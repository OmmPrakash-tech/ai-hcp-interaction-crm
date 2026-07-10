import { motion } from "motion/react";
import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3 justify-start items-center"
    >
      {/* AI Avatar */}
      <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-brand-primary flex-shrink-0">
        <Bot size={14} />
      </div>

      {/* Thinking Bubble */}
      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-3 flex gap-1.5 items-center">

        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce [animation-delay:-0.3s]" />

        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-bounce [animation-delay:-0.15s]" />

        <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-bounce" />

        <span className="text-[10px] text-text-sec font-mono ml-2">
          Parsing interaction...
        </span>

      </div>
    </motion.div>
  );
}