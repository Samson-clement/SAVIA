import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Text decode animation for headline
  useEffect(() => {
    if (!isLoaded || !headlineRef.current) return;
    
    const text = headlineRef.current.innerText;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let iteration = 0;
    const maxIterations = text.length * 3;
    
    const interval = setInterval(() => {
      if (!headlineRef.current) return;
      
      headlineRef.current.innerText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 3) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      iteration++;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        if (headlineRef.current) {
          headlineRef.current.innerText = text;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isLoaded]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-all duration-[1.5s] ${
            isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-[10px]'
          }`}
          style={{ opacity: 0.25 }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 video-overlay" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        {/* Scanline effect */}
        <div className="scanline" />
      </div>

      {/* HUD Frame Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Corner brackets */}
        <div 
          className={`absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00e5ff]/30 transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div 
          className={`absolute top-24 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00e5ff]/30 transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div 
          className={`absolute bottom-24 left-8 w-16 h-16 border-l-2 border-b-2 border-[#00e5ff]/30 transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div 
          className={`absolute bottom-24 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00e5ff]/30 transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Pre-headline */}
        <p 
          className={`section-label mb-6 transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Your cameras are watching. But who's watching your cameras?
        </p>

        {/* Main Headline */}
        <h1 
          ref={headlineRef}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-['Outfit'] leading-tight mb-6 transition-all duration-700 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          86,400 Seconds Per Camera. Every Day. No Human Can Keep Up.
        </h1>

        {/* Subheadline */}
        <p 
          className={`text-lg sm:text-xl text-[#94a3b8] max-w-3xl mx-auto mb-10 transition-all duration-700 delay-900 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          SAVIA is AI-powered video intelligence that monitors every camera, every second — 
          so critical incidents never slip through again.
        </p>

        {/* CTA Button */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button 
            onClick={() => scrollToSection('#solution')}
            className="btn-glow group bg-[#00e5ff] text-[#05080f] px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-[#00ffff] transition-all"
          >
            <Play size={20} className="group-hover:scale-110 transition-transform" />
            See How It Works
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Floating Stats Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { value: '400+', label: 'cameras analyzed simultaneously' },
            { value: '<3s', label: 'Alerts in under 3 seconds' },
            { value: '75%', label: 'cost reduction' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`stat-badge float transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                animationDelay: `${1.2 + index * 0.2}s`,
                animationDuration: '4s',
              }}
            >
              <span className="text-[#00e5ff] font-mono font-bold">{stat.value}</span>
              <span className="text-[#94a3b8] ml-2">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05080f] to-transparent z-10" />
    </section>
  );
}

export default Hero;
