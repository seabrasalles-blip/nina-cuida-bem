import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CELLS } from "@/data/cells";
import { Board } from "./Board";
import { Dice } from "./Dice";
import { Nina } from "./Nina";
import { NinaSpeech } from "./NinaSpeech";
import { MoveToast } from "./MoveToast";
import { QuestionCard } from "./cards/QuestionCard";
import { ObjectCard } from "./cards/ObjectCard";
import { DidYouKnowCard } from "./cards/DidYouKnowCard";
import { SpecialCard } from "./cards/SpecialCard";
import { MatchChallengeCard } from "./cards/MatchChallengeCard";
import { HabitsChallengeCard } from "./cards/HabitsChallengeCard";
import { FeedbackCard } from "./cards/FeedbackCard";

type Stage =
  | { kind: "idle" }
  | { kind: "rolling" }
  | { kind: "awaitingDrag"; steps: number; origin: number }
  | { kind: "transition" }
  | { kind: "card" }
  | { kind: "feedback"; correct: boolean; text: string }
  | { kind: "awaitingSpecialDrag"; delta: number; origin: number };

type Toast = { id: number; variant: "success" | "hint"; text: string };

export function BoardGame({ onFinish }: { onFinish: () => void }) {
  const [position, setPosition] = useState(1);
  const [dice, setDice] = useState(1);
  const [stage, setStage] = useState<Stage>({ kind: "idle" });
  const [toast, setToast] = useState<Toast | null>(null);
  const [rejectSignal, setRejectSignal] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cell = CELLS.find((c) => c.id === position)!;

  const showToast = (variant: Toast["variant"], text: string, ms = 1600) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    const id = Date.now();
    setToast({ id, variant, text });
    toastTimer.current = setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t));
    }, ms);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const openCardForCell = (id: number) => {
    const c = CELLS.find((x) => x.id === id)!;
    if (
      c.type === "question" ||
      c.type === "object" ||
      c.type === "didYouKnow" ||
      c.type === "advance" ||
      c.type === "retreat" ||
      c.type === "match" ||
      c.type === "habits" ||
      c.type === "synthesis"
    ) {
      setStage({ kind: "card" });
    } else if (c.type === "finish") {
      setTimeout(onFinish, 500);
      setStage({ kind: "idle" });
    } else {
      setStage({ kind: "idle" });
    }
  };

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
        setStage({ kind: "awaitingDrag", steps: finalVal, origin: position });
      }
    }, 80);
  };

  const handleDrop = (cellId: number | null) => {
    if (stage.kind === "awaitingDrag") {
      const target = Math.min(30, stage.origin + stage.steps);
      if (cellId === target) {
        setPosition(target);
        setStage({ kind: "transition" });
        showToast(
          "success",
          "Muito bem! Você contou as casas e levou a Nina ao lugar certo.",
          1300,
        );
        setTimeout(() => openCardForCell(target), 900);
      } else {
        setRejectSignal((n) => n + 1);
        const n = stage.steps;
        showToast(
          "hint",
          `Vamos contar de novo? O dado mostrou ${n}. Arraste ${n} ${n === 1 ? "casa" : "casas"} para frente.`,
          2200,
        );
      }
    } else if (stage.kind === "awaitingSpecialDrag") {
      const target = Math.max(1, Math.min(30, stage.origin + stage.delta));
      if (cellId === target) {
        setPosition(target);
        setStage({ kind: "transition" });
        showToast("success", "Boa! A Nina chegou ao lugar certo.", 1200);
        setTimeout(() => {
          if (target >= 30) {
            onFinish();
            return;
          }
          setStage({ kind: "idle" });
        }, 800);
      } else {
        setRejectSignal((n) => n + 1);
        const d = stage.delta;
        const abs = Math.abs(d);
        const dir = d > 0 ? "para frente" : "para trás";
        showToast(
          "hint",
          `Arraste ${abs} ${abs === 1 ? "casa" : "casas"} ${dir}.`,
          2200,
        );
      }
    }
  };

  const handleAnswer = (correct: boolean) => {
    setStage({
      kind: "feedback",
      correct,
      text: correct ? cell.feedbackCorrect! : cell.feedbackWrong!,
    });
  };

  const handleDidYouKnow = () => {
    setStage({ kind: "idle" });
    if (position >= 30) {
      setTimeout(onFinish, 400);
    }
  };

  const handleSpecial = () => {
    const delta = cell.delta ?? 0;
    if (delta === 0) {
      setStage({ kind: "idle" });
    } else {
      setStage({ kind: "awaitingSpecialDrag", delta, origin: position });
    }
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
      case "didYouKnow":
        return <DidYouKnowCard cell={cell} onDone={handleDidYouKnow} />;
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

  const { highlightedCells, targetCell, draggable } = useMemo(() => {
    if (stage.kind === "awaitingDrag") {
      const cells: number[] = [];
      for (let i = 1; i <= stage.steps; i++) {
        cells.push(Math.min(30, stage.origin + i));
      }
      return {
        highlightedCells: cells,
        targetCell: Math.min(30, stage.origin + stage.steps),
        draggable: true,
      };
    }
    if (stage.kind === "awaitingSpecialDrag") {
      const cells: number[] = [];
      const step = stage.delta > 0 ? 1 : -1;
      for (let i = 1; i <= Math.abs(stage.delta); i++) {
        cells.push(Math.max(1, Math.min(30, stage.origin + step * i)));
      }
      return {
        highlightedCells: cells,
        targetCell: Math.max(1, Math.min(30, stage.origin + stage.delta)),
        draggable: true,
      };
    }
    return {
      highlightedCells: [] as number[],
      targetCell: undefined,
      draggable: false,
    };
  }, [stage]);

  const orientationText = (() => {
    if (stage.kind === "awaitingDrag") {
      const n = stage.steps;
      return `O dado mostrou ${n}. Arraste a Nina ${n} ${n === 1 ? "casa" : "casas"} para frente.`;
    }
    if (stage.kind === "awaitingSpecialDrag") {
      const d = stage.delta;
      const abs = Math.abs(d);
      const dir = d > 0 ? "para frente" : "para trás";
      return `Arraste a Nina ${abs} ${abs === 1 ? "casa" : "casas"} ${dir}.`;
    }
    if (stage.kind === "rolling") return "Sorteando o dado...";
    return "Toque no dado e vamos juntas!";
  })();

  return (
    <div className="w-full h-full bg-room grid grid-cols-[1fr_320px] gap-4 p-5 relative">
      {/* Board panel */}
      <div className="relative bg-white/85 rounded-[28px] border-[4px] border-white shadow-toy p-3 overflow-hidden">
        <Board
          position={position}
          highlightedCells={highlightedCells}
          targetCell={targetCell}
          draggable={draggable}
          onDrop={handleDrop}
          rejectSignal={rejectSignal}
        />
        <AnimatePresence>
          {toast && (
            <MoveToast
              key={toast.id}
              text={toast.text}
              variant={toast.variant}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-3">
        {/* Current cell */}
        <div className="bg-white rounded-3xl border-[3px] border-game-sky-soft p-4 shadow-toy text-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-2 bg-game-sky" />
          <p className="font-display text-xs uppercase tracking-wide text-game-ink-soft font-bold">
            Casa atual
          </p>
          <p className="font-display text-4xl font-bold text-game-sky leading-none mt-1">
            {position}
          </p>
          <p className="text-sm text-game-ink font-semibold mt-1">
            {cell.title}
          </p>
        </div>

        {/* Dice */}
        <div className="bg-white rounded-3xl border-[3px] border-orange-200 p-4 shadow-toy flex flex-col items-center gap-3 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-2 bg-game-orange" />
          <Dice value={dice} rolling={stage.kind === "rolling"} />
          <button
            disabled={stage.kind !== "idle"}
            onClick={rollDice}
            className="font-display w-full px-4 py-3 rounded-full bg-game-orange hover:brightness-110 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed text-white text-base font-bold shadow-toy-orange active:translate-y-1 transition"
          >
            Jogar dado
          </button>
        </div>

        {/* Nina speech */}
        <div className="flex items-end gap-2">
          <div className="shrink-0">
            <Nina size={70} mood="happy" />
          </div>
          <div className="flex-1">
            <NinaSpeech text={orientationText} />
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white/90 rounded-3xl border-[3px] border-game-sky-soft p-3 mt-auto shadow-card-soft">
          <p className="font-display text-[11px] uppercase tracking-wide text-game-ink-soft font-bold mb-2">
            Legenda
          </p>
          <div className="flex flex-wrap gap-1.5">
            <LegendChip color="#3fa9f5" label="Pergunta" />
            <LegendChip color="#7ed957" label="Cuidado do momento" />
            <LegendChip color="#a78bfa" label="Você sabia?" />
            <LegendChip color="#ff8c42" label="Especial" />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {(stage.kind === "card" || stage.kind === "feedback") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-6 z-20"
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

function LegendChip({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border-2 text-[11px] font-bold text-game-ink"
      style={{ borderColor: color }}
    >
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
