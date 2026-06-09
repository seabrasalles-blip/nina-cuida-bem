import { motion } from "framer-motion";
import type { Cell } from "@/data/cells";
import { MessagesSquare } from "lucide-react";

export function ConversationCard({
  cell,
  onDone,
}: {
  cell: Cell;
  onDone: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-7 shadow-2xl border-4 border-amber-300 max-w-2xl w-full"
    >
      <div className="flex items-center gap-2 text-amber-700 font-bold uppercase tracking-wide text-sm">
        <MessagesSquare size={18} />
        <span className="px-2 py-0.5 bg-amber-100 rounded-full">Converse e avance</span>
        <span>Casa {cell.id}</span>
      </div>
      <p className="mt-4 text-2xl text-slate-800 font-medium leading-snug">{cell.body}</p>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onDone}
          className="px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold shadow"
        >
          Conversei
        </button>
      </div>
    </motion.div>
  );
}
