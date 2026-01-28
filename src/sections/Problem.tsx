import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Brain, Eye, Timer, TrendingDown, User, Zap } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

function Counter({ end, suffix = '', prefix = '', duration = 2000, decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (end - startValue) * easeOutQuart;

      setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, decimals]);

  return (
    <span ref={ref} className="counter">
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
    </span>
  );
}

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

  const humanLimitations = [
    {
      icon: Eye,
      stat: '22',
      unit: 'min',
      label: 'Attention Span',
      detail: 'Before 95% focus loss',
    },
    {
      icon: Timer,
      stat: '4-6',
      unit: '',
      label: 'Cameras Max',
      detail: 'Effective monitoring limit',
    },
    {
      icon: TrendingDown,
      stat: '45',
      unit: '%',
      label: 'Miss Rate',
      detail: 'Critical incidents missed',
    },
  ];

  const aiCapabilities = [
    {
      icon: Zap,
      stat: '24/7',
      unit: '',
      label: 'Always On',
      detail: 'Zero fatigue, zero breaks',
    },
    {
      icon: Brain,
      stat: '400',
      unit: '+',
      label: 'Cameras',
      detail: 'Simultaneous analysis',
    },
    {
      icon: Eye,
      stat: '99.9',
      unit: '%',
      label: 'Detection',
      detail: 'Accuracy rate',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Falling data particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#00e5ff]/10 font-mono text-xs animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="section-label mb-4">The Reality</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Outfit'] mb-6">
            Your Security Team Is<br />
            <span className="text-[#00e5ff]">Set Up to Fail</span>
          </h2>
          <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto">
            It's not about effort. It's about biology. Humans weren't designed to stare at screens
            for hours. The math simply doesn't work.
          </p>
        </div>

        {/* The Math Problem */}
        <div
          className={`glass-card p-8 rounded-2xl mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold text-[#ff6b6b] font-mono mb-2">
                <Counter end={400} suffix="+" />
              </div>
              <div className="text-[#94a3b8]">Cameras in typical enterprise</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-[#ff6b6b] font-mono mb-2">
                <Counter end={86400} />
              </div>
              <div className="text-[#94a3b8]">Seconds per camera, per day</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-[#ff6b6b] font-mono mb-2">
                <Counter end={34.5} decimals={1} suffix="M" />
              </div>
              <div className="text-[#94a3b8]">Total seconds to monitor daily</div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-xl text-white">
              That's <span className="text-[#ff6b6b] font-bold">400 years</span> of footage generated every single day.
            </p>
            <p className="text-[#94a3b8] mt-2">Your team only has 24 hours.</p>
          </div>
        </div>

        {/* Human vs AI Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Human Side */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center">
                <User className="text-[#ff6b6b]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Human Operators</h3>
                <p className="text-[#ff6b6b] text-sm font-mono">LIMITATIONS</p>
              </div>
            </div>

            <div className="space-y-4">
              {humanLimitations.map((item, index) => (
                <div
                  key={item.label}
                  className="glass-card p-5 rounded-xl border-l-4 border-l-[#ff6b6b]/50 hover:border-l-[#ff6b6b] transition-all group"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#ff6b6b]/10 flex items-center justify-center group-hover:bg-[#ff6b6b]/20 transition-colors">
                      <item.icon className="text-[#ff6b6b]" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white font-mono">{item.stat}</span>
                        <span className="text-[#ff6b6b] text-sm">{item.unit}</span>
                        <span className="text-[#94a3b8] text-sm ml-auto">{item.label}</span>
                      </div>
                      <p className="text-[#64748b] text-sm">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warning Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-[#ff6b6b] flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-[#94a3b8]">
                  <span className="text-white font-semibold">Fatigue is inevitable.</span> After 20 minutes,
                  your operators are operating at 5% visual attention capacity.
                </p>
              </div>
            </div>
          </div>

          {/* AI Side */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#00e5ff]/20 flex items-center justify-center">
                <Brain className="text-[#00e5ff]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">SAVIA AI</h3>
                <p className="text-[#00e5ff] text-sm font-mono">CAPABILITIES</p>
              </div>
            </div>

            <div className="space-y-4">
              {aiCapabilities.map((item, index) => (
                <div
                  key={item.label}
                  className="glass-card p-5 rounded-xl border-l-4 border-l-[#00e5ff]/50 hover:border-l-[#00e5ff] transition-all group"
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center group-hover:bg-[#00e5ff]/20 transition-colors">
                      <item.icon className="text-[#00e5ff]" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white font-mono">{item.stat}</span>
                        <span className="text-[#00e5ff] text-sm">{item.unit}</span>
                        <span className="text-[#94a3b8] text-sm ml-auto">{item.label}</span>
                      </div>
                      <p className="text-[#64748b] text-sm">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20">
              <div className="flex items-start gap-3">
                <Zap className="text-[#00e5ff] flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-[#94a3b8]">
                  <span className="text-white font-semibold">Never misses. Never sleeps.</span> SAVIA
                  processes every frame with consistent precision, 24/7/365.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl text-white mb-2">The question isn't whether your team is good enough.</p>
          <p className="text-2xl font-bold text-[#00e5ff]">It's whether they're even possible.</p>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.1; }
          90% { opacity: 0.1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </section>
  );
}

export default Problem;
