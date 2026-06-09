import { motion } from "framer-motion";
import { Nina } from "./Nina";

export function StartScreen({ onStart }: { onStart: () => void }) {
  const items = ["🧼", "🪥", "🧺", "🪮", "🧻"];
  return (
    <div className="w-full h-full bg-gradient-to-br from-sky-200 via-amber-100 to-rose-200 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {items.map((emoji, i) => (
        <motion.div
          key={i}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: [0, -10, 0], opacity: 1 }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          className="absolute text-5xl"
          style={{
            top: `${15 + (i % 2) * 60}%`,
            left: `${8 + i * 17}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-6xl font-extrabold text-sky-800 drop-shadow-sm tracking-tight">
          Corpo Bem Cuidado
        </h1>
        <p className="mt-4 text-xl text-slate-700 font-medium">
          Jogue o dado e ajude Nina a cuidar do corpo durante o dia.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-6"
      >
        <Nina size={200} mood="wave" />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="relative z-10 mt-4 px-10 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-2xl font-bold shadow-lg"
      >
        Começar
      </motion.button>
    </div>
  );
}
