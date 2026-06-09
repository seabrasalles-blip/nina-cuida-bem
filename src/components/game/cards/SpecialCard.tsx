import type { Cell } from "@/data/cells";
import { CardShell, PrimaryButton } from "./CardShell";

export function SpecialCard({
  cell,
  onContinue,
}: {
  cell: Cell;
  onContinue: () => void;
}) {
  const isAdvance = cell.type === "advance";
  const isSynthesis = cell.type === "synthesis";
  return (
    <CardShell
      tone="orange"
      tag={isSynthesis ? "Síntese" : "Cuidado especial"}
      cellId={cell.id}
      prompt={cell.body ?? cell.title}
      ninaMood={isAdvance ? "cheer" : "think"}
      footer={<PrimaryButton onClick={onContinue}>Continuar</PrimaryButton>}
    >
      <div className="bg-game-cream rounded-2xl p-6 border-[3px] border-orange-200 text-center text-7xl">
        {isSynthesis ? "📘" : isAdvance ? "✨" : "🔄"}
      </div>
    </CardShell>
  );
}
