import { useEffect, useRef, useState } from 'react';

const headlineLines = [
  { text: '86,400 Seconds In A Day.', highlight: false },
  { text: 'Every Day.', highlight: false },
  { text: 'No Human Can Keep Up.', highlight: true },
];

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Text decode animation for each headline line
  useEffect(() => {
    if (!isLoaded) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    headlineLines.forEach((line, lineIndex) => {
      const element = lineRefs.current[lineIndex];
      if (!element) return;

      const text = line.text;
      let iteration = 0;
      const maxIterations = text.length * 3;
      const delay = lineIndex * 400; // Stagger each line by 400ms

      setTimeout(() => {
        const interval = setInterval(() => {
          if (!lineRefs.current[lineIndex]) return;

          lineRefs.current[lineIndex]!.innerText = text
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
            if (lineRefs.current[lineIndex]) {
              lineRefs.current[lineIndex]!.innerText = text;
            }
          }
        }, 30);
      }, delay);
    });
  }, [isLoaded]);

  // Eye tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      const eye = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10,
        8
      );

      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-['Outfit'] leading-tight mb-6"
        >
          {headlineLines.map((line, index) => (
            <span
              key={index}
              ref={(el) => { lineRefs.current[index] = el; }}
              className={`block transition-all duration-700 ${
                line.highlight ? 'text-[#00e5ff]' : 'text-white'
              } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${700 + index * 200}ms` }}
            >
              {line.text}
            </span>
          ))}
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

        {/* Interactive Eye */}
        <div
          className={`flex items-center justify-center mb-16 transition-all duration-700 delay-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div
            ref={eyeRef}
            onClick={() => scrollToSection('#problem')}
            className="relative w-20 h-12 cursor-pointer group"
          >
            <svg
              viewBox="0 0 80 48"
              className="w-full h-full"
            >
              {/* Eye shape */}
              <path
                d="M40 4 C15 4 2 24 2 24 C2 24 15 44 40 44 C65 44 78 24 78 24 C78 24 65 4 40 4 Z"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="2"
                className="group-hover:stroke-[#00ffff] transition-colors duration-300"
              />
              {/* Iris */}
              <circle
                cx={40 + eyePosition.x}
                cy={24 + eyePosition.y}
                r="14"
                fill="#00e5ff"
                opacity="0.2"
                className="group-hover:opacity-30 transition-opacity duration-300"
              />
              {/* Pupil */}
              <circle
                cx={40 + eyePosition.x}
                cy={24 + eyePosition.y}
                r="6"
                fill="#00e5ff"
                className="group-hover:fill-[#00ffff] transition-colors duration-300"
              />
              {/* Pupil highlight */}
              <circle
                cx={40 + eyePosition.x - 2}
                cy={24 + eyePosition.y - 2}
                r="2"
                fill="#ffffff"
                opacity="0.8"
              />
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#00e5ff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </div>
        </div>

        {/* Floating Stats Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { value: '400+', label: 'Cameras Monitored' },
            { value: '<3s', label: 'Alert Response' },
            { value: '75%', label: 'Cost Reduction' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 py-2 rounded-full border border-[#00e5ff]/20 bg-[#05080f]/40 backdrop-blur-sm
                hover:border-[#00e5ff]/40 transition-all duration-300
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${1200 + index * 100}ms` }}
            >
              <span className="text-[#00e5ff] font-mono font-bold">{stat.value}</span>
              <span className="text-[#94a3b8] ml-2 text-sm">{stat.label}</span>
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
