'use client';
import { useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Webcam from 'react-webcam';
import { FaCamera, FaUpload, FaTimes, FaSpinner } from 'react-icons/fa';
import WasteResult from './WasteResult';
import Footer from './Footer';

export default function WasteScanner() {
  const { data: session } = useSession();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState('');
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment'
  };

  const analyzeImage = async (imageBase64) => {
    setIsAnalyzing(true);
    setError('');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64 }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const analysisResult = await response.json();
      setResult(analysisResult);
    } catch (error) {
      setError('Gagal menganalisis gambar. Silakan coba lagi.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      analyzeImage(imageSrc);
      setShowCamera(false);
    }
  }, [webcamRef]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        analyzeImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">
          Silakan login terlebih dahulu untuk menggunakan AI Waste Scanner
        </p>
      </div>
    );
  }

  if (result) {
    return (
      <WasteResult
        result={result}
        onBack={() => {
          setResult(null);
          setError('');
        }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pt-16 sm:pt-18">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 font-rubik" style={{ color: '#5A827E' }}>
          AI Waste Scanner
        </h2>
        <p className="text-gray-600 font-rubik">
          Identifikasi sampah dengan AI untuk pemilahan yang tepat
        </p>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
            <div className="w-5 h-5 bg-red-500 rounded-full mt-0.5 flex-shrink-0"></div>
            <span className="font-rubik">{error}</span>
          </div>
        )}

        {showCamera ? (
          <div className="space-y-6">
            {/* Camera Interface */}
            <div className="relative bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-300">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full aspect-video object-cover"
              />
              
              {/* Camera Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-white/50 rounded-lg"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/70 rounded-lg"></div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setShowCamera(false)}
                className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors border border-white/20"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            
            {/* Capture Button */}
            <button
              onClick={capture}
              disabled={isAnalyzing}
              className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 font-rubik border-2 border-[#3A5F5A] hover:border-[#2A4F4A] active:scale-95"
              style={{ backgroundColor: '#5A827E' }}
            >
              {isAnalyzing ? (
                <>
                  <FaSpinner className="w-6 h-6 animate-spin" />
                  <span>Menganalisis...</span>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FaCamera className="w-4 h-4" />
                  </div>
                  <span>Ambil Foto</span>
                </>
              )}
            </button>
            
            <p className="text-center text-sm text-gray-500 font-rubik">
              Pastikan sampah terlihat jelas dalam frame kamera
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Scanning Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Camera Button */}
              <button
                onClick={() => setShowCamera(true)}
                disabled={isAnalyzing}
                className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-6 px-4 rounded-xl transition-all duration-300 flex flex-col items-center space-y-3 hover:from-emerald-600 hover:to-teal-700 active:scale-95 border-2 border-emerald-400"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FaCamera className="w-6 h-6" />
                </div>
                <span className="font-semibold font-rubik">Gunakan Kamera</span>
                <span className="text-xs text-emerald-100 font-rubik">Foto langsung</span>
              </button>

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 text-white py-6 px-4 rounded-xl transition-all duration-300 flex flex-col items-center space-y-3 hover:from-amber-600 hover:to-orange-700 active:scale-95 border-2 border-amber-400"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FaUpload className="w-6 h-6" />
                </div>
                <span className="font-semibold font-rubik">Upload Foto</span>
                <span className="text-xs text-amber-100 font-rubik">Dari galeri</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {isAnalyzing && (
              <div className="text-center py-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="relative">
                  <FaSpinner className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
                  <div className="absolute inset-0 flex items-center justify-center">
                  </div>
                </div>
                <p className="text-gray-700 font-medium font-rubik mb-1">Menganalisis gambar...</p>
                <p className="text-sm text-gray-500 font-rubik">AI sedang mengidentifikasi jenis sampah</p>
              </div>
            )}

            {/* Features Info */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 font-rubik flex items-center">
                <div className="w-5 h-5 bg-primary rounded-full mr-2"></div>
                Fitur AI Scanner:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 font-rubik">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Identifikasi otomatis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Panduan pemilahan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Tips daur ulang</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Akurasi tinggi</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-6 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-lg p-4 border-2 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold"></span>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-1 font-rubik">Tips untuk hasil terbaik:</h4>
              <ul className="text-sm text-green-700 space-y-1 font-rubik">
                <li>• Pastikan pencahayaan cukup terang</li>
                <li>• Fokuskan kamera pada sampah utama</li>
                <li>• Hindari foto yang blur atau gelap</li>
                <li>• Bersihkan lensa kamera sebelum memotret</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}