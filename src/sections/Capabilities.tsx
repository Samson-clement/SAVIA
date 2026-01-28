import { useEffect, useRef, useState } from 'react';
import { 
  Flame, 
  Shield, 
  Users, 
  Package, 
  Moon,
  HardHat,
  Timer,
  Car,
  Map,
  UserCheck,
  ScanFace,
  CalendarCheck,
  DoorOpen
} from 'lucide-react';

const categories = [
  {
    title: 'Security & Safety',
    items: [
      { icon: Flame, label: 'Fire & Smoke Detection' },
      { icon: Shield, label: 'Intrusion & Zone Entry' },
      { icon: Users, label: 'Fighting & Fall Detection' },
      { icon: Package, label: 'Abandoned Object Detection' },
      { icon: Moon, label: 'After-Hours Intrusion' },
    ],
  },
  {
    title: 'Operations & Compliance',
    items: [
      { icon: HardHat, label: 'PPE Compliance Monitoring' },
      { icon: Timer, label: 'Queue & Wait Time Analysis' },
      { icon: Users, label: 'People & Vehicle Counting' },
      { icon: Map, label: 'Heat Map Analytics' },
      { icon: Car, label: 'License Plate Recognition' },
    ],
  },
  {
    title: 'Identity & Access',
    items: [
      { icon: ScanFace, label: 'Face Recognition & Watchlists' },
      { icon: UserCheck, label: 'VIP & Banned Individual Alerts' },
      { icon: ScanFace, label: 'Cross-Camera Re-ID' },
      { icon: CalendarCheck, label: 'Staff Time Attendance' },
      { icon: DoorOpen, label: 'Access Control with Liveness' },
    ],
  },
];

export function Capabilities() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
      id="capabilities" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* 3D Grid Effect */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.03) 50%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="section-label mb-4">What SAVIA Sees</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Outfit'] mb-6">
            One Platform. <span className="gradient-text">Endless Detection.</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${categoryIndex * 200}ms`,
                transform: isVisible ? `perspective(1000px) rotateX(${(categoryIndex - 1) * 2}deg)` : 'none'
              }}
            >
              {/* Category Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-3">
                  <span className="w-8 h-px bg-[#00e5ff]" />
                  {category.title}
                </h3>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.label}
                    className={`capability-card group cursor-pointer transition-all duration-300 ${
                      hoveredItem === item.label ? 'bg-[#00e5ff]/10 border-[#00e5ff]/50' : ''
                    }`}
                    style={{ transitionDelay: `${itemIndex * 50}ms` }}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center transition-all duration-300 ${
                        hoveredItem === item.label ? 'bg-[#00e5ff]/20 scale-110' : ''
                      }`}>
                        <item.icon 
                          size={20} 
                          className={`text-[#00e5ff] transition-all duration-300 ${
                            hoveredItem === item.label ? 'rotate-12' : ''
                          }`}
                        />
                      </div>
                      <span className="text-[#94a3b8] group-hover:text-white transition-colors text-sm">
                        {item.label}
                      </span>
                      
                      {/* Glitch effect on hover */}
                      {hoveredItem === item.label && (
                        <span className="ml-auto text-[#00e5ff] text-xs font-mono animate-pulse">
                          ACTIVE
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div 
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '50+', label: 'Detection Models' },
            { value: '99.2%', label: 'Accuracy Rate' },
            { value: '<100ms', label: 'Inference Time' },
            { value: '24/7', label: 'Uptime SLA' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#00e5ff] font-mono mb-1">
                {stat.value}
              </div>
              <div className="text-[#64748b] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Capabilities;
