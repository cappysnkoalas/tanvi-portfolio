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
        <p>[Placeholder — one line inviting people to reach out, plus your email or a way to book time.]</p>
        <a href="#" className="contact-btn">SAY HELLO</a>
      </div>
    </section>
  );
}
