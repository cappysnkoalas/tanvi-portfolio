import { contact, navLinks } from '../data/content';
import './Footer.css';

const { email: EMAIL, linkedin: LINKEDIN } = contact;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <span className="footer-name">
            <span className="footer-dot" />
            Tanvi Vipin
          </span>
          <span className="footer-role">Mechanical engineer</span>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-reach">
          <p className="footer-reach-row">
            <span className="footer-reach-label">Email:</span>
            <a className="footer-mail" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
          <p className="footer-reach-row">
            <span className="footer-reach-label">LinkedIn:</span>
            {/* Opens in its own tab, since it leaves the site; noreferrer
                keeps the new tab from reaching back into this one. */}
            <a
              className="footer-mail"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/tanvi-vipin
            </a>
          </p>
        </div>
      </div>

      <div className="wrap footer-base">
        <span>© 2026 Tanvi Vipin</span>
        <span className="footer-note">Designed and built from scratch by me</span>
        {/* A bare hash returns to the top of the document, and the page's
            smooth scrolling carries it. */}
        <a className="footer-top" href="#">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
