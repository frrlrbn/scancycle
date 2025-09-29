'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaGoogle, FaSignOutAlt } from 'react-icons/fa';
import ProfileImage from './ProfileImage';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b-2 border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary border-2 border-gray-200 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary font-rubik">
                ScanCycle
              </h1>
              <p className="text-xs text-gray-500 font-rubik hidden sm:block">
                AI Waste Management
              </p>
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 rounded hidden sm:block"></div>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                  <ProfileImage 
                    src={session.user.image} 
                    alt={`${session.user.name} Profile`}
                    size={32}
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800 font-rubik">
                      {session.user.name?.split(' ')[0] || 'User'}
                    </p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 border border-red-200 font-rubik"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Login Prompt */}
                <div className="hidden sm:block text-right mr-2">
                  <p className="text-xs text-gray-500 font-rubik">Belum punya akun?</p>
                  <p className="text-xs text-gray-600 font-rubik font-medium">Login untuk fitur lengkap</p>
                </div>
                
                {/* Login Button */}
                <button
                  onClick={() => signIn('google')}
                  className="flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#5A827E] to-[#84AE92] rounded-xl transition-all duration-200 hover:from-[#6B8E75] hover:to-[#4A706B] border border-[#5A827E] font-rubik active:scale-95"
                >
                  <FaGoogle className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}