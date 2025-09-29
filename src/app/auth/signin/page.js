'use client';
import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaGoogle, FaRecycle } from 'react-icons/fa';

export default function SignIn() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FaRecycle className="w-10 h-10" style={{ color: '#5A827E' }} />
              <h1 className="text-2xl font-bold" style={{ color: '#5A827E' }}>
                ScanCycle
              </h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Selamat Datang
            </h2>
            <p className="text-gray-600">
              Masuk untuk mengakses fitur AI Waste Scanner dan tracking sampah Anda
            </p>
          </div>

          {/* Sign In Button */}
          {providers && Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="w-5 h-5 text-red-500" />
              <span>Masuk dengan {provider.name}</span>
            </button>
          ))}

          {/* Features Preview */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-800 mb-4">
              Fitur yang tersedia setelah login:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI Waste Scanner</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Tracking dan statistik pemilahan sampah</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Riwayat scan dan progress personal</span>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            Dengan masuk, Anda menyetujui penggunaan data untuk meningkatkan layanan ScanCycle
          </div>
        </div>
      </div>
    </div>
  );
}