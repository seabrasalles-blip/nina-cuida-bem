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
  const confetti = Array.from({ length: 22 });
  const colors = ["#3fa9f5", "#7ed957", "#ffd93d", "#ff8c42", "#ffcfd2"];
  return (
    <div className="w-full h-full bg-room relative overflow-hidden flex flex-col items-center justify-center px-12">
      {confetti.map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: 700, opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "linear",
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${(i * 47) % 100}%`,
            background: colors[i % colors.length],
          }}
        />
      ))}

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-6xl font-bold text-game-ink drop-shadow z-10"
      >
        Corpo <span className="text-game-orange">bem</span> cuidado!
      </motion.h2>

      <div className="mt-3 z-10">
        <Nina size={180} mood="cheer" />
      </div>

      <div className="mt-3 z-10 max-w-2xl space-y-3">
        <NinaSpeech text="Hoje descobrimos que cuidar do corpo é importante em muitos momentos do dia." />
        <p className="text-center text-lg text-game-ink bg-white/90 rounded-2xl p-4 border-[3px] border-game-sky-soft shadow-card-soft font-semibold">
          Lavar as mãos, escovar os dentes, usar lenço e tomar banho são hábitos que
          ajudam a manter a saúde.
        </p>
      </div>

      <div className="mt-5 flex gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96, translateY: 3 }}
          onClick={onReplay}
          className="font-display px-8 py-3 rounded-full bg-game-orange text-white text-lg font-bold shadow-toy-orange"
        >
          Jogar de novo
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onFinish}
          className="font-display px-8 py-3 rounded-full bg-white text-game-ink text-lg font-bold border-[3px] border-game-sky-soft shadow-card-soft"
        >
          Finalizar
        </motion.button>
      </div>
    </div>
  );
}
