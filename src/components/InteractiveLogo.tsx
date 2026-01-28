import { useEffect, useRef, useState } from 'react';

interface InteractiveLogoProps {
  size?: number;
  className?: string;
}

export function InteractiveLogo({ size = 120, className = '' }: InteractiveLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const container = containerRef.current;
    const pupil = pupilRef.current;
    if (!container || !pupil) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle and distance from center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      
      // Limit the pupil movement radius (max 35% of the eye radius)
      const maxRadius = (rect.width / 2) * 0.35;
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), maxRadius);
      
      // Calculate pupil position
      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;
      
      // Apply smooth transform
      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    };

    // Add global mouse move listener for smoother tracking
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Outer orbital ring - Cyan */}
      <div 
        className={`absolute inset-0 rounded-full border-[3px] border-[#00e5ff] transition-all duration-500 ${
          isHovering ? 'shadow-[0_0_30px_rgba(0,229,255,0.5)]' : ''
        }`}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 35%, 85% 35%, 85% 65%, 100% 65%, 100% 100%, 0 100%, 0 65%, 15% 65%, 15% 35%, 0 35%)',
        }}
      />
      
      {/* Middle orbital ring - Orange */}
      <div 
        className={`absolute inset-[8px] rounded-full border-[3px] border-[#f59e0b] transition-all duration-500 ${
          isHovering ? 'shadow-[0_0_20px_rgba(245,158,11,0.4)]' : ''
        }`}
        style={{
          clipPath: 'polygon(0 35%, 100% 35%, 100% 65%, 0 65%)',
          transform: 'rotate(45deg)',
        }}
      />
      
      {/* Inner orbital ring - Cyan accent */}
      <div 
        className={`absolute inset-[16px] rounded-full border-2 border-[#00e5ff]/60 transition-all duration-500`}
        style={{
          clipPath: 'polygon(35% 0, 65% 0, 65% 100%, 35% 100%)',
        }}
      />
      
      {/* Eye sclera (white part) */}
      <div className="absolute inset-[20px] rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm" />
      
      {/* Eye center - Black iris */}
      <div className="absolute inset-[28px] rounded-full bg-[#0a0a0a] shadow-inner flex items-center justify-center">
        {/* Pupil - White dot that follows cursor */}
        <div
          ref={pupilRef}
          className={`w-3 h-3 rounded-full bg-white transition-all duration-100 ease-out ${
            isHovering ? 'shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-125' : ''
          }`}
          style={{
            willChange: 'transform',
          }}
        />
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className={`absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, transparent 70%)',
        }}
      />
      
      {/* Decorative dots on orbitals */}
      <div className="absolute top-[5%] left-[50%] w-2 h-2 rounded-full bg-[#00e5ff] transform -translate-x-1/2" />
      <div className="absolute bottom-[5%] left-[50%] w-2 h-2 rounded-full bg-[#00e5ff] transform -translate-x-1/2" />
      <div className="absolute top-[50%] left-[5%] w-2 h-2 rounded-full bg-[#f59e0b] transform -translate-y-1/2" />
      <div className="absolute top-[50%] right-[5%] w-2 h-2 rounded-full bg-[#f59e0b] transform -translate-y-1/2" />
    </div>
  );
}

export default InteractiveLogo;
