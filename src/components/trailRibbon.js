// The journey ribbon: a centreline threaded through the milestone blobs, then
// offset along its normals by a half-width that swells and thins as it travels.
// A filled shape rather than a stroke, because a uniform stroke can't give the
// ribbon its drawn, hand-inked weight.

const SAMPLES_PER_SEGMENT = 36;
const HALF_WIDTH = 13;
const SWELL = 0.32;
const LONG_RUN = 600;

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
}

// `keepOutX`/`keepOutY` are the point the lead-in has to clear — the right edge
// and bottom of the first stop's title — measured from the live DOM by caller.
export function buildRibbon(centres, trackHeight, keepOutX = 0, keepOutY = 0) {
  const first = centres[0];
  const last = centres[centres.length - 1];
  // Run the ribbon off the top and bottom edges so it reads as passing
  // through the section rather than starting and stopping at a blob.
  const overshoot = Math.max(first.y, trackHeight - last.y) + 40;
  // Enter from the top-left on a diagonal that steepens into the first blob,
  // then drop almost straight down before sweeping across to the next stop.
  // The ribbon only has to be clear of the title at the height the title
  // actually sits at. So aim it through that one point and run the entry back
  // up the same line: above the title it is free to swing far left, giving the
  // long diagonal, and it is already past the title by the time it gets there.
  // Holding the whole lead-in right of the title instead would force a near
  // vertical drop at every width. Never push past the blob, or the ribbon
  // arrives from the wrong side.
  const guard = Math.min(keepOutX, first.x);
  const passY = keepOutY || first.y * 0.5;
  const slope = (first.x - guard) / Math.max(first.y - passY, 1);
  const entryY = -first.y * 0.45;
  const entryX = Math.max(0, guard - (passY - entryY) * slope);
  const knots = [
    { x: entryX, y: entryY },
    { x: guard, y: passY },
  ];
  centres.forEach((centre, i) => {
    knots.push(centre);
    const next = centres[i + 1];
    if (!next) return;
    if (i === 0) {
      // Bow out to the right leaving the first blob, so the ribbon sweeps away
      // from the copy rather than hugging back over it. This has to sit above
      // the gutter knots pushed below: knots are splined in array order, so one
      // placed lower than the next kinks the ribbon back on itself.
      knots.push({ x: centre.x + 46, y: centre.y + (next.y - centre.y) * 0.14 });
    }
    // A tall stop (the Anokha feature) leaves a long run between blobs. Left
    // to itself the curve drifts diagonally straight through the story text,
    // so pin it to the gutter between the two columns for the descent.
    const drop = next.y - centre.y;
    if (drop > LONG_RUN) {
      const gutterX = (centre.x + next.x) / 2;
      // Bow the descent out to the right and let it ease back in. Pinning both
      // knots to the same x draws a ruler-straight run between the stops,
      // which reads as a rail rather than a road.
      const bow = Math.min(58, Math.abs(next.x - centre.x) * 0.35 + 34);
      knots.push({ x: gutterX + bow, y: centre.y + drop * 0.3 });
      knots.push({ x: gutterX + bow * 0.28, y: centre.y + drop * 0.72 });
    }
  });
  knots.push({
    x: last.x + (last.x - centres[centres.length - 2].x) * 0.12,
    y: last.y + overshoot,
  });

  const spine = [];
  for (let i = 0; i < knots.length - 1; i++) {
    const p0 = knots[Math.max(0, i - 1)];
    const p1 = knots[i];
    const p2 = knots[i + 1];
    const p3 = knots[Math.min(knots.length - 1, i + 2)];
    for (let s = 0; s < SAMPLES_PER_SEGMENT; s++) {
      spine.push(catmullRom(p0, p1, p2, p3, s / SAMPLES_PER_SEGMENT));
    }
  }
  spine.push(knots[knots.length - 1]);

  const left = [];
  const right = [];
  for (let i = 0; i < spine.length; i++) {
    const prev = spine[Math.max(0, i - 1)];
    const next = spine[Math.min(spine.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const t = i / (spine.length - 1);
    const width = HALF_WIDTH * (1 + SWELL * Math.sin(t * Math.PI * 4.6 + 0.7));
    left.push({ x: spine[i].x + nx * width, y: spine[i].y + ny * width });
    right.push({ x: spine[i].x - nx * width, y: spine[i].y - ny * width });
  }

  const point = (p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  const forward = left.map((p, i) => `${i === 0 ? 'M' : 'L'} ${point(p)}`).join(' ');
  const back = right
    .slice()
    .reverse()
    .map((p) => `L ${point(p)}`)
    .join(' ');

  return `${forward} ${back} Z`;
}
