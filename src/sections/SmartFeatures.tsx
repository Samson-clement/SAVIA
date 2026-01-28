import { useEffect, useRef, useState } from 'react';
import { Search, ScanFace, BarChart3, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Video Search \u0026 Summarization',
    description: 'Find exactly what you need by appearance, color, object, or time. Condense hours into minutes. Ask questions in natural language and get instant answers.',
    highlights: ['Natural language queries', 'Object-based search', 'Time compression'],
    color: '#00e5ff',
  },
  {
    icon: ScanFace,
    title: 'Face Detection \u0026 Forensics',
    description: 'Upload any face and search across all archived footage in seconds. Track individuals across your entire camera network with Cross-Camera Re-ID.',
    highlights: ['One-click face search', 'Cross-camera tracking', 'Watchlist alerts'],
    color: '#f59e0b',
  },
  {
    icon: BarChart3,
    title: 'Operational Dashboards',
    description: 'Real-time insights, pattern detection, and automated reports. Transform raw video into actionable business intelligence.',
    highlights: ['Live analytics', 'Pattern recognition', 'Automated reports'],
    color: '#22c55e',
  },
];

export function SmartFeatures() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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

  // Auto-rotate features
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080f] via-[#0a1018] to-[#05080f]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="section-label mb-4">Beyond Surveillance</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Outfit'] mb-6">
            Intelligence, <span className="gradient-text">Not Just Video</span>
          </h2>
        </div>

        {/* Features Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`glass-card p-6 rounded-xl cursor-pointer transition-all duration-500 ${
                  activeFeature === index 
                    ? 'bg-[#0d1520] border-[#00e5ff]/50 shadow-[0_0_30px_rgba(0,229,255,0.1)]' 
                    : 'opacity-60 hover:opacity-80'
                } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ 
                      backgroundColor: activeFeature === index ? `${feature.color}25` : `${feature.color}10`,
                    }}
                  >
                    <feature.icon 
                      size={24} 
                      style={{ color: feature.color }}
                      className={activeFeature === index ? 'scale-110' : ''}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">
                      {feature.title}
                    </h3>
                    <p className={`text-sm text-[#94a3b8] transition-all duration-500 ${
                      activeFeature === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {feature.description}
                    </p>
                  </div>

                  <ArrowRight 
                    size={20} 
                    className={`text-[#00e5ff] transition-all duration-300 ${
                      activeFeature === index ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                    }`}
                  />
                </div>

                {/* Progress bar for active feature */}
                {activeFeature === index && (
                  <div className="mt-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-100"
                      style={{ 
                        backgroundColor: feature.color,
                        animation: 'progress 5s linear',
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Visual Canvas */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-[#00e5ff]/20"
                    style={{
                      width: `${(i + 1) * 33}%`,
                      height: `${(i + 1) * 33}%`,
                      animation: `pulse-ring ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Central feature display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  {features.map((feature, index) => (
                    <div
                      key={feature.title}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                        activeFeature === index 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-90'
                      }`}
                    >
                      {/* Feature icon container */}
                      <div 
                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center relative"
                        style={{ 
                          background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}05 100%)`,
                          boxShadow: `0 0 60px ${feature.color}30`,
                        }}
                      >
                        <feature.icon 
                          size={64} 
                          style={{ color: feature.color }}
                          className="drop-shadow-[0_0_20px_currentColor]"
                        />
                        
                        {/* Orbiting particles */}
                        <div className="absolute inset-0">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: feature.color,
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 90}deg) translateX(80px) rotate(-${i * 90}deg)`,
                                animation: `orbit 4s linear infinite`,
                                animationDelay: `${i * 1}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature highlights */}
              <div className="absolute -bottom-8 left-0 right-0">
                <div className="flex justify-center gap-4 flex-wrap">
                  {features[activeFeature].highlights.map((highlight, i) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 animate-fade-in"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default SmartFeatures;
