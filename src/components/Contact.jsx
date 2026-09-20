import { contact } from '../data/content';
import './Contact.css';

const asset = (file) => `${import.meta.env.BASE_URL}${file}`;

export default function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      {/* Decorative loop behind the copy: muted so it may autoplay, and hidden
          from assistive tech since it carries no information. */}
      <video
        className="contact-bg"
        src={asset('contact/cta-bg.mp4')}
        poster={asset('contact/cta-bg.jpg')}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="contact-scrim" aria-hidden="true" />
      <div className="wrap contact-inner">
        <div className="kicker">Get in touch</div>
        <h2 className="section-title">Let's build <em>something</em>.</h2>
        <p>I'd love to connect and talk more :) If you liked what you saw, I'm looking for an opportunity to create real impact!</p>
        {/* Opens in its own tab, since it leaves the site; noreferrer keeps
            the new tab from reaching back into this one. */}
        <a
          className="contact-btn"
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LET'S CONNECT
        </a>
      </div>
    </section>
  );
}
