import { skills } from '../data/content';
import './Skills.css';

export default function Skills() {
  return (
    <section className="skills section-pad" id="skills">
      <div className="wrap">
        <div className="kicker">Skills</div>
        <h2 className="section-title">Two toolkits, <em>one</em> way of thinking.</h2>
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
