import { useEffect, useRef, useState } from 'react';
import { Eye, Zap, TrendingDown, Clock, Shield } from 'lucide-react';

const capabilities = [
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

          {/* SAVIA Logo */}
          <div className={`flex justify-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <img src="/SAVIA Logo (SVG).svg" alt="SAVIA" className="w-48 h-48 md:w-64 md:h-64" />
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
            {capabilities.map((cap, index) => (
              <div
                key={cap.title}
                className={`relative p-6 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-white border border-[#e2e8f0] group transition-all duration-500 hover:border-[#00e5ff]/50 hover:shadow-xl cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${activeIndex === index ? 'border-[#00e5ff] shadow-lg shadow-[#00e5ff]/10' : ''}`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Top stat */}
                <div className="text-center mb-4">
                  <div className="text-3xl md:text-4xl font-bold text-[#00e5ff] font-mono">
                    {cap.stat}
                  </div>
                  <div className="text-xs text-[#94a3b8] uppercase tracking-wider">
                    {cap.statLabel}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent mx-auto mb-4" />

                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0a1018] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <cap.icon className="w-6 h-6 text-[#00e5ff]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#0a1018] font-['Outfit'] text-center mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm text-[#64748b] text-center leading-relaxed">
                  {cap.description}
                </p>

                {/* Corner accent on hover */}
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Bottom trust indicators */}
          <div
            className={`pt-8 border-t border-[#e2e8f0] transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { icon: Shield, text: 'No hardware required' },
                { icon: Eye, text: 'Works with existing cameras' },
                { icon: Zap, text: 'Deploy in 24 hours' },
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
        </div>
      </div>
    </section>
  );
}

export default Solution;
