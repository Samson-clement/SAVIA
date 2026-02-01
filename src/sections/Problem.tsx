import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';

const comparisonData = [
  {
    label: 'Attention',
    human: '22 min before fatigue',
    ai: '24/7 always on',
  },
  {
    label: 'Capacity',
    human: '4-6 cameras max',
    ai: '400+ simultaneous',
  },
  {
    label: 'Accuracy',
    human: '45% miss rate',
    ai: '99.9% detection',
  },
];

export function Problem() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-b from-[#0a0608] via-[#0d0a0a] to-[#05080f]"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="section-label mb-4">The Reality</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Outfit'] mb-6">
            Your Security Team Is<br />
            <span className="text-[#00e5ff]">Set Up to Fail</span>
          </h2>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
            It's not about effort. It's about biology.
          </p>
        </div>

        {/* Comparison Table */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0a0a0f]/80">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-white/10">
              <div className="p-6 md:p-8" />
              <div className="p-6 md:p-8 text-center border-l border-white/10 bg-[#ff6b6b]/5">
                <span className="text-[#ff6b6b] font-semibold text-base md:text-lg">Human Operators</span>
              </div>
              <div className="p-6 md:p-8 text-center border-l border-white/10 bg-[#00e5ff]/5">
                <span className="text-[#00e5ff] font-semibold text-base md:text-lg">SAVIA AI</span>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 ${index < comparisonData.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <div className="p-6 md:p-8 flex items-center">
                  <span className="text-[#94a3b8] text-base md:text-lg font-medium">{row.label}</span>
                </div>
                <div className="p-6 md:p-8 flex items-center gap-3 md:gap-4 border-l border-white/10 bg-[#ff6b6b]/5">
                  <X className="text-[#ff6b6b] flex-shrink-0" size={22} />
                  <span className="text-white/80 text-base md:text-lg">{row.human}</span>
                </div>
                <div className="p-6 md:p-8 flex items-center gap-3 md:gap-4 border-l border-white/10 bg-[#00e5ff]/5">
                  <Check className="text-[#00e5ff] flex-shrink-0" size={22} />
                  <span className="text-white/80 text-base md:text-lg">{row.ai}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg md:text-xl text-[#94a3b8]">
            The problem isn't your team.{' '}
            <span className="text-[#00e5ff]">It's that humans weren't built for this.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Problem;
