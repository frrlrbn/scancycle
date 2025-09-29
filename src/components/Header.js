'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaGoogle, FaSignOutAlt, FaUser } from 'react-icons/fa';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#5A827E' }}></div>
            <h1 className="text-xl font-bold" style={{ color: '#5A827E' }}>
              ScanCycle
            </h1>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#5A827E' }}
              >
                <FaGoogle className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}