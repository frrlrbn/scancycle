'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaLeaf, FaRecycle, FaExclamationTriangle, FaChartPie, FaHistory } from 'react-icons/fa';

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Silakan login untuk melihat dashboard Anda
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalScans = stats?.stats?.total_scans || 0;
  const organicCount = stats?.stats?.organic_count || 0;
  const inorganicCount = stats?.stats?.inorganic_count || 0;
  const hazardousCount = stats?.stats?.hazardous_count || 0;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#5A827E' }}>
          Selamat Datang, {session.user.name}!
        </h2>
        <p className="text-gray-600">
          Kelola sampah Anda dengan cerdas bersama ScanCycle
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Scan</p>
              <p className="text-2xl font-bold text-gray-900">{totalScans}</p>
            </div>
            <FaChartPie className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Organik</p>
              <p className="text-2xl font-bold text-gray-900">{organicCount}</p>
            </div>
            <FaLeaf className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Anorganik</p>
              <p className="text-2xl font-bold text-gray-900">{inorganicCount}</p>
            </div>
            <FaRecycle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">B3</p>
              <p className="text-2xl font-bold text-gray-900">{hazardousCount}</p>
            </div>
            <FaExclamationTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      {totalScans > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#5A827E' }}>
            Distribusi Sampah
          </h3>
          <div className="space-y-3">
            {stats.distribution.map((item) => {
              const percentage = (item.count / totalScans) * 100;
              const getColor = () => {
                switch (item.waste_type) {
                  case 'organic': return 'bg-green-500';
                  case 'inorganic': return 'bg-yellow-500';
                  case 'hazardous': return 'bg-red-500';
                  default: return 'bg-gray-500';
                }
              };
              
              return (
                <div key={item.waste_type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{item.waste_type}</span>
                    <span>{item.count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getColor()}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Scans */}
      {stats.recentScans && stats.recentScans.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaHistory className="w-5 h-5" style={{ color: '#5A827E' }} />
            <h3 className="text-lg font-semibold" style={{ color: '#5A827E' }}>
              Scan Terakhir
            </h3>
          </div>
          <div className="space-y-3">
            {stats.recentScans.slice(0, 5).map((scan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    scan.bin_color === 'green' ? 'bg-green-500' :
                    scan.bin_color === 'yellow' ? 'bg-yellow-500' :
                    scan.bin_color === 'red' ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">{scan.item_name}</p>
                    <p className="text-xs text-gray-500">{scan.category}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(scan.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data State */}
      {totalScans === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FaChartPie className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum Ada Data Scan
          </h3>
          <p className="text-gray-600 mb-4">
            Mulai scan sampah Anda untuk melihat statistik di sini
          </p>
        </div>
      )}
    </div>
  );
}