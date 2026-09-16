import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { journey } from '../data/content';
import { BLOB_PATHS, BLOB_COLORS } from './blobShapes';
import { buildRibbon } from './trailRibbon';
import PaperClip from './PaperClip';
import './Journey.css';

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
      setTrail({
        width: trackBox.width,
        height: trackBox.height,
        path: buildRibbon(centres, trackBox.height),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
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

function Collage({ photos }) {
  return (
    <div className="collage">
      {photos.map((photo, n) => (
        <figure className={`col-pic pic-${n}`} key={photo.src}>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </figure>
      ))}
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
            <div className="j-sheet-kicker">the story behind</div>
            <h3 className="j-sheet-title" id={`${id}-title`}>{album.name}</h3>
            {album.story.map((paragraph, n) => (
              <p key={n}>{paragraph}</p>
            ))}
            <p className="j-sheet-sign">{album.note}</p>
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
    <li className="journey-item journey-feature">
      <div className="j-head">
        <div className="j-year">{item.year}</div>
        <div className="j-feature-name">
          <img className="j-feature-logo" src={album.logo} alt={`${album.name} logo`} />
          <div>
            <h3 className="j-feature-title">
              <button
                type="button"
                className="j-feature-toggle"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
              >
                {album.name}
              </button>
            </h3>
            <a className="j-feature-ig" href={album.instagram} target="_blank" rel="noreferrer">
              {album.handle}
            </a>
          </div>
        </div>
        <p className="j-feature-roles">{item.blurb}</p>
        <span className="j-read-more-shadow">
          <button
            type="button"
            className="j-read-more"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
          >
            read the story
            <span className="j-read-arrow" aria-hidden="true">→</span>
          </button>
        </span>
      </div>
      {open && <StorySheet album={album} id={storyId} onClose={close} />}

      <div className="j-media">
        <Marker index={index} />
      </div>

      <div className="j-wall">
        <Collage photos={album.photos} />
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
          <span className="j-read-more-shadow j-visit-shadow">
            <a className="j-read-more j-visit" href={album.instagram} target="_blank" rel="noreferrer">
              <svg className="j-ig-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.3" cy="6.7" r="0.9" className="j-ig-dot" />
              </svg>
              visit anokha
              <span className="j-read-arrow" aria-hidden="true">→</span>
            </a>
          </span>
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
