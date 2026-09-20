import { skills } from '../data/content';
import './Skills.css';

const asset = (file) => `${import.meta.env.BASE_URL}${file}`;

// Roughly how wide a chip will be, in px, worked out from its label. The rows
// have to be laid out before the chips exist in the DOM, and these are short
// strings set at a known size, so a per-character estimate lands close enough
// — the gap between chips absorbs whatever it is out by.
function chipWidth(chip) {
  const perChar = chip.domain ? 7.2 : 6.6;
  // Padding and border, plus the icon and its gap on a tool chip.
  const chrome = chip.domain ? 50 : 25;
  return chip.label.length * perChar + chrome;
}

const GAP = 18;
const CHIP_HALF_H = 16;
// Half the wording's box, matching the centred block in the stylesheet: the
// title's max-width halved, and half the height of number + title + hint.
const TITLE_HALF_W = 112;
const CONTENT_HALF_H = 52;
const CLEAR = 18;
// A row sits far enough out to clear the wording whatever its x, so nothing in
// a row can land on the title however the jitter falls.
const ROW_Y = CONTENT_HALF_H + CHIP_HALF_H + CLEAR;
const SIDE_STEP = 40;
const SIDE_MAX = 3;
// Only a narrow chip earns a place at the side: out there its reach is set by
// its own width alone, so a wide one costs more there than it would in a row.
const SIDE_W_LIMIT = 95;
// Past this, a row is long enough that its end chips sprawl over the cards
// either side, and it is worth moving something out to a side stack.
const TARGET_REACH = 200;
const JITTER_X = 7;
const JITTER_Y = 10;
const SIDE_JITTER = 3;

// Stable per-card randomness: seeded off the card's own title, so a card
// scatters the same way every time it opens rather than reshuffling on each
// render, while no two cards land on the same arrangement.
function seededRandom(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deal the row chips into an upper and a lower run of similar total width.
function splitRows(entries) {
  const rows = [[], []];
  const widths = [0, 0];
  [...entries]
    .sort((a, b) => b.w - a.w)
    .forEach((entry) => {
      const r = widths[0] <= widths[1] ? 0 : 1;
      rows[r].push(entry);
      widths[r] += entry.w + GAP;
    });
  return rows;
}

const rowReach = (row) =>
  (row.reduce((sum, e) => sum + e.w, 0) + GAP * Math.max(row.length - 1, 0)) / 2;

// Chips ring the wording: a run above, a run below, and short stacks to its
// left and right. A row's reach is half its own total width, so piling every
// chip into two rows throws the end ones well over the neighbouring cards —
// moving the narrowest out to the sides shortens both rows at the cost of one
// chip's width each. Everything is then jittered off its exact spot so the
// ring reads as scattered rather than ruled.
function scatterPositions(chips, seed) {
  const entries = chips.map((chip, index) => ({ chip, index, w: chipWidth(chip) }));
  const rand = seededRandom(seed);
  const jitter = (amount) => (rand() * 2 - 1) * amount;

  const sides = [];
  let rows = entries.slice();
  while (
    sides.length < SIDE_MAX * 2 &&
    Math.max(...splitRows(rows).map(rowReach), 0) > TARGET_REACH
  ) {
    const narrow = rows.filter((e) => e.w <= SIDE_W_LIMIT);
    if (!narrow.length) break;
    const pick = narrow.reduce((a, b) => (a.w <= b.w ? a : b));
    sides.push(pick);
    rows = rows.filter((e) => e !== pick);
  }

  const spots = new Array(chips.length);

  splitRows(rows).forEach((row, r) => {
    const sign = r === 0 ? -1 : 1;
    const span = row.reduce((sum, e) => sum + e.w, 0) + GAP * Math.max(row.length - 1, 0);
    let cursor = -span / 2;
    row.forEach((entry) => {
      const x = cursor + entry.w / 2 + jitter(JITTER_X);
      cursor += entry.w + GAP;
      spots[entry.index] = {
        x: Math.round(x),
        y: Math.round(sign * (ROW_Y + jitter(JITTER_Y))),
      };
    });
  });

  // Dealt left, right, left… so the two stacks stay even.
  const stacks = [[], []];
  sides.forEach((entry, i) => stacks[i % 2].push(entry));
  stacks.forEach((stack, s) => {
    const sign = s === 0 ? -1 : 1;
    stack.forEach((entry, i) => {
      // Pushed out by its own half-width, so its inner edge clears the
      // wording by CLEAR no matter how wide the label is.
      const x = sign * (TITLE_HALF_W + CLEAR + entry.w / 2 + jitter(JITTER_X));
      const y = (i - (stack.length - 1) / 2) * SIDE_STEP + jitter(SIDE_JITTER);
      spots[entry.index] = { x: Math.round(x), y: Math.round(y) };
    });
  });

  return spots;
}

// Traits first, then tools — the inner orbit fills first, so the words land
// closest to the title and the icons ring them.
function chipsFor(skill) {
  return [
    ...(skill.traits || []).map((trait) => ({ id: `trait-${trait}`, label: trait })),
    ...(skill.tools || []).map((tool) => ({
      id: `tool-${tool.name}`,
      label: tool.name,
      domain: tool.domain,
    })),
  ];
}

export default function Skills() {
  return (
    <section className="skills section-pad" id="skills">
      {/* Decorative loop behind the cards: muted so it may autoplay, and hidden
          from assistive tech since it carries no information. */}
      <video
        className="skills-bg"
        src={asset('skills/skills-bg.mp4')}
        poster={asset('skills/skills-bg.jpg')}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="skills-scrim" aria-hidden="true" />
      <div className="wrap skills-inner">
        <div className="kicker">Skills</div>
        {/* The rule sits under the words only — the full stop hangs past it. */}
        <h2 className="section-title skills-title">
          <span className="skills-underline">How I do it</span>.
        </h2>
        <p className="skills-lead">
          <span className="hl">Consistent practice</span>, sharpening the{' '}
          <span className="hl">fundamentals</span>, and applying these skills{' '}
          <span className="hl">where it counts</span>.
        </p>

        <div className="skills-grid">
          {skills.map((skill, index) => {
            const chips = chipsFor(skill);
            const spots = scatterPositions(chips, skill.title);
            return (
              // Focusable so the chips are reachable without a mouse: the card
              // opens on focus exactly as it does on hover.
              <article className="skill-card" key={skill.title} tabIndex={0}>
                <span className="skill-num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="skill-title">{skill.title}</h3>
                <span className="skill-hint">Hover to open</span>

                <ul className="skill-tools">
                  {chips.map((chip, n) => (
                    <li
                      className={`skill-tool${chip.domain ? '' : ' is-trait'}`}
                      key={chip.id}
                      style={{
                        '--tx': `${spots[n].x}px`,
                        '--ty': `${spots[n].y}px`,
                        '--delay': `${n * 35}ms`,
                      }}
                    >
                      {chip.domain && (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${chip.domain}&sz=64`}
                          alt=""
                          loading="lazy"
                        />
                      )}
                      {chip.label}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
