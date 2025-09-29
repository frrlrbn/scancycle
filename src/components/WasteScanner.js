'use client';
import { useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Webcam from 'react-webcam';
import { FaCamera, FaUpload, FaTimes, FaSpinner } from 'react-icons/fa';
import WasteResult from './WasteResult';

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
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center mb-6" style={{ color: '#5A827E' }}>
          AI Waste Scanner
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showCamera ? (
          <div className="space-y-4">
            <div className="relative">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full rounded-lg"
              />
              <button
                onClick={() => setShowCamera(false)}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={capture}
              disabled={isAnalyzing}
              className="w-full py-3 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
              style={{ backgroundColor: '#5A827E' }}
            >
              {isAnalyzing ? (
                <FaSpinner className="w-5 h-5 animate-spin" />
              ) : (
                <FaCamera className="w-5 h-5" />
              )}
              <span>{isAnalyzing ? 'Menganalisis...' : 'Ambil Foto'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Camera Button */}
            <button
              onClick={() => setShowCamera(true)}
              disabled={isAnalyzing}
              className="w-full py-4 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-3 hover:opacity-90"
              style={{ backgroundColor: '#84AE92' }}
            >
              <FaCamera className="w-6 h-6" />
              <span>Gunakan Kamera</span>
            </button>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="w-full py-4 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-3 hover:opacity-90"
              style={{ backgroundColor: '#B9D4AA' }}
            >
              <FaUpload className="w-6 h-6" />
              <span>Upload Foto</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {isAnalyzing && (
              <div className="text-center py-4">
                <FaSpinner className="w-8 h-8 animate-spin mx-auto text-gray-600 mb-2" />
                <p className="text-gray-600">Menganalisis gambar...</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>AI akan mengidentifikasi jenis sampah dan memberikan panduan pemilahan yang tepat</p>
        </div>
      </div>
    </div>
  );
}