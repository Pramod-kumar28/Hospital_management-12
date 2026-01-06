
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import DataTable from '../../../../components/ui/Tables/DataTable';
import Modal from '../../../../components/common/Modal/Modal';

const OPDManagement = () => {
  const [loading, setLoading] = useState(true);
  const [opdPatients, setOpdPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    department: '',
    opdRoom: '',
    specialization: '',
    contact: '',
    isActive: true
  });

  const [consultationForm, setConsultationForm] = useState({
    patientId: '',
    doctorId: '',
    consultationType: 'New',
    vitalSigns: {
      bp: '',
      pulse: '',
      temperature: '',
      spo2: '',
      weight: '',
      height: ''
    },
    symptoms: '',
    diagnosis: '',
    prescription: '',
    testsRecommended: [],
    nextVisitDate: '',
    remarks: ''
  });

  const [assignForm, setAssignForm] = useState({
    patientId: '',
    doctorId: '',
    priority: 'Normal'
  });

  useEffect(() => {
    loadOPDData();
  }, []);

  const loadOPDData = async () => {
    setLoading(true);
    setTimeout(() => {
      const initialDoctors = [
        {
          id: 'D-001',
          name: 'Dr. Meena Rao',
          department: 'Cardiology',
          opdRoom: 'Room 101',
          specialization: 'Cardiologist',
          contact: '+91 9876543210',
          isActive: true,
          currentPatient: null,
          queue: 0,
          maxPatientsPerDay: 30,
          consultationFee: 500,
          workingHours: '9:00 AM - 5:00 PM',
          rating: 4.8,
          experience: '15 years'
        },
        {
          id: 'D-002',
          name: 'Dr. Sharma',
          department: 'Orthopedics',
          opdRoom: 'Room 102',
          specialization: 'Orthopedic Surgeon',
          contact: '+91 9876543211',
          isActive: true,
          currentPatient: null,
          queue: 0,
          maxPatientsPerDay: 25,
          consultationFee: 400,
          workingHours: '10:00 AM - 6:00 PM',
          rating: 4.5,
          experience: '12 years'
        },
        {
          id: 'D-003',
          name: 'Dr. Menon',
          department: 'Neurology',
          opdRoom: 'Room 103',
          specialization: 'Neurologist',
          contact: '+91 9876543212',
          isActive: false,
          currentPatient: null,
          queue: 0,
          maxPatientsPerDay: 20,
          consultationFee: 600,
          workingHours: '9:30 AM - 4:30 PM',
          rating: 4.9,
          experience: '18 years'
        },
        {
          id: 'D-004',
          name: 'Dr. Gupta',
          department: 'General Medicine',
          opdRoom: 'Room 104',
          specialization: 'General Physician',
          contact: '+91 9876543213',
          isActive: true,
          currentPatient: null,
          queue: 0,
          maxPatientsPerDay: 40,
          consultationFee: 300,
          workingHours: '8:00 AM - 4:00 PM',
          rating: 4.7,
          experience: '10 years'
        }
      ];

      const initialPatients = [
        {
          id: 'OPD-001',
          patientId: 'PAT-001',
          patientName: 'Ravi Kumar',
          age: 45,
          gender: 'Male',
          token: 'T-101',
          waitingTime: '15 mins',
          status: 'Waiting',
          assignedDoctorId: 'D-001',
          doctor: 'Dr. Meena Rao',
          department: 'Cardiology',
          priority: 'Normal',
          queuePosition: 1,
          arrivalTime: '9:15 AM',
          bloodGroup: 'B+'
        },
        {
          id: 'OPD-002',
          patientId: 'PAT-002',
          patientName: 'Anita Sharma',
          age: 32,
          gender: 'Female',
          token: 'T-102',
          waitingTime: '5 mins',
          status: 'In Consultation',
          assignedDoctorId: 'D-001',
          doctor: 'Dr. Meena Rao',
          department: 'Cardiology',
          priority: 'Normal',
          queuePosition: 0,
          arrivalTime: '9:00 AM',
          bloodGroup: 'A+'
        },
        {
          id: 'OPD-003',
          patientId: 'PAT-003',
          patientName: 'Suresh Patel',
          age: 58,
          gender: 'Male',
          token: 'T-103',
          waitingTime: '25 mins',
          status: 'Waiting',
          assignedDoctorId: 'D-002',
          doctor: 'Dr. Sharma',
          department: 'Orthopedics',
          priority: 'Urgent',
          queuePosition: 1,
          arrivalTime: '9:30 AM',
          bloodGroup: 'O+'
        },
        {
          id: 'OPD-004',
          patientId: 'PAT-004',
          patientName: 'Kiran Reddy',
          age: 28,
          gender: 'Male',
          token: 'T-104',
          waitingTime: '0 mins',
          status: 'Completed',
          assignedDoctorId: 'D-004',
          doctor: 'Dr. Gupta',
          department: 'General Medicine',
          priority: 'Normal',
          queuePosition: 0,
          arrivalTime: '8:45 AM',
          bloodGroup: 'AB+'
        }
      ];

      const doctorsWithQueue = initialDoctors.map(doctor => {
        const waitingPatients = initialPatients.filter(
          p => p.assignedDoctorId === doctor.id && p.status === 'Waiting'
        );
        const inConsultationPatient = initialPatients.find(
          p => p.assignedDoctorId === doctor.id && p.status === 'In Consultation'
        );
        
        return {
          ...doctor,
          queue: waitingPatients.length,
          currentPatient: inConsultationPatient?.token || null,
          currentPatientName: inConsultationPatient?.patientName || null
        };
      });

      setDoctors(doctorsWithQueue);
      setOpdPatients(initialPatients);
      setLoading(false);
    }, 1000);
  };

  const handleStartConsultation = (patient) => {
    setSelectedPatient(patient);
    setConsultationForm({
      ...consultationForm,
      patientId: patient.patientId,
      doctorId: patient.assignedDoctorId,
      consultationType: patient.status === 'Completed' ? 'Follow-up' : 'New'
    });
    setShowConsultationForm(true);
    
    if (patient.status === 'Waiting') {
      const updatedPatients = opdPatients.map(p => {
        if (p.id === patient.id) {
          return { ...p, status: 'In Consultation' };
        }
        return p;
      });
      setOpdPatients(updatedPatients);
      
      const updatedDoctors = doctors.map(doctor => {
        if (doctor.id === patient.assignedDoctorId) {
          return {
            ...doctor,
            currentPatient: patient.token,
            currentPatientName: patient.patientName
          };
        }
        return doctor;
      });
      setDoctors(updatedDoctors);
    }
  };

  const handleCompleteConsultation = () => {
    if (!consultationForm.diagnosis || !consultationForm.prescription) {
      alert('Please enter diagnosis and prescription');
      return;
    }

    const updatedPatients = opdPatients.map(p => {
      if (p.id === selectedPatient.id) {
        return { 
          ...p, 
          status: 'Completed',
          waitingTime: '0 mins'
        };
      }
      return p;
    });

    const doctor = doctors.find(d => d.id === selectedPatient.assignedDoctorId);
    if (doctor) {
      const waitingPatients = updatedPatients.filter(
        patient => patient.assignedDoctorId === doctor.id && 
                  patient.status === 'Waiting'
      ).sort((a, b) => a.queuePosition - b.queuePosition);
      
      let nextPatients = [...waitingPatients];
      
      if (waitingPatients.length > 0) {
        const nextPatient = waitingPatients[0];
        const patientIndex = updatedPatients.findIndex(p => p.id === nextPatient.id);
        
        if (patientIndex !== -1) {
          updatedPatients[patientIndex] = {
            ...nextPatient,
            status: 'In Consultation',
            waitingTime: '0 mins'
          };
          
          nextPatients = waitingPatients.slice(1);
        }
      }

      const finalPatients = updatedPatients.map(patient => {
        if (patient.assignedDoctorId === doctor.id && patient.status === 'Waiting') {
          const newPosition = nextPatients.findIndex(p => p.id === patient.id);
          return { 
            ...patient, 
            queuePosition: newPosition,
            waitingTime: `${(newPosition + 1) * 15} mins`
          };
        }
        return patient;
      });

      setOpdPatients(finalPatients);
      
      const updatedDoctors = doctors.map(d => {
        if (d.id === doctor.id) {
          return {
            ...d,
            currentPatient: waitingPatients.length > 0 ? waitingPatients[0].token : null,
            currentPatientName: waitingPatients.length > 0 ? waitingPatients[0].patientName : null,
            queue: Math.max(0, d.queue - 1)
          };
        }
        return d;
      });
      
      setDoctors(updatedDoctors);
    }

    alert('Consultation completed successfully!');
    setShowConsultationForm(false);
    setSelectedPatient(null);
    setConsultationForm({
      patientId: '',
      doctorId: '',
      consultationType: 'New',
      vitalSigns: {
        bp: '',
        pulse: '',
        temperature: '',
        spo2: '',
        weight: '',
        height: ''
      },
      symptoms: '',
      diagnosis: '',
      prescription: '',
      testsRecommended: [],
      nextVisitDate: '',
      remarks: ''
    });
  };

  const generateToken = () => {
    const patientName = prompt('Enter patient name for token:');
    if (patientName) {
      const tokenNumber = Math.floor(Math.random() * 1000);
      const currentTime = new Date();
      const arrivalTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newToken = {
        id: `OPD-${Date.now()}`,
        patientId: `PAT-${Date.now().toString().slice(-6)}`,
        patientName: patientName,
        age: 'Not specified',
        gender: 'Not specified',
        token: `T-${tokenNumber}`,
        waitingTime: '0 mins',
        status: 'Waiting',
        assignedDoctorId: null,
        doctor: 'Not Assigned',
        department: 'General',
        priority: 'Normal',
        queuePosition: null,
        arrivalTime: arrivalTime,
        bloodGroup: 'Not specified'
      };
      setOpdPatients([newToken, ...opdPatients]);
      alert(`Token ${newToken.token} generated for ${patientName}`);
    }
  };

  const handleDoctorStatusToggle = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    const isActivating = !doctor.isActive;
    
    if (isActivating) {
      setDoctors(doctors.map(d => 
        d.id === doctorId ? { ...d, isActive: !d.isActive } : d
      ));
    } else {
      const doctorPatients = opdPatients.filter(p => 
        p.assignedDoctorId === doctorId && (p.status === 'Waiting' || p.status === 'In Consultation')
      );
      
      if (doctorPatients.length > 0) {
        const patientList = doctorPatients.map(p => `${p.token} - ${p.patientName}`).join('\n');
        const confirmDeactivate = window.confirm(
          `${doctor.name} has ${doctorPatients.length} active patients:\n\n${patientList}\n\nDeactivating will reassign these patients. Continue?`
        );
        
        if (confirmDeactivate) {
          const activeDoctors = doctors.filter(d => d.isActive && d.id !== doctorId);
          if (activeDoctors.length === 0) {
            alert('No other active doctors available. Cannot deactivate.');
            return;
          }
          
          let updatedPatients = [...opdPatients];
          doctorPatients.forEach(patient => {
            const bestDoctor = activeDoctors.reduce((prev, curr) => 
              prev.queue < curr.queue ? prev : curr
            );
            
            const newQueuePosition = updatedPatients.filter(
              p => p.assignedDoctorId === bestDoctor.id && p.status === 'Waiting'
            ).length;
            
            updatedPatients = updatedPatients.map(p => {
              if (p.id === patient.id) {
                return {
                  ...p,
                  assignedDoctorId: bestDoctor.id,
                  doctor: bestDoctor.name,
                  department: bestDoctor.department,
                  queuePosition: newQueuePosition,
                  waitingTime: `${(newQueuePosition + 1) * 15} mins`
                };
              }
              return p;
            });
            
            setDoctors(doctors.map(d => {
              if (d.id === bestDoctor.id) {
                return { ...d, queue: d.queue + 1 };
              }
              if (d.id === doctorId) {
                return { ...d, isActive: false, queue: 0, currentPatient: null, currentPatientName: null };
              }
              return d;
            }));
          });
          
          setOpdPatients(updatedPatients);
        }
      } else {
        setDoctors(doctors.map(d => 
          d.id === doctorId ? { ...d, isActive: !d.isActive, queue: 0, currentPatient: null, currentPatientName: null } : d
        ));
      }
    }
  };

  const handleAddDoctor = () => {
    if (!doctorForm.name || !doctorForm.department) {
      alert('Please enter doctor name and department');
      return;
    }

    const newDoctor = {
      id: `D-${Date.now().toString().slice(-6)}`,
      name: doctorForm.name,
      department: doctorForm.department,
      opdRoom: doctorForm.opdRoom || `Room ${Math.floor(Math.random() * 50) + 100}`,
      specialization: doctorForm.specialization || doctorForm.department,
      contact: doctorForm.contact || 'Not specified',
      isActive: doctorForm.isActive,
      currentPatient: null,
      currentPatientName: null,
      queue: 0,
      maxPatientsPerDay: 30,
      consultationFee: 400,
      workingHours: '9:00 AM - 5:00 PM',
      rating: 4.5,
      experience: '5 years'
    };

    setDoctors([...doctors, newDoctor]);
    setShowDoctorModal(false);
    setDoctorForm({
      name: '',
      department: '',
      opdRoom: '',
      specialization: '',
      contact: '',
      isActive: true
    });
    
    alert(`Dr. ${doctorForm.name} added successfully!`);
  };

  const handleAssignDoctor = (patient) => {
    setSelectedPatient(patient);
    setAssignForm({
      patientId: patient.id,
      doctorId: '',
      priority: patient.priority || 'Normal'
    });
    setShowAssignModal(true);
  };

  const handleConfirmAssignment = () => {
    if (!assignForm.doctorId) {
      alert('Please select a doctor');
      return;
    }

    const selectedDoctor = doctors.find(d => d.id === assignForm.doctorId);
    if (!selectedDoctor) {
      alert('Selected doctor not found');
      return;
    }

    if (!selectedDoctor.isActive) {
      alert('This doctor is currently inactive');
      return;
    }

    const doctorWaitingPatients = opdPatients.filter(
      p => p.assignedDoctorId === assignForm.doctorId && p.status === 'Waiting'
    );
    const queuePosition = doctorWaitingPatients.length;

    let finalQueuePosition = queuePosition;
    let updatedPatients = [...opdPatients];
    
    if (assignForm.priority === 'Urgent') {
      updatedPatients = opdPatients.map(p => {
        if (p.assignedDoctorId === assignForm.doctorId && p.status === 'Waiting') {
          return { ...p, queuePosition: p.queuePosition + 1 };
        }
        return p;
      });
      finalQueuePosition = 0;
    }

    updatedPatients = updatedPatients.map(patient => {
      if (patient.id === assignForm.patientId) {
        return {
          ...patient,
          assignedDoctorId: assignForm.doctorId,
          doctor: selectedDoctor.name,
          department: selectedDoctor.department,
          priority: assignForm.priority,
          status: 'Waiting',
          queuePosition: finalQueuePosition,
          waitingTime: `${(finalQueuePosition + 1) * 15} mins`
        };
      }
      return patient;
    });

    const updatedDoctors = doctors.map(doctor => {
      if (doctor.id === assignForm.doctorId) {
        return {
          ...doctor,
          queue: doctor.queue + 1
        };
      }
      return doctor;
    });

    setOpdPatients(updatedPatients);
    setDoctors(updatedDoctors);
    setShowAssignModal(false);
    alert(`Patient assigned to ${selectedDoctor.name}`);
  };

  const handleTransferPatient = (patient) => {
    const availableDoctors = doctors.filter(d => 
      d.isActive && d.id !== patient.assignedDoctorId
    );
    
    if (availableDoctors.length === 0) {
      alert('No other active doctors available for transfer');
      return;
    }

    const doctorIndex = prompt(
      `Select doctor to transfer to:\n\n${availableDoctors.map((d, i) => `${i + 1}. ${d.name} (${d.department}) - Queue: ${d.queue}`).join('\n')}\n\nEnter number:`
    );
    
    if (doctorIndex && parseInt(doctorIndex) <= availableDoctors.length) {
      const newDoctor = availableDoctors[parseInt(doctorIndex) - 1];
      const confirmTransfer = window.confirm(
        `Transfer ${patient.patientName} from ${patient.doctor} to ${newDoctor.name}?`
      );
      
      if (confirmTransfer) {
        const newQueueCount = opdPatients.filter(
          p => p.assignedDoctorId === newDoctor.id && p.status === 'Waiting'
        ).length;

        const oldDoctor = doctors.find(d => d.id === patient.assignedDoctorId);
        const updatedDoctors = doctors.map(doctor => {
          if (doctor.id === oldDoctor.id) {
            return { ...doctor, queue: Math.max(0, doctor.queue - 1) };
          }
          if (doctor.id === newDoctor.id) {
            return { ...doctor, queue: doctor.queue + 1 };
          }
          return doctor;
        });

        const updatedPatients = opdPatients.map(p => {
          if (p.id === patient.id) {
            return {
              ...p,
              assignedDoctorId: newDoctor.id,
              doctor: newDoctor.name,
              department: newDoctor.department,
              queuePosition: newQueueCount,
              waitingTime: `${(newQueueCount + 1) * 15} mins`
            };
          }
          if (p.assignedDoctorId === oldDoctor.id && p.status === 'Waiting' && p.queuePosition > patient.queuePosition) {
            return { ...p, queuePosition: p.queuePosition - 1 };
          }
          return p;
        });

        setDoctors(updatedDoctors);
        setOpdPatients(updatedPatients);
        alert(`Patient transferred to ${newDoctor.name}`);
      }
    }
  };

  const handleCancelPatient = (patient) => {
    if (window.confirm(`Cancel token ${patient.token} for ${patient.patientName}?`)) {
      if (patient.assignedDoctorId) {
        const updatedDoctors = doctors.map(doctor => {
          if (doctor.id === patient.assignedDoctorId) {
            const newQueue = patient.status === 'In Consultation' ? doctor.queue : Math.max(0, doctor.queue - 1);
            const currentPatient = patient.status === 'In Consultation' ? null : doctor.currentPatient;
            const currentPatientName = patient.status === 'In Consultation' ? null : doctor.currentPatientName;
            
            return { 
              ...doctor, 
              queue: newQueue,
              currentPatient,
              currentPatientName
            };
          }
          return doctor;
        });
        
        const updatedPatients = opdPatients
          .filter(p => p.id !== patient.id)
          .map(p => {
            if (p.assignedDoctorId === patient.assignedDoctorId && 
                p.status === 'Waiting' && 
                p.queuePosition > patient.queuePosition) {
              return { ...p, queuePosition: p.queuePosition - 1 };
            }
            return p;
          });
        
        setDoctors(updatedDoctors);
        setOpdPatients(updatedPatients);
      } else {
        setOpdPatients(opdPatients.filter(p => p.id !== patient.id));
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-50 text-green-700 border border-green-200';
      case 'In Consultation': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Waiting': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'Urgent' 
      ? 'bg-red-50 text-red-700 border border-red-200' 
      : 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  const calculateAverageWaitingTime = () => {
    const waitingPatients = opdPatients.filter(p => p.status === 'Waiting');
    if (waitingPatients.length === 0) return '0 mins';
    
    const totalMinutes = waitingPatients.reduce((sum, patient) => {
      const mins = parseInt(patient.waitingTime) || 0;
      return sum + mins;
    }, 0);
    
    return `${Math.round(totalMinutes / waitingPatients.length)} mins`;
  };

  const activeDoctors = doctors.filter(d => d.isActive);
  const inactiveDoctors = doctors.filter(d => !d.isActive);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">OPD Management</h2>
          <p className="text-gray-600 text-sm mt-1">Manage outpatient department operations</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">

          <button 
            onClick={() => setShowDoctorModal(true)}
            className="btn btn-outline flex items-center"
          >
            <i className="fas fa-user-md mr-2"></i> Manage Doctors
          </button>
          <button 
            onClick={() => setShowQueueModal(true)}
            className="btn btn-outline flex items-center"
          >
            <i className="fas fa-list-ol mr-2"></i> View Queue
          </button>
          <button 
            onClick={generateToken}
            className="btn btn-primary flex items-center"
          >
            <i className="fas fa-ticket-alt mr-2"></i> Generate Token
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  {/* TOTAL PATIENTS */}
  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
          Total Patients
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {opdPatients.length}
        </p>
      </div>

      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
        <i className="fas fa-user-injured text-white text-lg"></i>
      </div>
    </div>

    <div className="h-px w-full bg-blue-200 my-3"></div>

    <p className="text-xs text-blue-600">
      {opdPatients.filter(p => p.status === 'Waiting').length} waiting
    </p>
  </div>

  {/* ACTIVE DOCTORS */}
  <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">
          Active Doctors
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {activeDoctors.length}
        </p>
      </div>

      <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
        <i className="fas fa-user-md text-white text-lg"></i>
      </div>
    </div>

    <div className="h-px w-full bg-green-200 my-3"></div>

    <p className="text-xs text-green-600">
      {doctors.length} total doctors
    </p>
  </div>

  {/* AVG WAITING TIME */}
  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">
          Avg Waiting Time
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {calculateAverageWaitingTime()}
        </p>
      </div>

      <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center">
        <i className="fas fa-clock text-white text-lg"></i>
      </div>
    </div>

    <div className="h-px w-full bg-yellow-200 my-3"></div>

    <p className="text-xs text-yellow-600">
      Based on current queue
    </p>
  </div>

  {/* URGENT CASES */}
  <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">
          Urgent Cases
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {opdPatients.filter(p => p.priority === 'Urgent').length}
        </p>
      </div>

      <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
        <i className="fas fa-exclamation-triangle text-white text-lg"></i>
      </div>
    </div>

    <div className="h-px w-full bg-red-200 my-3"></div>

    <p className="text-xs text-red-600">
      Requires immediate attention
    </p>
  </div>

</div>


      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-3 font-medium text-sm ${activeTab === 'patients' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('patients')}
        >
          <i className="fas fa-user-injured mr-2"></i> Patients ({opdPatients.length})
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm ${activeTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('doctors')}
        >
          <i className="fas fa-user-md mr-2"></i> Doctors ({doctors.length})
        </button>
      </div>

      {/* Patients Tab */}
     {/* Patients Tab */}
{activeTab === 'patients' && (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    
    {/* Header */}
    <div className="p-5 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Patient Queue
        </h3>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <i className="fas fa-search absolute left-3 top-2.5 text-gray-400 text-sm"></i>
        </div>
      </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        
        {/* Table Head */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">
              Patient
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">
              Doctor
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">
              Queue
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {opdPatients.map(patient => (
            <tr key={patient.id} className="hover:bg-gray-50">

              {/* Patient */}
              <td className="px-4 py-4 align-middle">
                <div>
                  <p className="font-medium text-gray-900">
                    {patient.patientName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {patient.token} • {patient.age}y, {patient.gender}
                  </p>
                </div>
              </td>

              {/* Doctor */}
              <td className="px-4 py-4 align-middle">
                <div>
                  <p className="font-medium text-gray-900">
                    {patient.doctor}
                  </p>
                  <p className="text-xs text-gray-500">
                    {patient.department}
                  </p>
                </div>
              </td>

              {/* Queue */}
              <td className="px-4 py-4 align-middle">
                <div className="flex items-center min-h-[32px]">
                  {patient.status === 'Waiting' && patient.assignedDoctorId && (
                    <>
                      <span className="w-7 h-7 mr-2 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center text-xs font-semibold">
                        {patient.queuePosition + 1}
                      </span>
                      <span className="text-sm text-gray-700">
                        {patient.waitingTime}
                      </span>
                    </>
                  )}

                  {patient.status === 'In Consultation' && (
                    <span className="text-sm font-medium text-blue-600">
                      Consulting Now
                    </span>
                  )}

                  {patient.status === 'Completed' && (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </div>
              </td>

              {/* Status */}
              <td className="px-4 py-4 align-middle">
                <div className="flex flex-col gap-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(
                      patient.status
                    )}`}
                  >
                    {patient.status}
                  </span>

                  {patient.priority === 'Urgent' && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 w-fit">
                      Urgent
                    </span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className="px-4 py-4 align-middle">
                <div className="flex items-center gap-2">

                  {patient.status === 'Waiting' && !patient.assignedDoctorId && (
                    <button
                      onClick={() => handleAssignDoctor(patient)}
                      title="Assign Doctor"
                      className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <i className="fas fa-user-plus"></i>
                    </button>
                  )}

                  {patient.status === 'Waiting' && patient.assignedDoctorId && (
                    <>
                      <button
                        onClick={() => handleStartConsultation(patient)}
                        title="Start Consultation"
                        className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded"
                      >
                        <i className="fas fa-play"></i>
                      </button>

                      <button
                        onClick={() => handleTransferPatient(patient)}
                        title="Transfer"
                        className="w-8 h-8 flex items-center justify-center text-yellow-600 hover:bg-yellow-50 rounded"
                      >
                        <i className="fas fa-exchange-alt"></i>
                      </button>
                    </>
                  )}

                  {patient.status === 'In Consultation' && (
                    <button
                      onClick={() => handleStartConsultation(patient)}
                      title="View Consultation"
                      className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  )}

                  <button
                    onClick={() => handleCancelPatient(patient)}
                    title="Cancel"
                    className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


      {/* Doctors Tab */}
      {activeTab === 'doctors' && (
        <div className="space-y-6">
          {/* Active Doctors */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Active Doctors</h3>
                <p className="text-gray-600 text-sm mt-1">Doctors currently available for consultations</p>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                {activeDoctors.length} Active
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeDoctors.map(doctor => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-user-md text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${doctor.queue > 5 ? 'bg-red-50 text-red-700' : doctor.queue > 0 ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}>
                      {doctor.queue} in queue
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">OPD Room:</span>
                      <span className="font-medium">{doctor.opdRoom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Patient:</span>
                      <span className="font-medium text-blue-600">{doctor.currentPatientName || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Working Hours:</span>
                      <span className="font-medium">{doctor.workingHours}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button 
                      className="flex-1 btn btn-outline btn-sm"
                      onClick={() => {
                        const doctorPatients = opdPatients.filter(p => p.assignedDoctorId === doctor.id);
                        if (doctorPatients.length > 0) {
                          setShowQueueModal(true);
                        }
                      }}
                    >
                      View Queue
                    </button>
                    <button 
                      className="btn btn-error btn-sm"
                      onClick={() => handleDoctorStatusToggle(doctor.id)}
                      title="Deactivate Doctor"
                    >
                      <i className="fas fa-power-off"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inactive Doctors */}
          {inactiveDoctors.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Inactive Doctors</h3>
                  <p className="text-gray-600 text-sm mt-1">Doctors currently not available for consultations</p>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {inactiveDoctors.length} Inactive
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inactiveDoctors.map(doctor => (
                  <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-user-md text-gray-500"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">{doctor.name}</p>
                          <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                        Inactive
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Department:</span>
                        <span className="font-medium text-gray-700">{doctor.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">OPD Room:</span>
                        <span className="font-medium text-gray-700">{doctor.opdRoom}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full btn btn-success btn-sm"
                      onClick={() => handleDoctorStatusToggle(doctor.id)}
                    >
                      <i className="fas fa-check mr-1"></i> Activate Doctor
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manage Doctors Modal */}
      <Modal
        isOpen={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
        title="Manage Doctors"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-800 mb-4">Add New Doctor</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Doctor Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter doctor name"
                  value={doctorForm.name}
                  onChange={(e) => setDoctorForm({...doctorForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Department *</label>
                <select
                  className="form-input"
                  value={doctorForm.department}
                  onChange={(e) => setDoctorForm({...doctorForm, department: e.target.value})}
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>
              <div>
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Cardiologist"
                  value={doctorForm.specialization}
                  onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">OPD Room</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Room 101"
                  value={doctorForm.opdRoom}
                  onChange={(e) => setDoctorForm({...doctorForm, opdRoom: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Contact Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 9876543210"
                  value={doctorForm.contact}
                  onChange={(e) => setDoctorForm({...doctorForm, contact: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="form-label">Status</label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 mr-2"
                        checked={doctorForm.isActive}
                        onChange={(e) => setDoctorForm({...doctorForm, isActive: e.target.checked})}
                      />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleAddDoctor}
                  className="btn btn-primary"
                >
                  <i className="fas fa-plus mr-2"></i> Add Doctor
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Current Doctors ({doctors.length})</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Doctor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Queue</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {doctors.map(doctor => (
                    <tr key={doctor.id}>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {doctor.department}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${doctor.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {doctor.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded text-xs font-medium ${doctor.queue > 0 ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-50 text-gray-700'}`}>
                          {doctor.queue} patients
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDoctorStatusToggle(doctor.id)}
                          className={`btn btn-sm ${doctor.isActive ? 'btn-error' : 'btn-success'}`}
                        >
                          {doctor.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>

      {/* Assign Doctor Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title={`Assign Doctor to ${selectedPatient?.patientName || 'Patient'}`}
        size="md"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Patient</p>
                  <p className="font-medium text-gray-900">{selectedPatient.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Token No</p>
                  <p className="font-medium text-gray-900">{selectedPatient.token}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <p className={`font-medium ${selectedPatient.priority === 'Urgent' ? 'text-red-600' : 'text-gray-900'}`}>
                    {selectedPatient.priority}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Arrival Time</p>
                  <p className="font-medium text-gray-900">{selectedPatient.arrivalTime}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Select Doctor *</label>
              <select
                className="form-input"
                value={assignForm.doctorId}
                onChange={(e) => setAssignForm({...assignForm, doctorId: e.target.value})}
              >
                <option value="">Select a doctor</option>
                {activeDoctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.department} (Queue: {doctor.queue}, Room: {doctor.opdRoom})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Priority</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="Normal"
                    checked={assignForm.priority === 'Normal'}
                    onChange={(e) => setAssignForm({...assignForm, priority: e.target.value})}
                    className="mr-2"
                  />
                  <span>Normal (Will be placed at end of queue)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="Urgent"
                    checked={assignForm.priority === 'Urgent'}
                    onChange={(e) => setAssignForm({...assignForm, priority: e.target.value})}
                    className="mr-2"
                  />
                  <span className="text-red-600">Urgent (Will be placed at front of queue)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowAssignModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssignment}
                className="btn btn-primary"
                disabled={!assignForm.doctorId}
              >
                <i className="fas fa-user-plus mr-2"></i> Assign Doctor
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Consultation Modal */}
      <Modal
        isOpen={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
        title={`Consultation - ${selectedPatient?.patientName || 'Patient'}`}
        size="xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Patient</p>
                  <p className="font-medium text-gray-900">{selectedPatient.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Token No</p>
                  <p className="font-medium text-gray-900">{selectedPatient.token}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-medium text-gray-900">{selectedPatient.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">{selectedPatient.department}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Vital Signs</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Blood Pressure</label>
                  <input
                    type="text"
                    placeholder="120/80"
                    className="form-input"
                    value={consultationForm.vitalSigns.bp}
                    onChange={(e) => setConsultationForm({
                      ...consultationForm,
                      vitalSigns: {...consultationForm.vitalSigns, bp: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="form-label">Pulse (BPM)</label>
                  <input
                    type="number"
                    placeholder="72"
                    className="form-input"
                    value={consultationForm.vitalSigns.pulse}
                    onChange={(e) => setConsultationForm({
                      ...consultationForm,
                      vitalSigns: {...consultationForm.vitalSigns, pulse: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="form-label">Temperature (°F)</label>
                  <input
                    type="number"
                    placeholder="98.6"
                    step="0.1"
                    className="form-input"
                    value={consultationForm.vitalSigns.temperature}
                    onChange={(e) => setConsultationForm({
                      ...consultationForm,
                      vitalSigns: {...consultationForm.vitalSigns, temperature: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="form-label">SpO2 (%)</label>
                  <input
                    type="number"
                    placeholder="98"
                    className="form-input"
                    value={consultationForm.vitalSigns.spo2}
                    onChange={(e) => setConsultationForm({
                      ...consultationForm,
                      vitalSigns: {...consultationForm.vitalSigns, spo2: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="65"
                    className="form-input"
                    value={consultationForm.vitalSigns.weight}
                    onChange={(e) => setConsultationForm({
                      ...consultationForm,
                      vitalSigns: {...consultationForm.vitalSigns, weight: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="form-label">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="170"
                    className="form-input"
                    value={consultationForm.vitalSigns.height}
                    onChange={(e) => setConsultationForm({
                      ...consultationForm,
                      vitalSigns: {...consultationForm.vitalSigns, height: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Symptoms *</label>
                <textarea
                  className="form-input"
                  rows="4"
                  placeholder="Describe symptoms..."
                  value={consultationForm.symptoms}
                  onChange={(e) => setConsultationForm({
                    ...consultationForm, symptoms: e.target.value
                  })}
                  required
                />
              </div>
              <div>
                <label className="form-label">Diagnosis *</label>
                <textarea
                  className="form-input"
                  rows="4"
                  placeholder="Enter diagnosis..."
                  value={consultationForm.diagnosis}
                  onChange={(e) => setConsultationForm({
                    ...consultationForm, diagnosis: e.target.value
                  })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Prescription *</label>
              <textarea
                className="form-input"
                rows="4"
                placeholder="Medications, dosage, frequency..."
                value={consultationForm.prescription}
                onChange={(e) => setConsultationForm({
                  ...consultationForm, prescription: e.target.value
                })}
                required
              />
            </div>

            <div>
              <label className="form-label">Tests Recommended</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Blood Test', 'X-Ray', 'ECG', 'MRI', 'Ultrasound', 'CT Scan', 'Urine Test', 'Other'].map(test => (
                  <label key={test} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 mr-2"
                      checked={consultationForm.testsRecommended.includes(test)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setConsultationForm({
                            ...consultationForm,
                            testsRecommended: [...consultationForm.testsRecommended, test]
                          });
                        } else {
                          setConsultationForm({
                            ...consultationForm,
                            testsRecommended: consultationForm.testsRecommended.filter(t => t !== test)
                          });
                        }
                      }}
                    />
                    <span>{test}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Next Visit Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={consultationForm.nextVisitDate}
                  onChange={(e) => setConsultationForm({
                    ...consultationForm, nextVisitDate: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="form-label">Remarks</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Any additional remarks..."
                  value={consultationForm.remarks}
                  onChange={(e) => setConsultationForm({
                    ...consultationForm, remarks: e.target.value
                  })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowConsultationForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteConsultation}
                className="btn btn-success"
              >
                <i className="fas fa-check-circle mr-2"></i> Complete Consultation
              </button>
              <button
                onClick={() => alert('Prescription printed')}
                className="btn btn-primary"
              >
                <i className="fas fa-print mr-2"></i> Print Prescription
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Queue Modal */}
      <Modal
        isOpen={showQueueModal}
        onClose={() => setShowQueueModal(false)}
        title="OPD Queue Status"
        size="lg"
      >
        <div className="space-y-4">
          {doctors
            .filter(doctor => doctor.isActive)
            .map(doctor => {
              const doctorPatients = opdPatients.filter(p => p.assignedDoctorId === doctor.id);
              const waitingPatients = doctorPatients.filter(p => p.status === 'Waiting');
              const inConsultationPatient = doctorPatients.find(p => p.status === 'In Consultation');
              
              return (
                <div key={doctor.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                      <p className="text-sm text-gray-600">{doctor.department} • {doctor.opdRoom}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm ${doctor.queue > 5 ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                      {doctor.queue} in queue
                    </span>
                  </div>
                  
                  {inConsultationPatient && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-blue-800">Currently Consulting</p>
                          <p className="font-medium">{inConsultationPatient.patientName}</p>
                          <p className="text-sm text-gray-600">Token: {inConsultationPatient.token}</p>
                        </div>
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => handleStartConsultation(inConsultationPatient)}
                        >
                          <i className="fas fa-eye mr-1"></i> View
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <p className="font-medium mb-2">Waiting Queue ({waitingPatients.length}):</p>
                    <div className="space-y-2">
                      {waitingPatients
                        .sort((a, b) => a.queuePosition - b.queuePosition)
                        .map(patient => (
                          <div key={patient.id} className="flex items-center justify-between bg-gray-50 p-3 rounded border">
                            <div className="flex items-center">
                              <span className="w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center mr-3 font-medium">
                                #{patient.queuePosition + 1}
                              </span>
                              <div>
                                <p className="font-medium">{patient.patientName}</p>
                                <p className="text-sm text-gray-600">Token: {patient.token} • Wait: {patient.waitingTime}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                className="btn btn-success btn-sm"
                                onClick={() => handleStartConsultation(patient)}
                              >
                                <i className="fas fa-play mr-1"></i> Start
                              </button>
                              <button 
                                className="btn btn-warning btn-sm"
                                onClick={() => handleTransferPatient(patient)}
                              >
                                <i className="fas fa-exchange-alt"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    
                    {waitingPatients.length === 0 && (
                      <p className="text-gray-500 text-center py-3 bg-gray-50 rounded">No patients waiting</p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </Modal>
    </div>
  );
};

export default OPDManagement;