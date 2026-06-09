import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb } from "lucide-react";

export type ToastVariant = "success" | "hint";

export function MoveToast({
  text,
  variant,
}: {
  text: string;
  variant: ToastVariant;
}) {
  const isOk = variant === "success";
  return (
    <motion.div
      initial={{ y: -24, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -24, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
    >
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-full border-[3px] shadow-toy max-w-md text-center ${
          isOk
            ? "bg-game-green border-emerald-700 text-white"
            : "bg-game-sun border-amber-500 text-game-ink"
        }`}
      >
        <span className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
          {isOk ? (
            <CheckCircle2 className="text-emerald-600" size={22} />
          ) : (
            <Lightbulb className="text-amber-600" size={22} />
          )}
        </span>
        <p className="font-display text-base sm:text-lg font-semibold">{text}</p>
      </div>
    </motion.div>
  );
}
