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
  start: "#ffd93d",
  finish: "#ff8c42",
  common: "#fff8ee",
  question: "#3fa9f5",
  object: "#7ed957",
  didYouKnow: "#a78bfa",
  advance: "#ff8c42",
  retreat: "#ff8c42",
  match: "#ff8c42",
  habits: "#ff8c42",
  synthesis: "#ff8c42",
};

const BORDERS: Record<CellType, string> = {
  start: "#c08600",
  finish: "#c75417",
  common: "#e3d9c5",
  question: "#1f78c1",
  object: "#3fa53f",
  didYouKnow: "#6d28d9",
  advance: "#c75417",
  retreat: "#c75417",
  match: "#c75417",
  habits: "#c75417",
  synthesis: "#c75417",
};

const ICONS: Partial<Record<CellType, string>> = {
  start: "🏁",
  finish: "🏆",
  question: "?",
  object: "🧼",
  didYouKnow: "💡",
  advance: "✨",
  retreat: "🔄",
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
  rejectSignal?: number;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const ninaBase = getCellPosition(position);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState(false);

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

  const trailPoints = CELLS.map((c) => {
    const p = getCellPosition(c.id);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-full touch-none"
    >
      <defs>
        <radialGradient id="boardBg" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#e8f4ff" />
          <stop offset="100%" stopColor="#fff8ee" />
        </radialGradient>
        <pattern
          id="dots"
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="#3fa9f5" opacity="0.12" />
        </pattern>
        <filter id="cellShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.18" />
        </filter>
        <radialGradient id="ninaPin" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfeaff" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width={WIDTH} height={HEIGHT} rx="20" fill="url(#boardBg)" />
      <rect width={WIDTH} height={HEIGHT} rx="20" fill="url(#dots)" />

      {/* Decorative room elements */}
      <g opacity="0.5">
        {/* window */}
        <rect x="22" y="20" width="90" height="64" rx="8" fill="#fff" stroke="#bcd9f0" strokeWidth="2" />
        <line x1="67" y1="20" x2="67" y2="84" stroke="#bcd9f0" strokeWidth="2" />
        <line x1="22" y1="52" x2="112" y2="52" stroke="#bcd9f0" strokeWidth="2" />
        <text x="86" y="48" fontSize="20">☁️</text>
        {/* shelf */}
        <rect x={WIDTH - 130} y="30" width="110" height="6" rx="3" fill="#e0c9a6" />
        <text x={WIDTH - 120} y="28" fontSize="18">🧴</text>
        <text x={WIDTH - 92} y="28" fontSize="18">🪥</text>
        <text x={WIDTH - 64} y="28" fontSize="18">🧼</text>
      </g>

      {/* Trail shadow */}
      <polyline
        points={trailPoints}
        fill="none"
        stroke="#e8c34a"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
        transform="translate(0, 4)"
      />
      {/* Trail */}
      <polyline
        points={trailPoints}
        fill="none"
        stroke="#ffd93d"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {/* Trail dashes */}
      <polyline
        points={trailPoints}
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 14"
        opacity="0.95"
      />

      {CELLS.map((c) => {
        const p = getCellPosition(c.id);
        const highlighted = isHighlighted(c.id);
        const target = isTarget(c.id);
        const fill = COLORS[c.type];
        const stroke = BORDERS[c.type];
        const isLight = c.type === "common";
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
                r={40}
                fill="none"
                stroke={target ? "#ef6b1e" : "#22d3ee"}
                strokeWidth={target ? 5 : 3}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  r: target ? [42, 48, 42] : [40, 44, 40],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
            {/* coin shadow */}
            <circle cx={p.x} cy={p.y + 4} r={34} fill="#1f2a44" opacity="0.18" />
            {/* base */}
            <circle
              cx={p.x}
              cy={p.y}
              r={34}
              fill={fill}
              stroke={stroke}
              strokeWidth={4}
              filter="url(#cellShadow)"
            />
            {/* icon */}
            <text
              x={p.x}
              y={p.y + 8}
              textAnchor="middle"
              fontSize="22"
              fill={isLight ? "#1f2a44" : "#fff"}
            >
              {ICONS[c.type] ?? ""}
            </text>
            {/* number badge */}
            <g>
              <circle
                cx={p.x + 22}
                cy={p.y - 22}
                r="11"
                fill="#fff"
                stroke={stroke}
                strokeWidth="2"
              />
              <text
                x={p.x + 22}
                y={p.y - 18}
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fill="#1f2a44"
                fontFamily="Fredoka, system-ui"
              >
                {c.id}
              </text>
            </g>
          </g>
        );
      })}

      {/* Nina token */}
      <motion.g
        animate={
          drag
            ? { x: ninaPos.x, y: ninaPos.y }
            : { x: ninaBase.x, y: ninaBase.y }
        }
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
              cy={-10}
              r={38}
              fill="none"
              stroke="#3fa9f5"
              strokeWidth={3}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.85, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
        {/* pin shadow */}
        <ellipse cx={0} cy={22} rx={20} ry={5} fill="#1f2a44" opacity="0.25" />
        {/* pin */}
        <circle
          cx={0}
          cy={-10}
          r={30}
          fill="url(#ninaPin)"
          stroke={selected ? "#ef6b1e" : "#3fa9f5"}
          strokeWidth={4}
        />
        {/* mini Nina face */}
        <g transform="translate(-22, -32)">
          <ellipse cx="22" cy="14" rx="20" ry="18" fill="#3a1f12" />
          <ellipse cx="22" cy="16" rx="16" ry="17" fill="#fdd9b5" />
          <path d="M5 8 Q22 -6 39 8 Q30 4 22 6 Q14 4 5 8 Z" fill="#3a1f12" />
          <circle cx="16" cy="18" r="2.2" fill="#1f1410" />
          <circle cx="28" cy="18" r="2.2" fill="#1f1410" />
          <circle cx="14" cy="22" r="2" fill="#ff8da1" opacity="0.6" />
          <circle cx="30" cy="22" r="2" fill="#ff8da1" opacity="0.6" />
          <path
            d="M16 26 Q22 30 28 26"
            stroke="#7a3a2a"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </motion.g>
    </svg>
  );
}
