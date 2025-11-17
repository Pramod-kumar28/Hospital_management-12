import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const NurseOverview = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Initialize chart when component mounts
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart instance
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Stable', 'Improving', 'Critical', 'Monitoring'],
          datasets: [{
            label: 'Patient Count',
            data: [3, 2, 1, 2],
            backgroundColor: [
              'rgb(34, 197, 94)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
              'rgb(59, 130, 246)'
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
              'rgb(59, 130, 246)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              },
              grid: {
                display: true
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        📊 Dashboard Overview
      </h2>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <i className="fas fa-user-injured text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Assigned Patients</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <i className="fas fa-pills text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Medications Due</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <i className="fas fa-bed text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Available Beds</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg mr-4">
              <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Critical Patients</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vitals */}
        <div className="bg-white p-4 rounded-lg card-shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Vitals</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/40?img=11" className="w-10 h-10 rounded-full mr-3" alt="Patient" />
                <div>
                  <p className="font-medium">Leanne Graham</p>
                  <p className="text-xs text-gray-500">Bed 101</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">98.6°F</p>
                <p className="text-xs text-gray-500">10:30 AM</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/40?img=12" className="w-10 h-10 rounded-full mr-3" alt="Patient" />
                <div>
                  <p className="font-medium">Ervin Howell</p>
                  <p className="text-xs text-gray-500">Bed 102</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">99.1°F</p>
                <p className="text-xs text-gray-500">10:25 AM</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/40?img=13" className="w-10 h-10 rounded-full mr-3" alt="Patient" />
                <div>
                  <p className="font-medium">Clementine Bauch</p>
                  <p className="text-xs text-gray-500">Bed 103</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">97.8°F</p>
                <p className="text-xs text-gray-500">10:20 AM</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/40?img=14" className="w-10 h-10 rounded-full mr-3" alt="Patient" />
                <div>
                  <p className="font-medium">Patricia Lebsack</p>
                  <p className="text-xs text-gray-500">Bed 104</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">98.9°F</p>
                <p className="text-xs text-gray-500">10:15 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-4 rounded-lg card-shadow">
          <h3 className="text-lg font-semibold mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-l-4 border-blue-500 bg-blue-50 rounded">
              <div>
                <p className="font-medium">Medication Round</p>
                <p className="text-xs text-gray-500">Evening doses for 3 patients</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="flex items-center justify-between p-2 border-l-4 border-yellow-500 bg-yellow-50 rounded">
              <div>
                <p className="font-medium">Lab Reports</p>
                <p className="text-xs text-gray-500">2 reports pending upload</p>
              </div>
              <button className="text-yellow-600 hover:text-yellow-800">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="flex items-center justify-between p-2 border-l-4 border-red-500 bg-red-50 rounded">
              <div>
                <p className="font-medium">Critical Patient</p>
                <p className="text-xs text-gray-500">Patient 3 needs attention</p>
              </div>
              <button className="text-red-600 hover:text-red-800">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Status Overview Chart */}
      <div className="bg-white p-4 rounded-lg card-shadow mt-6">
        <h3 className="text-lg font-semibold mb-4">Patient Status Overview</h3>
        <div className="h-64">
          <canvas ref={chartRef} id="patientStatusChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default NurseOverview;