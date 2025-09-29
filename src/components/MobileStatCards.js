'use client';
import { useState, useEffect, useRef } from 'react';

export default function MobileStatCards({ statsCards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);

  // Auto-scroll setiap 5 detik (pause saat user sedang berinteraksi)
  useEffect(() => {
    if (isDragging || isTransitioning) return;
    
    const interval = setInterval(() => {
      if (!isDragging && !isTransitioning) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isDragging, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % statsCards.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + statsCards.length) % statsCards.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
    setTouchEnd(null);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!touchStart || !isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const deltaX = currentX - touchStart.x;
    
    // Update drag offset for visual feedback
    setDragOffset(deltaX);
    
    setTouchEnd({
      x: currentX,
      y: touch.clientY,
      time: Date.now()
    });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !isDragging) return;
    
    e.preventDefault();
    setIsDragging(false);
    setDragOffset(0);
    
    if (touchEnd) {
      const deltaX = touchEnd.x - touchStart.x;
      const deltaTime = touchEnd.time - touchStart.time;
      const velocity = Math.abs(deltaX) / deltaTime;
      
      // Minimum swipe distance and velocity
      const minSwipeDistance = 50;
      const minVelocity = 0.3;
      
      if (Math.abs(deltaX) > minSwipeDistance || velocity > minVelocity) {
        if (deltaX > 0) {
          // Swipe right - go to previous
          handlePrev();
        } else {
          // Swipe left - go to next
          handleNext();
        }
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse events untuk testing di desktop
  const handleMouseDown = (e) => {
    e.preventDefault();
    setTouchStart({
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    });
    setTouchEnd(null);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!touchStart || !isDragging) return;
    
    e.preventDefault();
    const currentX = e.clientX;
    const deltaX = currentX - touchStart.x;
    
    setDragOffset(deltaX);
    
    setTouchEnd({
      x: currentX,
      y: e.clientY,
      time: Date.now()
    });
  };

  const handleMouseUp = (e) => {
    if (!touchStart || !isDragging) return;
    
    e.preventDefault();
    setIsDragging(false);
    setDragOffset(0);
    
    if (touchEnd) {
      const deltaX = touchEnd.x - touchStart.x;
      
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const totalCards = statsCards.length;
    
    // Normalize difference untuk infinite scroll
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }

    const isActive = normalizedDiff === 0;
    const isPrev = normalizedDiff === -1;
    const isNext = normalizedDiff === 1;
    
    let baseTranslateX = 0;
    let translateY = 0;
    let opacity = 0.3;
    let scale = 0.85;
    let zIndex = 1;
    let blur = 4;

    if (isActive) {
      baseTranslateX = 0;
      translateY = 0;
      opacity = 1;
      scale = 1;
      zIndex = 30;
      blur = 0;
    } else if (isPrev) {
      baseTranslateX = -120;
      translateY = 20;
      opacity = 0.7;
      scale = 0.9;
      zIndex = 20;
      blur = 2;
    } else if (isNext) {
      baseTranslateX = 120;
      translateY = 20;
      opacity = 0.7;
      scale = 0.9;
      zIndex = 20;
      blur = 2;
    } else if (normalizedDiff === -2) {
      baseTranslateX = -200;
      translateY = 40;
      opacity = 0.4;
      scale = 0.8;
      zIndex = 10;
      blur = 6;
    } else if (normalizedDiff === 2) {
      baseTranslateX = 200;
      translateY = 40;
      opacity = 0.4;
      scale = 0.8;
      zIndex = 10;
      blur = 6;
    } else {
      baseTranslateX = normalizedDiff > 0 ? 300 : -300;
      translateY = 60;
      opacity = 0.2;
      scale = 0.7;
      zIndex = 5;
      blur = 8;
    }

    // Apply drag offset untuk visual feedback saat swipe
    let finalTranslateX = baseTranslateX;
    if (isDragging && isActive) {
      finalTranslateX += dragOffset * 0.5; // Dampening effect
    }

    return {
      transform: `translateX(${finalTranslateX}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex,
      filter: `blur(${blur}px)`,
      transition: isDragging ? 'none' : (isTransitioning ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.15s ease-out'),
    };
  };

  return (
    <div className="relative w-full h-80 mb-8 sm:hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 rounded-2xl"></div>
      
      {/* Cards container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden touch-pan-x select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          touchAction: 'pan-x',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="absolute w-72 h-56"
            style={getCardStyle(index)}
          >
            <div 
              className={`w-full h-full bg-white rounded-xl border-2 border-gray-200 p-6 border-l-4 ${card.bgColor} cursor-pointer`}
              style={{ borderLeftColor: card.color }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-600 font-rubik">{card.title}</p>
                <div 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <card.icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-3xl font-bold text-gray-900 font-rubik mb-1">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500 font-rubik line-clamp-2">
                  {card.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full transition-all duration-1000"
                  style={{ 
                    backgroundColor: card.color,
                    width: index === currentIndex ? '100%' : '60%'
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {statsCards.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-[#84AE92] w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => {
              if (!isDragging && !isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 300);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}