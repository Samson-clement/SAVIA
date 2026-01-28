import { useEffect, useRef, useState } from 'react';
import { 
  Building2, 
  Fuel, 
  ShoppingCart, 
  HeartPulse, 
  Landmark, 
  Truck 
} from 'lucide-react';

const industries = [
  {
    icon: Building2,
    name: 'Government',
    description: 'Smart buildings, public safety',
    useCases: ['Perimeter security', 'Crowd monitoring', 'Access control'],
  },
  {
    icon: Fuel,
    name: 'Oil \u0026 Gas',
    description: 'Safety compliance, perimeter security',
    useCases: ['PPE detection', 'Leak detection', 'Intrusion alerts'],
  },
  {
    icon: ShoppingCart,
    name: 'Retail',
    description: 'Loss prevention, customer analytics',
    useCases: ['Theft prevention', 'Heat maps', 'Queue management'],
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    description: 'Patient safety, access control',
    useCases: ['Fall detection', 'Visitor tracking', 'Restricted zones'],
  },
  {
    icon: Landmark,
    name: 'Banking',
    description: 'Branch security, VIP detection',
    useCases: ['Face recognition', 'ATM monitoring', 'VIP alerts'],
  },
  {
    icon: Truck,
    name: 'Logistics',
    description: 'Warehouse monitoring, vehicle tracking',
    useCases: ['Vehicle counting', 'Loading dock safety', 'Asset tracking'],
  },
];

export function Industries() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Animated connection lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let progress = 0;

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const radius = Math.min(centerX, centerY) * 0.7;

      // Draw connection lines
      industries.forEach((_, i) => {
        const angle = (i / industries.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Line to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated pulse
        if (isVisible) {
          const pulseX = centerX + Math.cos(angle) * radius * ((progress + i * 0.15) % 1);
          const pulseY = centerY + Math.sin(angle) * radius * ((progress + i * 0.15) % 1);
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 229, 255, 0.6)';
          ctx.fill();
        }
      });

      progress += 0.005;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      id="industries" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Connection canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="section-label mb-4">Built For</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Outfit'] mb-6">
            Trusted Across <span className="gradient-text">Industries</span>
          </h2>
        </div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              className={`glass-card p-6 rounded-xl group cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${hoveredIndustry === industry.name ? 'border-[#00e5ff]/50 scale-[1.02]' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndustry(industry.name)}
              onMouseLeave={() => setHoveredIndustry(null)}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00e5ff]/20 transition-colors">
                  <industry.icon className="text-[#00e5ff]" size={24} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white font-['Outfit'] mb-1 group-hover:text-[#00e5ff] transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-[#94a3b8] mb-3">
                    {industry.description}
                  </p>

                  {/* Use cases - show on hover */}
                  <div className={`flex flex-wrap gap-2 transition-all duration-300 ${
                    hoveredIndustry === industry.name ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    {industry.useCases.map((useCase) => (
                      <span
                        key={useCase}
                        className="px-2 py-0.5 rounded text-xs bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div 
                className={`absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none ${
                  hoveredIndustry === industry.name ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(0,229,255,0.1) 0%, transparent 70%)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#94a3b8] mb-4">
            Don't see your industry? SAVIA adapts to any environment.
          </p>
          <button className="text-[#00e5ff] hover:text-white transition-colors flex items-center gap-2 mx-auto font-medium">
            Talk to our team
            <span className="w-4 h-px bg-current" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Industries;
