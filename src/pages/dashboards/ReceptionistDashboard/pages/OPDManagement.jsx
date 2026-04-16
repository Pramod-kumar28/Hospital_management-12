
import React, { useState, useEffect, useRef } from 'react';
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import DataTable from '../../../../components/ui/Tables/DataTable';
import Modal from '../../../../components/common/Modal/Modal';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon, Search as SearchIcon, Print as PrintIcon, 
  CheckCircle as CheckCircleIcon, ConfirmationNumber as ConfirmationNumberIcon,
   MedicalServices as MedicalServicesIcon, Queue as QueueIcon, Person as PersonIcon,
  AccessTime as AccessTimeIcon, Warning as WarningIcon, PersonAdd as PersonAddIcon,
  PlayArrow as PlayArrowIcon, SwapHoriz as SwapHorizIcon, Visibility as VisibilityIcon,
  Close as CloseIcon, PowerSettingsNew as PowerSettingsNewIcon, Check as CheckIcon,
  Add as AddIcon, Description as DescriptionIcon, KeyboardArrowUp as KeyboardArrowUpIcon,
  Groups as GroupsIcon, PendingActions as PendingActionsIcon, TaskAlt as TaskAltIcon
} from '@mui/icons-material';


const OPDManagement = () => {
  const [loading, setLoading] = useState(true);
  const [opdPatients, setOpdPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenStep, setTokenStep] = useState('form'); // 'form' or 'slip'
  const [generatedToken, setGeneratedToken] = useState(null);

  const [activeTab, setActiveTab] = useState('patients');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // View Patient Details State
  const [showViewPatientModal, setShowViewPatientModal] = useState(false);
  const [selectedPatientForView, setSelectedPatientForView] = useState(null);

  // Transfer Patient Modal State
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferPatient, setTransferPatient] = useState(null);
  const [selectedTransferDoctor, setSelectedTransferDoctor] = useState(null);

  // Deactivate Doctor Modal State
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [doctorToDeactivate, setDoctorToDeactivate] = useState(null);
  const [patientsToReassign, setPatientsToReassign] = useState([]);

  // Token Form State
  const [tokenForm, setTokenForm] = useState({
    patientName: '',
    phoneNo: '',
    age: '',
    gender: 'Male',
    department: '',
    doctorId: '',
    type: 'Regular',
    bloodGroup: '',
  });

  // Searchable Dropdown State for Token Creation
  const [deptSearchTerm, setDeptSearchTerm] = useState('');
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const deptDropdownRef = useRef(null);

  const [docSearchTerm, setDocSearchTerm] = useState('');
  const [isDocDropdownOpen, setIsDocDropdownOpen] = useState(false);
  const docDropdownRef = useRef(null);
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

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(event.target)) {
        setIsDeptDropdownOpen(false);
      }
      if (docDropdownRef.current && !docDropdownRef.current.contains(event.target)) {
        setIsDocDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const DEPARTMENTS = [...new Set(doctors.map(d => d.department))];

  const handleSelectDept = (dept) => {
    setTokenForm({
      ...tokenForm,
      department: dept,
      doctorId: ''
    });
    setDeptSearchTerm(dept);
    setDocSearchTerm('');
    setIsDeptDropdownOpen(false);
  };

  const handleSelectDoc = (doc) => {
    setTokenForm({
      ...tokenForm,
      doctorId: doc.id
    });
    setDocSearchTerm(doc.name);
    setIsDocDropdownOpen(false);
  };

  const filteredDepartments = DEPARTMENTS.filter(dept =>
    dept.toLowerCase().includes(deptSearchTerm.toLowerCase())
  );

  const filteredDoctorsForToken = doctors.filter(d =>
    d.isActive &&
    d.department === tokenForm.department &&
    d.name.toLowerCase().includes(docSearchTerm.toLowerCase())
  );

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
          bloodGroup: 'B+',
          type: 'Regular',
          phoneNo: '+91 98765 43210'
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
          bloodGroup: 'A+',
          type: 'Follow-up',
          phoneNo: '+91 87654 32109'
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
          bloodGroup: 'O+',
          type: 'Emergency',
          phoneNo: '+91 76543 21098'
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
          bloodGroup: 'AB+',
          type: 'New Patient',
          phoneNo: '+91 65432 10987'
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
    setTokenStep('form');
    setTokenForm({
      patientName: '',
      phoneNo: '',
      age: '',
      gender: 'Male',
      department: '',
      doctorId: '',
      type: 'Regular',
      priority: 'Normal',
      bloodGroup: ''
    });
    setDeptSearchTerm('');
    setDocSearchTerm('');
    setShowTokenModal(true);
  };

  const handleTokenSubmit = (e) => {
    e.preventDefault();

    if (!tokenForm.patientName || !tokenForm.department || !tokenForm.doctorId) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedDoctor = doctors.find(d => d.id === tokenForm.doctorId);
    const tokenNumber = Math.floor(Math.random() * 1000);
    const currentTime = new Date();
    const arrivalTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Calculate queue position for the selected doctor
    const doctorWaitingPatients = opdPatients.filter(
      p => p.assignedDoctorId === tokenForm.doctorId && p.status === 'Waiting'
    );
    let queuePosition = doctorWaitingPatients.length;

    const newToken = {
      id: `OPD-${Date.now()}`,
      patientId: `PAT-${Date.now().toString().slice(-6)}`,
      patientName: tokenForm.patientName,
      phoneNo: tokenForm.phoneNo || 'Not specified',
      age: tokenForm.age || 'Not specified',
      gender: tokenForm.gender,
      token: `T-${tokenNumber}`,
      waitingTime: `${(queuePosition + 1) * 15} mins`,
      status: 'Waiting',
      assignedDoctorId: tokenForm.doctorId,
      doctor: selectedDoctor.name,
      department: tokenForm.department,
      type: tokenForm.type,
      priority: tokenForm.priority,
      queuePosition: queuePosition,
      arrivalTime: arrivalTime,
      bloodGroup: tokenForm.bloodGroup || 'Not specified'
    };

    setOpdPatients([newToken, ...opdPatients]);

    // Update doctor's queue count
    const updatedDoctors = doctors.map(d => {
      if (d.id === tokenForm.doctorId) {
        return { ...d, queue: d.queue + 1 };
      }
      return d;
    });
    setDoctors(updatedDoctors);

    setGeneratedToken(newToken);
    setTokenStep('slip');
  };

  const handlePrintSlip = () => {
    const printWindow = window.open('', '', 'width=800,height=800');

    // Centered Invoice Style
    const invoiceHTML = `
      <html>
        <head>
          <title>Print Token - ${generatedToken?.token}</title>
          <style>
            @page {
              margin: 0;
            }
            body {
              font-family: 'Courier New', Courier, monospace;
              padding: 40px;
              display: flex;
              justify-content: center;
              background: #f3f4f6 !important;
              color: black;
              margin: 0;
            }
            .invoice-wrapper {
              width: 40%;
              max-width: 500px;
              background: white;
              padding: 40px;
              border: 1px solid #ccc;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 25px;
              border-bottom: 2px dashed black;
              padding-bottom: 40px;
            }
            .header h2 {
              margin: 0 0 10px 0;
              font-size: 26px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .header p {
              margin: 0;
              font-size: 14px;
            }
            .token-container {
              text-align: center;
              margin: 30px 0;
            }
            .token-label {
              font-size: 16px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .token-number {
              font-size: 56px;
              font-weight: bold;
              margin: 10px 0;
              line-height: 1;
            }
            .divider {
              border-top: 2px dashed black;
              margin: 20px 0;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              font-size: 16px;
            }
            .info-label {
              font-weight: normal;
            }
            .info-value {
              font-weight: bold;
              text-align: right;
              max-width: 65%;
              word-wrap: break-word;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
              border-top: 2px dashed black;
              padding-top: 20px;
            }
            @media print {
              body { 
                background: white !important; 
                padding: 0;
                align-items: flex-start;
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact; 
              }
              .invoice-wrapper {
                box-shadow: none;
                border: 2px solid black;
                margin: 20px auto;
                max-width: 90%;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-wrapper">
            <div class="header">
              <h2>HOSPITAL OPD</h2>
              <p>Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <div class="token-container">
              <div class="token-label">Token Number</div>
              <div class="token-number">${generatedToken?.token || '-'}</div>
            </div>
            
            <div class="divider"></div>
            
            <div class="info-row">
              <span class="info-label">Patient:</span>
              <span class="info-value">${generatedToken?.patientName || '-'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Age/Sex:</span>
              <span class="info-value">${generatedToken?.age || '-'}Y / ${generatedToken?.gender || '-'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone:</span>
              <span class="info-value">${generatedToken?.phoneNo || '-'}</span>
            </div>
            
            <div class="divider"></div>
            
            <div class="info-row">
              <span class="info-label">Department:</span>
              <span class="info-value">${generatedToken?.department || '-'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Doctor:</span>
              <span class="info-value">${generatedToken?.doctor || '-'}</span>
            </div>

            <div class="divider"></div>
            
            <div class="info-row">
              <span class="info-label">Type:</span>
              <span class="info-value">${generatedToken?.type || '-'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Priority:</span>
              <span class="info-value">${generatedToken?.priority || 'Normal'}</span>
            </div>
            
            <div class="footer">
              <p>Please wait for your turn.</p>
              <p>Thank you!</p>
            </div>
          </div>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  };

  const handlePrintPrescription = () => {
    if (!selectedPatient) return;

    const printWindow = window.open('', '', 'width=900,height=1000');

    const prescriptionHTML = `
    <html>
      <head>
        <title>Prescription - ${selectedPatient.patientName}</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }

          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #000;
          }

          .container {
            width: 100%;
            max-width: 800px;
            margin: auto;
          }

          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            margin-bottom: 20px;
            padding-bottom: 10px;
          }

          .header h2 {
            margin: 0;
            font-size: 24px;
          }

          .header p {
            margin: 5px 0;
            font-size: 14px;
          }

          .section {
            margin-bottom: 20px;
          }

          .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
          }

          .label {
            font-weight: bold;
          }

          .box {
            border: 1px solid #000;
            padding: 10px;
            min-height: 60px;
          }

          .footer {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
          }

          .signature {
            text-align: right;
          }

          .signature-line {
            margin-top: 40px;
            border-top: 1px solid #000;
            width: 200px;
          }

          @media print {
            body {
              margin: 0;
            }
          }
        </style>
      </head>

      <body>
        <div class="container">

          <!-- Header -->
          <div class="header">
            <h2>HOSPITAL NAME</h2>
            <p>OPD Prescription</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>

          <!-- Patient Info -->
          <div class="section">
            <div class="row">
              <span><span class="label">Patient:</span> ${selectedPatient.patientName}</span>
              <span><span class="label">Age:</span> ${selectedPatient.age}</span>
            </div>
            <div class="row">
              <span><span class="label">Gender:</span> ${selectedPatient.gender}</span>
              <span><span class="label">Token:</span> ${selectedPatient.token}</span>
            </div>
            <div class="row">
              <span><span class="label">Doctor:</span> ${selectedPatient.doctor}</span>
              <span><span class="label">Department:</span> ${selectedPatient.department}</span>
            </div>
          </div>

          <!-- Symptoms -->
          <div class="section">
            <p class="label">Symptoms</p>
            <div class="box">${consultationForm.symptoms || '-'}</div>
          </div>

          <!-- Diagnosis -->
          <div class="section">
            <p class="label">Diagnosis</p>
            <div class="box">${consultationForm.diagnosis || '-'}</div>
          </div>

          <!-- Prescription -->
          <div class="section">
            <p class="label">Prescription</p>
            <div class="box">${consultationForm.prescription || '-'}</div>
          </div>

          <!-- Tests -->
          <div class="section">
            <p class="label">Tests Recommended</p>
            <div class="box">
              ${consultationForm.testsRecommended?.join(', ') || 'None'}
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div>
              <p><strong>Next Visit:</strong> ${consultationForm.nextVisitDate || '-'}</p>
            </div>
            <div class="signature">
              <div class="signature-line"></div>
              <p>Doctor Signature</p>
            </div>
          </div>

        </div>

        <script>
          setTimeout(() => {
            window.print();
            window.close();
          }, 500);
        </script>

      </body>
    </html>
    `;

    printWindow.document.write(prescriptionHTML);
    printWindow.document.close();
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
        setDoctorToDeactivate(doctor);
        setPatientsToReassign(doctorPatients);
        setShowDeactivateModal(true);
      } else {
        setDoctors(doctors.map(d =>
          d.id === doctorId ? { ...d, isActive: !d.isActive, queue: 0, currentPatient: null, currentPatientName: null } : d
        ));
      }
    }
  };

  const handleConfirmDeactivation = () => {
    if (!doctorToDeactivate) return;

    const doctorId = doctorToDeactivate.id;
    const activeDoctors = doctors.filter(d => d.isActive && d.id !== doctorId);

    if (activeDoctors.length === 0) {
      alert('No other active doctors available. Cannot deactivate.');
      return;
    }

    let updatedPatients = [...opdPatients];
    let currentDoctors = [...doctors];

    patientsToReassign.forEach(patient => {
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

      // Update the queue count for the best doctor in our local copy
      const bestDocIndex = activeDoctors.findIndex(d => d.id === bestDoctor.id);
      if (bestDocIndex !== -1) {
        activeDoctors[bestDocIndex].queue += 1;
      }
    });

    // Update doctors state
    const finalDoctors = currentDoctors.map(d => {
      const matchingActiveDoc = activeDoctors.find(ad => ad.id === d.id);
      if (matchingActiveDoc) {
        return { ...d, queue: matchingActiveDoc.queue };
      }
      if (d.id === doctorId) {
        return { ...d, isActive: false, queue: 0, currentPatient: null, currentPatientName: null };
      }
      return d;
    });

    setOpdPatients(updatedPatients);
    setDoctors(finalDoctors);
    setShowDeactivateModal(false);
    setDoctorToDeactivate(null);
    setPatientsToReassign([]);
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

    setTransferPatient(patient);
    setSelectedTransferDoctor(null);
    setShowTransferModal(true);
  };

  const handleConfirmTransfer = () => {
    if (!selectedTransferDoctor || !transferPatient) return;

    const newDoctor = selectedTransferDoctor;
    const patient = transferPatient;

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
    setShowTransferModal(false);
    setTransferPatient(null);
    setSelectedTransferDoctor(null);
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
    switch (status) {
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
            className="px-4 py-2 border border-blue-600 text-blue-700 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center shadow-sm text-sm font-medium"
          >
            <MedicalServicesIcon className="mr-2" /> Manage Doctors
          </button>
          <button
            onClick={() => setShowQueueModal(true)}
            className="px-4 py-2 border border-green-600 text-green-700 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center shadow-sm text-sm font-medium"
          >
            <QueueIcon className="mr-2" /> View Queue
          </button>
          <button
            onClick={generateToken}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center text-sm font-medium"
          >
            <ConfirmationNumberIcon className="mr-2" /> Generate Token
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

        {/* TOTAL PATIENTS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 border-t-[3px] border-t-blue-500 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex flex-col">
            <p className="text-3xl font-bold text-blue-600 mb-1">
              {opdPatients.length}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              Total Patients
            </p>
            <p className="text-xs text-blue-500 mt-1">
              Active: {opdPatients.filter(p => p.status === 'Waiting').length} waiting
            </p>
          </div>
        </div>

        {/* ACTIVE DOCTORS */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 border-t-[3px] border-t-green-500 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex flex-col">
            <p className="text-3xl font-bold text-green-600 mb-1">
              {activeDoctors.length}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              Active Doctors
            </p>
            <p className="text-xs text-green-500 mt-1">
              {doctors.length} total doctors
            </p>
          </div>
        </div>

        {/* IN CONSULTATION */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 border-t-[3px] border-t-yellow-500 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/40 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex flex-col">
            <p className="text-3xl font-bold text-yellow-500 mb-1">
              {opdPatients.filter(p => p.status === 'In Consultation').length}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              In Consultation
            </p>
            <p className="text-xs text-yellow-600 mt-1">
              Patients currently with doctors
            </p>
          </div>
        </div>

        {/* COMPLETED TODAY */}
        <div className="relative bg-white rounded-xl p-5 border border-gray-200 border-t-[3px] border-t-purple-500 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex flex-col">
            <p className="text-3xl font-bold text-purple-600 mb-1">
              {opdPatients.filter(p => p.status === 'Completed').length}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              Completed Today
            </p>
            <p className="text-xs text-purple-500 mt-1">
              Throughput for today
            </p>
          </div>
        </div>

      </div>


      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-3 font-medium text-sm ${activeTab === 'patients' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('patients')}
        >
          <PersonIcon className="mr-2" fontSize="small" /> Patients ({opdPatients.length})
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm ${activeTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('doctors')}
        >
          <MedicalServicesIcon className="mr-2" fontSize="small" /> Doctors ({doctors.length})
        </button>
      </div>

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
                <SearchIcon className="absolute left-3 top-2.5 text-gray-400 text-sm" fontSize="small" />
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

                        {patient.status === 'Waiting' && !patient.assignedDoctorId && (
                          <span className="text-sm font-medium text-orange-500">
                            Not Assigned
                          </span>
                        )}

                        {patient.status === 'In Consultation' && (
                          <span className="text-sm font-medium text-blue-600">
                            Consulting Now
                          </span>
                        )}

                        {patient.status === 'Completed' && (
                          <span className="flex items-center gap-1.5">
                            <CheckCircleIcon style={{ fontSize: 18 }} className="text-green-500" />
                            <span className="text-sm font-medium text-green-600">Completed</span>
                          </span>
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

                        <button
                          onClick={() => {
                            setSelectedPatientForView(patient);
                            setShowViewPatientModal(true);
                          }}
                          title="View Patient Details"
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                        >
                          <VisibilityIcon fontSize="small" />
                        </button>

                        {patient.status === 'Waiting' && !patient.assignedDoctorId && (
                          <button
                            onClick={() => handleAssignDoctor(patient)}
                            title="Assign Doctor"
                            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <PersonAddIcon fontSize="small" />
                          </button>
                        )}

                        {patient.status === 'Waiting' && patient.assignedDoctorId && (
                          <>
                            <button
                              onClick={() => handleStartConsultation(patient)}
                              title="Start Consultation"
                              className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded"
                            >
                              <PlayArrowIcon fontSize="small" />
                            </button>

                            <button
                              onClick={() => handleTransferPatient(patient)}
                              title="Transfer"
                              className="w-8 h-8 flex items-center justify-center text-yellow-600 hover:bg-yellow-50 rounded"
                            >
                              <SwapHorizIcon fontSize="small" />
                            </button>
                          </>
                        )}

                        {patient.status === 'In Consultation' && (
                          <button
                            onClick={() => handleStartConsultation(patient)}
                            title="View Consultation"
                            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <DescriptionIcon fontSize="small" />
                          </button>
                        )}

                        <button
                          onClick={() => handleCancelPatient(patient)}
                          title="Cancel"
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded"
                        >
                          <CloseIcon fontSize="small" />
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
                        <MedicalServicesIcon className="text-blue-600" />
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
                      className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
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
                      className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors shadow-sm"
                      onClick={() => handleDoctorStatusToggle(doctor.id)}
                      title="Deactivate Doctor"
                    >
                      <PowerSettingsNewIcon fontSize="small" />
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
                          <MedicalServicesIcon className="text-gray-500" />
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
                      className="w-full py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium flex items-center justify-center text-sm"
                      onClick={() => handleDoctorStatusToggle(doctor.id)}
                    >
                      <CheckIcon className="mr-1" fontSize="small" /> Activate Doctor
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
                  onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Department *</label>
                <select
                  className="form-input"
                  value={doctorForm.department}
                  onChange={(e) => setDoctorForm({ ...doctorForm, department: e.target.value })}
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
                  onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">OPD Room</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Room 101"
                  value={doctorForm.opdRoom}
                  onChange={(e) => setDoctorForm({ ...doctorForm, opdRoom: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Contact Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 9876543210"
                  value={doctorForm.contact}
                  onChange={(e) => setDoctorForm({ ...doctorForm, contact: e.target.value })}
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
                        onChange={(e) => setDoctorForm({ ...doctorForm, isActive: e.target.checked })}
                      />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleAddDoctor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center text-sm font-medium"
                >
                  <AddIcon className="mr-2" fontSize="small" /> Add Doctor
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
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm ${doctor.isActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
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
                onChange={(e) => setAssignForm({ ...assignForm, doctorId: e.target.value })}
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
                    onChange={(e) => setAssignForm({ ...assignForm, priority: e.target.value })}
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
                    onChange={(e) => setAssignForm({ ...assignForm, priority: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-red-600">Urgent (Will be placed at front of queue)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssignment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!assignForm.doctorId}
              >
                <PersonAddIcon className="mr-2" fontSize="small" /> Assign Doctor
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
                      vitalSigns: { ...consultationForm.vitalSigns, bp: e.target.value }
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
                      vitalSigns: { ...consultationForm.vitalSigns, pulse: e.target.value }
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
                      vitalSigns: { ...consultationForm.vitalSigns, temperature: e.target.value }
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
                      vitalSigns: { ...consultationForm.vitalSigns, spo2: e.target.value }
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
                      vitalSigns: { ...consultationForm.vitalSigns, weight: e.target.value }
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
                      vitalSigns: { ...consultationForm.vitalSigns, height: e.target.value }
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
                className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteConsultation}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md flex items-center text-sm font-medium"
              >
                <CheckCircleIcon className="mr-2" fontSize="small" /> Complete Consultation
              </button>

              <button
                onClick={handlePrintPrescription}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center text-sm font-medium"
              >
                <PrintIcon className="mr-2" fontSize="small" /> Print Prescription
              </button>

            </div>
          </div>
        )}
      </Modal>

      {/* Token Generation Modal */}
      <Modal
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        title={tokenStep === 'form' ? "Generate Patient Token" : "Token Generated Successfully"}
        size="md"
      >
        {tokenStep === 'form' ? (
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Enter full name"
                  value={tokenForm.patientName}
                  onChange={(e) => setTokenForm({ ...tokenForm, patientName: e.target.value })}
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Enter phone number"
                  value={tokenForm.phoneNo}
                  onChange={(e) => setTokenForm({ ...tokenForm, phoneNo: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Years"
                  value={tokenForm.age}
                  onChange={(e) => setTokenForm({ ...tokenForm, age: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={tokenForm.gender}
                  onChange={(e) => setTokenForm({ ...tokenForm, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., O+, B-"
                  value={tokenForm.bloodGroup}
                  onChange={(e) => setTokenForm({ ...tokenForm, bloodGroup: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={tokenForm.type}
                  onChange={(e) => setTokenForm({ ...tokenForm, type: e.target.value })}
                >
                  <option value="Regular">Regular</option>
                  <option value="New">New Patient</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>


              {/* Searchable Department */}
              <div className="relative" ref={deptDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Department..."
                    className="w-full p-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={deptSearchTerm}
                    onChange={(e) => {
                      setDeptSearchTerm(e.target.value);
                      setIsDeptDropdownOpen(true);
                      setTokenForm({ ...tokenForm, department: '', doctorId: '' });
                    }}
                    onFocus={() => setIsDeptDropdownOpen(true)}
                  />
                  <KeyboardArrowDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {isDeptDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {filteredDepartments.length > 0 ? (
                      filteredDepartments.map(dept => (
                        <div
                          key={dept}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0 border-gray-100 transition-colors text-sm"
                          onClick={() => handleSelectDept(dept)}
                        >
                          {dept}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500 text-sm">No departments found</div>
                    )}
                  </div>
                )}
              </div>


              {/* Searchable Doctor */}
              <div className="relative" ref={docDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled={!tokenForm.department}
                    placeholder={tokenForm.department ? "Search Doctor..." : "Select department first"}
                    className={`w-full p-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${!tokenForm.department ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    value={docSearchTerm}
                    onChange={(e) => {
                      setDocSearchTerm(e.target.value);
                      setIsDocDropdownOpen(true);
                    }}
                    onFocus={() => tokenForm.department && setIsDocDropdownOpen(true)}
                  />
                  <KeyboardArrowDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {isDocDropdownOpen && tokenForm.department && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {filteredDoctorsForToken.length > 0 ? (
                      filteredDoctorsForToken.map(doc => (
                        <div
                          key={doc.id}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0 border-gray-100 transition-colors text-sm"
                          onClick={() => handleSelectDoc(doc)}
                        >
                          <div className="font-medium text-gray-800">{doc.name}</div>
                          <div className="text-xs text-gray-500">Queue: {doc.queue} patients</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500 text-sm">No active doctors found</div>
                    )}
                  </div>
                )}
              </div>



            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={tokenForm.priority}
                onChange={(e) => setTokenForm({ ...tokenForm, priority: e.target.value })}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={() => setShowTokenModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all flex items-center"
              >
                <ConfirmationNumberIcon className="mr-2" /> Generate Token
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 flex flex-col items-center">
            {/* Token Slip UI Card */}
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white text-center relative">
                <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
                  <ConfirmationNumberIcon sx={{ fontSize: 100 }} />
                </div>
                <div className="relative z-10">
                  <h4 className="text-sm font-bold tracking-widest text-blue-100 uppercase mb-1">Hospital OPD</h4>
                  <p className="text-4xl font-black mb-1">{generatedToken?.token}</p>
                  <p className="text-sm font-medium text-blue-100 mt-2">
                    {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 bg-white relative">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Patient</p>
                    <p className="font-bold text-gray-900 text-lg">{generatedToken?.patientName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${generatedToken?.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {generatedToken?.priority === 'Urgent' ? 'URGENT' : ' NORMAL'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Age / Gender</p>
                    <p className="font-semibold text-gray-800">{generatedToken?.age}Y / {generatedToken?.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                    <p className="font-semibold text-gray-800">{generatedToken?.phoneNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Department</p>
                    <p className="font-semibold text-gray-800">{generatedToken?.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Consulting</p>
                    <p className="font-bold text-blue-600">{generatedToken?.doctor}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-gray-300 text-center">
                  <div className="inline-flex items-center justify-center space-x-2 text-green-600 mb-1">
                    <CheckCircleIcon fontSize="small" />
                    <span className="font-semibold text-sm">Token Generated Successfully</span>
                  </div>
                  <p className="text-xs text-gray-500">Please proceed to the waiting area</p>
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 w-full max-w-sm">
              <button
                onClick={handlePrintSlip}
                className="flex-1 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all shadow-md flex items-center justify-center"
              >
                <PrintIcon className="mr-2" fontSize="small" /> Print Record
              </button>
              <button
                onClick={() => setShowTokenModal(false)}
                className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md flex items-center justify-center"
              >
                Complete
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Patient Details Modal */}
      <Modal
        isOpen={showViewPatientModal}
        onClose={() => setShowViewPatientModal(false)}
        title="Patient Details"
        size="md"
      >
        {selectedPatientForView && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedPatientForView.patientName}</h3>
                <p className="text-sm text-gray-500">{selectedPatientForView.token}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedPatientForView.status)}`}>
                {selectedPatientForView.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Age / Gender</p>
                <p className="font-semibold text-gray-800">{selectedPatientForView.age} Years / {selectedPatientForView.gender}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone Number</p>
                <p className="font-semibold text-gray-800">{selectedPatientForView.phoneNo || 'Not Specified'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Blood Group</p>
                <p className="font-semibold text-gray-800">{selectedPatientForView.bloodGroup || 'Not Specified'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Arrival Time</p>
                <p className="font-semibold text-gray-800">{selectedPatientForView.arrivalTime}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-3">Consultation Info</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-600 mb-1">Department</p>
                  <p className="font-semibold text-blue-900">{selectedPatientForView.department}</p>
                </div>
                <div>
                  <p className="text-blue-600 mb-1">Assigned Doctor</p>
                  <p className="font-semibold text-blue-900">{selectedPatientForView.doctor}</p>
                </div>
                <div>
                  <p className="text-blue-600 mb-1">Visit Type</p>
                  <p className="font-semibold text-blue-900">{selectedPatientForView.type || 'Regular'}</p>
                </div>
                <div>
                  <p className="text-blue-600 mb-1">Priority</p>
                  <p className={`font-semibold ${selectedPatientForView.priority === 'Urgent' ? 'text-red-600' : 'text-blue-900'}`}>
                    {selectedPatientForView.priority}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowViewPatientModal(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
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
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center text-sm font-medium"
                          onClick={() => {
                            setShowQueueModal(false);
                            handleStartConsultation(inConsultationPatient);
                          }}
                        >
                          <VisibilityIcon className="mr-1" fontSize="small" /> View
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
                                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center text-sm font-medium"
                                onClick={() => {
                                  setShowQueueModal(false);
                                  handleStartConsultation(patient);
                                }}
                              >
                                <PlayArrowIcon className="mr-1" fontSize="small" /> Start
                              </button>
                              <button
                                className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-sm flex items-center text-sm font-medium"
                                onClick={() => {
                                  setShowQueueModal(false);
                                  handleTransferPatient(patient);
                                }}
                              >
                                <SwapHorizIcon fontSize="small" />
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

      {/* Transfer Patient Modal */}
      <Modal
        isOpen={showTransferModal}
        onClose={() => {
          setShowTransferModal(false);
          setTransferPatient(null);
          setSelectedTransferDoctor(null);
        }}
        title="Transfer Patient"
        size="lg"
      >
        {transferPatient && (
          <div>
            {/* Patient Info Banner */}
            <div className="mb-5 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <SwapHorizIcon className="text-yellow-600" fontSize="small" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Transferring: {transferPatient.patientName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Token: {transferPatient.token} • Currently with {transferPatient.doctor} ({transferPatient.department})
                  </p>
                </div>
              </div>
            </div>

            {/* Section Title */}
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Select a doctor to transfer to:
            </p>

            {/* Doctor Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
              {doctors
                .filter(d => d.isActive && d.id !== transferPatient.assignedDoctorId)
                .map(doctor => {
                  const isSelected = selectedTransferDoctor?.id === doctor.id;
                  const queueCount = opdPatients.filter(
                    p => p.assignedDoctorId === doctor.id && p.status === 'Waiting'
                  ).length;

                  return (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedTransferDoctor(doctor)}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md ${isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      {/* Selected Checkmark */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <CheckIcon className="text-white" style={{ fontSize: 16 }} />
                        </div>
                      )}

                      {/* Doctor Name & Department */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${isSelected ? 'bg-blue-500' : 'bg-gray-400'
                          }`}>
                          {doctor.name.split(' ').pop()[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.department}</p>
                        </div>
                      </div>

                      {/* Doctor Stats */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-gray-500">
                          <AccessTimeIcon style={{ fontSize: 14 }} />
                          <span>{doctor.opdRoom}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${queueCount > 5
                          ? 'bg-red-100 text-red-700'
                          : queueCount > 2
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                          }`}>
                          {queueCount} in queue
                        </span>
                      </div>

                      {/* Specialization */}
                      <p className="text-xs text-gray-400 mt-2">
                        {doctor.specialization} • {doctor.experience}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 mt-5 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowTransferModal(false);
                  setTransferPatient(null);
                  setSelectedTransferDoctor(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmTransfer}
                disabled={!selectedTransferDoctor}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${selectedTransferDoctor
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <SwapHorizIcon style={{ fontSize: 18 }} />
                Confirm Transfer
              </button>
            </div>
          </div>
        )}
    </Modal>

      {/* Deactivate Doctor Modal */}
      <Modal
        isOpen={showDeactivateModal}
        onClose={() => {
          setShowDeactivateModal(false);
          setDoctorToDeactivate(null);
          setPatientsToReassign([]);
        }}
        title="Deactivate Doctor"
        size="md"
      >
        {doctorToDeactivate && (
          <div className="p-1">
            <div className="flex items-center gap-4 mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <WarningIcon fontSize="large" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Confirm Deactivation</h3>
                <p className="text-sm text-red-600 font-medium">Dr. {doctorToDeactivate.name}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                This doctor has <span className="font-bold text-gray-900">{patientsToReassign.length} active patients</span> in their queue. Deactivating will automatically reassign these patients to other available doctors in the same department.
              </p>

              <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Patients to be reassigned:</p>
                <div className="space-y-2">
                  {patientsToReassign.map(patient => (
                    <div key={patient.id} className="flex justify-between items-center text-sm bg-white p-2 rounded border border-gray-100">
                      <span className="font-medium text-gray-700">{patient.patientName}</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold">{patient.token}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowDeactivateModal(false);
                  setDoctorToDeactivate(null);
                  setPatientsToReassign([]);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                No, Keep Active
              </button>
              <button
                onClick={handleConfirmDeactivation}
                className="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-md transition-all flex items-center gap-2"
              >
                <PowerSettingsNewIcon style={{ fontSize: 18 }} />
                Confirm & Reassign
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OPDManagement;