import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Stats />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
