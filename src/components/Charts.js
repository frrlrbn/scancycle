'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function DonutChart({ data, title }) {
  const chartData = {
    labels: data.map(item => {
      switch (item.waste_type) {
        case 'organic': return 'Organik';
        case 'inorganic': return 'Anorganik';
        case 'hazardous': return 'B3';
        default: return item.waste_type;
      }
    }),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#10B981', // Green for Organic
          '#F59E0B', // Yellow for Inorganic  
          '#EF4444', // Red for Hazardous
        ],
        borderColor: [
          '#059669', // Darker green border
          '#D97706', // Darker yellow border
          '#DC2626', // Darker red border
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          '#059669', // Darker green on hover
          '#D97706', // Darker yellow on hover
          '#DC2626', // Darker red on hover
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            family: 'Rubik, sans-serif',
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
          family: 'Rubik, sans-serif',
        },
        bodyFont: {
          size: 13,
          family: 'Rubik, sans-serif',
        },
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      },
    },
    cutout: '60%',
    animation: {
      animateRotate: true,
      duration: 1000,
    },
  };

  return (
    <div className="relative h-64">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export function ProgressBarChart({ data, totalScans }) {
  const chartData = {
    labels: data.map(item => {
      switch (item.waste_type) {
        case 'organic': return 'Organik';
        case 'inorganic': return 'Anorganik';
        case 'hazardous': return 'B3';
        default: return item.waste_type;
      }
    }),
    datasets: [
      {
        label: 'Jumlah Scan',
        data: data.map(item => item.count),
        backgroundColor: [
          '#10B981', // Green for Organic
          '#F59E0B', // Yellow for Inorganic
          '#EF4444', // Red for Hazardous
        ],
        borderColor: [
          '#059669', // Darker green border
          '#D97706', // Darker yellow border
          '#DC2626', // Darker red border
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
          family: 'Rubik, sans-serif',
        },
        bodyFont: {
          size: 13,
          family: 'Rubik, sans-serif',
        },
        callbacks: {
          label: function(context) {
            const percentage = ((context.raw / totalScans) * 100).toFixed(1);
            return `${context.raw} scan (${percentage}%)`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            family: 'Rubik, sans-serif',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Rubik, sans-serif',
            weight: '500',
          },
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="relative h-64">
      <Bar data={chartData} options={options} />
    </div>
  );
}