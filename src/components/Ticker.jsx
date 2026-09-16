import { Fragment } from 'react';
import { tickerWords } from '../data/content';
import './Ticker.css';

// The track is animated to -50%, so the word list is rendered twice for a seamless loop.
const HALF_REPEATS = 2;

export default function Ticker() {
  const half = Array.from({ length: HALF_REPEATS }, () => tickerWords).flat();
  const track = [...half, ...half];

  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {track.map((word, i) => (
          <Fragment key={i}>
            <span className={`tk ${word.color}`}>{word.text}</span>
            <span className="tk-dot">·</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
