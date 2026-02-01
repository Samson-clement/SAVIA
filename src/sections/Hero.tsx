import { Bold } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const headlineLines = [
  { text: '86,400 Seconds In A Day.', highlight: false },
  { text: 'Every Day.', highlight: false },
  { text: 'No Human Can Keep Up.', highlight: true },
];

interface MouseData {
  zone: string;
  speed: string;
  action: string;
  coords: string;
}

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [eyeCenter, setEyeCenter] = useState({ x: 0, y: 0 });
  const [isPastHero, setIsPastHero] = useState(false);
  const [mouseData, setMouseData] = useState<MouseData>({
    zone: 'INITIALIZING',
    speed: 'CALIBRATING',
    action: 'STANDBY',
    coords: '0000:0000',
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const eyeRef = useRef<HTMLDivElement>(null);
  const fixedEyeRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position to move eye to corner
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsPastHero(window.scrollY > heroHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update fixed eye center for the tracking line when in corner mode
  useEffect(() => {
    if (isPastHero && fixedEyeRef.current) {
      const eye = fixedEyeRef.current.getBoundingClientRect();
      setEyeCenter({
        x: eye.left + eye.width / 2,
        y: eye.top + eye.height / 2,
      });
    }
  }, [isPastHero, cursorPos]);

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

  // Eye tracking effect with mouse data
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use fixed eye ref if scrolled past hero, otherwise use main eye ref
      const activeEyeRef = window.scrollY > window.innerHeight * 0.7 ? fixedEyeRef : eyeRef;
      if (!activeEyeRef.current) return;

      const eye = activeEyeRef.current.getBoundingClientRect();
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

      // Update cursor and eye center positions for the tracking line
      setCursorPos({ x: e.clientX, y: e.clientY });
      setEyeCenter({ x: eyeCenterX, y: eyeCenterY });

      // Calculate speed
      const now = Date.now();
      const timeDelta = now - lastMousePos.current.time;
      const distanceMoved = Math.hypot(
        e.clientX - lastMousePos.current.x,
        e.clientY - lastMousePos.current.y
      );
      const speed = timeDelta > 0 ? distanceMoved / timeDelta : 0;

      // Determine zone
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let horizontalZone = 'CENTER';
      let verticalZone = 'MID';

      if (e.clientX < screenWidth * 0.33) horizontalZone = 'LEFT';
      else if (e.clientX > screenWidth * 0.66) horizontalZone = 'RIGHT';

      if (e.clientY < screenHeight * 0.33) verticalZone = 'UPPER';
      else if (e.clientY > screenHeight * 0.66) verticalZone = 'LOWER';

      // Determine speed category
      let speedCategory = 'IDLE';
      if (speed > 2) speedCategory = 'RAPID';
      else if (speed > 0.8) speedCategory = 'FAST';
      else if (speed > 0.3) speedCategory = 'MODERATE';
      else if (speed > 0.05) speedCategory = 'SLOW';

      setMouseData(prev => ({
        ...prev,
        zone: `${verticalZone}-${horizontalZone}`,
        speed: speedCategory,
        coords: `${String(Math.floor(e.clientX)).padStart(4, '0')}:${String(Math.floor(e.clientY)).padStart(4, '0')}`,
      }));

      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const handleClick = () => {
      setMouseData(prev => ({ ...prev, action: 'CLICK_DETECTED' }));
      if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
      actionTimeoutRef.current = setTimeout(() => {
        setMouseData(prev => ({ ...prev, action: 'TRACKING' }));
      }, 800);
    };

    const handleMouseDown = () => {
      setMouseData(prev => ({ ...prev, action: 'PRESSING' }));
    };

    const handleMouseUp = () => {
      setMouseData(prev => ({ ...prev, action: 'RELEASED' }));
      if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
      actionTimeoutRef.current = setTimeout(() => {
        setMouseData(prev => ({ ...prev, action: 'TRACKING' }));
      }, 500);
    };

    const handleScroll = () => {
      // Update eye center position on scroll - use appropriate ref
      const activeEyeRef = window.scrollY > window.innerHeight * 0.7 ? fixedEyeRef : eyeRef;
      if (activeEyeRef.current) {
        const eye = activeEyeRef.current.getBoundingClientRect();
        setEyeCenter({
          x: eye.left + eye.width / 2,
          y: eye.top + eye.height / 2,
        });
      }

      setMouseData(prev => ({ ...prev, action: 'SCROLLING' }));
      if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
      actionTimeoutRef.current = setTimeout(() => {
        setMouseData(prev => ({ ...prev, action: 'TRACKING' }));
      }, 300);
    };

    // Initialize
    setTimeout(() => {
      setMouseData(prev => ({ ...prev, action: 'TRACKING', zone: 'SCANNING', speed: 'READY' }));
    }, 500);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
    };
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
          <source src="/hero-video.webm" type="video/webm" />
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
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 md:pt-40">
        {/* Pre-headline */}
        <p 
          className={`section-label mb-6 transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Your cameras are watching. But are they <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>AI Enabled ?</span> 
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
          className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10 transition-all duration-700 delay-900 leading-relaxed ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-[#00e5ff] font-semibold">SAVIA</span> is AI-powered video intelligence that monitors{' '}
          <span className="text-[#00e5ff]">every camera</span>,{' '}
          <span className="text-[#00e5ff]">every second</span> —{' '}
          so critical incidents <span className="underline decoration-[#00e5ff]/50 underline-offset-4">never slip through again</span>.
        </p>

        {/* Interactive High-Tech Eye */}
        <div
          className={`flex flex-col items-center justify-center mb-16 transition-all duration-700 delay-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isPastHero ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <div
            ref={eyeRef}
            onClick={() => scrollToSection('#problem')}
            className="relative w-28 h-20 cursor-pointer group"
          >
            <svg
              viewBox="0 0 100 70"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="eyeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Outer scanning ring - animated */}
              <circle
                cx="50"
                cy="35"
                r="30"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                opacity="0.4"
                className="origin-center animate-[spin_8s_linear_infinite]"
                style={{ transformOrigin: '50px 35px' }}
              />

              {/* Eye shape outer glow */}
              <path
                d="M50 8 C20 8 4 35 4 35 C4 35 20 62 50 62 C80 62 96 35 96 35 C96 35 80 8 50 8 Z"
                fill="url(#eyeGlow)"
                opacity="0.3"
              />

              {/* Eye shape main */}
              <path
                d="M50 10 C22 10 6 35 6 35 C6 35 22 60 50 60 C78 60 94 35 94 35 C94 35 78 10 50 10 Z"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.5"
                className="group-hover:stroke-[#00ffff] transition-colors duration-300"
              />

              {/* Inner eye shape */}
              <path
                d="M50 16 C28 16 14 35 14 35 C14 35 28 54 50 54 C72 54 86 35 86 35 C86 35 72 16 50 16 Z"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="0.5"
                opacity="0.5"
              />

              {/* Tech circle outer */}
              <circle
                cx="50"
                cy="35"
                r="18"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1"
                strokeDasharray="2 4 8 4"
                opacity="0.6"
              />

              {/* Iris outer ring */}
              <circle
                cx={50 + eyePosition.x}
                cy={35 + eyePosition.y}
                r="14"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="2"
                opacity="0.8"
              />

              {/* Iris segments */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1={50 + eyePosition.x + Math.cos((angle * Math.PI) / 180) * 8}
                  y1={35 + eyePosition.y + Math.sin((angle * Math.PI) / 180) * 8}
                  x2={50 + eyePosition.x + Math.cos((angle * Math.PI) / 180) * 13}
                  y2={35 + eyePosition.y + Math.sin((angle * Math.PI) / 180) * 13}
                  stroke="#00e5ff"
                  strokeWidth="1"
                  opacity="0.5"
                />
              ))}

              {/* Iris inner glow */}
              <circle
                cx={50 + eyePosition.x}
                cy={35 + eyePosition.y}
                r="10"
                fill="#00e5ff"
                opacity="0.15"
                className="group-hover:opacity-25 transition-opacity duration-300"
              />

              {/* Pupil outer */}
              <circle
                cx={50 + eyePosition.x}
                cy={35 + eyePosition.y}
                r="6"
                fill="#05080f"
                stroke="#00e5ff"
                strokeWidth="1"
              />

              {/* Pupil core */}
              <circle
                cx={50 + eyePosition.x}
                cy={35 + eyePosition.y}
                r="4"
                fill="#00e5ff"
                className="group-hover:fill-[#00ffff] transition-colors duration-300"
              />

              {/* Pupil highlight */}
              <circle
                cx={50 + eyePosition.x - 1.5}
                cy={35 + eyePosition.y - 1.5}
                r="1.5"
                fill="#ffffff"
              />

              {/* Corner tech markers */}
              <path d="M8 15 L8 10 L13 10" stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M92 15 L92 10 L87 10" stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M8 55 L8 60 L13 60" stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M92 55 L92 60 L87 60" stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />

              {/* Scanning line */}
              <line
                x1="20"
                y1="35"
                x2="80"
                y2="35"
                stroke="#00e5ff"
                strokeWidth="0.5"
                opacity="0.3"
                strokeDasharray="1 3"
              />
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#00e5ff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </div>

          {/* Matrix-style mouse tracking data */}
          <div className="mt-4 font-mono text-[10px] leading-relaxed tracking-wider text-[#00e5ff]/70 select-none">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[#00e5ff]/40">[SAVIA_TRACKING_v2.1]</span>
              <div className="flex gap-4">
                <span>ZONE:<span className="text-[#00e5ff] ml-1">{mouseData.zone}</span></span>
                <span>VEL:<span className="text-[#00e5ff] ml-1">{mouseData.speed}</span></span>
              </div>
              <div className="flex gap-4">
                <span>POS:<span className="text-[#00e5ff] ml-1">{mouseData.coords}</span></span>
                <span>ACT:<span className={`ml-1 ${mouseData.action === 'CLICK_DETECTED' || mouseData.action === 'PRESSING' ? 'text-[#ff6b6b]' : 'text-[#00e5ff]'}`}>{mouseData.action}</span></span>
              </div>
              <span className="text-[#00e5ff]/30 animate-pulse">■ LIVE</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05080f] to-transparent z-10" />

      {/* Cursor Tracker with connecting line to eye */}
      {isLoaded && (
        <>
          {/* SVG line connecting cursor to eye */}
          <svg
            className="fixed inset-0 w-full h-full pointer-events-none z-50"
            style={{ mixBlendMode: 'screen' }}
          >
            <line
              x1={cursorPos.x}
              y1={cursorPos.y}
              x2={eyeCenter.x}
              y2={eyeCenter.y}
              stroke="#00e5ff"
              strokeWidth="1"
              opacity="0.4"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Tracking square around cursor */}
          <div
            className="fixed pointer-events-none z-50 transition-transform duration-75"
            style={{
              left: cursorPos.x - 20,
              top: cursorPos.y - 20,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              {/* Corner brackets */}
              <path
                d="M0 10 L0 0 L10 0"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M30 0 L40 0 L40 10"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M40 30 L40 40 L30 40"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M10 40 L0 40 L0 30"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.5"
                opacity="0.6"
              />
              {/* Center crosshair */}
              <line x1="20" y1="16" x2="20" y2="24" stroke="#00e5ff" strokeWidth="1" opacity="0.4" />
              <line x1="16" y1="20" x2="24" y2="20" stroke="#00e5ff" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
        </>
      )}

      {/* Fixed Eye in Bottom Right Corner - appears when scrolled past hero */}
      <div
        ref={fixedEyeRef}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out ${
          isPastHero
            ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
            : 'opacity-0 translate-x-12 translate-y-12 scale-75'
        }`}
      >
        <div className="relative w-20 h-14 group">
          <svg viewBox="0 0 100 70" className="w-full h-full">
            <defs>
              <linearGradient id="eyeGlowFixed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Outer scanning ring */}
            <circle
              cx="50"
              cy="35"
              r="30"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              opacity="0.4"
              className="origin-center animate-[spin_8s_linear_infinite]"
              style={{ transformOrigin: '50px 35px' }}
            />

            {/* Eye shape outer glow */}
            <path
              d="M50 8 C20 8 4 35 4 35 C4 35 20 62 50 62 C80 62 96 35 96 35 C96 35 80 8 50 8 Z"
              fill="url(#eyeGlowFixed)"
              opacity="0.3"
            />

            {/* Eye shape main */}
            <path
              d="M50 10 C22 10 6 35 6 35 C6 35 22 60 50 60 C78 60 94 35 94 35 C94 35 78 10 50 10 Z"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="1.5"
            />

            {/* Inner eye shape */}
            <path
              d="M50 16 C28 16 14 35 14 35 C14 35 28 54 50 54 C72 54 86 35 86 35 C86 35 72 16 50 16 Z"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="0.5"
              opacity="0.5"
            />

            {/* Tech circle outer */}
            <circle
              cx="50"
              cy="35"
              r="18"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="1"
              strokeDasharray="2 4 8 4"
              opacity="0.6"
            />

            {/* Iris outer ring */}
            <circle
              cx={50 + eyePosition.x}
              cy={35 + eyePosition.y}
              r="14"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Iris segments */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1={50 + eyePosition.x + Math.cos((angle * Math.PI) / 180) * 8}
                y1={35 + eyePosition.y + Math.sin((angle * Math.PI) / 180) * 8}
                x2={50 + eyePosition.x + Math.cos((angle * Math.PI) / 180) * 13}
                y2={35 + eyePosition.y + Math.sin((angle * Math.PI) / 180) * 13}
                stroke="#00e5ff"
                strokeWidth="1"
                opacity="0.5"
              />
            ))}

            {/* Iris inner glow */}
            <circle
              cx={50 + eyePosition.x}
              cy={35 + eyePosition.y}
              r="10"
              fill="#00e5ff"
              opacity="0.15"
            />

            {/* Pupil outer */}
            <circle
              cx={50 + eyePosition.x}
              cy={35 + eyePosition.y}
              r="6"
              fill="#05080f"
              stroke="#00e5ff"
              strokeWidth="1"
            />

            {/* Pupil core */}
            <circle
              cx={50 + eyePosition.x}
              cy={35 + eyePosition.y}
              r="4"
              fill="#00e5ff"
            />

            {/* Pupil highlight */}
            <circle
              cx={50 + eyePosition.x - 1.5}
              cy={35 + eyePosition.y - 1.5}
              r="1.5"
              fill="#ffffff"
            />

            {/* Corner tech markers */}
            <path d="M8 15 L8 10 L13 10" stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M92 15 L92 10 L87 10" stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M8 55 L8 60 L13 60" stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M92 55 L92 60 L87 60" stroke="#00e5ff" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>

          {/* Glow effect behind */}
          <div className="absolute inset-0 bg-[#00e5ff]/10 blur-xl rounded-full" />

          {/* Mini tracking data */}
          <div className="absolute -top-5 left-0 right-0 font-mono text-[8px] text-[#00e5ff]/50 text-center">
            SAVIA ACTIVE
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
