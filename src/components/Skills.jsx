import { skills } from '../data/content';
import './Skills.css';

// Where each tool lands once its card opens, measured from the middle of the
// card. Fixed rather than random so a card scatters the same way every time,
// and ordered so the first few tools take the roomiest corners.
const SCATTER = [
  { x: -48, y: -42 },
  { x: 52, y: -24 },
  { x: -42, y: 34 },
  { x: 46, y: 48 },
  { x: 0, y: -66 },
];

export default function Skills() {
  return (
    <section className="skills section-pad" id="skills">
      <div className="wrap">
        <div className="kicker">Skills</div>
        {/* The rule sits under the words only — the full stop hangs past it. */}
        <h2 className="section-title skills-title">
          <span className="skills-underline">How I do it</span>.
        </h2>
        <p className="skills-lead">
          <span className="hl">Consistent practice</span>, sharpening the{' '}
          <span className="hl">fundamentals</span>, and applying these skills{' '}
          <span className="hl">where it counts</span>.
        </p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            // Focusable so the tools are reachable without a mouse: the card
            // opens on focus exactly as it does on hover.
            <article className="skill-card" key={skill.title} tabIndex={0}>
              <span className="skill-num">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="skill-title">{skill.title}</h3>
              <span className="skill-hint">Hover to open</span>

              <ul className="skill-tools">
                {skill.tools.map((tool, n) => (
                  <li
                    className="skill-tool"
                    key={tool.name}
                    style={{
                      '--tx': `${SCATTER[n % SCATTER.length].x}px`,
                      '--ty': `${SCATTER[n % SCATTER.length].y}px`,
                      '--delay': `${n * 45}ms`,
                    }}
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                      alt=""
                      loading="lazy"
                    />
                    {tool.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
