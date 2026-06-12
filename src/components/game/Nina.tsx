// Nina — friendly illustrated character. Clean redesign with stable poses.
export type NinaMood = "happy" | "wave" | "cheer" | "think";

export function Nina({
  size = 180,
  mood = "happy",
}: {
  size?: number;
  mood?: NinaMood;
}) {
  // Shared anchor points
  // Face center ~ (110, 96), face oval rx=42 ry=46 → face right edge ~152
  // Shoulders at y=178, left shoulder x=78, right shoulder x=142
  // Body roughly y 168..222, legs 222..246

  return (
    <svg
      viewBox="0 0 220 260"
      width={size}
      height={size}
      className="select-none drop-shadow-[0_10px_18px_rgba(31,42,68,0.18)]"
    >
      <defs>
        <radialGradient id="ninaSkin" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fde0c0" />
          <stop offset="100%" stopColor="#f0bd92" />
        </radialGradient>
        <linearGradient id="ninaShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6ec8f7" />
          <stop offset="100%" stopColor="#3fa9f5" />
        </linearGradient>
        <linearGradient id="ninaOverall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb35c" />
          <stop offset="100%" stopColor="#ff8c42" />
        </linearGradient>
        <radialGradient id="ninaHair" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#5a3320" />
          <stop offset="100%" stopColor="#3a1f12" />
        </radialGradient>
      </defs>

      {/* 1. Ground shadow */}
      <ellipse cx="110" cy="250" rx="56" ry="6" fill="#1f2a44" opacity="0.18" />

      {/* 2. Legs + shoes */}
      <rect x="86" y="216" width="16" height="28" rx="7" fill="url(#ninaSkin)" />
      <rect x="118" y="216" width="16" height="28" rx="7" fill="url(#ninaSkin)" />
      <ellipse cx="94" cy="247" rx="13" ry="6" fill="#2b2a3a" />
      <ellipse cx="126" cy="247" rx="13" ry="6" fill="#2b2a3a" />

      {/* 3. Arms — drawn behind body so shoulders integrate cleanly */}
      <Arms mood={mood} />

      {/* 4. Body — shirt + overall */}
      {/* Shirt (visible at neckline + sleeves) */}
      <path
        d="M70 178 Q110 168 150 178 L150 192 Q110 184 70 192 Z"
        fill="url(#ninaShirt)"
      />
      {/* Overall body */}
      <path
        d="M70 188 Q110 180 150 188 L156 222 Q110 232 64 222 Z"
        fill="url(#ninaOverall)"
      />
      {/* Overall straps */}
      <path d="M86 188 Q92 178 96 170" stroke="#d6691f" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M134 188 Q128 178 124 170" stroke="#d6691f" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Pocket */}
      <rect x="98" y="200" width="24" height="18" rx="3" fill="#ffd29b" opacity="0.55" />
      <text x="110" y="214" textAnchor="middle" fontSize="11" fill="#c75417" fontWeight="700">★</text>

      {/* 5. Neck */}
      <rect x="102" y="156" width="16" height="14" rx="5" fill="url(#ninaSkin)" />

      {/* 6. Hair back — soft rounded bob, NO side puffs */}
      <path
        d="M62 96 Q62 48 110 44 Q158 48 158 96 L158 138 Q156 152 144 156 L76 156 Q64 152 62 138 Z"
        fill="url(#ninaHair)"
      />

      {/* 7. Face */}
      <ellipse cx="110" cy="100" rx="42" ry="46" fill="url(#ninaSkin)" />
      {/* Ears (subtle, tucked in) */}
      <ellipse cx="69" cy="104" rx="5" ry="8" fill="url(#ninaSkin)" />
      <ellipse cx="151" cy="104" rx="5" ry="8" fill="url(#ninaSkin)" />

      {/* 8. Fringe — soft sweep, does not cover eyes */}
      <path
        d="M70 78 Q90 56 110 62 Q138 56 152 82 Q140 74 118 78 Q96 76 78 86 Q72 82 70 78 Z"
        fill="url(#ninaHair)"
      />
      {/* Side hair tufts blending the bob into the face — gentle, not blobs */}
      <path d="M64 96 Q60 124 70 148 Q72 132 70 110 Z" fill="url(#ninaHair)" />
      <path d="M156 96 Q160 124 150 148 Q148 132 150 110 Z" fill="url(#ninaHair)" />

      {/* 9. Tiara/headband */}
      <path
        d="M74 72 Q110 60 146 72 L144 80 Q110 70 76 80 Z"
        fill="#ff8c42"
        stroke="#c75417"
        strokeWidth="1.5"
      />
      <circle cx="110" cy="68" r="3.5" fill="#fff3a8" stroke="#c75417" strokeWidth="1" />

      {/* 10. Face features */}
      <Face mood={mood} />
    </svg>
  );
}

function Face({ mood }: { mood: NinaMood }) {
  return (
    <>
      {/* Cheeks */}
      <circle cx="82" cy="115" r="7" fill="#ff8da1" opacity="0.55" />
      <circle cx="138" cy="115" r="7" fill="#ff8da1" opacity="0.55" />

      {/* Eyebrows */}
      {mood === "think" ? (
        <>
          <path d="M75 92 L92 90" stroke="#3a1f12" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M128 90 L145 94" stroke="#3a1f12" strokeWidth="2.6" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M75 92 Q83 87 92 92" stroke="#3a1f12" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path d="M128 92 Q137 87 145 92" stroke="#3a1f12" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Eyes */}
      <ellipse cx="88" cy="104" rx="6" ry="7.5" fill="#1f1410" />
      <ellipse cx="132" cy="104" rx="6" ry="7.5" fill="#1f1410" />
      <circle cx="90" cy="101" r="2.2" fill="#fff" />
      <circle cx="134" cy="101" r="2.2" fill="#fff" />
      <circle cx="86" cy="107" r="1.1" fill="#fff" />
      <circle cx="130" cy="107" r="1.1" fill="#fff" />

      {/* Mouth */}
      {mood === "cheer" ? (
        <path
          d="M96 128 Q110 144 124 128 Q110 138 96 128 Z"
          fill="#b8334a"
          stroke="#7a3a2a"
          strokeWidth="1.5"
        />
      ) : mood === "think" ? (
        <path
          d="M102 132 Q110 128 118 132"
          stroke="#7a3a2a"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M98 128 Q110 138 122 128"
          stroke="#7a3a2a"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </>
  );
}

function Arms({ mood }: { mood: NinaMood }) {
  // Shoulder anchors: left (78, 178), right (142, 178)
  // Face right edge ~152; raised hand must stay x > 162 to avoid covering face.

  const handFill = "url(#ninaSkin)";
  const armStroke = "#e8a877";

  const ArmDown = ({ side }: { side: "L" | "R" }) => {
    const sx = side === "L" ? 78 : 142;
    const ex = side === "L" ? 64 : 156;
    const hx = side === "L" ? 60 : 160;
    return (
      <>
        <path
          d={`M${sx} 178 Q${(sx + ex) / 2} 200 ${ex} 218`}
          stroke="url(#ninaShirt)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx={hx} cy="222" r="8" fill={handFill} stroke={armStroke} strokeWidth="1" />
      </>
    );
  };

  const ArmSideOut = ({ side }: { side: "L" | "R" }) => {
    const sx = side === "L" ? 78 : 142;
    const ex = side === "L" ? 52 : 168;
    const hx = side === "L" ? 48 : 172;
    return (
      <>
        <path
          d={`M${sx} 178 Q${(sx + ex) / 2} 196 ${ex} 210`}
          stroke="url(#ninaShirt)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx={hx} cy="214" r="8" fill={handFill} stroke={armStroke} strokeWidth="1" />
      </>
    );
  };

  const ArmUp = ({ side }: { side: "L" | "R" }) => {
    // Hand goes UP and OUT, well clear of face (x < 50 or x > 170)
    const sx = side === "L" ? 78 : 142;
    const mx = side === "L" ? 56 : 164;
    const my = 130;
    const hx = side === "L" ? 42 : 178;
    const hy = 78;
    return (
      <>
        <path
          d={`M${sx} 178 Q${mx} ${my} ${hx} ${hy + 8}`}
          stroke="url(#ninaShirt)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx={hx} cy={hy} r="9" fill={handFill} stroke={armStroke} strokeWidth="1" />
        {/* Tiny finger indication */}
        <path
          d={`M${hx - 3} ${hy - 8} L${hx + 3} ${hy - 8}`}
          stroke={armStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </>
    );
  };

  if (mood === "wave") {
    return (
      <>
        <ArmDown side="L" />
        <ArmUp side="R" />
      </>
    );
  }
  if (mood === "cheer") {
    return (
      <>
        <ArmUp side="L" />
        <ArmUp side="R" />
      </>
    );
  }
  // happy + think: relaxed arms
  return (
    <>
      <ArmSideOut side="L" />
      <ArmSideOut side="R" />
    </>
  );
}
