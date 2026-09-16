import { useLayoutEffect, useRef, useState } from 'react';
import { journey } from '../data/content';
import { BLOB_PATHS, BLOB_COLORS } from './blobShapes';
import { buildRibbon } from './trailRibbon';
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
      <span className="j-label">{label} ·</span>
    </div>
  );
}

function Collage({ photos }) {
  return (
    <div className="collage">
      {photos.map((photo, n) => (
        <img
          className={`col-pic pic-${n}`}
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
        />
      ))}
    </div>
  );
}

function FeatureStop({ item, index }) {
  const { album } = item;
  return (
    <li className="journey-item journey-feature">
      <div className="j-head">
        <div className="j-year">{item.year}</div>
        <div className="j-feature-name">
          <img className="j-feature-logo" src={album.logo} alt={`${album.name} logo`} />
          <div>
            <h3 className="j-feature-title">{album.name}</h3>
            <a className="j-feature-ig" href={album.instagram} target="_blank" rel="noreferrer">
              {album.handle}
            </a>
          </div>
        </div>
        <p className="j-feature-roles">{item.blurb}</p>
      </div>

      <div className="j-media">
        <Marker index={index} label={item.label} />
      </div>

      <div className="j-wall">
        <Collage photos={album.photos} />
        <p className="j-note">{album.note}</p>
      </div>

      <div className="j-story">
        {album.story.map((paragraph, n) => (
          <p key={n}>{paragraph}</p>
        ))}
      </div>

      <span className="j-guide" aria-hidden="true" />
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
