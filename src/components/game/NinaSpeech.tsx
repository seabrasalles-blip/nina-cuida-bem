import { Volume2 } from "lucide-react";

export function NinaSpeech({ text }: { text: string }) {
  return (
    <div className="relative bg-white border-2 border-sky-300 rounded-2xl px-4 py-3 shadow-md flex items-start gap-3 max-w-md">
      <p className="text-slate-700 text-base leading-snug font-medium flex-1">{text}</p>
      <button
        type="button"
        aria-label="Ouvir fala"
        className="shrink-0 w-9 h-9 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center justify-center transition"
      >
        <Volume2 size={18} />
      </button>
    </div>
  );
}
