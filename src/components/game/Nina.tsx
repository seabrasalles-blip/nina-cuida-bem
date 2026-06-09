// Simple SVG illustration of Nina — a cheerful child character.
export function Nina({ size = 160, mood = "happy" }: { size?: number; mood?: "happy" | "wave" | "cheer" }) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={size} className="select-none">
      {/* hair back */}
      <ellipse cx="100" cy="95" rx="62" ry="58" fill="#4a2c2a" />
      {/* face */}
      <ellipse cx="100" cy="100" rx="48" ry="52" fill="#f5cdab" />
      {/* hair bangs */}
      <path d="M55 80 Q100 40 145 80 Q130 70 100 72 Q70 70 55 80Z" fill="#4a2c2a" />
      {/* cheeks */}
      <circle cx="72" cy="115" r="7" fill="#f4a8a8" opacity="0.7" />
      <circle cx="128" cy="115" r="7" fill="#f4a8a8" opacity="0.7" />
      {/* eyes */}
      <circle cx="80" cy="100" r="6" fill="#2a1d1a" />
      <circle cx="120" cy="100" r="6" fill="#2a1d1a" />
      <circle cx="82" cy="98" r="2" fill="#fff" />
      <circle cx="122" cy="98" r="2" fill="#fff" />
      {/* mouth */}
      {mood === "cheer" ? (
        <path d="M85 128 Q100 145 115 128" stroke="#7a3a2a" strokeWidth="3" fill="#ffb3b3" />
      ) : (
        <path d="M88 128 Q100 138 112 128" stroke="#7a3a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {/* body / shirt */}
      <path d="M55 165 Q100 150 145 165 L155 230 L45 230 Z" fill="#52b6e0" />
      {/* collar */}
      <path d="M85 158 Q100 170 115 158 L110 170 Q100 178 90 170 Z" fill="#f5cdab" />
      {/* arms */}
      {mood === "wave" ? (
        <path d="M55 170 Q35 140 50 110 L65 115 Q55 145 70 175 Z" fill="#f5cdab" />
      ) : (
        <path d="M55 170 L40 220 L55 225 L70 180 Z" fill="#f5cdab" />
      )}
      <path d="M145 170 L160 220 L145 225 L130 180 Z" fill="#f5cdab" />
    </svg>
  );
}
