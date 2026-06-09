import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb } from "lucide-react";

export function FeedbackCard({
  correct,
  text,
  onContinue,
}: {
  correct: boolean;
  text: string;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`rounded-2xl p-7 shadow-2xl border-4 max-w-2xl w-full ${
        correct ? "bg-emerald-50 border-emerald-400" : "bg-amber-50 border-amber-400"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
            correct ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
          }`}
        >
          {correct ? <CheckCircle2 size={32} /> : <Lightbulb size={32} />}
        </div>
        <div className="flex-1">
          <h3 className={`text-2xl font-bold ${correct ? "text-emerald-800" : "text-amber-800"}`}>
            {correct ? "Boa escolha!" : "Vamos pensar juntos"}
          </h3>
          <p className="mt-2 text-lg text-slate-700 leading-relaxed">{text}</p>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-lg font-bold shadow"
        >
          Continuar
        </button>
      </div>
    </motion.div>
  );
}
