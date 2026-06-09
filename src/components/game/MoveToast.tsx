import { motion } from "framer-motion";

export type ToastVariant = "success" | "hint";

export function MoveToast({
  text,
  variant,
}: {
  text: string;
  variant: ToastVariant;
}) {
  const styles =
    variant === "success"
      ? "bg-emerald-500 border-emerald-600 text-white"
      : "bg-orange-400 border-orange-500 text-white";
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
    >
      <div
        className={`px-5 py-3 rounded-2xl border-2 shadow-xl font-bold text-sm sm:text-base max-w-md text-center ${styles}`}
      >
        {text}
      </div>
    </motion.div>
  );
}
