import { PlusCircle } from "lucide-react";
import { SamplePrompt } from "./samplePrompts";

interface SuggestionCardProps {
  prompt: SamplePrompt;
  onClick: (text: string) => void;
}

export function SuggestionCard({
  prompt,
  onClick,
}: SuggestionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(prompt.text)}
      className={`w-full text-left p-2 rounded-xl border text-[11px] leading-snug bg-white/3 hover:bg-white/5 transition-all duration-300 ${prompt.color}`}
    >
      <div className="font-semibold flex items-center gap-1">
        <PlusCircle size={10} />
        {prompt.title}
      </div>

      <div className="text-text-sec line-clamp-1 mt-0.5 font-sans">
        {prompt.text}
      </div>
    </button>
  );
}