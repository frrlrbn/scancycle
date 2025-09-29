'use client';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

export default function ProfileImage({ src, alt = "Profile", size = 32, className = "" }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useProxy, setUseProxy] = useState(false);

  // Generate proxy URL if needed
  const getImageSrc = () => {
    if (!src) return '';
    
    // If it's a Google image and we need to use proxy
    if (useProxy && (src.includes('googleusercontent.com') || src.includes('googleapis.com'))) {
      return `/api/proxy-image?url=${encodeURIComponent(src)}`;
    }
    
    return src;
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    // If this is the first error and it's a Google image, try with proxy
    if (!useProxy && (src.includes('googleusercontent.com') || src.includes('googleapis.com'))) {
      setUseProxy(true);
      setIsLoading(true);
    } else {
      setImageError(true);
      setIsLoading(false);
    }
  };

  if (!src || imageError) {
    return (
      <div 
        className={`rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <FaUser className="text-white" style={{ width: size * 0.5, height: size * 0.5 }} />
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-full overflow-hidden bg-gray-200 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="animate-pulse">
            <FaUser className="text-gray-400" style={{ width: size * 0.4, height: size * 0.4 }} />
          </div>
        </div>
      )}
      <img
        src={getImageSrc()}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}