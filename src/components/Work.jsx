import { work } from '../data/content';
import './Work.css';

export default function Work() {
  return (
    <section className="work section-pad" id="work">
      <div className="wrap">
        <div className="kicker">Selected work</div>
        <h2 className="section-title">A few things I've <em>built</em>.</h2>
        <div className="work-list">
          {work.map((item, i) => (
            <div className="work-item" key={i}>
              <div className="yr">{item.year}</div>
              <div>
                <h3>{item.title}</h3>
                <p className="placeholder-note">{item.note}</p>
              </div>
              <p>{item.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
