import { motion } from "framer-motion";
import { Sparkles, Lightbulb } from "lucide-react";
import { Nina } from "../Nina";

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
      initial={{ scale: 0.85, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`rounded-[28px] p-8 shadow-toy border-[4px] max-w-2xl w-full ${
        correct ? "bg-emerald-50 border-game-green" : "bg-amber-50 border-game-orange"
      }`}
    >
      <div className="flex items-start gap-5">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
            correct ? "bg-game-green text-white" : "bg-game-orange text-white"
          }`}
        >
          {correct ? (
            <motion.span
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.6 }}
            >
              <Sparkles size={32} />
            </motion.span>
          ) : (
            <Lightbulb size={32} />
          )}
        </div>
        <div className="flex-1">
          <h3
            className={`font-display text-3xl font-bold ${
              correct ? "text-emerald-800" : "text-amber-800"
            }`}
          >
            {correct ? "Boa escolha!" : "Vamos pensar juntos"}
          </h3>
          <p className="mt-2 text-lg text-game-ink leading-relaxed font-semibold">
            {text}
          </p>
        </div>
        <div className="hidden sm:block shrink-0 -mt-2 -mr-2">
          <Nina size={96} mood={correct ? "cheer" : "think"} />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96, translateY: 3 }}
          onClick={onContinue}
          className="font-display px-9 py-3 rounded-full bg-game-orange text-white text-lg font-bold shadow-toy-orange"
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
}
