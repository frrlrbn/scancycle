'use client';
import { FaArrowLeft, FaRecycle, FaClock, FaLightbulb } from 'react-icons/fa';

export default function WasteResult({ result, onBack }) {
  // Jika ada error dari backend (tidak ada sampah terdeteksi)
  if (result.error) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🤔</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Sampah Tidak Terdeteksi</h2>
            <p className="text-gray-600 mb-6">{result.error}</p>
            <button
              onClick={onBack}
              className="w-full py-3 text-white font-medium rounded-lg transition-colors"
              style={{ backgroundColor: '#5A827E' }}
            >
              Coba Scan Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getBinColorClass = (binColor) => {
    switch (binColor) {
      case 'green':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'red':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
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

  const getWasteTypeColor = (wasteType) => {
    switch (wasteType) {
      case 'organic':
        return '#84AE92';
      case 'inorganic':
        return '#B9D4AA';
      case 'hazardous':
        return '#5A827E';
      default:
        return '#5A827E';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <div className="text-sm text-gray-500">
            Akurasi: {Math.round(result.confidence * 100)}%
          </div>
        </div>

        {/* Result Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: getWasteTypeColor(result.wasteType) }}>
            {result.itemName}
          </h2>
          <div className="text-sm text-gray-600 mb-2">
            Kategori: {result.category}
          </div>
          <div className={`inline-block px-3 py-1 rounded-full border text-sm font-medium ${getBinColorClass(result.binColor)}`}>
            {getBinColorName(result.binColor)}
          </div>
        </div>

        {/* Disposal Tips */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-2">
            <FaLightbulb className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Tips Pembuangan:</h3>
              <p className="text-sm text-gray-600">{result.disposalTips}</p>
            </div>
          </div>
        </div>

        {/* Recyclable Status */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <FaRecycle className={`w-5 h-5 ${result.recyclable ? 'text-green-500' : 'text-gray-400'}`} />
            <span className="text-sm font-medium">
              {result.recyclable ? 'Dapat Didaur Ulang' : 'Tidak Dapat Didaur Ulang'}
            </span>
          </div>
        </div>

        {/* Decomposition Time */}
        {result.decompositionTime && (
          <div className="flex items-center space-x-2 mb-6">
            <FaClock className="w-5 h-5 text-gray-500" />
            <div>
              <span className="text-sm font-medium">Waktu Degradasi: </span>
              <span className="text-sm text-gray-600">{result.decompositionTime}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onBack}
          className="w-full py-3 text-white font-medium rounded-lg transition-colors"
          style={{ backgroundColor: '#5A827E' }}
        >
          Scan Sampah Lainnya
        </button>

        {/* Additional Info */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Hasil analisis menggunakan AI Gemini untuk membantu pemilahan sampah yang tepat
        </div>
      </div>
    </div>
  );
}