'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaLeaf, FaRecycle, FaExclamationTriangle, FaChartPie, FaHistory, FaTrophy, FaClock, FaFire, FaEye } from 'react-icons/fa';
import { DonutChart, ProgressBarChart } from './Charts';
import StatCard from './StatCard';
import MobileStatCards from './MobileStatCards';
import ScanDetailModal from './ScanDetailModal';
import Footer from './Footer';

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedScan, setSelectedScan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        <div className="animate-pulse">
          {/* Welcome Section Skeleton */}
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-2"></div>
            <div className="h-6 bg-gray-100 rounded-md w-80 mx-auto"></div>
          </div>

          {/* Mobile Stats Cards Skeleton */}
          <div className="relative w-full h-80 mb-8 sm:hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-gray-200"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-72 h-56 bg-white rounded-xl border-2 border-gray-200 p-6 border-l-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="w-10 h-10 bg-gray-100 rounded-full border border-gray-200"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-40 mb-3"></div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 border border-gray-300">
                  <div className="h-1.5 bg-gray-300 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'w-6 bg-gray-300' : 'bg-gray-200'}`}></div>
              ))}
            </div>
          </div>

          {/* Desktop Stats Cards Skeleton */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border-2 border-gray-200 p-6 border-l-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="w-10 h-10 bg-gray-100 rounded-full border border-gray-200"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-32"></div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-1 border border-gray-300">
                  <div className="h-1 bg-gray-300 rounded-full w-2/3"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Donut Chart Skeleton */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-9 h-9 bg-gray-200 rounded-lg border border-gray-300"></div>
                <div className="h-6 bg-gray-200 rounded w-40"></div>
              </div>
              <div className="h-64 bg-gray-100 rounded-lg border border-gray-200 mb-6"></div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-4 h-4 bg-gray-200 rounded-full mx-auto mb-2 border border-gray-300"></div>
                    <div className="h-3 bg-gray-100 rounded w-12 mx-auto mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar Chart Skeleton */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-9 h-9 bg-gray-200 rounded-lg border border-gray-300"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-64 bg-gray-100 rounded-lg border border-gray-200 mb-6"></div>
              <div className="flex justify-center space-x-8 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-16 mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="h-8 bg-gray-200 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-12 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Scans Skeleton */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-gray-200 rounded-lg border border-gray-300"></div>
                <div>
                  <div className="h-6 bg-gray-200 rounded w-36 mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-48"></div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gray-100 rounded border border-gray-200"></div>
                <div className="h-4 bg-gray-100 rounded w-16"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-4 h-4 bg-gray-200 rounded-full border border-gray-300"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gray-100 rounded w-24"></div>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-full w-20 border border-gray-200"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="h-3 bg-gray-100 rounded w-12 mb-1"></div>
                      <div className="h-3 bg-gray-100 rounded w-10"></div>
                    </div>
                    <div className="w-7 h-7 bg-gray-100 rounded-full border border-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalScans = stats?.stats?.total_scans || 0;
  const organicCount = stats?.stats?.organic_count || 0;
  const inorganicCount = stats?.stats?.inorganic_count || 0;
  const hazardousCount = stats?.stats?.hazardous_count || 0;

  const handleScanClick = (scan) => {
    setSelectedScan(scan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScan(null);
  };

  // Prepare stats cards data for mobile component
  const statsCardsData = [
    {
      title: "Total Scan",
      value: totalScans,
      icon: FaChartPie,
      color: "#6366F1",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      description: "Total sampah yang telah di-scan"
    },
    {
      title: "Sampah Organik",
      value: organicCount,
      icon: FaLeaf,
      color: "#10B981",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      description: "Tempat sampah hijau - Dapat dijadikan kompos"
    },
    {
      title: "Sampah Anorganik",
      value: inorganicCount,
      icon: FaRecycle,
      color: "#F59E0B",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      description: "Tempat sampah kuning - Dapat didaur ulang"
    },
    {
      title: "Sampah B3",
      value: hazardousCount,
      icon: FaExclamationTriangle,
      color: "#EF4444",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      description: "Tempat sampah merah - Perlu penanganan khusus"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8 pt-16 sm:pt-18">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <div className="bg-[#5A827E] bg-clip-text text-transparent">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 font-rubik">
            Dashboard 🌱
          </h2>
        </div>
        <p className="text-gray-600 text-lg font-rubik">
          Kelola sampah Anda dengan cerdas bersama ScanCycle
        </p>
      </div>

      {/* Mobile Stats Cards */}
      <MobileStatCards statsCards={statsCardsData} />

      {/* Desktop Stats Cards */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Scan"
          value={totalScans}
          icon={FaChartPie}
          color="#6366F1"
          bgColor="bg-gradient-to-br from-indigo-50 to-indigo-100"
          description="Total sampah yang telah di-scan"
        />
        
        <StatCard
          title="Sampah Organik"
          value={organicCount}
          icon={FaLeaf}
          color="#10B981"
          bgColor="bg-gradient-to-br from-emerald-50 to-emerald-100"
          description="Tempat sampah hijau - Dapat dijadikan kompos"
        />
        
        <StatCard
          title="Sampah Anorganik"
          value={inorganicCount}
          icon={FaRecycle}
          color="#F59E0B"
          bgColor="bg-gradient-to-br from-amber-50 to-amber-100"
          description="Tempat sampah kuning - Dapat didaur ulang"
        />
        
        <StatCard
          title="Sampah B3"
          value={hazardousCount}
          icon={FaExclamationTriangle}
          color="#EF4444"
          bgColor="bg-gradient-to-br from-red-50 to-red-100"
          description="Tempat sampah merah - Perlu penanganan khusus"
        />
      </div>

      {/* Charts Section */}
      {totalScans > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-primary rounded-lg border border-primary">
                <FaChartPie className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary font-rubik">
                Distribusi Sampah
              </h3>
            </div>
            <DonutChart data={stats.distribution} title="Distribusi Sampah" />
            
            {/* Summary */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {stats.distribution.map((item) => {
                const percentage = (item.count / totalScans) * 100;
                const getColor = () => {
                  switch (item.waste_type) {
                    case 'organic': return '#10B981'; // Green
                    case 'inorganic': return '#F59E0B'; // Yellow
                    case 'hazardous': return '#EF4444'; // Red
                    default: return '#6B7280';
                  }
                };

                const getLabel = () => {
                  switch (item.waste_type) {
                    case 'organic': return 'Organik ';
                    case 'inorganic': return 'Anorganik ';
                    case 'hazardous': return 'B3 ';
                    default: return item.waste_type;
                  }
                };
                
                return (
                  <div key={item.waste_type} className="text-center">
                    <div 
                      className="w-4 h-4 rounded-full mx-auto mb-2 border border-gray-300"
                      style={{ backgroundColor: getColor() }}
                    ></div>
                    <p className="text-xs font-medium text-gray-600 font-rubik">
                      {getLabel()}
                    </p>
                    <p className="text-sm font-bold text-gray-900 font-rubik">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-secondary rounded-lg border border-secondary">
                <FaFire className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary font-rubik">
                Aktivitas Scan
              </h3>
            </div>
            <ProgressBarChart data={stats.distribution} totalScans={totalScans} />
            
            {/* Stats */}
            <div className="mt-6 flex justify-center space-x-8 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary font-rubik">{totalScans}</p>
                <p className="text-sm text-gray-600 font-rubik">Total Scan</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary font-rubik">
                  {stats.distribution.length}
                </p>
                <p className="text-sm text-gray-600 font-rubik">Kategori</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Scans */}
      {stats.recentScans && stats.recentScans.length > 0 && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <div className="p-2 bg-tertiary rounded-lg border border-tertiary">
                <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-primary font-rubik">
                  Aktivitas Terbaru
                </h3>
                <p className="text-xs text-gray-500 font-rubik hidden sm:block">
                  Klik untuk melihat detail analisis
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 font-rubik">
              <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>5 Terakhir</span>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {stats.recentScans.slice(0, 5).map((scan, index) => (
              <div 
                key={index} 
                onClick={() => handleScanClick(scan)}
                className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 cursor-pointer transition-all duration-300 group active:scale-95 sm:active:scale-100"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className={`w-4 h-4 rounded-full border border-gray-300 ${
                          scan.bin_color === 'green' ? 'bg-emerald-500' :
                          scan.bin_color === 'yellow' ? 'bg-amber-500' :
                          scan.bin_color === 'red' ? 'bg-red-500' : 'bg-gray-500'
                        } animate-pulse group-hover:animate-none`}></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-gray-300"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 font-rubik group-hover:text-primary transition-colors truncate">
                          {scan.item_name}
                        </p>
                        <p className="text-xs text-gray-500 font-rubik truncate">
                          {scan.category}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-2 ${
                      scan.bin_color === 'green' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      scan.bin_color === 'yellow' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      scan.bin_color === 'red' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {scan.bin_color === 'green' ? 'Organik' :
                       scan.bin_color === 'yellow' ? 'Anorganik' :
                       scan.bin_color === 'red' ? 'B3' : 'Unknown'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs text-gray-500 font-rubik block">
                        {new Date(scan.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <div className="text-xs text-gray-400 font-rubik">
                        {new Date(scan.created_at).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    {/* View Detail Icon */}
                    <div className="p-2 rounded-full bg-white border-2 border-gray-200 transition-all duration-300 group-hover:border-primary group-active:scale-95">
                      <FaEye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      <div className={`w-4 h-4 rounded-full border border-gray-300 ${
                        scan.bin_color === 'green' ? 'bg-emerald-500' :
                        scan.bin_color === 'yellow' ? 'bg-amber-500' :
                        scan.bin_color === 'red' ? 'bg-red-500' : 'bg-gray-500'
                      } animate-pulse group-hover:animate-none`}></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-gray-300"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900 font-rubik group-hover:text-primary transition-colors">
                        {scan.item_name}
                      </p>
                      <p className="text-xs text-gray-500 font-rubik">
                        {scan.category}
                      </p>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      scan.bin_color === 'green' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      scan.bin_color === 'yellow' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      scan.bin_color === 'red' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {scan.bin_color === 'green' ? ' Organik' :
                       scan.bin_color === 'yellow' ? ' Anorganik' :
                       scan.bin_color === 'red' ? ' B3' : 'Unknown'}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-xs text-gray-500 font-rubik">
                        {new Date(scan.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <div className="text-xs text-gray-400 font-rubik">
                        {new Date(scan.created_at).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    {/* View Detail Icon */}
                    <div className="p-2 rounded-full bg-white border-2 border-gray-200 transition-all duration-300 group-hover:border-primary">
                      <FaEye className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data State */}
      {totalScans === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 rounded-full transform rotate-12 border border-gray-200"></div>
            <FaChartPie className="w-20 h-20 text-gray-300 mx-auto mb-6 relative z-10" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3 font-rubik">
            Mulai Perjalanan Anda! 🌱
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto font-rubik">
            Scan sampah pertama Anda untuk melihat statistik menarik dan mulai berkontribusi untuk lingkungan
          </p>
          
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                <FaLeaf className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-700 font-rubik">Scan Sampah</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-2">
                <FaChartPie className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-700 font-rubik">Lihat Stats</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <FaLeaf className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-700 font-rubik">Ramah Lingkungan</p>
            </div>
          </div>
        </div>
      )}

      {/* Scan Detail Modal */}
      <ScanDetailModal 
        scan={selectedScan} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      <Footer />
    </div>
  );
}