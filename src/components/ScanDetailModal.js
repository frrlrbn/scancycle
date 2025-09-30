'use client';
import { useState, useEffect } from 'react';
import { FaTimes, FaRecycle, FaClock, FaLightbulb, FaExclamationTriangle, FaLeaf, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function ScanDetailModal({ scan, isOpen, onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup function to restore body scroll and remove event listener
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Handle touch gestures for mobile swipe-to-close
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isDownSwipe) {
      handleClose();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getBinColorClass = (binColor) => {
    switch (binColor) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getBinColorName = (binColor) => {
    switch (binColor) {
      case 'green':
        return 'Tempat Sampah Hijau (Organik)';
      case 'yellow':
        return 'Tempat Sampah Kuning (Anorganik)';
      case 'red':
        return 'Tempat Sampah Merah (B3)';
      default:
        return 'Tempat Sampah';
    }
  };

  const getWasteTypeIcon = (wasteType) => {
    switch (wasteType) {
      case 'organic':
        return <FaLeaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'inorganic':
        return <FaRecycle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'hazardous':
        return <FaExclamationTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      default:
        return <FaRecycle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
    }
  };

  if (!isOpen || !scan) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-start sm:items-center justify-center p-0 sm:p-4 pt-4 sm:pt-0" style={{ height: '100vh', height: '100dvh' }}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ height: '100vh', height: '100dvh' }}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div 
        className={`relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-auto sm:min-w-[500px] sm:max-w-[90vw] lg:max-w-2xl h-full sm:h-auto sm:max-h-[85vh] flex flex-col border-2 border-gray-200 transition-all duration-300 transform overflow-hidden ${
          isAnimating 
            ? 'translate-y-0 sm:scale-100 opacity-100' 
            : 'translate-y-full sm:translate-y-0 sm:scale-95 opacity-0'
        }`}
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          borderRadius: window.innerWidth >= 640 ? '1rem' : '1rem 1rem 0 0',
          marginTop: window.innerWidth < 640 ? '1rem' : '0'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#84AE92] via-[#6B8E75] to-[#5A827E] p-4 sm:p-6 text-white relative overflow-hidden flex-shrink-0">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full transform translate-x-12 -translate-y-12 sm:translate-x-16 sm:-translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full transform -translate-x-8 translate-y-8 sm:-translate-x-10 sm:translate-y-10"></div>
          </div>
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center space-x-3 flex-1">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                {getWasteTypeIcon(scan.waste_type)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold font-rubik truncate">Detail Analisis</h2>
                <p className="text-xs sm:text-sm opacity-90 font-rubik">Hasil Scan AI</p>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 flex-shrink-0 ml-2 border border-white/30 active:scale-95 transform"
              aria-label="Tutup modal"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
          <div className="p-4 sm:p-6 space-y-6 pb-8">
            {/* Item Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-rubik mb-2 leading-tight">
                  {scan.item_name || 'Item Tidak Diketahui'}
                </h3>
                <p className="text-gray-600 font-rubik text-sm sm:text-base mb-3">
                  {scan.category || 'Kategori Tidak Tersedia'}
                </p>
                
                {/* Confidence Badge */}
                {scan.confidence && (
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 text-sm font-medium font-rubik">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Akurasi: {Math.round(scan.confidence * 100)}%
                  </div>
                )}
              </div>

              {/* Bin Classification */}
              <div className={`p-4 rounded-xl border-l-4 border-2 ${
                scan.bin_color === 'green' 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-green-500 border-green-200' :
                scan.bin_color === 'yellow' 
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-yellow-500 border-yellow-200' :
                scan.bin_color === 'red' 
                  ? 'bg-gradient-to-r from-red-50 to-rose-50 border-l-red-500 border-red-200' : 
                  'bg-gradient-to-r from-gray-50 to-slate-50 border-l-gray-500 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border border-gray-300 ${getBinColorClass(scan.bin_color)}`}></div>
                  <div>
                    <p className="font-semibold text-gray-900 font-rubik text-sm sm:text-base">
                      {getBinColorName(scan.bin_color)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-rubik">
                      Klasifikasi pembuangan yang tepat
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disposal Tips */}
            {scan.disposal_tips && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                    <FaLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2 font-rubik text-sm sm:text-base">
                      💡 Tips Pembuangan
                    </h4>
                    <p className="text-gray-700 text-sm font-rubik leading-relaxed">
                      {scan.disposal_tips}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Recyclable Status */}
              <div className={`p-4 rounded-xl border-2 ${
                scan.recyclable 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                  : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <FaRecycle className={`w-5 h-5 ${scan.recyclable ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="font-semibold text-gray-900 font-rubik text-sm">
                    Status Daur Ulang
                  </span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  scan.recyclable 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {scan.recyclable ? '♻️ Dapat Didaur Ulang' : '❌ Tidak Dapat Didaur Ulang'}
                </span>
              </div>

              {/* Decomposition Time */}
              {scan.decomposition_time && (
                <div className="p-4 rounded-xl border-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <FaClock className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900 font-rubik text-sm">
                      Waktu Degradasi
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-rubik font-medium">
                    ⏱️ {scan.decomposition_time}
                  </span>
                </div>
              )}

              {/* Scan Date - Full Width */}
              <div className={`p-4 rounded-xl border-2 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 ${
                scan.decomposition_time ? 'sm:col-span-2' : 'sm:col-span-1'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-900 font-rubik text-sm">
                      📅 Tanggal Scan
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700 font-rubik font-medium">
                      {new Date(scan.created_at).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500 font-rubik">
                      {new Date(scan.created_at).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-4 rounded-xl border-2 border-green-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <FaLeaf className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2 font-rubik text-sm sm:text-base">
                    🌱 Dampak Lingkungan
                  </h4>
                  <p className="text-sm text-gray-700 font-rubik leading-relaxed">
                    Dengan memilah sampah ini dengan benar, Anda berkontribusi mengurangi pencemaran lingkungan dan mendukung program daur ulang yang berkelanjutan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-slate-50 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-[#84AE92] to-[#5A827E] text-white py-3.5 px-4 rounded-xl font-semibold font-rubik hover:from-[#6B8E75] hover:to-[#4A706B] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#84AE92]/50 focus:ring-offset-2 border border-[#5A827E] active:scale-95 transform"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}