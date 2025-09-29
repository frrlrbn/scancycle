'use client';
import { useState } from 'react';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  trend, 
  trendValue,
  description 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl border-2 border-gray-200 p-6 border-l-4 transition-all duration-300 transform hover:scale-105 hover:border-gray-300 cursor-pointer ${bgColor}`}
      style={{ borderLeftColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600 font-rubik">{title}</p>
            <div 
              className={`p-2 rounded-full transition-all duration-300 ${isHovered ? 'transform rotate-12 scale-110' : ''}`}
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
          </div>
          
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-gray-900 font-rubik">
              {value}
            </p>
            {trend && (
              <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                <span className="text-xs font-medium">
                  {trend === 'up' ? '↗' : '↘'} {trendValue}%
                </span>
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-xs text-gray-500 mt-2 font-rubik">{description}</p>
          )}
        </div>
      </div>

      {/* Progress bar animation */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div 
          className="h-1 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            backgroundColor: color,
            width: isHovered ? '100%' : '70%' 
          }}
        ></div>
      </div>
    </div>
  );
}