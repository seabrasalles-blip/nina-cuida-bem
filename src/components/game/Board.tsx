import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function Board({
  position,
  highlightedCells = [],
  targetCell,
  draggable = false,
  onDrop,
  rejectSignal = 0,
}: {
  position: number;
  highlightedCells?: number[];
  targetCell?: number;
  draggable?: boolean;
  onDrop?: (cellId: number | null) => void;
  /** Increment this number to make Nina snap back to `position`. */
  rejectSignal?: number;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const ninaBase = getCellPosition(position);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState(false);

  // Snap back when rejectSignal changes
  useEffect(() => {
    setDrag(null);
  }, [rejectSignal, position]);

  const toLocal = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const local = pt.matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  };

  const findNearestCell = (x: number, y: number): number | null => {
    let best: { id: number; d: number } | null = null;
    for (const c of CELLS) {
      const p = getCellPosition(c.id);
      const d = Math.hypot(p.x - x, p.y - y);
      if (!best || d < best.d) best = { id: c.id, d };
    }
    if (best && best.d <= 45) return best.id;
    return null;
  };

  const onPointerDown = (e: React.PointerEvent<SVGGElement>) => {
    if (!draggable) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const local = toLocal(e.clientX, e.clientY);
    setDrag(local);
    setSelected(false);
  };


  const onPointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!draggable || drag === null) return;
    const local = toLocal(e.clientX, e.clientY);
    setDrag(local);
  };

  const onPointerUp = (e: React.PointerEvent<SVGGElement>) => {
    if (!draggable || drag === null) return;
    const local = toLocal(e.clientX, e.clientY);
    const id = findNearestCell(local.x, local.y);
    setDrag(null);
    onDrop?.(id);
  };

  const handleCellClick = (id: number) => {
    if (!draggable) return;
    if (selected && highlightedCells.includes(id)) {
      setSelected(false);
      onDrop?.(id);
    }
  };

  const ninaPos = drag ?? ninaBase;
  const isHighlighted = (id: number) => highlightedCells.includes(id);
  const isTarget = (id: number) => targetCell === id;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-full touch-none"
    >
      {/* trail */}
      <polyline
        points={CELLS.map((c) => {
          const p = getCellPosition(c.id);
          return `${p.x},${p.y}`;
        }).join(" ")}
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
        const highlighted = isHighlighted(c.id);
        const target = isTarget(c.id);
        return (
          <g
            key={c.id}
            onClick={() => handleCellClick(c.id)}
            style={{ cursor: highlighted && selected ? "pointer" : "default" }}
          >
            {highlighted && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={36}
                fill="none"
                stroke={target ? "#f59e0b" : "#22d3ee"}
                strokeWidth={target ? 5 : 3}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  r: target ? [38, 44, 38] : [36, 40, 36],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
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
        animate={drag ? { x: ninaPos.x, y: ninaPos.y } : { x: ninaBase.x, y: ninaBase.y }}
        transition={
          drag
            ? { duration: 0 }
            : { type: "spring", stiffness: 200, damping: 18 }
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={(e) => {
          if (!draggable) return;
          e.stopPropagation();
          setSelected((s) => !s);
        }}
        style={{
          cursor: draggable ? (drag ? "grabbing" : "grab") : "default",
          touchAction: "none",
        }}
      >
        <AnimatePresence>
          {(draggable || selected) && (
            <motion.circle
              cx={0}
              cy={-6}
              r={32}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth={3}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
        <circle
          cx={0}
          cy={-6}
          r={26}
          fill="#fff"
          stroke={selected ? "#f59e0b" : "#0ea5e9"}
          strokeWidth={3}
        />
        <text x={0} y={2} textAnchor="middle" fontSize="28">
          👧
        </text>
      </motion.g>
    </svg>
  );
}
