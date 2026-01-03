import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import DataTable from '../../../../components/ui/Tables/DataTable';
import Modal from '../../../../components/common/Modal/Modal';

const IPDManagement = () => {
  const [loading, setLoading] = useState(true);
  const [ipdPatients, setIpdPatients] = useState([]);
  const [wards, setWards] = useState([]);
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [admissionForm, setAdmissionForm] = useState({
    patientId: '',
    admissionDate: new Date().toISOString().split('T')[0],
    referredBy: '',
    diagnosis: '',
    ward: '',
    bed: '',
    consultant: '',
    emergencyContact: '',
    insurance: '',
    estimatedStay: '3',
    admissionType: 'Emergency',
    admissionNotes: ''
  });

  useEffect(() => {
    loadIPDData();
  }, []);

  const loadIPDData = async () => {
    setLoading(true);
    setTimeout(() => {
      setIpdPatients([
        {
          id: 'ADM-001',
          patientId: 'PAT-005',
          patientName: 'Rajesh Verma',
          admissionDate: '2023-10-10',
          ward: 'General Ward A',
          bed: 'A-12',
          diagnosis: 'Pneumonia',
          consultant: 'Dr. Meena Rao',
          status: 'Admitted',
          estimatedDischarge: '2023-10-18',
          roomCharges: 2500,
          totalBill: 18500
        },
        {
          id: 'ADM-002',
          patientId: 'PAT-006',
          patientName: 'Meera Desai',
          admissionDate: '2023-10-12',
          ward: 'ICU',
          bed: 'ICU-03',
          diagnosis: 'Cardiac Arrest',
          consultant: 'Dr. Sharma',
          status: 'Critical',
          estimatedDischarge: '2023-10-20',
          roomCharges: 8500,
          totalBill: 42500
        },
        {
          id: 'ADM-003',
          patientId: 'PAT-007',
          patientName: 'Vikram Joshi',
          admissionDate: '2023-10-08',
          ward: 'Orthopedic Ward',
          bed: 'OW-07',
          diagnosis: 'Fractured Femur',
          consultant: 'Dr. Menon',
          status: 'Admitted',
          estimatedDischarge: '2023-10-15',
          roomCharges: 3200,
          totalBill: 27800
        },
        {
          id: 'ADM-004',
          patientId: 'PAT-008',
          patientName: 'Kiran Reddy',
          admissionDate: '2023-10-05',
          ward: 'Private Room',
          bed: 'PR-02',
          diagnosis: 'Appendicitis',
          consultant: 'Dr. Meena Rao',
          status: 'Discharge Pending',
          estimatedDischarge: '2023-10-12',
          roomCharges: 5000,
          totalBill: 35200
        }
      ]);

      setWards([
        { id: 'WARD-001', name: 'General Ward A', totalBeds: 20, availableBeds: 8, rate: 2500 },
        { id: 'WARD-002', name: 'General Ward B', totalBeds: 20, availableBeds: 12, rate: 2500 },
        { id: 'WARD-003', name: 'ICU', totalBeds: 10, availableBeds: 3, rate: 8500 },
        { id: 'WARD-004', name: 'ICU-2', totalBeds: 8, availableBeds: 2, rate: 8500 },
        { id: 'WARD-005', name: 'Orthopedic Ward', totalBeds: 15, availableBeds: 6, rate: 3200 },
        { id: 'WARD-006', name: 'Pediatric Ward', totalBeds: 12, availableBeds: 5, rate: 2800 },
        { id: 'WARD-007', name: 'Private Room', totalBeds: 8, availableBeds: 2, rate: 5000 },
        { id: 'WARD-008', name: 'Deluxe Room', totalBeds: 4, availableBeds: 1, rate: 8000 }
      ]);

      setLoading(false);
    }, 1000);
  };

  const handleAdmission = () => {
    if (!admissionForm.patientId || !admissionForm.ward || !admissionForm.diagnosis) {
      alert('Please fill all required fields');
      return;
    }

    const newAdmission = {
      id: `ADM-${Date.now().toString().slice(-4)}`,
      patientId: admissionForm.patientId,
      patientName: 'New Patient', // In real app, get from patient data
      admissionDate: admissionForm.admissionDate,
      ward: admissionForm.ward,
      bed: admissionForm.bed || 'To be assigned',
      diagnosis: admissionForm.diagnosis,
      consultant: admissionForm.consultant,
      status: 'Admitted',
      estimatedDischarge: new Date(Date.now() + parseInt(admissionForm.estimatedStay) * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0],
      roomCharges: wards.find(w => w.name === admissionForm.ward)?.rate || 0,
      totalBill: 0
    };

    setIpdPatients([newAdmission, ...ipdPatients]);
    
    // Update ward availability
    setWards(wards.map(ward => 
      ward.name === admissionForm.ward 
        ? { ...ward, availableBeds: ward.availableBeds - 1 }
        : ward
    ));

    alert('Patient admitted successfully!');
    setShowAdmissionForm(false);
    setAdmissionForm({
      patientId: '',
      admissionDate: new Date().toISOString().split('T')[0],
      referredBy: '',
      diagnosis: '',
      ward: '',
      bed: '',
      consultant: '',
      emergencyContact: '',
      insurance: '',
      estimatedStay: '3',
      admissionType: 'Emergency',
      admissionNotes: ''
    });
  };

  const handleTransfer = (patientId, newWard) => {
    setIpdPatients(ipdPatients.map(patient => {
      if (patient.id === patientId) {
        const oldWard = patient.ward;
        const newWardRate = wards.find(w => w.name === newWard)?.rate || patient.roomCharges;
        
        // Update wards availability
        setWards(wards.map(ward => {
          if (ward.name === oldWard) {
            return { ...ward, availableBeds: ward.availableBeds + 1 };
          }
          if (ward.name === newWard) {
            return { ...ward, availableBeds: ward.availableBeds - 1 };
          }
          return ward;
        }));

        return {
          ...patient,
          ward: newWard,
          roomCharges: newWardRate
        };
      }
      return patient;
    }));

    alert('Patient transferred successfully!');
    setShowTransferModal(false);
    setSelectedPatient(null);
  };

  const initiateDischarge = (patientId) => {
    if (window.confirm('Initiate discharge process for this patient?')) {
      setIpdPatients(ipdPatients.map(patient => 
        patient.id === patientId 
          ? { ...patient, status: 'Discharge Pending' }
          : patient
      ));
      alert('Discharge process initiated. Please complete billing and documentation.');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Admitted': return 'status-confirmed';
      case 'Critical': return 'status-urgent';
      case 'Discharge Pending': return 'status-processing';
      case 'Discharged': return 'status-completed';
      default: return 'status-pending';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">IPD Management</h2>
        <button 
          onClick={() => setShowAdmissionForm(true)}
          className="btn btn-primary flex items-center"
        >
          <i className="fas fa-procedures mr-2"></i> New Admission
        </button>
      </div>

      {/* IPD Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg card-shadow border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <i className="fas fa-bed text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500">Total Admissions</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{ipdPatients.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg card-shadow border">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg mr-4">
              <i className="fas fa-heartbeat text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500">Critical Patients</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {ipdPatients.filter(p => p.status === 'Critical').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg card-shadow border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <i className="fas fa-door-open text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500">Available Beds</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {wards.reduce((sum, ward) => sum + ward.availableBeds, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg card-shadow border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <i className="fas fa-money-bill-wave text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500">Today's Revenue</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                ₹{ipdPatients.reduce((sum, p) => sum + p.roomCharges, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IPD Patients Table */}
      <div className="bg-white rounded-lg card-shadow border overflow-hidden mb-6">
        <DataTable
          columns={[
            { 
              key: 'patientName', 
              title: 'Patient', 
              sortable: true,
              render: (value, row) => (
                <div>
                  <p className="font-medium">{value}</p>
                  <p className="text-xs text-gray-500">ID: {row.patientId}</p>
                  <p className="text-xs text-gray-500">Admission: {row.admissionDate}</p>
                </div>
              )
            },
            { key: 'ward', title: 'Ward', sortable: true },
            { key: 'bed', title: 'Bed', sortable: true },
            { key: 'diagnosis', title: 'Diagnosis', sortable: true },
            { key: 'consultant', title: 'Consultant', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                  {value}
                </span>
              )
            },
            { key: 'estimatedDischarge', title: 'Est. Discharge', sortable: true },
            { key: 'roomCharges', title: 'Room Charges', sortable: true, render: (value) => `₹${value}` },
            {
              key: 'actions',
              title: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button 
                    className="text-blue-600 hover:text-blue-800 p-1 modal-touch-target" 
                    title="View Details"
                    onClick={() => setSelectedPatient(row)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    className="text-green-600 hover:text-green-800 p-1 modal-touch-target" 
                    title="Transfer"
                    onClick={() => {
                      setSelectedPatient(row);
                      setShowTransferModal(true);
                    }}
                  >
                    <i className="fas fa-exchange-alt"></i>
                  </button>
                  <button 
                    className="text-purple-600 hover:text-purple-800 p-1 modal-touch-target" 
                    title="Initiate Discharge"
                    onClick={() => initiateDischarge(row.id)}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                  <button 
                    className="text-yellow-600 hover:text-yellow-800 p-1 modal-touch-target" 
                    title="Update Bill"
                    onClick={() => alert(`Update bill for ${row.patientName}`)}
                  >
                    <i className="fas fa-file-invoice-dollar"></i>
                  </button>
                </div>
              )
            }
          ]}
          data={ipdPatients}
        />
      </div>

      {/* Wards Overview */}
      <div className="bg-white rounded-lg card-shadow border p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">🏥 Wards & Bed Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wards.map(ward => (
            <div key={ward.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">{ward.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  ward.availableBeds > 3 ? 'bg-green-100 text-green-800' :
                  ward.availableBeds > 0 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {ward.availableBeds} Available
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Rate: ₹{ward.rate}/day</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${((ward.totalBeds - ward.availableBeds) / ward.totalBeds) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                {ward.totalBeds - ward.availableBeds}/{ward.totalBeds} beds occupied
              </p>
              <div className="mt-3 pt-3 border-t">
                <button 
                  className="w-full btn btn-outline btn-sm"
                  onClick={() => {
                    setAdmissionForm({...admissionForm, ward: ward.name});
                    setShowAdmissionForm(true);
                  }}
                  disabled={ward.availableBeds === 0}
                >
                  {ward.availableBeds === 0 ? 'Full' : 'Admit Patient'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admission Modal */}
      <Modal
        isOpen={showAdmissionForm}
        onClose={() => setShowAdmissionForm(false)}
        title="New IPD Admission"
        size="lg"
      >
        <div className="space-y-6">
          {/* Patient Selection */}
          <div className="form-group">
            <label className="form-label">Patient *</label>
            <select
              value={admissionForm.patientId}
              onChange={(e) => setAdmissionForm({...admissionForm, patientId: e.target.value})}
              className="form-input"
              required
            >
              <option value="">Select Patient</option>
              <option value="PAT-001">Ravi Kumar (PAT-001)</option>
              <option value="PAT-002">Anita Sharma (PAT-002)</option>
              <option value="PAT-003">Suresh Patel (PAT-003)</option>
              <option value="PAT-004">Priya Singh (PAT-004)</option>
              <option value="new">New Patient (Register First)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Admission Date *</label>
              <input
                type="date"
                value={admissionForm.admissionDate}
                onChange={(e) => setAdmissionForm({...admissionForm, admissionDate: e.target.value})}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Admission Type *</label>
              <select
                value={admissionForm.admissionType}
                onChange={(e) => setAdmissionForm({...admissionForm, admissionType: e.target.value})}
                className="form-input"
                required
              >
                <option value="Emergency">Emergency</option>
                <option value="Routine">Routine</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Maternity">Maternity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Ward *</label>
              <select
                value={admissionForm.ward}
                onChange={(e) => setAdmissionForm({...admissionForm, ward: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Ward</option>
                {wards.filter(w => w.availableBeds > 0).map(ward => (
                  <option key={ward.id} value={ward.name}>
                    {ward.name} (Available: {ward.availableBeds}, Rate: ₹{ward.rate}/day)
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Bed (Optional)</label>
              <input
                type="text"
                value={admissionForm.bed}
                onChange={(e) => setAdmissionForm({...admissionForm, bed: e.target.value})}
                className="form-input"
                placeholder="Will be auto-assigned if left blank"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Primary Diagnosis *</label>
            <textarea
              value={admissionForm.diagnosis}
              onChange={(e) => setAdmissionForm({...admissionForm, diagnosis: e.target.value})}
              className="form-input"
              rows="2"
              placeholder="Enter primary diagnosis..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Consultant *</label>
              <select
                value={admissionForm.consultant}
                onChange={(e) => setAdmissionForm({...admissionForm, consultant: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Consultant</option>
                <option value="Dr. Meena Rao">Dr. Meena Rao - Cardiology</option>
                <option value="Dr. Sharma">Dr. Sharma - Orthopedics</option>
                <option value="Dr. Menon">Dr. Menon - Neurology</option>
                <option value="Dr. Patel">Dr. Patel - General Surgery</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Estimated Stay (Days)</label>
              <input
                type="number"
                value={admissionForm.estimatedStay}
                onChange={(e) => setAdmissionForm({...admissionForm, estimatedStay: e.target.value})}
                className="form-input"
                min="1"
                max="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Referred By</label>
              <input
                type="text"
                value={admissionForm.referredBy}
                onChange={(e) => setAdmissionForm({...admissionForm, referredBy: e.target.value})}
                className="form-input"
                placeholder="Doctor/Clinic name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Emergency Contact *</label>
              <input
                type="tel"
                value={admissionForm.emergencyContact}
                onChange={(e) => setAdmissionForm({...admissionForm, emergencyContact: e.target.value})}
                className="form-input"
                placeholder="+91 98765 43210"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Insurance Provider</label>
            <select
              value={admissionForm.insurance}
              onChange={(e) => setAdmissionForm({...admissionForm, insurance: e.target.value})}
              className="form-input"
            >
              <option value="">Select Insurance</option>
              <option value="HealthGuard">HealthGuard</option>
              <option value="MediCare Plus">MediCare Plus</option>
              <option value="SecureLife">SecureLife</option>
              <option value="None">None (Self Pay)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Admission Notes</label>
            <textarea
              value={admissionForm.admissionNotes}
              onChange={(e) => setAdmissionForm({...admissionForm, admissionNotes: e.target.value})}
              className="form-input"
              rows="3"
              placeholder="Any special instructions or notes..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowAdmissionForm(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleAdmission}
              className="btn btn-success"
            >
              <i className="fas fa-procedures mr-2"></i> Complete Admission
            </button>
          </div>
        </div>
      </Modal>

      {/* Transfer Modal */}
      <Modal
        isOpen={showTransferModal}
        onClose={() => {
          setShowTransferModal(false);
          setSelectedPatient(null);
        }}
        title={`Transfer Patient: ${selectedPatient?.patientName || ''}`}
        size="md"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Current Ward: <strong>{selectedPatient.ward}</strong> (Bed: {selectedPatient.bed})
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Transfer to Ward *</label>
              <select
                className="form-input"
                onChange={(e) => handleTransfer(selectedPatient.id, e.target.value)}
              >
                <option value="">Select New Ward</option>
                {wards
                  .filter(w => w.name !== selectedPatient.ward && w.availableBeds > 0)
                  .map(ward => (
                    <option key={ward.id} value={ward.name}>
                      {ward.name} (Available: {ward.availableBeds}, Rate: ₹{ward.rate}/day)
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Transfer Reason</label>
              <textarea
                className="form-input"
                rows="3"
                placeholder="Reason for transfer..."
              />
            </div>

            <div className="text-sm text-gray-600">
              <p className="font-medium">Note:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Patient's billing will be updated automatically</li>
                <li>Medical records will be transferred</li>
                <li>Consultant will be notified</li>
                <li>Nursing staff will assist with the transfer</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Patient Detail Modal */}
      {selectedPatient && !showTransferModal && (
        <Modal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          title={`Patient Details: ${selectedPatient.patientName}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Patient ID</p>
                <p className="font-medium">{selectedPatient.patientId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Admission ID</p>
                <p className="font-medium">{selectedPatient.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Admission Date</p>
                <p className="font-medium">{selectedPatient.admissionDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Est. Discharge</p>
                <p className="font-medium">{selectedPatient.estimatedDischarge}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Ward & Bed</p>
              <p className="font-medium">{selectedPatient.ward} (Bed: {selectedPatient.bed})</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Diagnosis</p>
              <p className="font-medium">{selectedPatient.diagnosis}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Consultant</p>
              <p className="font-medium">{selectedPatient.consultant}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Billing Information</p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Room Charges (per day):</span>
                  <span className="font-medium">₹{selectedPatient.roomCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Total:</span>
                  <span className="font-bold">₹{selectedPatient.totalBill}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex gap-3">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedPatient(null);
                    setShowTransferModal(true);
                  }}
                >
                  <i className="fas fa-exchange-alt mr-2"></i> Transfer Ward
                </button>
                <button 
                  className="btn btn-success"
                  onClick={() => initiateDischarge(selectedPatient.id)}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Initiate Discharge
                </button>
                <button 
                  className="btn btn-info"
                  onClick={() => alert('Viewing medical records')}
                >
                  <i className="fas fa-file-medical mr-2"></i> Medical Records
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default IPDManagement;