// Nina — friendly illustrated character with soft volume.
export type NinaMood = "happy" | "wave" | "cheer" | "think";

export function Nina({
  size = 180,
  mood = "happy",
}: {
  size?: number;
  mood?: NinaMood;
}) {
  return (
    <svg
      viewBox="0 0 220 260"
      width={size}
      height={size}
      className="select-none drop-shadow-[0_10px_18px_rgba(31,42,68,0.18)]"
    >
      <defs>
        <radialGradient id="ninaSkin" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fdd9b5" />
          <stop offset="100%" stopColor="#efb98a" />
        </radialGradient>
        <linearGradient id="ninaShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5ec1f5" />
          <stop offset="100%" stopColor="#3fa9f5" />
        </linearGradient>
        <linearGradient id="ninaOverall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb35c" />
          <stop offset="100%" stopColor="#ff8c42" />
        </linearGradient>
        <radialGradient id="ninaHair" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#5a3320" />
          <stop offset="100%" stopColor="#3a1f12" />
        </radialGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="110" cy="248" rx="55" ry="7" fill="#1f2a44" opacity="0.18" />

      {/* legs */}
      <rect x="80" y="210" width="18" height="32" rx="9" fill="#3a1f12" />
      <rect x="122" y="210" width="18" height="32" rx="9" fill="#3a1f12" />
      {/* shoes */}
      <ellipse cx="89" cy="244" rx="14" ry="6" fill="#1f2a44" />
      <ellipse cx="131" cy="244" rx="14" ry="6" fill="#1f2a44" />

      {/* body — overall */}
      <path
        d="M62 170 Q110 152 158 170 L165 222 Q110 232 55 222 Z"
        fill="url(#ninaOverall)"
      />
      {/* shirt */}
      <path
        d="M68 168 Q110 150 152 168 L150 180 Q110 168 70 180 Z"
        fill="url(#ninaShirt)"
      />
      {/* overall straps */}
      <path d="M85 168 L92 158" stroke="#c75417" strokeWidth="4" strokeLinecap="round" />
      <path d="M135 168 L128 158" stroke="#c75417" strokeWidth="4" strokeLinecap="round" />
      {/* pocket star */}
      <text x="110" y="208" textAnchor="middle" fontSize="18" fill="#fff8ee">★</text>

      {/* arms */}
      {mood === "wave" || mood === "cheer" ? (
        <>
          <path
            d="M62 172 Q40 140 50 105 L66 110 Q60 140 76 175 Z"
            fill="url(#ninaSkin)"
          />
          <circle cx="55" cy="100" r="11" fill="url(#ninaSkin)" />
        </>
      ) : (
        <path d="M62 172 L48 215 L66 220 L78 178 Z" fill="url(#ninaSkin)" />
      )}
      {mood === "cheer" ? (
        <>
          <path
            d="M158 172 Q180 140 170 105 L154 110 Q160 140 144 175 Z"
            fill="url(#ninaSkin)"
          />
          <circle cx="165" cy="100" r="11" fill="url(#ninaSkin)" />
        </>
      ) : (
        <path d="M158 172 L172 215 L154 220 L142 178 Z" fill="url(#ninaSkin)" />
      )}

      {/* hair back */}
      <ellipse cx="110" cy="98" rx="62" ry="60" fill="url(#ninaHair)" />
      {/* pigtails */}
      <ellipse cx="48" cy="118" rx="14" ry="22" fill="url(#ninaHair)" />
      <ellipse cx="172" cy="118" rx="14" ry="22" fill="url(#ninaHair)" />
      {/* ribbons */}
      <circle cx="48" cy="98" r="6" fill="#ff8c42" />
      <circle cx="172" cy="98" r="6" fill="#ff8c42" />

      {/* face */}
      <ellipse cx="110" cy="108" rx="48" ry="52" fill="url(#ninaSkin)" />

      {/* bangs */}
      <path
        d="M64 88 Q90 50 110 70 Q132 50 156 88 Q140 78 110 80 Q80 78 64 88 Z"
        fill="url(#ninaHair)"
      />

      {/* cheeks */}
      <circle cx="80" cy="125" r="8" fill="#ff8da1" opacity="0.55" />
      <circle cx="140" cy="125" r="8" fill="#ff8da1" opacity="0.55" />

      {/* eyebrows */}
      {mood === "think" ? (
        <>
          <path d="M73 102 L90 100" stroke="#3a1f12" strokeWidth="3" strokeLinecap="round" />
          <path d="M130 100 L147 104" stroke="#3a1f12" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M73 100 Q82 95 91 100" stroke="#3a1f12" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M129 100 Q138 95 147 100" stroke="#3a1f12" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* eyes */}
      <ellipse cx="86" cy="112" rx="7" ry="8.5" fill="#1f1410" />
      <ellipse cx="134" cy="112" rx="7" ry="8.5" fill="#1f1410" />
      {/* eye highlights */}
      <circle cx="89" cy="109" r="2.4" fill="#fff" />
      <circle cx="137" cy="109" r="2.4" fill="#fff" />
      <circle cx="84" cy="115" r="1.2" fill="#fff" />
      <circle cx="132" cy="115" r="1.2" fill="#fff" />

      {/* mouth */}
      {mood === "cheer" ? (
        <path
          d="M92 140 Q110 158 128 140 Q110 150 92 140 Z"
          fill="#b8334a"
          stroke="#7a3a2a"
          strokeWidth="2"
        />
      ) : mood === "think" ? (
        <path
          d="M98 142 Q110 138 122 142"
          stroke="#7a3a2a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M94 138 Q110 152 126 138"
          stroke="#7a3a2a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
