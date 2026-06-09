import { motion } from "framer-motion";
import { Nina } from "./Nina";
import { NinaSpeech } from "./NinaSpeech";

export function InstructionsScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-sky-100 px-16 py-10 flex flex-col">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-extrabold text-sky-800 text-center"
      >
        Como jogar
      </motion.h2>

      <div className="flex-1 grid grid-cols-[1fr_auto] gap-8 items-center mt-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-5"
        >
          <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-sky-200">
            <p className="text-2xl text-slate-700 leading-relaxed">
              Clique no <b className="text-orange-600">dado</b> para avançar pelo caminho.
              Em algumas casas, ajude Nina a escolher o cuidado certo para cada momento do dia.
            </p>
          </div>

          <NinaSpeech text="Vamos descobrir juntos como cuidar do corpo e da saúde?" />

          <div className="bg-amber-100 border-2 border-amber-300 rounded-xl p-4 text-amber-900 text-lg">
            💡 Quando aparecer uma pergunta, escolha a resposta e leia o feedback.
          </div>
        </motion.div>

        <Nina size={220} mood="happy" />
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="px-10 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold shadow-lg"
        >
          Ir para o jogo
        </motion.button>
      </div>
    </div>
  );
}
