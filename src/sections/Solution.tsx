import { useEffect, useRef, useState } from 'react';
import { Eye, Zap, TrendingDown, Clock, Shield, Cpu, Brain, Bell, Play } from 'lucide-react';

const usecases = [
  {
    icon: Eye,
    title: '24/7 Vigilance',
    description: 'Every camera, every second, analyzed in real-time without fatigue.',
    stat: '∞',
    statLabel: 'Attention Span',
  },
  {
    icon: Zap,
    title: 'Instant Response',
    description: 'Alerts via SMS, WhatsApp, Email, or Teams within seconds.',
    stat: '<3s',
    statLabel: 'Alert Time',
  },
  {
    icon: TrendingDown,
    title: 'Cost Efficient',
    description: 'Full coverage at a fraction of manual monitoring costs.',
    stat: '75%',
    statLabel: 'Cost Reduction',
  },
  {
    icon: Clock,
    title: 'Rapid Review',
    description: 'AI summarization turns hours of footage into minutes.',
    stat: '100x',
    statLabel: 'Faster',
  },
];

export function Solution() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="relative overflow-hidden"
    >
      {/* Full-width white card with rounded corners */}
      <div className="relative bg-white py-16 md:py-24 lg:py-32 mx-4 md:mx-8 rounded-3xl md:rounded-[48px] shadow-2xl overflow-hidden">

        {/* Tech grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Animated corner accents */}
        <div className={`absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00e5ff]/30 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00e5ff]/30 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#00e5ff]/30 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00e5ff]/30 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />

        {/* Inner content container */}
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* Entry Badge */}
          <div className={`flex justify-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a1018] border border-[#00e5ff]/30">
              <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
              <span className="text-xs font-mono text-[#00e5ff] tracking-widest uppercase">System Online</span>
              <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            </div>
          </div>

          {/* Header */}
          <div
            className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-sm font-mono text-[#00e5ff] tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#00e5ff]" />
              Enter SAVIA
              <span className="w-8 h-px bg-[#00e5ff]" />
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a1018] font-['Outfit'] mb-6">
              AI That <span className="text-[#00e5ff]">Never Blinks</span>
            </h2>
            <p className="text-lg text-[#64748b] leading-relaxed max-w-2xl mx-auto">
              <span className="font-mono text-[#0a1018]">SAVIA</span> — {' '}
              <span className="text-[#00e5ff]">S</span>ecure{' '}
              <span className="text-[#00e5ff]">A</span>I{' '}
              <span className="text-[#00e5ff]">V</span>ision &{' '}
              <span className="text-[#00e5ff]">I</span>ntelligent{' '}
              <span className="text-[#00e5ff]">A</span>nalytics — transforms
              your existing cameras into a proactive, intelligent security network.
            </p>
          </div>

          {/* Logo with Cards Layout */}
          <div className={`flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Left Cards */}
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              {usecases.slice(0, 2).map((cap) => (
                <div
                  key={cap.title}
                  className="relative p-5 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-white border border-[#e2e8f0] group transition-[border,box-shadow] duration-150 hover:border-[#00e5ff]/50 hover:shadow-xl cursor-pointer w-full lg:w-80 xl:w-96"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0a1018] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <cap.icon className="w-6 h-6 text-[#00e5ff]" />
                    </div>
                    <div>
                      <div className={`font-bold text-[#00e5ff] font-mono ${cap.stat === '∞' ? 'text-4xl' : 'text-2xl'}`}>{cap.stat}</div>
                      <div className="text-xs text-[#94a3b8] uppercase tracking-wider">{cap.statLabel}</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-base font-bold text-[#0a1018] font-['Outfit'] mb-1">{cap.title}</h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">{cap.description}</p>
                  </div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* Center Logo with Orbital Rings, Icons & Particles */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center flex-shrink-0">
              {/* Outer orbital ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00e5ff]/30 animate-[spin_20s_linear_infinite]" />

              {/* Middle orbital ring - reverse */}
              <div className="absolute inset-6 rounded-full border border-[#00e5ff]/20 animate-[spin_15s_linear_infinite_reverse]" />

              {/* Inner orbital ring */}
              <div className="absolute inset-12 rounded-full border border-dashed border-[#00e5ff]/25 animate-[spin_25s_linear_infinite]" />

              {/* Particle trails */}
              <div className="absolute w-2 h-2 bg-[#00e5ff] rounded-full blur-[1px] animate-[orbit1_8s_linear_infinite]" />
              <div className="absolute w-1.5 h-1.5 bg-[#00e5ff]/80 rounded-full blur-[1px] animate-[orbit2_10s_linear_infinite]" style={{ animationDelay: '-2s' }} />
              <div className="absolute w-1 h-1 bg-[#00e5ff]/60 rounded-full blur-[1px] animate-[orbit3_12s_linear_infinite]" style={{ animationDelay: '-4s' }} />
              <div className="absolute w-1.5 h-1.5 bg-[#00e5ff]/70 rounded-full blur-[1px] animate-[orbit1_9s_linear_infinite_reverse]" style={{ animationDelay: '-3s' }} />
              <div className="absolute w-1 h-1 bg-[#00e5ff]/50 rounded-full blur-[1px] animate-[orbit2_11s_linear_infinite_reverse]" style={{ animationDelay: '-5s' }} />

              {/* Orbiting icons */}
              <div className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#00e5ff]/30 flex items-center justify-center shadow-lg animate-[orbitIcon_12s_linear_infinite]">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#00e5ff]" />
              </div>
              <div className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#00e5ff]/30 flex items-center justify-center shadow-lg animate-[orbitIcon_12s_linear_infinite]" style={{ animationDelay: '-3s' }}>
                <Cpu className="w-5 h-5 md:w-6 md:h-6 text-[#00e5ff]" />
              </div>
              <div className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#00e5ff]/30 flex items-center justify-center shadow-lg animate-[orbitIcon_12s_linear_infinite]" style={{ animationDelay: '-6s' }}>
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-[#00e5ff]" />
              </div>
              <div className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#00e5ff]/30 flex items-center justify-center shadow-lg animate-[orbitIcon_12s_linear_infinite]" style={{ animationDelay: '-9s' }}>
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-[#00e5ff]" />
              </div>

              {/* Center logo with subtle glow */}
              <div className="relative">
                <div className="absolute inset-4 bg-[#00e5ff] rounded-full blur-3xl opacity-10 animate-pulse" />
                <img src="/SAVIA Logo (SVG).svg" alt="SAVIA" className="relative w-44 h-44 md:w-56 md:h-56" />
              </div>
            </div>

            {/* Right Cards */}
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              {usecases.slice(2, 4).map((cap) => (
                <div
                  key={cap.title}
                  className="relative p-5 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-white border border-[#e2e8f0] group transition-[border,box-shadow] duration-150 hover:border-[#00e5ff]/50 hover:shadow-xl cursor-pointer w-full lg:w-80 xl:w-96"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0a1018] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <cap.icon className="w-6 h-6 text-[#00e5ff]" />
                    </div>
                    <div>
                      <div className={`font-bold text-[#00e5ff] font-mono ${cap.stat === '∞' ? 'text-4xl' : 'text-2xl'}`}>{cap.stat}</div>
                      <div className="text-xs text-[#94a3b8] uppercase tracking-wider">{cap.statLabel}</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-base font-bold text-[#0a1018] font-['Outfit'] mb-1">{cap.title}</h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">{cap.description}</p>
                  </div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Custom keyframes */}
          <style>{`
            @keyframes orbit1 {
              0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
            }
            @keyframes orbit2 {
              0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
            }
            @keyframes orbit3 {
              0% { transform: rotate(0deg) translateX(140px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
            }
            @keyframes orbitIcon {
              0% { transform: rotate(0deg) translateX(115px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(115px) rotate(-360deg); }
            }
          `}</style>

          {/* Bottom trust indicators */}
          <div
            className={`pt-8 border-t border-[#e2e8f0] transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { icon: Shield, text: 'Secuirty Compliant' },
                { icon: Eye, text: 'Works with existing cameras' },
                { icon: Bell, text: 'Never miss an Incident' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-[#64748b] group">
                  <div className="w-8 h-8 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center group-hover:border-[#00e5ff]/30 transition-colors">
                    <item.icon size={16} className="text-[#00e5ff]" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Player Section */}
          <div
            className={`mt-16 transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e2e8f0] bg-black">
              <video
                ref={videoRef}
                className="w-full aspect-video"
                controls={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                poster=""
              >
                <source src="/savia video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group"
                  onClick={handlePlayClick}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#0a1018] ml-1" fill="#0a1018" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solution;
