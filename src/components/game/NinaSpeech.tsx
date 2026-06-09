import { Volume2 } from "lucide-react";

export function NinaSpeech({ text }: { text: string }) {
  return (
    <div className="relative bg-white border-[3px] border-game-sky rounded-3xl px-5 py-4 shadow-card-soft flex items-start gap-3">
      {/* tail */}
      <span
        aria-hidden
        className="absolute -left-3 top-6 w-4 h-4 rotate-45 bg-white border-l-[3px] border-b-[3px] border-game-sky"
      />
      <p className="text-game-ink text-base leading-snug font-semibold flex-1">
        {text}
      </p>
      <button
        type="button"
        aria-label="Ouvir fala"
        className="shrink-0 w-9 h-9 rounded-full bg-game-sky-soft hover:bg-game-sky/30 text-game-sky flex items-center justify-center transition"
      >
        <Volume2 size={18} />
      </button>
    </div>
  );
}
