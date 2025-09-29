'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaCamera, FaChartBar, FaBook, FaHome } from 'react-icons/fa';

export default function Navigation({ activeTab, onTabChange }) {
  const { data: session } = useSession();

  const tabs = [
    { id: 'home', icon: FaHome, label: 'Beranda' },
    { id: 'scanner', icon: FaCamera, label: 'Scanner' },
    { id: 'guide', icon: FaBook, label: 'Panduan' },
    { id: 'dashboard', icon: FaChartBar, label: 'Dashboard' },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 sticky bottom-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDisabled = !session && (tab.id === 'scanner' || tab.id === 'dashboard');
            
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && onTabChange(tab.id)}
                disabled={isDisabled}
                className={`flex flex-col items-center py-3 px-4 min-w-0 flex-1 transition-colors ${
                  isDisabled 
                    ? 'text-gray-300 cursor-not-allowed'
                    : isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={isActive ? { backgroundColor: '#5A827E' } : {}}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}