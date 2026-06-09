import { motion } from "framer-motion";

const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[30, 30], [70, 70]],
  3: [[28, 28], [50, 50], [72, 72]],
};

export function Dice({ value, rolling }: { value: number; rolling: boolean }) {
  return (
    <motion.div
      animate={
        rolling
          ? { rotate: [0, 360, 720], scale: [1, 1.12, 1] }
          : { rotate: 0, scale: 1 }
      }
      transition={{ duration: 0.6 }}
      className="w-28 h-28 rounded-3xl relative shadow-toy"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #fff4e0 100%)",
        border: "5px solid var(--game-orange)",
      }}
    >
      {PIPS[value]?.map(([x, y], i) => (
        <div
          key={i}
          className="absolute w-5 h-5 rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle at 35% 35%, #ffb96a, #ef6b1e)",
            boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.2)",
          }}
        />
      ))}
    </motion.div>
  );
}
