import { useReveal } from './hooks/useReveal';
import IconSprite from './components/IconSprite';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Hifu from './components/Hifu';
import Tratamientos from './components/Tratamientos';
import Espacio from './components/Espacio';
import Pasos from './components/Pasos';
import Compromiso from './components/Compromiso';
import Preguntas from './components/Preguntas';
import Reservar from './components/Reservar';
import Footer from './components/Footer';
import BottomBar from './components/BottomBar';

export default function App() {
  useReveal();
  return (
    <>
      <IconSprite />
      <a className="sr-only" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero />
        <Marquee />
        <Hifu />
        <Tratamientos />
        <Espacio />
        <Pasos />
        <Compromiso />
        <Preguntas />
        <Reservar />
      </main>
      <Footer />
      <BottomBar />
    </>
  );
}
