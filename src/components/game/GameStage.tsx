import { useEffect, useState, type ReactNode } from "react";

export function GameStage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const sx = window.innerWidth / 1200;
      const sy = window.innerHeight / 675;
      setScale(Math.min(sx, sy));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-sky-100 via-amber-50 to-rose-100 flex items-center justify-center">
      <div
        style={{
          width: 1200,
          height: 675,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="relative shadow-2xl rounded-3xl overflow-hidden bg-white"
      >
        {children}
      </div>
    </div>
  );
}
