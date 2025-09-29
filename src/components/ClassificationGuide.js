'use client';
import { FaRecycle, FaLeaf, FaExclamationTriangle } from 'react-icons/fa';

export default function ClassificationGuide() {
  const wasteCategories = [
    {
      type: 'organic',
      title: 'Sampah Organik',
      binColor: 'Tempat Sampah Hijau',
      icon: <FaLeaf className="w-8 h-8 text-green-600" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      examples: [
        'Sisa makanan',
        'Daun dan ranting',
        'Kulit buah',
        'Tulang ikan/ayam',
        'Ampas kopi',
        'Kertas basah'
      ],
      tips: [
        'Pisahkan dari plastik kemasan',
        'Dapat dijadikan kompos',
        'Buang segera agar tidak bau',
        'Potong kecil-kecil untuk mempercepat pengomposan'
      ]
    },
    {
      type: 'inorganic',
      title: 'Sampah Anorganik',
      binColor: 'Tempat Sampah Kuning',
      icon: <FaRecycle className="w-8 h-8 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      examples: [
        'Botol plastik',
        'Kaleng minuman',
        'Kertas koran',
        'Kardus',
        'Botol kaca',
        'Kantong plastik'
      ],
      tips: [
        'Bersihkan sebelum dibuang',
        'Dapat dijual ke pemulung',
        'Pisahkan berdasarkan jenis material',
        'Lipat kardus untuk menghemat ruang'
      ]
    },
    {
      type: 'hazardous',
      title: 'Bahan Berbahaya & Beracun (B3)',
      binColor: 'Tempat Sampah Merah',
      icon: <FaExclamationTriangle className="w-8 h-8 text-red-600" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      examples: [
        'Baterai bekas',
        'Lampu neon',
        'Obat kadaluarsa',
        'Cat dan pelarut',
        'Insektisida',
        'Aki bekas'
      ],
      tips: [
        'JANGAN buang sembarangan',
        'Serahkan ke fasilitas khusus B3',
        'Gunakan sarung tangan saat membuang',
        'Jauhkan dari jangkauan anak-anak'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#5A827E' }}>
          Panduan Klasifikasi Sampah
        </h2>
        <p className="text-gray-600">
          Pelajari cara memilah sampah dengan benar untuk lingkungan yang lebih bersih
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {wasteCategories.map((category) => (
          <div
            key={category.type}
            className={`${category.bgColor} ${category.borderColor} border rounded-lg p-6 shadow-sm`}
          >
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              {category.icon}
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600">{category.binColor}</p>
              </div>
            </div>

            {/* Examples */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Contoh:</h4>
              <ul className="space-y-1">
                {category.examples.map((example, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Tips:</h4>
              <ul className="space-y-1">
                {category.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4" style={{ color: '#5A827E' }}>
          Mengapa Pemilahan Sampah Penting?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Manfaat Lingkungan:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Mengurangi pencemaran tanah dan air</li>
              <li>• Mengurangi emisi gas rumah kaca</li>
              <li>• Menghemat sumber daya alam</li>
              <li>• Memperpanjang usia TPA</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Manfaat Ekonomi:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dapat dijual untuk menambah penghasilan</li>
              <li>• Menghemat biaya pengangkutan sampah</li>
              <li>• Menciptakan lapangan kerja baru</li>
              <li>• Mengurangi biaya pengelolaan sampah kota</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}