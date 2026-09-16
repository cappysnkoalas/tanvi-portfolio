import Ticker from './components/Ticker';
import Nav from './components/Nav';
import HeroAbout from './components/HeroAbout';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <div className="above-fold">
        <Nav />
        <HeroAbout />
        <Ticker />
      </div>
      <Journey />
      <Skills />
      <Work />
      <Contact />
      <Footer />
    </>
  );
}
