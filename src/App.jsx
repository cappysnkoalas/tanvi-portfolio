import Ticker from './components/Ticker';
import Nav from './components/Nav';
import HeroAbout from './components/HeroAbout';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Outside .above-fold on purpose: a sticky element can only stick
          within its own parent, so nesting the nav here dropped it the moment
          the hero scrolled past. */}
      <Nav />
      <div className="above-fold">
        <HeroAbout />
        <Ticker />
      </div>
      <Journey />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
