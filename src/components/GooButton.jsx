import { useRef } from 'react';
import './GooButton.css';

// A pill of painted, flocked-velvet orange that behaves like a soft body: the
// silhouette bulges out towards the pointer and springs back on the way out.
//
// How the goo works: the shapes layer holds two plain elements — the pill and a
// circle that tracks the cursor — and #goo-paint blurs them together, then
// clamps alpha hard. Two blobs that overlap after the blur fuse into one
// silhouette with a smooth neck, which is what reads as "soft body". The label
// sits outside that layer so the filter never touches the text.
//
// Pointer tracking writes CSS variables straight onto the node instead of going
// through state, so a mousemove does not re-render on every frame.
export default function GooButton({ children, className = '', ...rest }) {
  const ref = useRef(null);

  const onMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--bx', `${event.clientX - box.left - box.width / 2}px`);
    el.style.setProperty('--by', `${event.clientY - box.top - box.height / 2}px`);
    el.style.setProperty('--bs', '1');
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--bs', '0');
    el.style.setProperty('--bx', '0px');
    el.style.setProperty('--by', '0px');
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`goo-btn ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      <span className="goo-btn-shapes" aria-hidden="true">
        <span className="goo-btn-pill" />
        <span className="goo-btn-blob" />
      </span>
      <span className="goo-btn-label">{children}</span>
    </button>
  );
}

// Rendered once per page. Both filters run in sRGB — left in the default
// linearRGB the turbulence washes the colour out to a chalky pastel.
export function GooFilterDefs() {
  return (
    <svg className="goo-defs" aria-hidden="true" focusable="false">
      <defs>
        {/* Merge the pill and the follower into one body, then chew the edge
            and the surface up with noise so it reads as flocked fabric. */}
        <filter
          id="goo-paint"
          x="-40%"
          y="-70%"
          width="180%"
          height="240%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="soft" />
          <feColorMatrix
            in="soft"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 21 -9"
            result="goo"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9 1.1"
            numOctaves="3"
            seed="7"
            result="edgeNoise"
          />
          {/* Ragged, fuzzy silhouette — the nap breaking up the outline. */}
          <feDisplacementMap
            in="goo"
            in2="edgeNoise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="fuzzy"
          />
          {/* Finer noise for the surface itself. The matrix greys it and
              stretches the contrast ~3x around 0.5 — the spread is what makes
              speckle; leave it unstretched and the blend averages to nothing,
              push it far and it turns to sandpaper. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2.1"
            numOctaves="2"
            seed="3"
            result="napNoise"
          />
          <feColorMatrix
            in="napNoise"
            type="matrix"
            values="1.4 1.1 0.7 0 -1.1
                    1.4 1.1 0.7 0 -1.1
                    1.4 1.1 0.7 0 -1.1
                    0 0 0 0 0.42"
            result="nap"
          />
          <feComposite in="nap" in2="fuzzy" operator="in" result="napIn" />
          <feBlend in="napIn" in2="fuzzy" mode="soft-light" />
        </filter>

        {/* Gentler version for the label, so the type looks printed into the
            fabric rather than sitting on a crisp layer above it. */}
        <filter
          id="goo-flock"
          x="-15%"
          y="-40%"
          width="130%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            seed="4"
            result="tn"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="tn"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
