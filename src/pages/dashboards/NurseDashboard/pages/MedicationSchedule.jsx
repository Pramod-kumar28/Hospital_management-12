// MedicationSchedule.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/common/Modal/Modal';

const MedicationSchedule = () => {
  const [medications, setMedications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    medicine: '',
    dose: '',
    time: '',
    instructions: '',
    frequency: 'Once daily',
    startDate: ''
  });

  useEffect(() => {
    // Simulate API call to fetch medication data
    const fetchMedications = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
        const data = await response.json();
        
        const medsData = data.map((med, index) => ({
          id: index,
          patient: `Patient ${index + 1}`,
          medicine: ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Cetirizine', 'Omeprazole'][index % 5],
          dose: ['500mg', '400mg', '250mg', '10mg', '20mg'][index % 5],
          time: ['08:00', '12:00', '18:00', '20:00', '06:00'][index % 5],
          frequency: ['Once daily', 'Twice daily', 'Three times', 'With meals', 'At bedtime'][index % 5],
          status: index % 3 === 0 ? 'Given' : index % 3 === 1 ? 'Pending' : 'Missed'
        }));
        
        setMedications(medsData);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  const handleMedAction = (action, id) => {
    let message = '';
    let newStatus = '';
    
    if (action === 'give') {
      message = 'Medication marked as given';
      newStatus = 'Given';
    } else if (action === 'delay') {
      message = 'Medication delayed for 1 hour';
      newStatus = 'Pending';
    } else if (action === 'skip') {
      message = 'Medication skipped - reason recorded';
      newStatus = 'Missed';
    }
    
    // Show notification (you can implement your notification system here)
    console.log(message);
    
    // Update medication status in local state
    const updatedMeds = medications.map(med => 
      med.id === id ? { ...med, status: newStatus } : med
    );
    setMedications(updatedMeds);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMedication = {
      id: medications.length > 0 ? Math.max(...medications.map(m => m.id)) + 1 : 0,
      patient: formData.patient,
      medicine: formData.medicine,
      dose: formData.dose,
      time: formData.time,
      frequency: formData.frequency,
      instructions: formData.instructions,
      status: 'Pending'
    };
    
    setMedications(prev => [newMedication, ...prev]);
    
    // Show success notification
    console.log('Medication added to schedule');
    
    // Reset form and close modal
    setFormData({
      patient: '',
      medicine: '',
      dose: '',
      time: '',
      instructions: '',
      frequency: 'Once daily',
      startDate: ''
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      patient: '',
      medicine: '',
      dose: '',
      time: '',
      instructions: '',
      frequency: 'Once daily',
      startDate: ''
    });
    setIsModalOpen(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Given': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Missed': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    }
  };

  return (
   <div className="min-h-screen bg-gray-50 p-1 md:p-1 overflow-x-hidden">

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">💊 Medication Schedule</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            <i className="fas fa-plus mr-2"></i> Add Medication
          </button>
        </div>

        {/* Add Medication Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCancel}
          title="Add New Medication"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select 
                  name="patient"
                  value={formData.patient}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Patient</option>
                  <option>Patient 1</option>
                  <option>Patient 2</option>
                  <option>Patient 3</option>
                  <option>Patient 4</option>
                  <option>Patient 5</option>
                  <option>Patient 6</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine</label>
                <input 
                  type="text" 
                  name="medicine"
                  value={formData.medicine}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Medicine name" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dose</label>
                <input 
                  type="text" 
                  name="dose"
                  value={formData.dose}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="e.g., 500mg" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input 
                  type="time" 
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select 
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Once daily</option>
                  <option>Twice daily</option>
                  <option>Three times</option>
                  <option>With meals</option>
                  <option>At bedtime</option>
                  <option>As needed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input 
                  type="date" 
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
              <textarea 
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Special instructions" 
                rows="3"
                required 
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <button 
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <i className="fas fa-plus mr-2"></i>Add Medication
              </button>
            </div>
          </form>
        </Modal>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-blue-50 p-4 rounded-lg card-shadow border border-blue-100">
            <h4 className="font-semibold text-blue-700 text-sm">Pending</h4>
            <p className="text-2xl font-bold text-blue-600">{medications.filter(m => m.status === 'Pending').length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg card-shadow border border-green-100">
            <h4 className="font-semibold text-green-700 text-sm">Given</h4>
            <p className="text-2xl font-bold text-green-600">{medications.filter(m => m.status === 'Given').length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg card-shadow border border-yellow-100">
            <h4 className="font-semibold text-yellow-700 text-sm">Missed</h4>
            <p className="text-2xl font-bold text-yellow-600">{medications.filter(m => m.status === 'Missed').length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg card-shadow border border-purple-100">
            <h4 className="font-semibold text-purple-700 text-sm">Delayed</h4>
            <p className="text-2xl font-bold text-purple-600">2</p>
          </div>
        </div>

        {/* Medications Table */}
        <div className="bg-white p-4 md:p-6 border rounded-lg card-shadow overflow-hidden">
          <div className="overflow-x-auto overscroll-x-contain">

<table className="min-w-[720px] w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Patient</th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Medicine</th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Dose</th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Frequency</th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-7 py-7 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {medications.map((med) => (
                  <tr key={med.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{med.patient}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{med.medicine}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{med.dose}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{med.time}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{med.frequency}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(med.status)}`}>
                        {med.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button 
                          className="text-green-600 hover:text-green-800 p-1 rounded transition-colors duration-200"
                          onClick={() => handleMedAction('give', med.id)}
                          title="Mark as Given"
                        >
                          <i className="fas fa-check-circle text-lg"></i>
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors duration-200"
                          onClick={() => handleMedAction('delay', med.id)}
                          title="Delay Medication"
                        >
                          <i className="fas fa-clock text-lg"></i>
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors duration-200"
                          onClick={() => handleMedAction('skip', med.id)}
                          title="Mark as Missed"
                        >
                          <i className="fas fa-times-circle text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {medications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-pills text-4xl mb-3 text-gray-300"></i>
              <p>No medications scheduled</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Add your first medication
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationSchedule;