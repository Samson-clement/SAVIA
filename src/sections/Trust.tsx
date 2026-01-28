import { useEffect, useRef, useState } from 'react';
import { Shield, CheckCircle, Award, Lock } from 'lucide-react';

const certifications = [
  {
    icon: Shield,
    name: 'SOC 2',
    description: 'Certified',
    color: '#00e5ff',
  },
  {
    icon: CheckCircle,
    name: 'SOC 3',
    description: 'Certified',
    color: '#22c55e',
  },
  {
    icon: Award,
    name: 'CMMI',
    description: 'Level 5',
    color: '#f59e0b',
  },
  {
    icon: Lock,
    name: 'ISO/IEC 42001',
    description: 'AI Management',
    color: '#3b82f6',
  },
];

export function Trust() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="trust" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080f] via-[#0a1018] to-[#05080f]" />
      
      {/* Subtle shield pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <Shield size={400} className="text-[#00e5ff]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="section-label mb-4">Enterprise-Grade</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Outfit'] mb-6">
            Security You Can <span className="gradient-text">Trust</span>
          </h2>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              className={`cert-badge group transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                animation: isVisible ? `flip-in 0.8s ease-out ${index * 150}ms forwards` : 'none',
                opacity: 0,
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${cert.color}15` }}
              >
                <cert.icon size={24} style={{ color: cert.color }} />
              </div>
              <div>
                <div className="text-white font-bold font-['Outfit']">{cert.name}</div>
                <div className="text-[#94a3b8] text-sm">{cert.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Info */}
        <div 
          className={`glass-card p-8 md:p-12 rounded-2xl text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-[#94a3b8] mb-6 leading-relaxed">
              SAVIA is backed by <span className="text-white font-semibold">Diyar United Company</span> — 
              a technology leader with <span className="text-[#00e5ff] font-mono">46 years</span> of experience, 
              <span className="text-[#00e5ff] font-mono"> 3000+</span> employees, and presence across 
              <span className="text-[#00e5ff] font-mono"> 9 countries</span>.
            </p>
            
            {/* Country flags/pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {['Kuwait', 'UAE', 'KSA', 'Qatar', 'Bahrain', 'Oman', 'India', 'Jordan', 'Egypt'].map((country) => (
                <span
                  key={country}
                  className="px-3 py-1 rounded-full text-xs bg-white/5 text-[#64748b] border border-white/10 hover:border-[#00e5ff]/30 hover:text-[#94a3b8] transition-colors"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div 
          className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '256-bit', label: 'Encryption' },
            { value: 'GDPR', label: 'Compliant' },
            { value: '24/7', label: 'Support' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-white font-mono mb-1">{stat.value}</div>
              <div className="text-[#64748b] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes flip-in {
          from {
            opacity: 0;
            transform: perspective(400px) rotateY(90deg);
          }
          to {
            opacity: 1;
            transform: perspective(400px) rotateY(0deg);
          }
        }
      `}</style>
    </section>
  );
}

export default Trust;
