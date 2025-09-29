'use client';
import { useSession } from 'next-auth/react';
import { FaRecycle, FaLeaf, FaLightbulb, FaChartLine } from 'react-icons/fa';
import Footer from './Footer';

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      icon: <FaRecycle className="w-12 h-12 text-white" />,
      title: 'AI Waste Scanner',
      description: 'Identifikasi jenis sampah dengan teknologi AI',
      bgClass: 'bg-secondary'
    },
    {
      icon: <FaLeaf className="w-12 h-12 text-white" />,
      title: 'Smart Classification',
      description: 'Panduan pemilahan sampah berdasarkan warna tempat sampah',
      bgClass: 'bg-tertiary'
    },
    {
      icon: <FaChartLine className="w-12 h-12 text-white" />,
      title: 'Impact Tracker',
      description: 'Pantau progress pemilahan sampah Anda',
      bgClass: 'bg-primary'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pt-16 sm:pt-18">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-center py-10 px-6 rounded-2xl bg-gradient-to-br from-[#5A827E] via-[#84AE92] to-[#B9D4AA] border-2 border-[#84AE92]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute top-8 right-6 w-6 h-6 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-6 left-8 w-8 h-8 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-14 h-14 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/20 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-4 border border-white/30">
            <span className="text-3xl">🌱</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white font-rubik leading-tight">
            Selamat Datang di 
            <span className="block mt-1 bg-gradient-to-r from-[#FAFFCA] to-white bg-clip-text text-transparent">
              ScanCycle
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-white/90 mb-6 font-rubik max-w-2xl mx-auto leading-relaxed">
            Platform AI untuk manajemen sampah cerdas yang membantu Anda mengidentifikasi, 
            memilah, dan mengelola sampah dengan tepat
          </p>

          {/* Features Highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
              <span className="w-1.5 h-1.5 bg-[#FAFFCA] rounded-full"></span>
              <span className="text-xs font-medium text-white font-rubik">AI Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
              <span className="w-1.5 h-1.5 bg-[#FAFFCA] rounded-full"></span>
              <span className="text-xs font-medium text-white font-rubik">Smart Detection</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
              <span className="w-1.5 h-1.5 bg-[#FAFFCA] rounded-full"></span>
              <span className="text-xs font-medium text-white font-rubik">Eco Friendly</span>
            </div>
          </div>

          {!session && (
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/25">
              <div className="w-2 h-2 bg-[#FAFFCA] rounded-full animate-pulse"></div>
              <p className="text-xs text-white font-rubik font-medium">
                Login dengan Google untuk mengakses semua fitur
              </p>
            </div>
          )}

          {session && (
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/25">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <p className="text-xs text-white font-rubik font-medium">
                Selamat datang kembali, {session.user.name}! 👋
              </p>
            </div>
          )}
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" className="w-full h-4 fill-white/10">
            <path d="M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300">
            <div 
              className={`flex items-center justify-center h-24 ${feature.bgClass} border-b border-gray-200`}
            >
              {feature.icon}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-primary font-rubik">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm font-rubik">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-center mb-6 font-rubik" style={{ color: '#5A827E' }}>
          Cara Kerja ScanCycle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[#5A827E]"
              style={{ backgroundColor: '#84AE92' }}
            >
              <span className="text-white font-bold text-xl font-rubik">1</span>
            </div>
            <h3 className="font-semibold mb-2 font-rubik">Upload/Foto</h3>
            <p className="text-sm text-gray-600 font-rubik">
              Ambil foto sampah dengan kamera atau upload gambar
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[#84AE92]"
              style={{ backgroundColor: '#B9D4AA' }}
            >
              <span className="text-white font-bold text-xl font-rubik">2</span>
            </div>
            <h3 className="font-semibold mb-2 font-rubik">AI Analisis</h3>
            <p className="text-sm text-gray-600 font-rubik">
              AI mengidentifikasi jenis dan kategori sampah
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2"
              style={{ backgroundColor: '#FAFFCA', color: '#5A827E', borderColor: '#5A827E' }}
            >
              <span className="font-bold text-xl font-rubik">3</span>
            </div>
            <h3 className="font-semibold mb-2 font-rubik">Panduan</h3>
            <p className="text-sm text-gray-600 font-rubik">
              Dapatkan panduan pemilahan dan tips disposal
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[#3A5F5A]"
              style={{ backgroundColor: '#5A827E' }}
            >
              <span className="text-white font-bold text-xl font-rubik">4</span>
            </div>
            <h3 className="font-semibold mb-2 font-rubik">Tracking</h3>
            <p className="text-sm text-gray-600 font-rubik">
              Pantau progress dan dampak lingkungan Anda
            </p>
          </div>
        </div>
      </div>

      {/* Color Guide */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4 font-rubik" style={{ color: '#5A827E' }}>
          Panduan Warna Tempat Sampah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors duration-200">
            <div className="w-6 h-6 bg-green-500 rounded-full border border-green-600"></div>
            <div>
              <p className="font-medium text-green-800 font-rubik">Hijau - Organik</p>
              <p className="text-sm text-green-600 font-rubik">Sisa makanan, daun</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200 hover:border-yellow-300 transition-colors duration-200">
            <div className="w-6 h-6 bg-yellow-500 rounded-full border border-yellow-600"></div>
            <div>
              <p className="font-medium text-yellow-800 font-rubik">Kuning - Anorganik</p>
              <p className="text-sm text-yellow-600 font-rubik">Plastik, kertas, logam</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border-2 border-red-200 hover:border-red-300 transition-colors duration-200">
            <div className="w-6 h-6 bg-red-500 rounded-full border border-red-600"></div>
            <div>
              <p className="font-medium text-red-800 font-rubik">Merah - B3</p>
              <p className="text-sm text-red-600 font-rubik">Baterai, obat, cat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6">
        <div className="flex items-start space-x-4">
          <FaLightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2 font-rubik" style={{ color: '#5A827E' }}>
              Tahukah Anda?
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 font-rubik">
              <li>• Pemilahan sampah dapat mengurangi 70% sampah yang masuk ke TPA</li>
              <li>• 1 ton kertas daur ulang dapat menyelamatkan 17 pohon</li>
              <li>• Sampah organik yang tidak dikelola menghasilkan gas metana berbahaya</li>
              <li>• Daur ulang aluminium menghemat 95% energi dibanding produksi baru</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}