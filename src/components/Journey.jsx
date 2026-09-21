import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { journey } from '../data/content';
import useLiteMedia from '../lib/useLiteMedia';
import usePhone from '../lib/usePhone';
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
      // The track stops at the last stop, but the section runs on past it for
      // its bottom padding. Measure that gap and hand it to the ribbon so the
      // road carries on to the end of the section instead of cutting out.
      const section = track.closest('.journey');
      const tailRun = section
        ? Math.max(0, section.getBoundingClientRect().bottom - trackBox.bottom)
        : 0;
      setTrail({
        width: trackBox.width,
        height: trackBox.height + tailRun,
        path: buildRibbon(centres, trackBox.height, keepOutX, keepOutY, tailRun),
      });
    };

    let live = true;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    // The section's padding is what the tail spans, and it moves with the
    // viewport independently of the track, so watch it too.
    const section = track.closest('.journey');
    if (section) observer.observe(section);
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

// Records each print's own proportions on its figure, as --ar. The phone row
// grows every print in proportion to that, which is what makes them all come
// out the same height without a single one being cropped to get there. It is
// only known once the file has loaded, and a cached image is already loaded by
// the time the ref runs, so both cases are covered.
function measurePrint(img) {
  if (!img) return;
  const record = () => {
    if (!img.naturalHeight || !img.parentElement) return;
    img.parentElement.style.setProperty('--ar', (img.naturalWidth / img.naturalHeight).toFixed(3));
  };
  if (img.complete) record();
  else img.addEventListener('load', record, { once: true });
}

// The print at full size, over the page. Everything closes it — the backdrop,
// the print itself and Escape — because it exists only to be looked at, and a
// second tap is what the print's own tap is expected to undo.
function PhotoZoom({ photo, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
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
    <button type="button" className="col-zoom" onClick={onClose} aria-label="Close photo">
      <img className="col-zoom-img" src={photo.src} alt={photo.alt} />
    </button>,
    document.body
  );
}

function Collage({ photos, badge, tape }) {
  // Only a print given a `note` in the data is clickable — the rest are just
  // photos, and stay plain.
  const [open, setOpen] = useState(null);
  const toggle = (n) => setOpen((current) => (current === n ? null : n));
  // On a phone a print is barely 110px tall, and the hover zoom a pointer gets
  // has nowhere to grow into — a tap used to scale it up inside the row and
  // crop it against the screen. So a tap opens it full size instead, and a
  // second tap puts it back. A pointer keeps the note behaviour it had.
  const phone = usePhone();
  const [zoom, setZoom] = useState(null);
  const press = (n) => {
    if (phone) setZoom((current) => (current === n ? null : n));
    else if (photos[n].note) toggle(n);
  };
  const pressable = (n) => (phone || photos[n].note
    ? {
        role: 'button',
        'aria-pressed': phone ? zoom === n : open === n,
        onClick: () => press(n),
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            press(n);
          }
        },
      }
    : null);

  return (
    <div
      className={`collage count-${photos.length}${tape ? ` collage--tape-${tape}` : ''}`}
      data-open={open === null ? undefined : open}
    >
      {photos.map((photo, n) => (
        <figure
          className={`col-pic pic-${n}${photo.phoneHide ? ' col-pic--phone-hide' : ''}${photo.phoneFirst ? ' col-pic--phone-first' : ''}${photo.phoneRatio ? ' col-pic--phone-crop' : ''}`}
          key={photo.src || n}
          style={photo.phoneRatio ? { '--ar-phone': photo.phoneRatio } : undefined}
          tabIndex={0}
          {...pressable(n)}
        >
          {photo.src ? (
            <img ref={measurePrint} src={photo.src} alt={photo.alt} loading="lazy" />
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
      {zoom !== null && (
        <PhotoZoom photo={photos[zoom]} onClose={() => setZoom(null)} />
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
            {/* Reads right for the stops that are places, wrong for the ones
                that are projects — those opt out with noKicker. */}
            {!album.noKicker && <div className="j-sheet-kicker">my journey at</div>}
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
    <li
      className={`journey-item journey-feature${album.flip ? ' is-flipped' : ''}${
        album.photos ? '' : ' no-wall'
      }`}
    >
      <div className="j-head">
        <div className="j-year">{item.year}</div>
        <div className="j-feature-name">
          {/* The gear rides just above the logo, out of the flex flow so it
              cannot widen the title row. */}
          <span className="j-logo-wrap">
            {album.doodles && <IdeaDoodle className="j-doodle-gear" />}
            {/* A stop for something with no mark of its own — a project rather
                than an organisation — carries no logo, so the name stands alone. */}
            {album.logo && (
              <img className="j-feature-logo" src={album.logo} alt={`${album.name} logo`} loading="lazy" />
            )}
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
        {album.site && (
          <a className="j-site" href={album.site} target="_blank" rel="noreferrer">
            {album.siteLabel || album.site}
          </a>
        )}
        {/* Both sets of copy ship and the stylesheet shows one: swapping them
            in JS would mean measuring the viewport on every render and a flash
            of the wrong one on load. The long copy is only marked --long when
            there is a short set to replace it, so a stop without one is left
            showing its long copy at every width. */}
        <p className={`j-feature-roles${item.rolesShort ? ' j-feature-roles--long' : ''}`}>
          {item.roles.map((line, n) => (
            <span key={n} className={line.strong ? 'j-role-strong' : undefined}>
              {line.text}
            </span>
          ))}
        </p>
        {item.rolesShort && (
          <p className="j-feature-roles j-feature-roles--short">
            {item.rolesShort.map((line, n) => (
              <span key={n} className={line.strong ? 'j-role-strong' : undefined}>
                {line.text}
              </span>
            ))}
          </p>
        )}
        <GooButton
          className={album.accent ? `goo-btn--${album.accent}` : ''}
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

      {/* Both lines ship where a stop has a short one, and the stylesheet shows
          whichever the screen has room for — the same arrangement the stop's
          roles use. A stop without a short line keeps its long one everywhere. */}
      {album.glimpse && (
        <p
          className={`j-glimpse${album.accent === 'green' ? ' j-glimpse--green' : ''}${
            album.glimpseShort ? ' j-glimpse--long' : ''
          }`}
        >
          {album.glimpse}
        </p>
      )}
      {album.glimpseShort && (
        <p
          className={`j-glimpse j-glimpse--short${
            album.accent === 'green' ? ' j-glimpse--green' : ''
          }`}
        >
          {album.glimpseShort}
        </p>
      )}

      {album.photos && (
        <div className={`j-wall${album.wall ? ` j-wall--${album.wall}` : ''}`}>
          <Collage photos={album.photos} badge={album.badge} tape={album.tape} />
        </div>
      )}

      {(album.links || album.reel) && (
        // Everything here sits inside the reel: the note and arrow have to be
        // siblings of the tiles, not of the grid row above, or the taller copy
        // block on the left sets where they land and they float far too high.
        <div className={`j-reel${album.links ? ' j-reel--links' : ''}`}>
          {album.links && (
            <>
              {/* Both float above the row rather than sharing a line with each
                  other: side by side, the arrow's width leaves too little for
                  the note and it wraps. */}
              <svg
                className="j-links-arrow"
                viewBox="0 0 140 78"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {/* In from the right, round the loop, then down to the left
                    with the head opened over the first tile. */}
                <path d="M133 13 C108 12 90 15 80 23 C68 32 63 45 73 50 C84 55 91 43 84 33 C74 19 54 28 38 44 L26 58" />
                <path d="M26 58 L49 55 M26 58 L34 38" />
              </svg>
              {album.linksNote && <p className="j-links-note">{album.linksNote}</p>}
            </>
          )}
          <div className="j-links-row">
          {album.links && (
            <ul className="j-links">
              {album.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer" title={link.label}>
                    <img src={link.logo} alt={link.label} loading="lazy" />
                  </a>
                </li>
              ))}
            </ul>
          )}
          {album.reel && <ReelPlayer clips={album.reel} />}
          </div>
        </div>
      )}

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

// The three site walkthroughs read as one reel: when a clip ends the next one
// loads and plays straight away, and after the last it wraps back to the first,
// so leaving it alone loops all three forever. The arrows step either way by
// hand and the dots say which one is on.
function ReelPlayer({ clips }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);
  const lite = useLiteMedia();

  const clip = clips[current];
  const count = clips.length;

  // Wraps at both ends, so the arrows never dead-end.
  const step = useCallback((by) => setCurrent((i) => (i + by + count) % count), [count]);

  // A swipe steps the reel too. On a phone the arrows are a small target and
  // a swipe is the gesture people reach for first. Nothing calls
  // preventDefault: a drag that is mostly vertical has to stay a page scroll,
  // so it is judged only once the finger lifts.
  const swipeFrom = useRef(null);
  const onTouchStart = (event) => {
    const touch = event.changedTouches[0];
    swipeFrom.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event) => {
    const from = swipeFrom.current;
    if (!from) return;
    swipeFrom.current = null;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - from.x;
    const dy = touch.clientY - from.y;
    // Far enough to be deliberate, and clearly more sideways than up or down.
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    step(dx < 0 ? 1 : -1);
  };

  // Autoplay only once the reel is actually on screen, and pause when it leaves:
  // otherwise all three clips would burn through while the visitor is still
  // reading the stops above it.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.5,
    });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // The video remounts per clip (keyed on src), so this runs against the fresh
  // element. Muted is what lets browsers allow the play call without a click.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!inView) {
      video.pause();
      return;
    }
    const attempt = video.play();
    // A refused autoplay just leaves the poster up with controls; that is fine.
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
  }, [current, inView]);

  return (
    <div
      className="j-reel-player"
      ref={rootRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Each clip is 2MB, so on a phone it is fetched once the reel is
          reached and played rather than while the page is still loading. */}
      <video
        ref={videoRef}
        className="j-video j-reel-video"
        key={clip.src}
        src={clip.src}
        poster={clip.poster}
        controls
        muted
        playsInline
        preload={lite ? 'metadata' : 'auto'}
        onEnded={() => step(1)}
      />

      <button
        type="button"
        className="j-reel-arrow j-reel-prev"
        onClick={() => step(-1)}
        aria-label={`Previous walkthrough: ${clips[(current - 1 + count) % count].label}`}
        title={clips[(current - 1 + count) % count].label}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M15 5.5 8 12l7 6.5" />
        </svg>
      </button>

      <button
        type="button"
        className="j-reel-arrow j-reel-next"
        onClick={() => step(1)}
        aria-label={`Next walkthrough: ${clips[(current + 1) % count].label}`}
        title={clips[(current + 1) % count].label}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M9 5.5 16 12l-7 6.5" />
        </svg>
      </button>

      <div className="j-reel-dots" role="tablist" aria-label="Walkthroughs">
        {clips.map((item, i) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={item.label}
            title={item.label}
            className={`j-reel-dot${i === current ? ' is-on' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <p className="j-reel-caption">{clip.label}</p>
    </div>
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
        <h2 className="section-title">My <em>experiences</em>.</h2>

        <div className="journey-track" ref={trackRef}>
          {trail && (
            <svg
              className="j-trail"
              viewBox={`0 0 ${trail.width} ${trail.height}`}
              style={{ height: `${trail.height}px` }}
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
