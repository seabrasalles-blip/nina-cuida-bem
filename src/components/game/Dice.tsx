import { motion } from "framer-motion";

const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[30, 30], [70, 70]],
  3: [[28, 28], [50, 50], [72, 72]],
};

export function Dice({ value, rolling }: { value: number; rolling: boolean }) {
  return (
    <motion.div
      animate={rolling ? { rotate: [0, 360, 720], scale: [1, 1.1, 1] } : { rotate: 0 }}
      transition={{ duration: 0.6 }}
      className="w-24 h-24 bg-white rounded-2xl border-4 border-orange-400 shadow-lg relative"
    >
      {PIPS[value]?.map(([x, y], i) => (
        <div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-orange-500"
          style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
        />
      ))}
    </motion.div>
  );
}
