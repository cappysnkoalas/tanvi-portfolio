import './PaperClip.css';

// A classic Gem paperclip gripping the paper's top-left corner.
//
// Geometry is the real thing: one continuous wire with two U-bends, giving
// three parallel arms and two free ends (one at the top, one tucked inside
// near the bottom). Drawn in a 40x100 box, long axis vertical.
//
// It's split into two layers so the paper passes THROUGH the clip: the outer
// loop rides in front of the sheet, the inner arm tucks behind it — which is
// what makes it read as actually clipped on rather than drawn on top.

// Outer loop: free end at top-left, down the left arm, around the wide
// bottom bend, back up the right arm. This half sits in FRONT of the paper.
const CLIP_FRONT = 'M 8 22 L 8 80 A 11 11 0 0 0 30 80 L 30 18';

// Inner loop: over the narrow top bend and down the middle arm, ending in a
// free end. This half sits BEHIND the paper, so it disappears at the edge.
const CLIP_BACK = 'M 30 18 A 6.5 6.5 0 0 0 17 18 L 17 68';

function MetalDefs({ id }) {
  return (
    <defs>
      {/* Runs across the clip rather than along it, so the three arms each
          catch light differently. Kept in a narrow band of mid-greys —
          pushing toward white/black is what makes small metal look drawn. */}
      <linearGradient id={`${id}-metal`} x1="0" y1="0.1" x2="1" y2="0.9">
        <stop offset="0%" stopColor="#9fa2a4" />
        <stop offset="9%" stopColor="#c8cbcc" />
        <stop offset="18%" stopColor="#84888b" />
        <stop offset="32%" stopColor="#9b9ea0" />
        <stop offset="44%" stopColor="#c4c7c8" />
        <stop offset="55%" stopColor="#7d8083" />
        <stop offset="72%" stopColor="#9a9d9f" />
        <stop offset="88%" stopColor="#c6c9ca" />
        <stop offset="100%" stopColor="#83868a" />
      </linearGradient>
      {/* Faint, uneven glint. Real clip wire barely shines. */}
      <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0.6">
        <stop offset="0%" stopColor="#eef0f1" stopOpacity="0.32" />
        <stop offset="30%" stopColor="#eef0f1" stopOpacity="0.06" />
        <stop offset="50%" stopColor="#eef0f1" stopOpacity="0.4" />
        <stop offset="75%" stopColor="#eef0f1" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#eef0f1" stopOpacity="0.24" />
      </linearGradient>
    </defs>
  );
}

// One length of wire = three stacked strokes: dark underside, metal body,
// thin highlight. Round caps leave the free ends properly rounded off.
function Wire({ d, id }) {
  return (
    <>
      <path d={d} fill="none" stroke="#4d5154" strokeWidth="3.9" strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} fill="none" stroke={`url(#${id}-metal)`} strokeWidth="2.9" strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} fill="none" stroke={`url(#${id}-shine)`} strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round" />
    </>
  );
}

export default function PaperClip() {
  return (
    <>
      <svg className="paper-clip paper-clip--back" viewBox="0 0 40 100" aria-hidden="true">
        <MetalDefs id="clipback" />
        <Wire d={CLIP_BACK} id="clipback" />
      </svg>

      <svg className="paper-clip paper-clip--front" viewBox="0 0 40 100" aria-hidden="true">
        <MetalDefs id="clipfront" />
        <Wire d={CLIP_FRONT} id="clipfront" />
      </svg>
    </>
  );
}
