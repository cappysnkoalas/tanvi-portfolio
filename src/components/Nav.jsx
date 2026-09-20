import { useEffect, useState } from 'react';
import { navLinks } from '../data/content';
import './Nav.css';

const RESUME_URL = `${import.meta.env.BASE_URL}Tanvi_Vipin_Resume.pdf`;

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

  // Escape closes the panel, and a resize past the breakpoint closes it too —
  // otherwise turning a phone landscape leaves an open menu over a nav that
  // already shows its links.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const wide = window.matchMedia('(min-width: 861px)');
    const onWide = (event) => {
      if (event.matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <nav className={`nav${open ? ' is-open' : ''}`}>
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
            <span className="resume-label">Resume</span>
          </a>
          {/* Only shown once the links are too wide to sit in the bar. The
              three bars fold into a cross when the panel is open, so the same
              control both opens and closes it. */}
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((was) => !was)}
          >
            <span className="nav-bar" />
            <span className="nav-bar" />
            <span className="nav-bar" />
          </button>
        </div>
      </div>

      {/* Left in the markup when closed so the links stay in the document
          order they belong in; `hidden` keeps them out of the tab ring. */}
      <div className="nav-menu" id="nav-menu" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
