import React from "react";
import { Send, Mic, Paperclip, CornerDownLeft } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onVoiceInput: () => void;
  isThinking: boolean;
  isRecording: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onVoiceInput,
  isThinking,
  isRecording,
}: ChatInputProps) {
  return (
    <form
      id="ai-chat-form"
      onSubmit={onSubmit}
      className="relative z-10"
    >
      <div className="relative rounded-2xl bg-white/3 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center">

        {/* Attach */}
        <button
          type="button"
          id="btn-attach-file"
          aria-label="Attach File"
          className="p-3 text-text-sec hover:text-white hover:scale-105 transition-all"
        >
          <Paperclip size={16} />
        </button>

        {/* Input */}
        <input
          id="chat-input-field"
          type="text"
          value={value}
          disabled={isThinking}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isRecording
              ? "Listening..."
              : "Describe your HCP interaction naturally..."
          }
          className="flex-1 bg-transparent py-3 text-xs text-white placeholder-text-sec/50 outline-none border-none min-w-0"
        />

        {/* Voice */}
        <button
          type="button"
          id="btn-voice-input"
          aria-label="Voice Input"
          onClick={onVoiceInput}
          className={`p-3 transition-all ${
            isRecording
              ? "text-brand-success animate-pulse"
              : "text-text-sec hover:text-white"
          }`}
        >
          <Mic size={16} />
        </button>

        {/* Send */}
        <button
          type="submit"
          id="btn-send-message"
          aria-label="Send Message"
          disabled={!value.trim() || isThinking}
          className={`p-2 mr-1.5 rounded-xl transition-all duration-200 ${
            value.trim() && !isThinking
              ? "bg-gradient-to-tr from-brand-primary to-brand-accent text-white hover:opacity-90 active:scale-95"
              : "text-text-sec/30 cursor-not-allowed"
          }`}
        >
          <Send size={14} />
        </button>

      </div>

      <div className="text-[9px] text-text-sec/40 text-center mt-2 flex items-center justify-center gap-1">
        <span>Press Enter to analyze with AI assistant</span>
        <CornerDownLeft size={8} />
      </div>
    </form>
  );
}