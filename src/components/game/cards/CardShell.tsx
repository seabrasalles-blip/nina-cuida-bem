import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Nina, type NinaMood } from "../Nina";

type Tone = "sky" | "green" | "amber" | "orange";

const TONE: Record<
  Tone,
  { border: string; chipBg: string; chipText: string; badgeBg: string }
> = {
  sky: {
    border: "border-game-sky",
    chipBg: "bg-game-sky-soft",
    chipText: "text-sky-700",
    badgeBg: "bg-game-sky/15 text-sky-700",
  },
  green: {
    border: "border-game-green",
    chipBg: "bg-emerald-100",
    chipText: "text-emerald-700",
    badgeBg: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    border: "border-game-sun",
    chipBg: "bg-amber-100",
    chipText: "text-amber-800",
    badgeBg: "bg-amber-100 text-amber-700",
  },
  orange: {
    border: "border-game-orange",
    chipBg: "bg-orange-100",
    chipText: "text-orange-700",
    badgeBg: "bg-orange-100 text-orange-700",
  },
};

export function CardShell({
  tone,
  tag,
  cellId,
  prompt,
  hint,
  ninaMood = "think",
  showNina = true,
  children,
  footer,
  maxWidth = "max-w-[920px]",
}: {
  tone: Tone;
  tag: string;
  cellId: number;
  prompt: string;
  hint?: string;
  ninaMood?: NinaMood;
  showNina?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}) {
  const t = TONE[tone];
  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className={`bg-white rounded-[28px] p-7 shadow-toy border-[4px] ${t.border} ${maxWidth} w-full`}
    >
      <div className="flex items-start gap-5">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 ${t.chipBg} ${t.chipText} rounded-full font-display text-sm font-bold uppercase tracking-wide`}
            >
              {tag}
            </span>
            <span
              className={`px-2.5 py-1 ${t.badgeBg} rounded-full text-xs font-bold uppercase`}
            >
              Casa {cellId}
            </span>
          </div>
          <h3 className="font-display mt-3 text-[28px] leading-tight font-bold text-game-ink">
            {prompt}
          </h3>
          {hint && (
            <p className="mt-2 text-base text-game-ink-soft font-semibold">
              {hint}
            </p>
          )}
        </div>
        {showNina && (
          <div className="shrink-0 -mt-1 -mr-1 hidden sm:block">
            <Nina size={96} mood={ninaMood} />
          </div>
        )}
      </div>

      <div className="mt-5">{children}</div>

      {footer && <div className="mt-5 flex justify-end">{footer}</div>}
    </motion.div>
  );
}

export function PrimaryButton({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.96, translateY: 3 }}
      disabled={disabled}
      onClick={onClick}
      className="font-display px-8 py-3 rounded-full bg-game-orange text-white text-lg font-bold shadow-toy-orange disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
    >
      {children}
    </motion.button>
  );
}
