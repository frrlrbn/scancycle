'use client';
import { FaArrowLeft, FaRecycle, FaClock, FaLightbulb } from 'react-icons/fa';
import Footer from './Footer';

export default function WasteResult({ result, onBack }) {
  // Jika ada error dari backend (tidak ada sampah terdeteksi)
  if (result.error) {
    return (
      <div className="max-w-2xl mx-auto p-4 pt-16 sm:pt-18">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <div className="text-center">
            {/* Error Icon */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 border-2 border-gray-300">
              <div className="text-4xl">🤔</div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 font-rubik">
              Sampah Tidak Terdeteksi
            </h2>
            <p className="text-gray-600 mb-6 font-rubik">{result.error}</p>
            
            {/* Retry Button */}
            <button
              onClick={onBack}
              className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-200 font-rubik border-2 border-[#3A5F5A] hover:border-[#2A4F4A] active:scale-95"
              style={{ backgroundColor: '#5A827E' }}
            >
              🔄 Coba Scan Lagi
            </button>
            
            {/* Help Text */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 font-rubik">
                <strong>Tips:</strong> Pastikan objek sampah terlihat jelas dalam foto dan pencahayaan cukup terang
              </p>
            </div>
          </div>
        </div>

        <Footer />
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
    <div className="max-w-2xl mx-auto p-4 pt-16 sm:pt-18">
      {/* Success Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-rubik">
          Analisis Selesai! 🎉
        </h1>
        <p className="text-gray-600 font-rubik">
          AI berhasil mengidentifikasi jenis sampah Anda
        </p>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        {/* Header Navigation */}
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors font-rubik font-medium"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <span className="text-sm font-medium text-blue-700 font-rubik">
              Akurasi: {Math.round(result.confidence * 100)}%
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Result Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2" 
                 style={{ backgroundColor: `${getWasteTypeColor(result.wasteType)}20`, borderColor: getWasteTypeColor(result.wasteType) }}>
              <FaRecycle className="w-8 h-8" style={{ color: getWasteTypeColor(result.wasteType) }} />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold mb-3 font-rubik" style={{ color: getWasteTypeColor(result.wasteType) }}>
              {result.itemName}
            </h2>
            
            <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full border border-gray-300 text-sm text-gray-600 mb-4 font-rubik">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Kategori: {result.category}
            </div>
            
            <div className={`inline-block px-4 py-2 rounded-xl border-2 text-sm font-semibold font-rubik ${getBinColorClass(result.binColor)}`}>
              📍 {getBinColorName(result.binColor)}
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Disposal Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaLightbulb className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2 font-rubik">Tips Pembuangan:</h3>
                  <p className="text-sm text-yellow-700 font-rubik">{result.disposalTips}</p>
                </div>
              </div>
            </div>

            {/* Recyclable Status */}
            <div className={`rounded-xl p-4 border-2 ${result.recyclable ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200'}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${result.recyclable ? 'bg-green-500' : 'bg-gray-400'}`}>
                  <FaRecycle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-2 font-rubik ${result.recyclable ? 'text-green-800' : 'text-gray-700'}`}>
                    Status Daur Ulang:
                  </h3>
                  <p className={`text-sm font-rubik ${result.recyclable ? 'text-green-700' : 'text-gray-600'}`}>
                    {result.recyclable ? '♻️ Dapat Didaur Ulang' : '❌ Tidak Dapat Didaur Ulang'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decomposition Time */}
          {result.decompositionTime && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaClock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-blue-800 font-rubik">Waktu Degradasi: </span>
                  <span className="text-blue-700 font-rubik">{result.decompositionTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-200 font-rubik border-2 border-[#3A5F5A] hover:border-[#2A4F4A] active:scale-95"
              style={{ backgroundColor: '#5A827E' }}
            >
              🔄 Scan Sampah Lainnya
            </button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 font-rubik">
                Hasil analisis menggunakan <span className="font-semibold text-primary">Google Gemini</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}