import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Modal from '../../../../components/common/Modal/Modal'; 

const BedManagement = () => {
  const [selectedWard, setSelectedWard] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showAddBedModal, setShowAddBedModal] = useState(false);
  const [newBedData, setNewBedData] = useState({
    number: '',
    ward: 'general',
    status: 'available'
  });
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
        type: 'doughnut',
        data: {
          labels: ['Occupied', 'Available', 'Cleaning/Maintenance', 'Reserved'],
          datasets: [{
            data: [7, 3, 1, 1],
            backgroundColor: [
              'rgb(239, 68, 68)',
              'rgb(34, 197, 94)',
              'rgb(245, 158, 11)',
              'rgb(168, 85, 247)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
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

  const beds = [
    { id: 1, number: '101', status: 'available', patient: null, condition: null, doctor: null, admitted: null },
    { id: 2, number: '102', status: 'occupied', patient: 'Patient 1', condition: 'Stable', doctor: 'Dr. Meena Rao', admitted: '2023-10-15' },
    { id: 3, number: '103', status: 'occupied', patient: 'Patient 2', condition: 'Critical', doctor: 'Dr. Rajesh Kumar', admitted: '2023-10-16' },
    { id: 4, number: '104', status: 'cleaning', patient: null, condition: null, doctor: null, admitted: null },
    { id: 5, number: '105', status: 'available', patient: null, condition: null, doctor: null, admitted: null },
    { id: 6, number: '106', status: 'occupied', patient: 'Patient 3', condition: 'Improving', doctor: 'Dr. Priya Sharma', admitted: '2023-10-14' },
    { id: 7, number: '107', status: 'occupied', patient: 'Patient 4', condition: 'Stable', doctor: 'Dr. Meena Rao', admitted: '2023-10-17' },
    { id: 8, number: '108', status: 'available', patient: null, condition: null, doctor: null, admitted: null },
    { id: 9, number: '109', status: 'occupied', patient: 'Patient 5', condition: 'Critical', doctor: 'Dr. Rajesh Kumar', admitted: '2023-10-18' },
    { id: 10, number: '110', status: 'cleaning', patient: null, condition: null, doctor: null, admitted: null },
    { id: 11, number: '111', status: 'available', patient: null, condition: null, doctor: null, admitted: null },
    { id: 12, number: '112', status: 'occupied', patient: 'Patient 6', condition: 'Stable', doctor: 'Dr. Priya Sharma', admitted: '2023-10-13' },
  ];

  const wardFilters = [
    { id: 'all', name: 'All Wards' },
    { id: 'icu', name: 'ICU' },
    { id: 'general', name: 'General Ward' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'maternity', name: 'Maternity' },
  ];

  const filteredBeds = selectedWard === 'all' 
    ? beds 
    : beds.filter(bed => {
        if (selectedWard === 'icu') return bed.number >= '101' && bed.number <= '104';
        if (selectedWard === 'general') return bed.number >= '105' && bed.number <= '108';
        if (selectedWard === 'pediatrics') return bed.number >= '109' && bed.number <= '110';
        if (selectedWard === 'maternity') return bed.number >= '111' && bed.number <= '112';
        return true;
      });

  const getStatusClass = (status) => {
    switch (status) {
      case 'available': return 'status-available';
      case 'occupied': return 'status-occupied';
      case 'cleaning': return 'status-cleaning';
      case 'reserved': return 'status-critical';
      default: return 'status-available';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'occupied': return 'Occupied';
      case 'cleaning': return 'Cleaning';
      case 'reserved': return 'Reserved';
      default: return 'Available';
    }
  };

  const handleAddBed = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to add the bed
    console.log('Adding new bed:', newBedData);
    
    // Reset form and close modal
    setNewBedData({
      number: '',
      ward: 'general',
      status: 'available'
    });
    setShowAddBedModal(false);
    
    // Show success message (you can implement a notification system)
    alert('Bed added successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Bed/Room Management</h2>
        <div className="flex gap-2">
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center text-sm"
          >
            <i className="fas fa-filter mr-1"></i>Filters
          </button>
          <button 
            onClick={() => setShowAddBedModal(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center text-sm sm:text-base sm:px-4"
          >
            <i className="fas fa-plus mr-1 sm:mr-2"></i>
            <span className="hidden sm:inline">Add Bed</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Desktop Filter Buttons */}
      <div className="hidden sm:block bg-white p-4 border rounded card-shadow">
        <div className="flex flex-wrap gap-2">
          {wardFilters.map(ward => (
            <button
              key={ward.id}
              onClick={() => setSelectedWard(ward.id)}
              className={`px-4 py-2 rounded-lg border ${
                selectedWard === ward.id 
                  ? 'bg-blue-100 text-blue-700 border-blue-300' 
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              } hover:bg-blue-50 hover:border-blue-200 transition-colors`}
            >
              {ward.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filter Dropdown */}
      {showMobileFilters && (
        <div className="sm:hidden bg-white p-4 border rounded card-shadow">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700">Filter by Ward</h3>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {wardFilters.map(ward => (
              <button
                key={ward.id}
                onClick={() => {
                  setSelectedWard(ward.id);
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg border ${
                  selectedWard === ward.id 
                    ? 'bg-blue-100 text-blue-700 border-blue-300' 
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                } hover:bg-blue-50 hover:border-blue-200 transition-colors`}
              >
                {ward.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Active Filter Display */}
      <div className="sm:hidden bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-700">
            Showing: <strong>{wardFilters.find(w => w.id === selectedWard)?.name}</strong>
          </span>
          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {filteredBeds.length} beds
          </span>
        </div>
      </div>

      {/* Beds Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredBeds.map(bed => (
          <div key={bed.id} className="bg-white border rounded p-3 sm:p-4 card-shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-blue-700 text-sm sm:text-base">Bed {bed.number}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(bed.status)}`}>
                {getStatusText(bed.status)}
              </span>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
              {bed.status === 'occupied' ? (
                <>
                  <p><strong>Patient:</strong> {bed.patient}</p>
                  <p><strong>Admitted:</strong> {new Date(bed.admitted).toLocaleDateString()}</p>
                  <p><strong>Condition:</strong> {bed.condition}</p>
                  <p><strong>Doctor:</strong> {bed.doctor}</p>
                </>
              ) : bed.status === 'reserved' ? (
                <>
                  <p><strong>Reserved For:</strong> Emergency</p>
                  <p><strong>Expected:</strong> {new Date(Date.now() + 2*60*60*1000).toLocaleTimeString()}</p>
                </>
              ) : (
                <>
                  <p><strong>Status:</strong> {bed.status === 'available' ? 'Ready for admission' : 'Under maintenance'}</p>
                  <p><strong>Last Occupied:</strong> {new Date(Date.now() - Math.random()*14*24*60*60*1000).toLocaleDateString()}</p>
                </>
              )}
            </div>
            
            <div className="mt-3 flex gap-1 sm:gap-2 flex-wrap">
              {bed.status === 'occupied' ? (
                <>
                  <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 flex-1 sm:flex-none">
                    Transfer
                  </button>
                  <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 flex-1 sm:flex-none">
                    Discharge
                  </button>
                </>
              ) : bed.status === 'reserved' ? (
                <button className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 w-full">
                  Cancel Reserve
                </button>
              ) : (
                <>
                  <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 flex-1 sm:flex-none">
                    Assign
                  </button>
                  {bed.status === 'cleaning' && (
                    <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 flex-1 sm:flex-none">
                      Mark Clean
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-3 sm:p-4 border rounded card-shadow">
          <h3 className="text-lg font-semibold mb-3">Bed Status Summary</h3>
          <div className="h-48 sm:h-64">
            <canvas ref={chartRef} id="bedChart"></canvas>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-4 border rounded card-shadow">
          <h3 className="text-lg font-semibold mb-3">Bed Utilization</h3>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">General Ward</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">ICU</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Pediatrics</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Maternity</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Bed Modal */}
      <Modal
        isOpen={showAddBedModal}
        onClose={() => setShowAddBedModal(false)}
        title="Add New Bed"
        size="md"
      >
        <form onSubmit={handleAddBed} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bed Number
            </label>
            <input
              type="text"
              name="number"
              value={newBedData.number}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="e.g., 113"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ward
            </label>
            <select
              name="ward"
              value={newBedData.ward}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="general">General Ward</option>
              <option value="icu">ICU</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="maternity">Maternity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Status
            </label>
            <select
              name="status"
              value={newBedData.status}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="available">Available</option>
              <option value="cleaning">Cleaning/Maintenance</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setShowAddBedModal(false)}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Bed
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BedManagement;