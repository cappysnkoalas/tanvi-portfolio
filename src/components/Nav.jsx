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
  return (
    <nav className="nav">
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
        </div>
      </div>
    </nav>
  );
}
