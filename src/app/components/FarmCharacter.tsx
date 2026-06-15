export function FarmCharacter({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Speech bubble */}
      <div
        className="absolute -top-4 -right-8 z-10 px-4 py-2 rounded-2xl text-sm font-bold shadow-md"
        style={{
          backgroundColor: 'white',
          border: '2px solid #DCEFD9',
          fontFamily: "'Paperozi', 'Noto Sans KR', sans-serif",
          color: '#2C3E20',
          minWidth: '180px',
          whiteSpace: 'nowrap',
        }}
      >
        새봄농장에 오신 걸 환영해요! 🌱
        <div
          className="absolute left-6 bottom-0 translate-y-full"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '10px solid white',
            filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.05))',
          }}
        />
      </div>

      <svg viewBox="0 0 200 270" width="200" height="270" xmlns="http://www.w3.org/2000/svg">
        {/* Ground shadow */}
        <ellipse cx="100" cy="260" rx="48" ry="9" fill="rgba(0,0,0,0.08)" />

        {/* Body - green overalls */}
        <rect x="60" y="152" width="80" height="85" rx="24" fill="#5BBE63" />

        {/* Overalls bib */}
        <rect x="73" y="143" width="54" height="32" rx="12" fill="#4AAD52" />

        {/* Shirt visible under */}
        <rect x="68" y="148" width="64" height="14" rx="6" fill="#8DDA92" />

        {/* Overall pocket */}
        <rect x="84" y="162" width="32" height="22" rx="6" fill="#4AAD52" />
        <circle cx="100" cy="170" r="3" fill="#3A9A42" />

        {/* Legs */}
        <rect x="65" y="218" width="28" height="38" rx="13" fill="#5BBE63" />
        <rect x="107" y="218" width="28" height="38" rx="13" fill="#5BBE63" />

        {/* Shoes */}
        <ellipse cx="79" cy="256" rx="20" ry="10" fill="#7B5A14" />
        <ellipse cx="121" cy="256" rx="20" ry="10" fill="#7B5A14" />
        <ellipse cx="74" cy="252" rx="10" ry="6" fill="#9B7A34" />
        <ellipse cx="116" cy="252" rx="10" ry="6" fill="#9B7A34" />

        {/* Left arm - waving up */}
        <line x1="62" y1="168" x2="26" y2="132" stroke="#FFD4A8" strokeWidth="20" strokeLinecap="round" />
        {/* Left hand */}
        <circle cx="20" cy="126" r="14" fill="#FFD4A8" />
        {/* Waving fingers */}
        <circle cx="10" cy="116" r="7" fill="#FFD4A8" />
        <circle cx="20" cy="112" r="7" fill="#FFD4A8" />
        <circle cx="30" cy="115" r="7" fill="#FFD4A8" />

        {/* Right arm - holding hoe */}
        <line x1="138" y1="168" x2="166" y2="198" stroke="#FFD4A8" strokeWidth="20" strokeLinecap="round" />
        {/* Right hand */}
        <circle cx="170" cy="204" r="13" fill="#FFD4A8" />
        {/* Hoe handle */}
        <line x1="170" y1="204" x2="185" y2="240" stroke="#8B6914" strokeWidth="5" strokeLinecap="round" />
        {/* Hoe blade */}
        <rect x="176" y="235" width="20" height="8" rx="3" fill="#aaa" transform="rotate(15 176 235)" />

        {/* Neck */}
        <rect x="86" y="138" width="28" height="22" rx="10" fill="#FFD4A8" />

        {/* Head */}
        <circle cx="100" cy="90" r="62" fill="#FFD4A8" />

        {/* Straw hat brim */}
        <ellipse cx="100" cy="36" rx="78" ry="15" fill="#FFD86B" />
        <ellipse cx="100" cy="33" rx="74" ry="12" fill="#F5C842" />

        {/* Hat crown */}
        <ellipse cx="100" cy="10" rx="48" ry="32" fill="#F5C842" />
        <rect x="52" y="10" width="96" height="28" fill="#F5C842" />

        {/* Hat band */}
        <rect x="54" y="29" width="92" height="11" rx="4" fill="#CC9900" />

        {/* Hat band flower decoration */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 75 + Math.cos(rad) * 6;
          const y = 34.5 + Math.sin(rad) * 5;
          return <circle key={i} cx={x} cy={y} r="4" fill="#FF8A8A" opacity="0.85" />;
        })}
        <circle cx="75" cy="34.5" r="3" fill="#FFD86B" />

        {/* Second flower on right */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 125 + Math.cos(rad) * 5;
          const y = 34.5 + Math.sin(rad) * 4;
          return <circle key={i} cx={x} cy={y} r="3.5" fill="#8DDA92" opacity="0.85" />;
        })}
        <circle cx="125" cy="34.5" r="2.5" fill="#FFD86B" />

        {/* Eyes - whites */}
        <circle cx="80" cy="90" r="16" fill="white" />
        <circle cx="120" cy="90" r="16" fill="white" />

        {/* Pupils */}
        <circle cx="82" cy="92" r="10" fill="#2C1810" />
        <circle cx="122" cy="92" r="10" fill="#2C1810" />

        {/* Iris shine */}
        <circle cx="86" cy="87" r="4" fill="white" />
        <circle cx="126" cy="87" r="4" fill="white" />
        <circle cx="80" cy="94" r="2" fill="white" />
        <circle cx="120" cy="94" r="2" fill="white" />

        {/* Eyebrows - happy arch */}
        <path d="M 69 74 Q 80 68 91 74" stroke="#5A3A20" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 109 74 Q 120 68 131 74" stroke="#5A3A20" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        {/* Rosy cheeks */}
        <circle cx="64" cy="106" r="13" fill="rgba(255,120,120,0.38)" />
        <circle cx="136" cy="106" r="13" fill="rgba(255,120,120,0.38)" />

        {/* Nose */}
        <circle cx="100" cy="103" r="3.5" fill="#E0A080" />

        {/* Happy smile */}
        <path d="M 84 116 Q 100 132 116 116" stroke="#5A3A20" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        {/* Cute freckles */}
        <circle cx="69" cy="110" r="2.5" fill="#E0A080" />
        <circle cx="76" cy="113" r="2" fill="#E0A080" />
        <circle cx="131" cy="110" r="2.5" fill="#E0A080" />
        <circle cx="124" cy="113" r="2" fill="#E0A080" />

        {/* Overall straps */}
        <rect x="76" y="143" width="11" height="22" rx="5" fill="#3A9A42" />
        <rect x="113" y="143" width="11" height="22" rx="5" fill="#3A9A42" />

        {/* Overall strap buttons */}
        <circle cx="81" cy="145" r="4" fill="#FFD86B" />
        <circle cx="119" cy="145" r="4" fill="#FFD86B" />
      </svg>
    </div>
  );
}
