import { motion } from "framer-motion";
import { Dice5, Hand, HelpCircle } from "lucide-react";
import { Nina } from "./Nina";
import { NinaSpeech } from "./NinaSpeech";

const STEPS = [
  {
    n: 1,
    icon: Dice5,
    color: "bg-game-sky",
    title: "Jogue o dado",
    text: "Toque no dado para descobrir quantas casas avançar.",
  },
  {
    n: 2,
    icon: Hand,
    color: "bg-game-green",
    title: "Movimente a Nina",
    text: "Conte as casas e leve a Nina até o ponto certo.",
  },
  {
    n: 3,
    icon: HelpCircle,
    color: "bg-game-orange",
    title: "Responda",
    text: "Pense no momento do dia e escolha o melhor cuidado.",
  },
];

export function InstructionsScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="w-full h-full bg-room relative overflow-hidden px-14 py-8 flex flex-col">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-5xl font-bold text-game-ink text-center"
      >
        Como jogar
      </motion.h2>

      <div className="mt-6 grid grid-cols-[1fr_240px] gap-8 items-center flex-1">
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {STEPS.map(({ n, icon: Icon, color, title, text }, i) => (
              <motion.div
                key={n}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-white rounded-3xl p-5 border-[3px] border-game-sky-soft shadow-toy relative"
              >
                <div
                  className={`absolute -top-4 -right-4 w-10 h-10 rounded-full ${color} text-white font-display text-xl font-bold flex items-center justify-center shadow-md`}
                >
                  {n}
                </div>
                <div className={`w-12 h-12 rounded-2xl ${color}/15 flex items-center justify-center`}>
                  <Icon className="text-game-ink" size={28} />
                </div>
                <h3 className="font-display mt-3 text-xl text-game-ink font-bold">{title}</h3>
                <p className="mt-1 text-sm text-game-ink-soft font-semibold leading-snug">{text}</p>
              </motion.div>
            ))}
          </div>
          <NinaSpeech text="Vamos descobrir como cuidar do corpo e da saúde?" />
        </div>

        <div className="flex flex-col items-center">
          <Nina size={220} mood="happy" />
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96, translateY: 3 }}
          onClick={onContinue}
          className="font-display px-10 py-4 rounded-full bg-game-orange text-white text-xl font-bold shadow-toy-orange"
        >
          Ir para o jogo
        </motion.button>
      </div>
    </div>
  );
}
