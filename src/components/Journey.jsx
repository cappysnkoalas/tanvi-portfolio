import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { journey } from '../data/content';
import { BLOB_PATHS, BLOB_COLORS } from './blobShapes';
import { buildRibbon } from './trailRibbon';
import PaperClip from './PaperClip';
import GooButton, { GooFilterDefs } from './GooButton';
import { AtvDoodle, IdeaDoodle } from './Doodles';
import './Journey.css';

// Gap left between the feature title and the ribbon passing it: enough for the
// ribbon's own half-width at full swell (~17px) plus breathing room.
const TITLE_CLEARANCE = 38;

// The ribbon's half-width at full swell. Its edge reaches this far beyond the
// centreline, so the clearance point is aimed this far above the title.
const RIBBON_REACH = 24;

// The ribbon is drawn through wherever the blobs actually land, so stops of
// very different heights (the Anokha feature is many times taller than a
// placeholder stop) all stay threaded.
function useMeasuredTrail(trackRef) {
  const [trail, setTrail] = useState(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => {
      const trackBox = track.getBoundingClientRect();
      // Blobs are points the ribbon must hit; a guide is a vertical corridor a
      // tall stop reserves for it, so the ribbon skirts the copy instead of
      // being routed straight through it.
      const centres = [];
      track.querySelectorAll('.j-blob, .j-guide').forEach((node) => {
        const box = node.getBoundingClientRect();
        const x = box.left + box.width / 2 - trackBox.left;
        if (node.classList.contains('j-guide')) {
          centres.push({ x, y: box.top - trackBox.top }, { x, y: box.bottom - trackBox.top });
        } else {
          centres.push({ x, y: box.top + box.height / 2 - trackBox.top });
        }
      });
      if (centres.length < 2 || !trackBox.width) return;
      // How far the feature title actually reaches, so the ribbon's lead-in can
      // be held clear of it instead of relying on a tuned constant.
      // Only the first unflipped title matters. The lead-in is the one stretch
      // of ribbon that passes a title, and on a flipped stop the copy sits to
      // the right of the trail — measuring that one would shove the entry
      // clear across the page to avoid something it never touches.
      let keepOutX = 0;
      let keepOutY = 0;
      const leadTitle = track.querySelector(
        '.journey-feature:not(.is-flipped) .j-feature-title'
      );
      [leadTitle].filter(Boolean).forEach((node) => {
        const box = node.getBoundingClientRect();
        const right = box.right - trackBox.left + TITLE_CLEARANCE;
        if (right > keepOutX) {
          keepOutX = right;
          // The ribbon descends left-to-right, so within the title's band it
          // sits furthest left at the title's TOP — aiming at the bottom lets
          // the diagonal clip the top-right corner. Aim a little ABOVE the top
          // as well: the ribbon is a band, not a line, and where it runs
          // shallow its lower edge reaches back up to a half-width above the
          // centreline, dragging that edge left across the title.
          keepOutY = box.top - trackBox.top - RIBBON_REACH;
        }
      });
      setTrail({
        width: trackBox.width,
        height: trackBox.height,
        path: buildRibbon(centres, trackBox.height, keepOutX, keepOutY),
      });
    };

    let live = true;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    // The title is set in a webfont, so its width changes when that swaps in;
    // measuring only before then leaves the ribbon clearing a narrower title.
    document.fonts?.ready.then(() => live && measure()).catch(() => {});
    return () => {
      live = false;
      observer.disconnect();
    };
  }, [trackRef]);

  return trail;
}

function Marker({ index, label }) {
  return (
    <div className="j-marker">
      <div className="j-blob">
        <svg className="j-blob-shape" viewBox="0 0 100 100" aria-hidden="true">
          <path d={BLOB_PATHS[index]} fill={BLOB_COLORS[index]} stroke="#000" strokeWidth="3" />
        </svg>
        <span className="j-num">{index + 1}</span>
      </div>
      {label && <span className="j-label">{label} ·</span>}
    </div>
  );
}

// Hand-drawn arrow running from the badge up to the photo pile: a curve that
// eases left as it climbs, with the head opened at the top end.
function BadgeArrow() {
  return (
    <svg
      className="col-badge-arrow"
      viewBox="0 0 100 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* One stroke: the tail runs down far enough to meet the badge, then up
          round the kink and away to the head. */}
      <path d="M66 196 C67 158 69 114 59 91 C51 82 38 85 38 95 C38 104 51 105 57 95 C65 83 69 71 65 57 C60 41 46 26 25 14" />
      <path d="M25 14 L45 18 M25 14 L30 34" />
    </svg>
  );
}

function Collage({ photos, badge }) {
  // Only a print given a `note` in the data is clickable — the rest are just
  // photos, and stay plain.
  const [open, setOpen] = useState(null);
  const toggle = (n) => setOpen((current) => (current === n ? null : n));

  return (
    <div
      className={`collage count-${photos.length}`}
      data-open={open === null ? undefined : open}
    >
      {photos.map((photo, n) => (
        <figure
          className={`col-pic pic-${n}`}
          key={photo.src || n}
          tabIndex={0}
          {...(photo.note
            ? {
                role: 'button',
                'aria-pressed': open === n,
                onClick: () => toggle(n),
                onKeyDown: (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggle(n);
                  }
                },
              }
            : null)}
        >
          {photo.src ? (
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          ) : (
            // Slot held open until the photo arrives; an <img> with no src
            // would render as a broken image instead.
            <span className="col-empty" role="img" aria-label="Photo coming soon" />
          )}
        </figure>
      ))}
      {open !== null && photos[open].note && (
        <p className="col-note">{photos[open].note}</p>
      )}
      {badge && (
        <>
          <BadgeArrow />
          <img className="col-badge" src={badge.src} alt={badge.alt} loading="lazy" />
        </>
      )}
    </div>
  );
}

// The full story opens on a sheet of the same lined notebook paper as the
// "about me" note up top, so the two read as pages from one notebook.
function StorySheet({ album, id, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="j-sheet-layer">
      <button type="button" className="j-sheet-backdrop" aria-label="Close the story" onClick={onClose} />
      <div className="j-sheet-wrap" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
        <div className="j-sheet">
          <div className="j-sheet-surface" />
          <div className="j-sheet-body">
            <div className="j-sheet-kicker">my journey at</div>
            <h3 className="j-sheet-title" id={`${id}-title`}>{album.name}</h3>
            {album.story.map((paragraph, n) => (
              <p key={n}>{paragraph}</p>
            ))}
          </div>
        </div>
        <PaperClip />
        <button type="button" className="j-sheet-close" aria-label="Close the story" onClick={onClose}>
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}

function FeatureStop({ item, index }) {
  const { album } = item;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const storyId = `j-story-${index}`;
  return (
    <li className={`journey-item journey-feature${album.flip ? ' is-flipped' : ''}`}>
      <div className="j-head">
        <div className="j-year">{item.year}</div>
        <div className="j-feature-name">
          {/* The gear rides just above the logo, out of the flex flow so it
              cannot widen the title row. */}
          <span className="j-logo-wrap">
            {album.doodles && <IdeaDoodle className="j-doodle-gear" />}
            <img className="j-feature-logo" src={album.logo} alt={`${album.name} logo`} />
          </span>
          <h3 className="j-feature-title">
            <button
              type="button"
              className="j-feature-toggle"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
            >
              {album.name}
            </button>
            {/* Inside the heading on purpose: the heading is only as wide as
                the name, so anchoring here puts the buggy at the end of the
                text. The row around it spans the whole column. */}
            {album.doodles && <AtvDoodle className="j-doodle-atv" />}
          </h3>
        </div>
        <p className="j-feature-roles">
          {item.roles.map((line, n) => (
            <span key={n} className={line.strong ? 'j-role-strong' : undefined}>
              {line.text}
            </span>
          ))}
        </p>
        <GooButton
          className={album.accent === 'green' ? 'goo-btn--green' : ''}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          {album.cta || 'so what did i do?'}
          <span className="goo-btn-arrow" aria-hidden="true">→</span>
        </GooButton>
      </div>
      {open && <StorySheet album={album} id={storyId} onClose={close} />}

      <div className="j-media">
        <Marker index={index} />
      </div>

      {album.glimpse && (
        <p className={`j-glimpse${album.accent === 'green' ? ' j-glimpse--green' : ''}`}>
          {album.glimpse}
        </p>
      )}

      <div className="j-wall">
        <Collage photos={album.photos} badge={album.badge} />
      </div>

      {album.video && (
        <div className="j-reel">
          <video
            className="j-video"
            src={album.video}
            controls
            playsInline
            preload="metadata"
          />
          <a className="ig-btn" href={album.instagram} target="_blank" rel="noreferrer">
            <span className="ig-btn-badge" aria-hidden="true">
              <svg className="ig-btn-glyph" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="5.2" />
                <circle cx="12" cy="12" r="4.3" />
                <circle cx="17.4" cy="6.6" r="1.15" className="ig-btn-dot" />
              </svg>
            </span>
            <span className="ig-btn-label">visit Anokhas page :)</span>
          </a>
        </div>
      )}

    </li>
  );
}

function Stop({ item, index }) {
  return (
    <li className="journey-item">
      <div className="j-text">
        <div className="j-year">{item.year}</div>
        <h3 className="j-title">{item.title}</h3>
        <p className="j-blurb">{item.blurb}</p>
      </div>

      <div className="j-media">
        <Marker index={index} label={item.label} />
      </div>
    </li>
  );
}

export default function Journey() {
  const trackRef = useRef(null);
  const trail = useMeasuredTrail(trackRef);

  return (
    <section className="journey section-pad" id="journey">
      <GooFilterDefs />
      <div className="wrap">
        <div className="kicker">Experience &amp; journey</div>
        <h2 className="section-title">Five stops on the way <em>here</em>.</h2>

        <div className="journey-track" ref={trackRef}>
          {trail && (
            <svg
              className="j-trail"
              viewBox={`0 0 ${trail.width} ${trail.height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d={trail.path} />
            </svg>
          )}

          <ol className="journey-list">
            {journey.map((item, i) =>
              item.album ? (
                <FeatureStop item={item} index={i} key={i} />
              ) : (
                <Stop item={item} index={i} key={i} />
              )
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}
