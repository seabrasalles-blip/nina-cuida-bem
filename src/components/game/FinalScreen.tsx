import { motion } from "framer-motion";
import { Nina } from "./Nina";

export function FinalScreen({
  onReplay,
  onFinish,
}: {
  onReplay: () => void;
  onFinish: () => void;
}) {
  const confetti = Array.from({ length: 18 });
  const colors = ["#3fa9f5", "#7ed957", "#ffd93d", "#ff8c42", "#ffcfd2"];

  return (
    <div className="w-full h-full bg-room relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: 720, opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "linear",
          }}
          className="absolute w-3 h-3 rounded-sm pointer-events-none"
          style={{
            left: `${(i * 53) % 100}%`,
            background: colors[i % colors.length],
          }}
        />
      ))}

      <div className="relative z-10 h-full flex flex-col items-center justify-between px-12 pt-10 pb-10">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="font-display text-5xl font-bold text-game-ink drop-shadow">
            Corpo <span className="text-game-orange">bem</span> cuidado!
          </h1>
        </motion.header>

        {/* Main */}
        <main className="flex flex-1 items-center justify-center gap-10 w-full max-w-5xl">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 16 }}
            className="shrink-0"
          >
            <Nina size={240} mood="cheer" />
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-[520px] bg-white/95 border-[3px] border-game-sky rounded-3xl px-7 py-6 shadow-card-soft"
          >
            {/* Speech tail pointing to Nina */}
            <span
              aria-hidden
              className="absolute -left-3 top-10 w-5 h-5 rotate-45 bg-white/95 border-l-[3px] border-b-[3px] border-game-sky"
            />
            <p className="font-display text-game-orange font-bold text-sm uppercase tracking-wide mb-2">
              Parabéns!
            </p>
            <p className="text-game-ink text-lg leading-relaxed font-semibold">
              Hoje descobrimos que cuidar do corpo é importante em muitos momentos
              do dia. Lavar as mãos, escovar os dentes, usar lenço, tomar banho e
              beber água limpa são hábitos que ajudam a manter a saúde.
            </p>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96, translateY: 3 }}
            onClick={onReplay}
            className="font-display px-9 py-3.5 rounded-full bg-game-orange text-white text-lg font-bold shadow-toy-orange"
          >
            Jogar de novo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onFinish}
            className="font-display px-9 py-3.5 rounded-full bg-white text-game-ink text-lg font-bold border-[3px] border-game-sky-soft shadow-card-soft"
          >
            Finalizar
          </motion.button>
        </footer>
      </div>
    </div>
  );
}
