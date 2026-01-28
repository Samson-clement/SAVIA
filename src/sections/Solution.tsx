import { useEffect, useRef, useState } from 'react';
import { Eye, Zap, TrendingDown, Clock, CheckCircle } from 'lucide-react';

const benefits = [
  {
    icon: Eye,
    title: '24/7 Automated Monitoring',
    description: 'Every camera, every second, analyzed in real-time without fatigue or distraction.',
    color: '#00e5ff',
  },
  {
    icon: Zap,
    title: 'Instant Alerts',
    description: 'SMS, WhatsApp, Email, or Teams notifications — within seconds of detection.',
    color: '#f59e0b',
  },
  {
    icon: TrendingDown,
    title: '75% Cost Reduction',
    description: 'Full coverage at a fraction of manual monitoring costs. Pay for AI, not headcount.',
    color: '#22c55e',
  },
  {
    icon: Clock,
    title: 'Hours → Minutes',
    description: 'AI summarization turns day-long reviews into minutes. Find incidents instantly.',
    color: '#3b82f6',
  },
];

export function Solution() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080f] via-[#0a1018] to-[#05080f]" />
      
      {/* Animated orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div 
          className={`w-[600px] h-[600px] rounded-full border border-[#00e5ff]/20 transition-all duration-1000 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ animation: isVisible ? 'spin 60s linear infinite' : 'none' }}
        />
        <div 
          className={`absolute w-[400px] h-[400px] rounded-full border border-[#f59e0b]/20 transition-all duration-1000 delay-200 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ animation: isVisible ? 'spin-reverse 40s linear infinite' : 'none' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="section-label mb-4">Enter SAVIA</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Outfit'] mb-6">
            AI That <span className="gradient-text">Never Blinks</span>
          </h2>
          <p className="text-lg text-[#94a3b8] leading-relaxed">
            SAVIA — <span className="text-white font-semibold">S</span>ecure{' '}
            <span className="text-white font-semibold">A</span>I{' '}
            <span className="text-white font-semibold">V</span>ision &{' '}
            <span className="text-white font-semibold">I</span>ntelligent{' '}
            <span className="text-white font-semibold">A</span>nalytics — transforms 
            your existing cameras into a proactive, intelligent security network. Every 
            frame analyzed. Every anomaly caught. Every second covered.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`glass-card p-8 rounded-2xl group transition-all duration-700 hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${benefit.color}15` }}
                >
                  <benefit.icon 
                    size={28} 
                    style={{ color: benefit.color }}
                    className="transition-transform group-hover:rotate-12"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white font-['Outfit'] mb-3 group-hover:text-[#00e5ff] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-[#94a3b8] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Check indicator */}
                <CheckCircle 
                  className="text-[#00e5ff] opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0"
                  size={24}
                />
              </div>

              {/* Hover glow */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${benefit.color}10 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom trust indicators */}
        <div 
          className={`mt-16 flex flex-wrap justify-center gap-8 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            'No hardware required',
            'Works with existing cameras',
            'Deploy in 24 hours',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-[#94a3b8]">
              <CheckCircle size={18} className="text-[#00e5ff]" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}

export default Solution;
