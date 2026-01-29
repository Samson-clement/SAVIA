import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Brain, Check, Eye, Timer, TrendingDown, User, X, Zap } from 'lucide-react';

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
          {/* Human Side - Negative/Failing */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Red danger glow behind */}
            <div className="absolute -inset-4 bg-[#ff6b6b]/5 rounded-3xl blur-xl" />

            <div className="relative h-full p-6 rounded-2xl border border-[#ff6b6b]/20 bg-gradient-to-br from-[#ff6b6b]/10 via-transparent to-transparent">
              {/* Status Badge */}
              <div className="absolute -top-3 right-4 px-3 py-1 bg-[#ff6b6b] text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                CRITICAL FAILURE
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center border-2 border-[#ff6b6b]/50">
                  <User className="text-[#ff6b6b]" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Human Operators</h3>
                  <p className="text-[#ff6b6b] text-sm font-mono flex items-center gap-2">
                    <X size={14} /> LIMITATIONS
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {humanLimitations.map((item) => (
                  <div
                    key={item.label}
                    className="relative p-5 rounded-xl bg-[#0a0a0f] border border-[#ff6b6b]/30 group overflow-hidden cursor-pointer
                      transition-[transform,border-color,background-color,box-shadow] duration-150 ease-out
                      hover:scale-[1.02] hover:border-[#ff6b6b]/60 hover:bg-[#ff6b6b]/5
                      hover:shadow-[0_0_30px_rgba(255,107,107,0.2)] hover:animate-[shake_0.5s_ease-in-out]"
                  >
                    {/* Strikethrough effect - more visible on hover */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 group-hover:opacity-30 transition-opacity">
                      <div className="w-full h-0.5 bg-[#ff6b6b] transform -rotate-3" />
                    </div>

                    {/* Red flash overlay on hover */}
                    <div className="absolute inset-0 bg-[#ff6b6b]/0 group-hover:bg-[#ff6b6b]/10 transition-all duration-300 rounded-xl" />

                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#ff6b6b]/20 flex items-center justify-center border border-[#ff6b6b]/30
                        group-hover:bg-[#ff6b6b]/30 group-hover:border-[#ff6b6b]/50 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="text-[#ff6b6b] group-hover:animate-pulse" size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-[#ff6b6b] font-mono group-hover:scale-110 transition-transform origin-left">{item.stat}</span>
                          <span className="text-[#ff6b6b]/70 text-sm">{item.unit}</span>
                          <span className="text-[#94a3b8] text-sm ml-auto group-hover:text-white transition-colors">{item.label}</span>
                        </div>
                        <p className="text-[#64748b] text-sm group-hover:text-[#94a3b8] transition-colors">{item.detail}</p>
                      </div>
                      {/* X mark - animates on hover */}
                      <div className="w-8 h-8 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center
                        group-hover:bg-[#ff6b6b] group-hover:scale-125 transition-all duration-300">
                        <X className="text-[#ff6b6b] group-hover:text-white transition-colors" size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning Box */}
              <div className="mt-6 p-4 rounded-xl bg-[#ff6b6b]/20 border-2 border-[#ff6b6b]/40">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff6b6b] flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-[#ff6b6b] font-bold mb-1">Fatigue is inevitable.</p>
                    <p className="text-sm text-[#94a3b8]">
                      After 20 minutes, your operators are functioning at only 5% visual attention capacity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Declining bar graph visual */}
              <div className="mt-6 flex items-end justify-center gap-2 h-16">
                {[100, 75, 45, 20, 5].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 bg-gradient-to-t from-[#ff6b6b] to-[#ff6b6b]/50 rounded-t transition-all duration-1000"
                      style={{ height: `${height * 0.6}px`, opacity: isVisible ? 1 : 0, transitionDelay: `${800 + i * 100}ms` }}
                    />
                    <span className="text-[8px] text-[#64748b]">{i * 5}m</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#64748b] mt-2">Attention Level Over Time</p>
            </div>
          </div>

          {/* AI Side - Positive/Winning */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Cyan success glow behind */}
            <div className="absolute -inset-4 bg-[#00e5ff]/10 rounded-3xl blur-xl" />

            <div className="relative h-full p-6 rounded-2xl border border-[#00e5ff]/30 bg-gradient-to-br from-[#00e5ff]/10 via-transparent to-transparent">
              {/* Status Badge */}
              <div className="absolute -top-3 right-4 px-3 py-1 bg-[#00e5ff] text-[#05080f] text-xs font-bold rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#05080f] rounded-full animate-pulse" />
                OPTIMAL PERFORMANCE
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#00e5ff]/20 flex items-center justify-center border-2 border-[#00e5ff]/50 relative">
                  <Brain className="text-[#00e5ff]" size={28} />
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#00e5ff] animate-ping opacity-20" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">SAVIA AI</h3>
                  <p className="text-[#00e5ff] text-sm font-mono flex items-center gap-2">
                    <Check size={14} /> CAPABILITIES
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {aiCapabilities.map((item) => (
                  <div
                    key={item.label}
                    className="relative p-5 rounded-xl bg-[#0a1a1f] border border-[#00e5ff]/30 group overflow-hidden cursor-pointer
                      transition-[transform,border-color,background-color,box-shadow] duration-150 ease-out
                      hover:scale-[1.02] hover:border-[#00e5ff]/80 hover:bg-[#00e5ff]/5
                      hover:shadow-[0_0_40px_rgba(0,229,255,0.3)]"
                  >
                    {/* Success highlight - intensifies on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff]/5 to-transparent group-hover:from-[#00e5ff]/20 transition-all duration-300" />

                    {/* Scanning line effect on hover */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent animate-[scan_2s_ease-in-out_infinite]" />
                    </div>

                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#00e5ff]/20 flex items-center justify-center border border-[#00e5ff]/30
                        group-hover:bg-[#00e5ff]/30 group-hover:border-[#00e5ff]/60 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="text-[#00e5ff]" size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-[#00e5ff] font-mono group-hover:scale-110 group-hover:text-[#00ffff] transition-all origin-left">{item.stat}</span>
                          <span className="text-[#00e5ff]/70 text-sm">{item.unit}</span>
                          <span className="text-[#94a3b8] text-sm ml-auto group-hover:text-white transition-colors">{item.label}</span>
                        </div>
                        <p className="text-[#64748b] text-sm group-hover:text-[#94a3b8] transition-colors">{item.detail}</p>
                      </div>
                      {/* Checkmark - glows on hover */}
                      <div className="w-8 h-8 rounded-full bg-[#00e5ff]/20 flex items-center justify-center
                        group-hover:bg-[#00e5ff] group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300">
                        <Check className="text-[#00e5ff] group-hover:text-[#05080f] transition-colors" size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Success Box */}
              <div className="mt-6 p-4 rounded-xl bg-[#00e5ff]/20 border-2 border-[#00e5ff]/40">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00e5ff] flex items-center justify-center flex-shrink-0">
                    <Zap className="text-[#05080f]" size={20} />
                  </div>
                  <div>
                    <p className="text-[#00e5ff] font-bold mb-1">Never misses. Never sleeps.</p>
                    <p className="text-sm text-[#94a3b8]">
                      SAVIA processes every frame with consistent precision, 24/7/365.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stable performance bar graph visual */}
              <div className="mt-6 flex items-end justify-center gap-2 h-16">
                {[99, 99, 99, 99, 99].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 bg-gradient-to-t from-[#00e5ff] to-[#00e5ff]/50 rounded-t transition-all duration-1000"
                      style={{ height: `${height * 0.6}px`, opacity: isVisible ? 1 : 0, transitionDelay: `${800 + i * 100}ms` }}
                    />
                    <span className="text-[8px] text-[#64748b]">{i * 6}h</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#64748b] mt-2">Consistent 24/7 Performance</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA - Impactful Statement */}
        <div
          className={`relative transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#00e5ff]/50" />
            <div className="w-2 h-2 rotate-45 border border-[#00e5ff]/50" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#00e5ff]/50" />
          </div>

          {/* Main statement container */}
          <div className="relative max-w-3xl mx-auto">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[#00e5ff]/5 blur-3xl rounded-full" />

            <div className="relative text-center p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
              {/* First line - strikethrough effect */}
              <p className="text-xl md:text-2xl text-[#94a3b8] mb-4 relative inline-block">
                <span className="relative">
                  The question isn't whether your team is
                  <span className="relative mx-2">
                    <span className="text-white">good enough</span>
                    <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#ff6b6b]/70 transform -rotate-2" />
                  </span>
                </span>
              </p>

              {/* Second line - emphasized */}
              <div className="relative">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00e5ff]">
                  It's whether they're even possible.
                </p>

                {/* Underline accent */}
                <div className="mt-4 flex justify-center">
                  <div className="h-1 w-48 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent rounded-full" />
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#00e5ff]/30 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#00e5ff]/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#00e5ff]/30 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#00e5ff]/30 rounded-br-lg" />
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-1 h-1 rounded-full bg-[#00e5ff]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]/50" />
            <div className="w-2 h-2 rounded-full bg-[#00e5ff]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]/50" />
            <div className="w-1 h-1 rounded-full bg-[#00e5ff]/30" />
          </div>
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
        @keyframes shake {
          0%, 100% { transform: translateX(0) scale(1.02); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px) scale(1.02); }
          20%, 40%, 60%, 80% { transform: translateX(2px) scale(1.02); }
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }
      `}</style>
    </section>
  );
}

export default Problem;
