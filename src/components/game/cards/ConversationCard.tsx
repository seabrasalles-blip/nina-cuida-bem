import type { Cell } from "@/data/cells";
import { CardShell, PrimaryButton } from "./CardShell";

export function ConversationCard({
  cell,
  onDone,
}: {
  cell: Cell;
  onDone: () => void;
}) {
  return (
    <CardShell
      tone="amber"
      tag="Converse e avance"
      cellId={cell.id}
      prompt={cell.body ?? cell.title}
      ninaMood="happy"
      footer={<PrimaryButton onClick={onDone}>Conversei</PrimaryButton>}
    >
      <div className="bg-game-cream rounded-2xl p-5 border-[3px] border-amber-200 text-game-ink-soft font-semibold text-base">
        💬 Compartilhe sua resposta com um colega ou com a turma.
      </div>
    </CardShell>
  );
}
