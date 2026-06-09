import { motion } from "framer-motion";
import { Nina } from "./Nina";
import { NinaSpeech } from "./NinaSpeech";

export function FinalScreen({
  onReplay,
  onFinish,
}: {
  onReplay: () => void;
  onFinish: () => void;
}) {
  const icons = ["🧼", "🪥", "🧻", "🚿", "🧺"];
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-100 via-rose-100 to-sky-200 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {icons.map((ic, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ delay: 0.2 + i * 0.1, repeat: Infinity, repeatDelay: 2 }}
          className="absolute text-5xl"
          style={{ top: `${20 + (i % 2) * 50}%`, left: `${5 + i * 18}%` }}
        >
          {ic}
        </motion.div>
      ))}

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl font-extrabold text-rose-700 drop-shadow"
      >
        Corpo bem cuidado!
      </motion.h2>

      <div className="mt-4 z-10">
        <Nina size={170} mood="cheer" />
      </div>

      <div className="mt-3 z-10 max-w-2xl space-y-3">
        <NinaSpeech text="Hoje descobrimos que cuidar do corpo é importante em muitos momentos do dia." />
        <p className="text-center text-lg text-slate-700 bg-white/80 rounded-xl p-3 border-2 border-rose-200">
          Lavar as mãos, escovar os dentes, usar lenço e tomar banho são hábitos que ajudam a manter a saúde.
        </p>
        <p className="text-center text-base text-slate-600 italic">
          Agora, conte para alguém: qual cuidado você faz todos os dias?
        </p>
      </div>

      <div className="mt-5 flex gap-4 z-10">
        <button
          onClick={onReplay}
          className="px-8 py-3 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-lg font-bold shadow-lg"
        >
          Jogar novamente
        </button>
        <button
          onClick={onFinish}
          className="px-8 py-3 rounded-full bg-slate-700 hover:bg-slate-800 text-white text-lg font-bold shadow-lg"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}
