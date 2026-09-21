import { useEffect, useState } from 'react';
import { navLinks } from '../data/content';
import './Nav.css';

const RESUME_URL = `${import.meta.env.BASE_URL}Tanvi_Vipin_Resume.pdf`;

// Above this the links sit in the bar and the menu has no reason to exist.
const WIDE = '(min-width: 861px)';

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape closes it, and so does growing past the breakpoint: rotate the
  // phone to landscape and the sheet would otherwise be stranded open over a
  // bar that has its links back.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia(WIDE);
    const onWide = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <>
    {/* Fixed rather than sticky. Sticky is only as reliable as every ancestor
        it sits under: any of them clipping or scrolling drops it, and it did
        drop on iOS. Fixed answers to the viewport alone. */}
    <header className={`nav${open ? ' is-open' : ''}`}>
      <div className="nav-inner">
        <div className="nav-name">
          <span className="dot" />
          Tanvi Vipin
        </div>
        <div className="nav-actions">
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <a className="resume-btn" href={RESUME_URL} download="Tanvi_Vipin_Resume.pdf">
            <DownloadIcon />
            Resume
          </a>
          {/* The links are out of the bar on a phone, so this is the only way
              to reach them. */}
          <button
            type="button"
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Kept in the tree rather than unmounted so opening and closing can be
          animated; `inert` takes it off the tab order while it is shut. */}
      <div className="nav-sheet" id="nav-sheet" inert={!open || undefined}>
        <nav aria-label="Menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>

    {/* Tap anywhere off the sheet to dismiss it. A sibling of the bar, not a
        child: the bar's backdrop blur makes it the containing block for any
        fixed element inside it, which sized this against the 56px bar rather
        than the screen and left it zero pixels tall. */}
    <button
      type="button"
      className={`nav-scrim${open ? ' is-open' : ''}`}
      aria-hidden="true"
      tabIndex={-1}
      onClick={close}
    />
    </>
  );
}
