import heroPortrait from '../assets/hero-portrait.jpg';
import star from '../assets/star.png';
import MagicSparkle from './MagicSparkle';
import PaperClip from './PaperClip';
import './HeroAbout.css';

export default function HeroAbout() {
  return (
    <section className="hero-about" id="about">
      <div className="wrap hero-about-grid">

        <div className="left-col">
          <div className="eyebrow">PORTFOLIO — 2026</div>

          <div className="name-block">
            <div className="big-name">TANVI VIPIN</div>
            <div className="name-sub"><span className="rule" />MECHANICAL ENGINEER</div>
          </div>

          <div className="about-box">
            <div className="paper-shape">
              <div className="paper-surface" />

              <div className="about-content">
                <div className="about-kicker">HEY!! here's a little about me</div>
                <div className="intro-body">
                  <p>
                    <b>ENGINEERING</b> is my foundation. I'm pursuing a{' '}
                    <b>B.Tech in Mechanical Engineering</b>, and it's given me a genuine love
                    for how things are built, optimized, and made to work efficiently.
                  </p>
                  <p>My interests have never stayed in <em>just one lane</em>.</p>
                  <p className="emph">
                    I <span className="chip chip-rose">DESIGN</span>. I <span className="chip chip-olive">WRITE</span>.{' '}
                    I <span className="chip chip-gold">EDIT</span>. I <span className="chip chip-burgundy2">SPEAK</span>.{' '}
                    I <span className="chip chip-rose">LEAD</span>.
                  </p>
                  <p>
                    I'm fascinated by management, drawn to good design, and currently learning my way
                    around <em>AI and agentic systems</em>. Basically, I like <b>building things</b> in
                    more ways than one.
                  </p>
                </div>
                <div className="intro-triad">
                  <div className="lead">I'm drawn to the spaces where engineering meets creativity.</div>
                  <div><b>Engineer</b> by degree.</div>
                  <div><b>Creator</b> by nature.</div>
                  <div>Always figuring out what to build next.</div>
                </div>
              </div>
            </div>

            <MagicSparkle />
            <PaperClip />
          </div>
        </div>

        <div className="photo-col">
          <div className="hero-photo">
            <img src={heroPortrait} alt="Portrait of Tanvi Vipin" />
          </div>
          <img className="dd-star" src={star} alt="" />
        </div>

      </div>
    </section>
  );
}
