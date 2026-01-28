import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail, Phone, ExternalLink } from 'lucide-react';
import { InteractiveLogo } from '../components/InteractiveLogo';

export function CTA() {
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
      id="contact" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background with pulsing radial gradient */}
      <div className="absolute inset-0 bg-[#05080f]">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.15) 0%, transparent 60%)',
            animation: 'pulse-glow 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div 
          className={`flex justify-center mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <InteractiveLogo size={80} />
        </div>

        {/* Headline */}
        <h2 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Outfit'] mb-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Stop Missing What <span className="gradient-text">Matters.</span>
        </h2>

        {/* Subheadline */}
        <p 
          className={`text-lg md:text-xl text-[#94a3b8] mb-10 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Start seeing everything. Get a personalized demo of SAVIA for your organization.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="btn-glow group bg-[#00e5ff] text-[#05080f] px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-[#00ffff] transition-all w-full sm:w-auto justify-center">
            Request Demo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group glass-card px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:border-[#00e5ff]/50 transition-all w-full sm:w-auto justify-center">
            <Phone size={20} className="text-[#00e5ff]" />
            Contact Sales
          </button>
        </div>

        {/* Contact Info */}
        <div 
          className={`flex flex-wrap justify-center gap-8 mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a 
            href="mailto:info@diyarme.com" 
            className="flex items-center gap-2 text-[#94a3b8] hover:text-[#00e5ff] transition-colors"
          >
            <Mail size={18} />
            info@diyarme.com
          </a>
          <a 
            href="https://www.diyarme.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#94a3b8] hover:text-[#00e5ff] transition-colors"
          >
            <ExternalLink size={18} />
            www.diyarme.com
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/5 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and copyright */}
            <div className="flex items-center gap-3">
              <InteractiveLogo size={40} />
              <div>
                <div className="text-white font-bold font-['Outfit']">SAVIA</div>
                <div className="text-[#64748b] text-xs">Powered by Diyar United Company</div>
              </div>
            </div>

            {/* Countries */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-[#64748b]">
              {['Kuwait', 'UAE', 'KSA', 'Qatar', 'Bahrain', 'Oman', 'India', 'Jordan', 'Egypt', 'Tunisia'].map((country, i, arr) => (
                <span key={country}>
                  {country}{i < arr.length - 1 ? ' •' : ''}
                </span>
              ))}
            </div>

            {/* Legal */}
            <div className="flex items-center gap-6 text-sm text-[#64748b]">
              <a href="#" className="hover:text-[#00e5ff] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#00e5ff] transition-colors">Terms</a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[#64748b] text-sm">
              © {new Date().getFullYear()} SAVIA by Diyar United Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}

export default CTA;
