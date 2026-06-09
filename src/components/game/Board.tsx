import { motion } from "framer-motion";
import { CELLS, type CellType } from "@/data/cells";

const COLS = 6;
const ROWS = 5;
const WIDTH = 720;
const HEIGHT = 560;

const cellW = WIDTH / COLS;
const cellH = HEIGHT / ROWS;

export function getCellPosition(id: number) {
  const idx = id - 1;
  const row = Math.floor(idx / COLS);
  const colInRow = idx % COLS;
  // snake: even rows left->right, odd rows right->left
  const col = row % 2 === 0 ? colInRow : COLS - 1 - colInRow;
  return {
    x: col * cellW + cellW / 2,
    y: row * cellH + cellH / 2,
  };
}

const COLORS: Record<CellType, string> = {
  start: "#fbbf24",
  finish: "#fbbf24",
  common: "#f1f5f9",
  question: "#bae6fd",
  object: "#bbf7d0",
  conversation: "#fde68a",
  advance: "#fed7aa",
  retreat: "#fed7aa",
  match: "#fdba74",
  habits: "#fdba74",
  synthesis: "#fdba74",
};

const BORDERS: Record<CellType, string> = {
  start: "#d97706",
  finish: "#d97706",
  common: "#cbd5e1",
  question: "#0284c7",
  object: "#16a34a",
  conversation: "#d97706",
  advance: "#ea580c",
  retreat: "#ea580c",
  match: "#c2410c",
  habits: "#c2410c",
  synthesis: "#c2410c",
};

const ICONS: Partial<Record<CellType, string>> = {
  start: "🏁",
  finish: "🏆",
  question: "?",
  object: "🧼",
  conversation: "💬",
  advance: "➡️",
  retreat: "↩️",
  match: "🔗",
  habits: "⭐",
  synthesis: "📘",
};

export function Board({ position }: { position: number }) {
  // build path polyline
  const pathPoints = CELLS.map((c) => {
    const p = getCellPosition(c.id);
    return `${p.x},${p.y}`;
  }).join(" ");

  const ninaPos = getCellPosition(position);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full">
      {/* trail */}
      <polyline
        points={pathPoints}
        fill="none"
        stroke="#fcd34d"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
        strokeDasharray="2 10"
      />

      {CELLS.map((c) => {
        const p = getCellPosition(c.id);
        return (
          <g key={c.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r={32}
              fill={COLORS[c.type]}
              stroke={BORDERS[c.type]}
              strokeWidth={3}
            />
            <text
              x={p.x}
              y={p.y - 6}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#1e293b"
            >
              {c.id}
            </text>
            <text
              x={p.x}
              y={p.y + 12}
              textAnchor="middle"
              fontSize="14"
              fill="#1e293b"
            >
              {ICONS[c.type] ?? ""}
            </text>
          </g>
        );
      })}

      {/* Nina token */}
      <motion.g
        animate={{ x: ninaPos.x, y: ninaPos.y }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <circle cx={0} cy={-6} r={20} fill="#fff" stroke="#0ea5e9" strokeWidth={3} />
        <text x={0} y={0} textAnchor="middle" fontSize="22">👧</text>
      </motion.g>
    </svg>
  );
}
