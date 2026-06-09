import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CELLS } from "@/data/cells";
import { Board } from "./Board";
import { Dice } from "./Dice";
import { NinaSpeech } from "./NinaSpeech";
import { QuestionCard } from "./cards/QuestionCard";
import { ObjectCard } from "./cards/ObjectCard";
import { ConversationCard } from "./cards/ConversationCard";
import { SpecialCard } from "./cards/SpecialCard";
import { MatchChallengeCard } from "./cards/MatchChallengeCard";
import { HabitsChallengeCard } from "./cards/HabitsChallengeCard";
import { FeedbackCard } from "./cards/FeedbackCard";

type Stage =
  | { kind: "idle" }
  | { kind: "rolling" }
  | { kind: "moving" }
  | { kind: "card" }
  | { kind: "feedback"; correct: boolean; text: string; afterDelta?: number };

export function BoardGame({ onFinish }: { onFinish: () => void }) {
  const [position, setPosition] = useState(1);
  const [dice, setDice] = useState(1);
  const [stage, setStage] = useState<Stage>({ kind: "idle" });

  const cell = CELLS.find((c) => c.id === position)!;

  const openCardForCell = useCallback((id: number) => {
    const c = CELLS.find((x) => x.id === id)!;
    if (
      c.type === "question" ||
      c.type === "object" ||
      c.type === "conversation" ||
      c.type === "advance" ||
      c.type === "retreat" ||
      c.type === "match" ||
      c.type === "habits" ||
      c.type === "synthesis"
    ) {
      setStage({ kind: "card" });
    } else if (c.type === "finish") {
      setTimeout(onFinish, 500);
    } else {
      setStage({ kind: "idle" });
    }
  }, [onFinish]);

  // Auto-open card after movement completes
  useEffect(() => {
    if (stage.kind === "moving") {
      const t = setTimeout(() => openCardForCell(position), 700);
      return () => clearTimeout(t);
    }
  }, [stage, position, openCardForCell]);

  const rollDice = () => {
    if (stage.kind !== "idle") return;
    setStage({ kind: "rolling" });
    let count = 0;
    const interval = setInterval(() => {
      setDice(Math.floor(Math.random() * 3) + 1);
      count++;
      if (count >= 8) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 3) + 1;
        setDice(finalVal);
        const target = Math.min(30, position + finalVal);
        setPosition(target);
        setStage({ kind: "moving" });
      }
    }, 80);
  };

  const handleAnswer = (correct: boolean) => {
    setStage({
      kind: "feedback",
      correct,
      text: correct ? cell.feedbackCorrect! : cell.feedbackWrong!,
    });
  };

  const handleConversation = () => {
    setStage({
      kind: "feedback",
      correct: true,
      text: "Muito bem! Conversar ajuda a aprender com outras pessoas.",
    });
  };

  const handleSpecial = () => {
    const delta = cell.delta ?? 0;
    setStage({
      kind: "feedback",
      correct: delta >= 0,
      text:
        delta > 0
          ? "Que bom! Esse cuidado ajuda Nina e ela pode avançar."
          : delta < 0
          ? "Tudo bem, vamos voltar e lembrar do cuidado certo."
          : "Vamos seguir!",
      afterDelta: delta,
    });
  };

  const handleMatch = (correct: boolean) => {
    setStage({
      kind: "feedback",
      correct,
      text: correct
        ? "Excelente! Cada momento do dia pede um cuidado. Esses hábitos ajudam a manter o corpo limpo, saudável e confortável."
        : "Observe cada situação com atenção. O que aconteceu com Nina? Qual cuidado combina melhor?",
    });
  };

  const handleHabits = (correct: boolean) => {
    setStage({
      kind: "feedback",
      correct,
      text: correct
        ? "Muito bem! Esses hábitos ajudam a cuidar do corpo e da saúde."
        : "Algumas escolhas não ajudam a cuidar do corpo. Observe de novo e escolha hábitos de higiene.",
    });
  };

  const handleSynthesis = () => {
    setStage({
      kind: "feedback",
      correct: true,
      text: "Nina aprendeu que cada momento do dia pede um cuidado especial com o corpo!",
    });
  };

  const closeFeedback = () => {
    if (stage.kind !== "feedback") return;
    const delta = stage.afterDelta ?? 0;
    if (delta !== 0) {
      const next = Math.max(1, Math.min(30, position + delta));
      setPosition(next);
    }
    setStage({ kind: "idle" });
    if (position >= 30) {
      setTimeout(onFinish, 400);
    }
  };

  const renderCard = () => {
    if (stage.kind !== "card") return null;
    switch (cell.type) {
      case "question":
        return <QuestionCard cell={cell} onAnswer={handleAnswer} />;
      case "object":
        return <ObjectCard cell={cell} onAnswer={handleAnswer} />;
      case "conversation":
        return <ConversationCard cell={cell} onDone={handleConversation} />;
      case "advance":
      case "retreat":
        return <SpecialCard cell={cell} onContinue={handleSpecial} />;
      case "match":
        return <MatchChallengeCard onFinish={handleMatch} />;
      case "habits":
        return <HabitsChallengeCard onFinish={handleHabits} />;
      case "synthesis":
        return <SpecialCard cell={cell} onContinue={handleSynthesis} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-sky-50 to-amber-50 grid grid-cols-[1fr_320px] gap-4 p-5 relative">
      {/* Board */}
      <div className="bg-white/70 rounded-2xl border-2 border-sky-200 shadow-inner p-3">
        <Board position={position} />
      </div>

      {/* Side panel */}
      <div className="flex flex-col gap-3">
        <div className="bg-white rounded-2xl border-2 border-sky-200 p-3 shadow text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">Casa atual</p>
          <p className="text-3xl font-extrabold text-sky-700">{position}</p>
          <p className="text-sm text-slate-600">{cell.title}</p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-orange-200 p-4 shadow flex flex-col items-center gap-3">
          <Dice value={dice} rolling={stage.kind === "rolling"} />
          <button
            disabled={stage.kind !== "idle"}
            onClick={rollDice}
            className="w-full px-4 py-3 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white text-base font-bold shadow"
          >
            Jogar dado
          </button>
        </div>

        <NinaSpeech text="Toque no dado e vamos juntas!" />

        <div className="bg-white/80 rounded-2xl border-2 border-slate-200 p-3 text-xs space-y-1.5 mt-auto">
          <p className="font-bold text-slate-600 uppercase tracking-wide text-[10px]">Legenda</p>
          <LegendItem color="#bae6fd" border="#0284c7" label="Pergunta" />
          <LegendItem color="#bbf7d0" border="#16a34a" label="Cuidado do momento" />
          <LegendItem color="#fde68a" border="#d97706" label="Conversa" />
          <LegendItem color="#fed7aa" border="#ea580c" label="Avanço / Cuidado especial" />
        </div>
      </div>

      {/* Modal layer */}
      <AnimatePresence>
        {(stage.kind === "card" || stage.kind === "feedback") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 z-20"
          >
            {stage.kind === "card" && renderCard()}
            {stage.kind === "feedback" && (
              <FeedbackCard
                correct={stage.correct}
                text={stage.text}
                onContinue={closeFeedback}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LegendItem({ color, border, label }: { color: string; border: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-4 h-4 rounded-full border-2"
        style={{ background: color, borderColor: border }}
      />
      <span className="text-slate-700">{label}</span>
    </div>
  );
}
