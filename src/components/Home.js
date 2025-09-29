'use client';
import { useSession } from 'next-auth/react';
import { FaRecycle, FaLeaf, FaLightbulb, FaChartLine } from 'react-icons/fa';

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      icon: <FaRecycle className="w-12 h-12 text-white" />,
      title: 'AI Waste Scanner',
      description: 'Identifikasi jenis sampah dengan teknologi AI Gemini',
      bgColor: '#84AE92'
    },
    {
      icon: <FaLeaf className="w-12 h-12 text-white" />,
      title: 'Smart Classification',
      description: 'Panduan pemilahan sampah berdasarkan warna tempat sampah',
      bgColor: '#B9D4AA'
    },
    {
      icon: <FaChartLine className="w-12 h-12 text-white" />,
      title: 'Impact Tracker',
      description: 'Pantau progress pemilahan sampah Anda',
      bgColor: '#5A827E'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 px-6 rounded-lg" style={{ backgroundColor: '#FAFFCA' }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#5A827E' }}>
          Selamat Datang di ScanCycle
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Platform AI untuk manajemen sampah cerdas yang membantu Anda mengidentifikasi, 
          memilah, dan mengelola sampah dengan tepat
        </p>
        {!session && (
          <p className="text-sm text-gray-600 italic">
            Login dengan Google untuk mengakses semua fitur
          </p>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              className="flex items-center justify-center h-24"
              style={{ backgroundColor: feature.bgColor }}
            >
              {feature.icon}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#5A827E' }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#5A827E' }}>
          Cara Kerja ScanCycle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: '#84AE92' }}
            >
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold mb-2">Upload/Foto</h3>
            <p className="text-sm text-gray-600">
              Ambil foto sampah dengan kamera atau upload gambar
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: '#B9D4AA' }}
            >
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold mb-2">AI Analisis</h3>
            <p className="text-sm text-gray-600">
              AI Gemini mengidentifikasi jenis dan kategori sampah
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: '#FAFFCA', color: '#5A827E' }}
            >
              <span className="font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold mb-2">Panduan</h3>
            <p className="text-sm text-gray-600">
              Dapatkan panduan pemilahan dan tips disposal
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: '#5A827E' }}
            >
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h3 className="font-semibold mb-2">Tracking</h3>
            <p className="text-sm text-gray-600">
              Pantau progress dan dampak lingkungan Anda
            </p>
          </div>
        </div>
      </div>

      {/* Color Guide */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#5A827E' }}>
          Panduan Warna Tempat Sampah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-green-800">Hijau - Organik</p>
              <p className="text-sm text-green-600">Sisa makanan, daun</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="font-medium text-yellow-800">Kuning - Anorganik</p>
              <p className="text-sm text-yellow-600">Plastik, kertas, logam</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <div>
              <p className="font-medium text-red-800">Merah - B3</p>
              <p className="text-sm text-red-600">Baterai, obat, cat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <FaLightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#5A827E' }}>
              Tahukah Anda?
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Pemilahan sampah dapat mengurangi 70% sampah yang masuk ke TPA</li>
              <li>• 1 ton kertas daur ulang dapat menyelamatkan 17 pohon</li>
              <li>• Sampah organik yang tidak dikelola menghasilkan gas metana berbahaya</li>
              <li>• Daur ulang aluminium menghemat 95% energi dibanding produksi baru</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}