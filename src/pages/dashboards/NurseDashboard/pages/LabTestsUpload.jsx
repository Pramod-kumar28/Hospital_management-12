import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/common/Modal/Modal';

const LabTestsUpload = () => {
  const [labs, setLabs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    testType: '',
    reason: '',
    priority: 'Routine',
    doctor: 'Dr. Meena Rao'
  });

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=6');
        const data = await response.json();

        const labsData = data.map((lab, index) => ({
          id: index,
          patient: `Patient ${index + 1}`,
          testType: ['Blood Test', 'Urine Test', 'X-Ray', 'CT Scan', 'MRI', 'Ultrasound'][index % 6],
          doctor: 'Dr. Meena Rao',
          orderedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'pending' : 'urgent',
          result: index % 3 === 0 ? ['Normal', 'Abnormal', 'Inconclusive'][index % 3] : null
        }));

        setLabs(labsData);
      } catch (error) {
        console.error('Error fetching lab data:', error);
      }
    };

    fetchLabs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLabTest = {
      id: labs.length > 0 ? Math.max(...labs.map(l => l.id)) + 1 : 0,
      patient: formData.patient,
      testType: formData.testType,
      doctor: formData.doctor,
      orderedDate: new Date().toLocaleDateString(),
      status: 'pending',
      reason: formData.reason,
      priority: formData.priority
    };

    setLabs(prev => [newLabTest, ...prev]);

    console.log('Lab test requested successfully');

    setFormData({
      patient: '',
      testType: '',
      reason: '',
      priority: 'Routine',
      doctor: 'Dr. Meena Rao'
    });
    setIsModalOpen(false);
  };

  const handleFileUpload = (patientId, testType) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log(`Lab report uploaded for Patient ${patientId}`);

        const updatedLabs = labs.map(lab =>
          lab.id === patientId ? { ...lab, status: 'completed', result: 'Uploaded' } : lab
        );
        setLabs(updatedLabs);
      }
    };
    fileInput.click();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'urgent': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'urgent': return 'Urgent';
      default: return 'Pending';
    }
  };

  const getResultClass = (result) => {
    switch (result) {
      case 'Normal': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Abnormal': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Inconclusive': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="w-full mx-auto max-w-7xl px-3 sm:px-0 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 z-10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/40 py-2 sm:py-0">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-700">🧪 Lab Tests & Upload Reports</h2>
        </div>

        {/* Request New Lab Test Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Request New Lab Test"
          size="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select
                  name="patient"
                  value={formData.patient}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2.5 text-sm"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                <select
                  name="testType"
                  value={formData.testType}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2.5 text-sm"
                  required
                >
                  <option value="">Select Test Type</option>
                  <option>Blood Test</option>
                  <option>Urine Test</option>
                  <option>X-Ray</option>
                  <option>CT Scan</option>
                  <option>MRI</option>
                  <option>Ultrasound</option>
                  <option>ECG</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Test</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2.5 text-sm"
                  placeholder="Describe the reason for this test"
                  rows="3"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2.5 text-sm"
                  >
                    <option>Routine</option>
                    <option>Urgent</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requesting Doctor</label>
                  <input
                    type="text"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2.5 text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 border rounded-lg text-gray-700 hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Request Test
              </button>
            </div>
          </form>
        </Modal>

        {/* Lab Tests Grid - tighter gaps on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-white border rounded-xl p-3 sm:p-4 card-shadow fade-in w-full">
              {/* Header with Test Type and Status */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <h3 className="font-semibold text-blue-700 text-base sm:text-lg leading-snug">{lab.testType}</h3>
                <span className={`px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium w-fit self-start sm:self-auto ${getStatusClass(lab.status)}`}>
                  {getStatusText(lab.status)}
                </span>
              </div>

              {/* Patient Info - compact rows on mobile */}
              <div className="space-y-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <i className="fas fa-user text-gray-400 text-sm w-4 shrink-0"></i>
                  <span className="text-sm text-gray-700 truncate">{lab.patient}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-user-md text-gray-400 text-sm w-4 shrink-0"></i>
                  <span className="text-sm text-gray-700 truncate">{lab.doctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-calendar text-gray-400 text-sm w-4 shrink-0"></i>
                  <span className="text-sm text-gray-700">{lab.orderedDate}</span>
                </div>
              </div>

              {/* Result or Upload Section */}
              {lab.status === 'completed' ? (
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Result:</span>
                    <span className={`px-2 py-1 rounded text-[11px] sm:text-xs font-medium ${getResultClass(lab.result)}`}>
                      {lab.result}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="w-full sm:flex-1 bg-blue-50 text-blue-700 px-3 py-2.5 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1 text-sm font-medium">
                      <i className="fas fa-eye text-xs"></i>
                      <span>View</span>
                    </button>
                    <button className="w-full sm:flex-1 bg-green-50 text-green-700 px-3 py-2.5 rounded-lg hover:bg-green-100 flex items-center justify-center gap-1 text-sm font-medium">
                      <i className="fas fa-print text-xs"></i>
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-3">
                  <label className="w-full bg-blue-50 text-blue-700 px-3 py-3 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-blue-200">
                    <i className="fas fa-upload text-sm"></i>
                    <span className="truncate">Upload Report (PDF)</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={() => handleFileUpload(lab.id, lab.testType)}
                      accept=".pdf"
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recent Lab Results Table */}
        <div className="bg-white p-3 sm:p-4 border rounded-xl card-shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-3">Recent Lab Results</h3>
          <div className="min-w-[720px]">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr className="text-left">
                  <th className="px-3 py-2 sm:px-4 sm:py-2 text-xs sticky left-0 bg-gray-100">Test</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-2 text-xs">Patient</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-2 text-xs">Date</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-2 text-xs">Result</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-2 text-xs">Status</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-2 text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab) => (
                  <tr key={lab.id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap">{lab.testType}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap">{lab.patient}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap">{lab.orderedDate}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2">
                      <span className={`px-2 py-1 rounded-full text-[11px] sm:text-xs ${getResultClass(lab.result)}`}>
                        {lab.result || 'Pending'}
                      </span>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2">
                      <span className={`px-2 py-1 rounded-full text-[11px] sm:text-xs ${getStatusClass(lab.status)}`}>
                        {getStatusText(lab.status)}
                      </span>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-2">
                      <div className="flex gap-2">
                        <button className="p-2 rounded hover:bg-blue-50 text-blue-600" aria-label="View">
                          <i className="fas fa-eye text-sm"></i>
                        </button>
                        <button className="p-2 rounded hover:bg-green-50 text-green-600" aria-label="Download">
                          <i className="fas fa-download text-sm"></i>
                        </button>
                        <button className="p-2 rounded hover:bg-purple-50 text-purple-600" aria-label="Share">
                          <i className="fas fa-share text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Request New Lab Test Section */}
        <div className="bg-white p-3 sm:p-4 border rounded-xl card-shadow w-full">
          <h3 className="text-lg font-semibold mb-3">Request New Lab Test</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select className="w-full border rounded-lg p-2.5 text-sm">
                <option>Patient 1</option>
                <option>Patient 2</option>
                <option>Patient 3</option>
                <option>Patient 4</option>
                <option>Patient 5</option>
                <option>Patient 6</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
              <select className="w-full border rounded-lg p-2.5 text-sm">
                <option>Blood Test</option>
                <option>Urine Test</option>
                <option>X-Ray</option>
                <option>CT Scan</option>
                <option>MRI</option>
                <option>Ultrasound</option>
                <option>ECG</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Test</label>
              <textarea className="w-full border rounded-lg p-2.5 text-sm" rows="2" placeholder="Describe the reason for this test"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select className="w-full border rounded-lg p-2.5 text-sm">
                <option>Routine</option>
                <option>Urgent</option>
                <option>Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requesting Doctor</label>
              <input type="text" className="w-full border rounded-lg p-2.5 text-sm" value="Dr. Meena Rao" readOnly />
            </div>
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm"
              >
                <i className="fas fa-plus mr-1"></i>Request Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LabTestsUpload;
