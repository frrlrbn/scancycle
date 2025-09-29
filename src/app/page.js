'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Home from '../components/Home';
import WasteScanner from '../components/WasteScanner';
import ClassificationGuide from '../components/ClassificationGuide';
import Dashboard from '../components/Dashboard';

export default function Page() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'scanner':
        return <WasteScanner />;
      case 'guide':
        return <ClassificationGuide />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 pb-20 pt-4">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
