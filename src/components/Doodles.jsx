import './Doodles.css';

// Line-art marginalia for a journey stop — drawn, not photographed, so they
// carry no background of their own and take their colour from CSS.
//
// Both are pure outlines: every shape is stroked and none is filled, which is
// what lets one `color` on the wrapper tint the whole drawing.

// Gear teeth are regular enough to generate rather than hand-plot. Each tooth
// walks four points — out along the tooth, in across the gap — so the ring
// closes into the familiar cog silhouette.
function gearPath(cx, cy, rOuter, rInner, teeth) {
  const step = (Math.PI * 2) / teeth;
  // Tooth tops are narrower than the gaps they sit between; that ratio is what
  // stops the teeth reading as a blunt star.
  const toothHalf = step * 0.2;
  const gapHalf = step * 0.28;
  const pts = [];
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step;
    pts.push([a - toothHalf, rOuter]);
    pts.push([a + toothHalf, rOuter]);
    pts.push([a + gapHalf, rInner]);
    pts.push([a + step - gapHalf, rInner]);
  }
  const d = pts
    .map(([a, r]) => `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`)
    .join('L');
  return `M${d}Z`;
}

// Bulb, cog and circuit: the "figuring it out" half of the pair.
export function IdeaDoodle({ className = '' }) {
  return (
    <svg
      className={`doodle doodle--idea ${className}`}
      viewBox="0 0 132 116"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Companion cog, half-tucked behind the bulb. */}
      <path d={gearPath(34, 66, 25, 18, 9)} />
      <circle cx="34" cy="66" r="7" />

      {/* Bulb: a near-circle drawn down into the two shoulders of the neck. */}
      <path d="M43 52a24 24 0 1 1 41 17c-4 4-6 8-6 13H49c0-5-2-9-6-13" />
      {/* Filament sweep. */}
      <path d="M52 76c5-5 16-5 21 0" />
      {/* Screw base, stepped in twice so it reads as a fitting. */}
      <path d="M50 87h26v7H50zM55 94h16v7H55z" />

      {/* Cog inside the bulb — the idea is a mechanism. */}
      <path d={gearPath(63, 49, 21, 15, 10)} />
      <circle cx="63" cy="49" r="8" />

      {/* Rays. */}
      <path d="M63 12v9M40 20l5 8M86 20l-5 8" />

      {/* Circuit traces running off to the right, each ending in a node. */}
      <path d="M85 40h13V28h7" />
      <circle cx="112" cy="28" r="6" />
      <path d="M88 55h20v14h4" />
      <circle cx="118" cy="69" r="6" />
      <path d="M82 72h-4v10h-6" />
      <circle cx="66" cy="82" r="6" />
    </svg>
  );
}

// The buggy itself: cage, seats and knobbly tyres, in flat side profile.
export function AtvDoodle({ className = '' }) {
  return (
    <svg
      className={`doodle doodle--atv ${className}`}
      viewBox="0 0 148 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Roll cage and body, nose to tail in one stroke. */}
      <path d="M16 64V50c0-4 2-6 6-7l22-5 12-16c2-2 4-3 7-3h32c3 0 5 1 6 4l11 25 12 12v5" />
      {/* Floor pan, sitting exactly on the axle line. */}
      <path d="M26 62h94" />
      {/* Centre pillar and the rail the cage braces against. */}
      <path d="M84 19v43M58 38h44M44 38l10 24" />
      {/* Two seats, backs to the pillar. */}
      <path d="M62 40v14h10M74 40v14h10" />

      {/* Wheels: rim, hub, and a few tread ticks so they read as knobbly. */}
      <circle cx="44" cy="76" r="15" />
      <circle cx="44" cy="76" r="5.5" />
      <path d="M44 61v4M44 87v4M29 76h4M55 76h4" />
      <circle cx="110" cy="76" r="15" />
      <circle cx="110" cy="76" r="5.5" />
      <path d="M110 61v4M110 87v4M95 76h4M121 76h4" />
    </svg>
  );
}
