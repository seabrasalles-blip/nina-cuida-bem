import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Nina } from "./Nina";

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-full h-full bg-room relative overflow-hidden flex">
      {/* Sun */}
      <motion.div
        className="absolute -top-10 -right-10 w-56 h-56 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #fff3a8, #ffd93d 60%, #ff8c42)",
          filter: "blur(1px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {/* Clouds */}
      <Cloud className="absolute top-10 left-10 w-28 opacity-90" />
      <Cloud className="absolute top-24 left-1/3 w-20 opacity-80" />
      <Cloud className="absolute top-6 right-1/3 w-24 opacity-85" />

      {/* Decorative board trail */}
      <svg viewBox="0 0 1200 675" className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M -20 540 Q 200 460 380 520 T 760 500 T 1180 460"
          fill="none"
          stroke="#ffd93d"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.55"
          strokeDasharray="4 18"
        />
        {[
          [120, 530],
          [320, 510],
          [520, 510],
          [720, 498],
          [920, 480],
          [1100, 466],
        ].map(([x, y], i) => (
          <g key={i} opacity="0.85">
            <circle cx={x} cy={y + 4} r="22" fill="#1f2a44" opacity="0.12" />
            <circle
              cx={x}
              cy={y}
              r="22"
              fill={i === 5 ? "#ff8c42" : i % 2 === 0 ? "#3fa9f5" : "#7ed957"}
              stroke="#fff"
              strokeWidth="4"
            />
          </g>
        ))}
      </svg>

      {/* Left text column */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pl-20 pr-6 max-w-[680px]">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/90 border-2 border-game-sky-soft text-game-sky text-xs font-bold tracking-wide uppercase shadow-card-soft"
        >
          <span>🎲</span>
          <span>Jogo de Tabuleiro</span>
        </motion.div>
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-display mt-4 text-[68px] leading-[1] font-bold text-game-ink drop-shadow-sm"
        >
          Corpo <span className="text-game-orange">Bem</span> Cuidado
        </motion.h1>
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-xl text-game-ink-soft font-semibold leading-snug max-w-md"
        >
          Ajude a Nina a cuidar do corpo em cada momento do dia.
        </motion.p>
        <motion.button
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96, translateY: 4 }}
          onClick={onStart}
          className="font-display mt-7 self-start inline-flex items-center gap-3 px-9 py-4 rounded-full bg-game-orange text-white text-2xl font-bold shadow-toy-orange"
        >
          <span className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center">
            <Play size={22} fill="white" />
          </span>
          Começar
        </motion.button>
        <p className="mt-3 text-sm text-game-ink-soft font-semibold"></p>
      </div>

      {/* Nina + satellites */}
      <div className="relative z-10 w-[480px] flex items-center justify-center">
        {/* Podium */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-16 w-[360px] h-[360px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="relative"
        >
          <Nina size={170} mood="wave" />
        </motion.div>

        {/* Floating items */}
        {[
          { emoji: "🧼", top: "8%", left: "10%", delay: 0 },
          { emoji: "🪥", top: "16%", right: "8%", delay: 0.4 },
          { emoji: "🧺", bottom: "22%", left: "4%", delay: 0.8 },
          { emoji: "🚿", bottom: "12%", right: "6%", delay: 1.2 },
        ].map((it, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: it.delay,
              ease: "easeInOut",
            }}
            className="absolute text-5xl drop-shadow-lg"
            style={{
              top: it.top,
              bottom: it.bottom,
              left: it.left,
              right: it.right,
            }}
          >
            <span className="inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-white border-[3px] border-game-sky-soft shadow-card-soft">
              {it.emoji}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 50" className={className}>
      <ellipse cx="30" cy="30" rx="22" ry="16" fill="#fff" />
      <ellipse cx="55" cy="24" rx="20" ry="18" fill="#fff" />
      <ellipse cx="75" cy="32" rx="18" ry="14" fill="#fff" />
    </svg>
  );
}
