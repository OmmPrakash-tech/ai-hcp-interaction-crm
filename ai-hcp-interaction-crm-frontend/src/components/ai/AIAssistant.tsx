import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

import { Message } from "@/types";

import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestionCard } from "./SuggestionCard";
import { ChatInput } from "./ChatInput";

import { samplePrompts } from "./samplePrompts";
import { voiceScripts } from "./voiceScripts";

interface AIAssistantProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isThinking: boolean;
  onClearHistory: () => void;
}

export function AIAssistant({
  messages,
  onSendMessage,
  isThinking,
  onClearHistory,
}: AIAssistantProps) {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isThinking) return;

    onSendMessage(inputValue);

    setInputValue("");
  };

  const handleSuggestionClick = (text: string) => {
    if (isThinking) return;

    onSendMessage(text);
  };

 const startVoiceInput = () => {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  setIsRecording(true);

  recognition.start();

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    setInputValue(transcript);
  };

  recognition.onerror = () => {
    setIsRecording(false);
  };

  recognition.onend = () => {
    setIsRecording(false);
  };
};

  return (
    <div
      id="ai-assistant-container"
      className="glass-panel rounded-3xl p-5 h-full flex flex-col justify-between overflow-hidden relative"
    >
      <ChatHeader
        isThinking={isThinking}
        onClearHistory={onClearHistory}
      />

      <div className="flex-1 overflow-y-auto mb-4 pr-1 space-y-4 max-h-[calc(100vh-420px)] sm:max-h-[calc(100vh-340px)]">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              index={index}
            />
          ))}

          {isThinking && <TypingIndicator />}
        </AnimatePresence>

      {/* Suggested Quick Templates */}
      {messages.length <= 1 && !isThinking && (
        <div className="mb-4">
          <p className="text-[10px] text-text-sec font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles
              size={11}
              className="text-brand-accent"
            />
            Suggested Interactive Logs
          </p>

          <div className="space-y-1.5">
            {samplePrompts.map((prompt) => (
              <SuggestionCard
                key={prompt.title}
                prompt={prompt}
                onClick={handleSuggestionClick}
              />
            ))}
          </div>
        </div>
      )}

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        onVoiceInput={startVoiceInput}
        isThinking={isThinking}
        isRecording={isRecording}
      />
    </div>
    </div>
  );
}