import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { Solution } from './sections/Solution';
import { Usecases } from './sections/Usecases';
import { SmartFeatures } from './sections/SmartFeatures';
import { Industries } from './sections/Industries';
import { Trust } from './sections/Trust';
import { CTA } from './sections/CTA';

function App() {
  return (
    <div className="min-h-screen bg-[#05080f] text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Usecases />
        <SmartFeatures />
        <Industries />
        <Trust />
        <CTA />
      </main>
    </div>
  );
}

export default App;
