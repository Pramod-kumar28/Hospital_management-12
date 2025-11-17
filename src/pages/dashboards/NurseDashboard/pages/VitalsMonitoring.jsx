import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const VitalsMonitoring = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Initialize chart when component mounts
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destroy previous chart instance if exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
          datasets: [
            {
              label: 'Temperature (°F)',
              data: [98.6, 98.9, 99.2, 98.8, 98.5, 98.4],
              borderColor: 'rgb(239, 68, 68)',
              tension: 0.1
            },
            {
              label: 'Heart Rate (bpm)',
              data: [72, 75, 78, 76, 74, 72],
              borderColor: 'rgb(59, 130, 246)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Exact data from HTML - using the high temperatures as shown in the table
  const patients = [
    { 
      id: 1, 
      name: "Leanne Graham", 
      temp: 971.2, 
      bpSystolic: 119, 
      bpDiastolic: 72, 
      pulse: 72, 
      oxygen: 99,
      time: "11:58:17"
    },
    { 
      id: 2, 
      name: "Ervin Howell", 
      temp: 972.1, 
      bpSystolic: 115, 
      bpDiastolic: 71, 
      pulse: 70, 
      oxygen: 96,
      time: "11:58:17"
    },
    { 
      id: 3, 
      name: "Clementine Bauch", 
      temp: 970.2, 
      bpSystolic: 110, 
      bpDiastolic: 70, 
      pulse: 62, 
      oxygen: 97,
      time: "11:58:17"
    },
    { 
      id: 4, 
      name: "Patricia Lebsack", 
      temp: 971.5, 
      bpSystolic: 117, 
      bpDiastolic: 72, 
      pulse: 68, 
      oxygen: 97,
      time: "11:58:17"
    },
    { 
      id: 5, 
      name: "Chelsey Dietrich", 
      temp: 972.4, 
      bpSystolic: 115, 
      bpDiastolic: 74, 
      pulse: 73, 
      oxygen: 95,
      time: "11:58:17"
    },
    { 
      id: 6, 
      name: "Mrs. Dennis Schulist", 
      temp: 972.6, 
      bpSystolic: 115, 
      bpDiastolic: 71, 
      pulse: 69, 
      oxygen: 96,
      time: "11:58:17"
    }
  ];

  // All patients are marked as Critical as per HTML
  const getStatus = () => {
    return { status: 'Critical', class: 'status-critical' };
  };

  const handleVitalsSubmit = (e) => {
    e.preventDefault();
    // Show notification (you can implement your notification system here)
    console.log('Vitals recorded successfully');
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      {/* Vitals Table - Mobile Optimized */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">❤️ Vitals Monitoring</h2>
        <div className="bg-white border rounded card-shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Patient</th>
                <th className="px-3 py-2 text-center text-xs font-medium whitespace-nowrap">Temp</th>
                <th className="px-3 py-2 text-center text-xs font-medium whitespace-nowrap">BP</th>
                <th className="px-3 py-2 text-center text-xs font-medium whitespace-nowrap">Pulse</th>
                <th className="px-3 py-2 text-center text-xs font-medium whitespace-nowrap">O₂</th>
                <th className="px-3 py-2 text-center text-xs font-medium whitespace-nowrap">Time</th>
                <th className="px-3 py-2 text-center text-xs font-medium whitespace-nowrap">Status</th>
                <th className="px-3 py-2 text-center text-xs font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => {
                const statusInfo = getStatus();
                
                return (
                  <tr key={patient.id} className="border-t hover:bg-gray-50 fade-in">
                    {/* Patient Name - Truncated on mobile */}
                    <td className="px-3 py-2 text-left max-w-[100px]">
                      <div className="truncate" title={patient.name}>
                        {patient.name}
                      </div>
                    </td>
                    
                    {/* Temperature */}
                    <td className="px-3 py-2 text-center text-red-600 font-semibold whitespace-nowrap">
                      {patient.temp}°F
                    </td>
                    
                    {/* Blood Pressure */}
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {patient.bpSystolic}/{patient.bpDiastolic}
                    </td>
                    
                    {/* Pulse */}
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {patient.pulse} bpm
                    </td>
                    
                    {/* Oxygen */}
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {patient.oxygen}%
                    </td>
                    
                    {/* Time - Compact on mobile */}
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <span className="hidden sm:inline">{patient.time}</span>
                      <span className="sm:hidden text-xs">
                        {patient.time.split(':').slice(0, 2).join(':')}
                      </span>
                    </td>
                    
                    {/* Status */}
                    <td className="px-3 py-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.class} whitespace-nowrap`}>
                        {statusInfo.status}
                      </span>
                    </td>
                    
                    {/* Actions - Compact on mobile */}
                    <td className="px-3 py-2 text-center">
                      <div className="flex gap-1 justify-center">
                        <button 
                          className="text-blue-500 hover:text-blue-700 p-1 transition-colors"
                          title="Edit Vitals"
                        >
                          <i className="fas fa-edit text-sm"></i>
                        </button>
                        <button 
                          className="text-green-500 hover:text-green-700 p-1 transition-colors"
                          title="View Trends"
                        >
                          <i className="fas fa-chart-line text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="sm:hidden bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
          <div className="flex items-center gap-2 text-blue-700 text-sm">
            <i className="fas fa-info-circle"></i>
            <span>Scroll horizontally to view all columns</span>
          </div>
        </div>
      </div>

      {/* Side by Side Section - Vitals Trends and Add Vitals Reading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vitals Trends - Left Side */}
        <div className="bg-white p-4 border rounded card-shadow">
          <h3 className="text-lg font-semibold mb-3">Vitals Trends</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="text-sm font-medium flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              Temperature (°F)
            </span>
            <span className="text-sm font-medium flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              Heart Rate (bpm)
            </span>
          </div>
          <div className="h-64">
            <canvas ref={chartRef} id="vitalsChart"></canvas>
          </div>
        </div>

        {/* Add Vitals Reading - Right Side */}
        <div className="bg-white p-4 border rounded card-shadow">
          <h3 className="text-lg font-semibold mb-3">Add Vitals Reading</h3>
          <form id="vitalsForm" className="space-y-4" onSubmit={handleVitalsSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                <option>Leanne Graham</option>
                {patients.slice(1).map(patient => (
                  <option key={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>
            
            {/* Complete form fields from HTML */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°F)</label>
              <input 
                type="number" 
                step="0.1" 
                className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter temperature"
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pulse (bpm)</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter pulse"
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BP Systolic</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Systolic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BP Diastolic</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Diastolic"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Saturation (%)</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter oxygen level"
              />
            </div>

            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition-colors text-sm font-medium"
            >
              <i className="fas fa-save mr-1"></i>Save Vitals
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VitalsMonitoring;