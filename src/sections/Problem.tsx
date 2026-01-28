import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Camera, Clock, Users } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({ end, suffix = '', prefix = '', duration = 2000 }: CounterProps) {
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
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="counter">
      {prefix}{count.toLocaleString()}{suffix}
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Camera, value: 400, suffix: '+', label: 'Cameras' },
    { icon: Clock, value: 34.5, suffix: 'M', label: 'Seconds Daily' },
    { icon: Users, value: 0, suffix: '%', label: 'Manual Coverage' },
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <p className="section-label mb-4">The Reality</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Outfit'] mb-6">
              Your Security Team Is{' '}
              <span className="text-[#00e5ff]">Set Up to Fail</span>
            </h2>
            <p className="text-lg text-[#94a3b8] leading-relaxed mb-8">
              A typical enterprise deployment runs 400+ cameras generating 34.5 million seconds 
              of footage daily. Your team physically cannot watch it all. Incidents happen. 
              Evidence gets buried. Threats go unnoticed. Manual monitoring isn't just 
              expensive — it's <span className="text-white font-semibold">impossible</span>.
            </p>

            {/* Alert Box */}
            <div className="glass-card p-6 rounded-xl border-l-4 border-l-[#f59e0b]">
              <div className="flex items-start gap-4">
                <AlertTriangle className="text-[#f59e0b] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-semibold mb-2">The Hard Truth</h4>
                  <p className="text-[#94a3b8] text-sm">
                    Studies show that security operators lose 95% of their visual attention 
                    within just 22 minutes of continuous monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="grid gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card p-6 rounded-xl flex items-center gap-6 group hover:border-[#00e5ff]/30 transition-all"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center group-hover:bg-[#00e5ff]/20 transition-colors">
                    <stat.icon className="text-[#00e5ff]" size={28} />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white font-mono mb-1">
                      {stat.value === 34.5 ? (
                        <><Counter end={34} suffix=".5" />{stat.suffix}</>
                      ) : stat.value === 0 ? (
                        <span>0{stat.suffix}</span>
                      ) : (
                        <><Counter end={stat.value} suffix={stat.suffix} /></>
                      )}
                    </div>
                    <div className="text-[#94a3b8]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Camera Grid Visual */}
            <div className="mt-8 glass-card p-4 rounded-xl">
              <div className="grid grid-cols-4 gap-2">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-video rounded bg-[#0a1018] border border-white/5 relative overflow-hidden group ${
                      isVisible ? 'animate-assemble' : ''
                    }`}
                    style={{
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    {/* Static noise effect */}
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]" />
                    {/* Camera indicator */}
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00e5ff]/50" />
                    {/* Crosshair */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-4 h-4 border border-[#00e5ff]/50 rounded-full" />
                      <div className="absolute w-6 h-px bg-[#00e5ff]/30" />
                      <div className="absolute h-6 w-px bg-[#00e5ff]/30" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#64748b] mt-3">
                Typical enterprise camera deployment
              </p>
            </div>
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
        @keyframes assemble {
          0% { transform: scale(0.8) rotate(${Math.random() * 10 - 5}deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-assemble {
          animation: assemble 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default Problem;
