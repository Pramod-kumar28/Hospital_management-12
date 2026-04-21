// src/pages/dashboards/LabDashboard/pages/SampleTracking.jsx
import React, { useState, useEffect, useRef } from "react";
import DataTable from "../../../../components/ui/Tables/DataTable";
import SearchBar from "../../../../components/common/SearchBar/SearchBar";
import Button from "../../../../components/common/Button/Button";
import Modal from "../../../../components/common/Modal/Modal";
import LoadingSpinner from "../../../../components/common/LoadingSpinner/LoadingSpinner";
import Toast from "../../../../components/common/Toast/Toast";
import { QRCodeSVG } from "qrcode.react";

const SampleTracking = () => {
  const [loading, setLoading] = useState(true);
  const [samples, setSamples] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrSample, setQRSample] = useState(null);
  const [scannedCode, setScannedCode] = useState("");
  const [currentSample, setCurrentSample] = useState(null);
  const [toast, setToast] = useState(null);
  const printRef = useRef(null);

  // Status to stage mapping for timeline
  const statusStageMap = {
    Collected: 0,
    "In Transit": 1,
    "In Lab": 2,
    Processing: 3,
    Processed: 4,
    Storage: 4,
    Disposed: 4,
  };

  const stages = [
    "Collection",
    "Transit",
    "Lab Receipt",
    "Processing",
    "Storage",
  ];

  useEffect(() => {
    loadSampleData();
  }, []);

  const loadSampleData = async () => {
    setLoading(true);
    setTimeout(() => {
      const sampleData = [
        {
          id: "SAMP-001",
          testId: "TEST-2024-001",
          barcode: "BC001",
          patientName: "Rajesh Kumar",
          testType: "CBC",
          sampleType: "Blood",
          collectionTime: "2024-01-15 09:30",
          collectedBy: "Nurse Rani",
          status: "Collected",
          location: "Collection Room",
          nextAction: "Transfer to Lab",
          temperature: "24°C",
          qrCodeData: `SAMPLE-001\nPATIENT: Rajesh Kumar\nTEST: CBC\nDATE: 2024-01-15`,
        },
        {
          id: "SAMP-002",
          testId: "TEST-2024-002",
          barcode: "BC002",
          patientName: "Priya Sharma",
          testType: "Lipid Profile",
          sampleType: "Blood",
          collectionTime: "2024-01-15 10:15",
          collectedBy: "Dr. Verma",
          status: "In Transit",
          location: "Corridor A",
          nextAction: "Receive at Lab",
          temperature: "22°C",
          qrCodeData: `SAMPLE-002\nPATIENT: Priya Sharma\nTEST: Lipid Profile\nDATE: 2024-01-15`,
        },
        {
          id: "SAMP-003",
          testId: "TEST-2024-003",
          barcode: "BC003",
          patientName: "Suresh Patel",
          testType: "Urine Culture",
          sampleType: "Urine",
          collectionTime: "2024-01-14 14:45",
          collectedBy: "Lab Tech Ravi",
          status: "In Lab",
          location: "Microbiology Lab",
          nextAction: "Processing",
          temperature: "25°C",
          qrCodeData: `SAMPLE-003\nPATIENT: Suresh Patel\nTEST: Urine Culture\nDATE: 2024-01-14`,
        },
        {
          id: "SAMP-004",
          testId: "TEST-2024-004",
          barcode: "BC004",
          patientName: "Anita Mehta",
          testType: "Liver Function",
          sampleType: "Blood",
          collectionTime: "2024-01-14 11:20",
          collectedBy: "Nurse Sonia",
          status: "Processed",
          location: "Chemistry Lab",
          nextAction: "Storage",
          temperature: "4°C",
          qrCodeData: `SAMPLE-004\nPATIENT: Anita Mehta\nTEST: Liver Function\nDATE: 2024-01-14`,
        },
      ];
      setSamples(sampleData);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleScanBarcode = () => {
    setScannedCode("");
    setShowScannerModal(true);
  };

  const performBarcodeLookup = (code) => {
    if (!code.trim()) {
      setToast({ message: "Please enter or scan a barcode", type: "warning" });
      return false;
    }
    const foundSample = samples.find((s) => s.barcode === code.trim());
    if (foundSample) {
      setCurrentSample(foundSample);
      setToast({
        message: `Sample found: ${foundSample.id} (${foundSample.patientName})`,
        type: "success",
      });
      setShowScannerModal(false);
      return true;
    } else {
      setToast({
        message: `Sample with barcode ${code} not found`,
        type: "error",
      });
      return false;
    }
  };

  const simulateBarcodeScan = () => {
    const randomBarcode = `BC${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
    setScannedCode(randomBarcode);
    performBarcodeLookup(randomBarcode);
  };

  const updateSampleStatus = (sampleId, newStatus, newLocation) => {
    const updatedSamples = samples.map((sample) =>
      sample.id === sampleId
        ? {
            ...sample,
            status: newStatus,
            location: newLocation || sample.location,
            nextAction: getNextAction(newStatus),
          }
        : sample,
    );
    setSamples(updatedSamples);

    if (currentSample && currentSample.id === sampleId) {
      const updatedCurrent = updatedSamples.find((s) => s.id === sampleId);
      setCurrentSample(updatedCurrent);
    }

    setToast({
      message: `Sample ${sampleId} status updated to: ${newStatus}`,
      type: "success",
    });
  };

  const getNextAction = (status) => {
    const actions = {
      Collected: "Transfer to Lab",
      "In Transit": "Receive at Lab",
      "In Lab": "Start Processing",
      Processing: "Complete Analysis",
      Processed: "Move to Storage",
      Storage: "Dispose after retention",
      Disposed: "No further action",
    };
    return actions[status] || "Awaiting update";
  };

  const handleRowClick = (sample) => {
    setCurrentSample(sample);
  };

  // Fixed Print Label Functionality
  const handlePrintLabel = (sample) => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
      setToast({
        message: "Please allow pop-ups to print labels",
        type: "error",
      });
      return;
    }

    const htmlContent = generateLabelHTML(sample);
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  const generateLabelHTML = (sample) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sample Label - ${sample.id}</title>
          <meta charset="utf-8" />
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Courier New', monospace;
              background: white;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
            }
            .label {
              width: 300px;
              padding: 15px;
              border: 2px solid #000;
              border-radius: 8px;
              background: white;
              page-break-after: avoid;
              break-inside: avoid;
            }
            .header {
              text-align: center;
              border-bottom: 1px dashed #000;
              padding-bottom: 8px;
              margin-bottom: 10px;
            }
            .header h3 {
              font-size: 14px;
              margin-bottom: 4px;
            }
            .barcode {
              text-align: center;
              margin: 15px 0;
              padding: 10px;
              background: #f9f9f9;
            }
            .barcode-text {
              font-family: 'Courier New', monospace;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 2px;
            }
            .info-row {
              margin: 8px 0;
              font-size: 12px;
            }
            .info-label {
              font-weight: bold;
              display: inline-block;
              width: 80px;
            }
            .footer {
              margin-top: 12px;
              padding-top: 8px;
              border-top: 1px dashed #000;
              text-align: center;
              font-size: 10px;
            }
            .qr-placeholder {
              text-align: center;
              margin: 10px 0;
              font-family: monospace;
              font-size: 10px;
            }
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              .label {
                border: 1px solid #000;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="label">
            <div class="header">
              <h3>LEVITICA HEALTHCARE</h3>
              <p style="font-size: 10px;">Diagnostic Laboratory</p>
            </div>
            
            <div class="barcode">
              <div class="barcode-text">${sample.barcode}</div>
              <div style="font-size: 10px; margin-top: 5px;">${sample.id}</div>
            </div>
            
            <div class="info-row">
              <span class="info-label">Patient:</span>
              <span>${sample.patientName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Test Type:</span>
              <span>${sample.testType}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Sample Type:</span>
              <span>${sample.sampleType}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Collection:</span>
              <span>${sample.collectionTime}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Collected By:</span>
              <span>${sample.collectedBy}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Status:</span>
              <span>${sample.status}</span>
            </div>
            
            <div class="qr-placeholder">
              <div style="font-size: 10px;">QR: ${sample.qrCodeData.substring(0, 30)}...</div>
            </div>
            
            <div class="footer">
              Handle with care | Store at ${sample.temperature}
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handleViewQR = (sample) => {
    setQRSample(sample);
    setShowQRModal(true);
  };

  const handlePrintQR = () => {
    if (!qrSample) return;

    const printWindow = window.open("", "_blank", "width=600,height=600");
    if (!printWindow) {
      setToast({
        message: "Please allow pop-ups to print QR code",
        type: "error",
      });
      return;
    }

    const htmlContent = generateQRPrintHTML(qrSample);
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  const generateQRPrintHTML = (sample) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${sample.id}</title>
          <meta charset="utf-8" />
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: Arial, sans-serif;
              background: white;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
            }
            .qr-container {
              text-align: center;
              padding: 30px;
              border: 2px solid #000;
              border-radius: 12px;
              background: white;
            }
            .qr-code {
              margin: 20px auto;
              padding: 20px;
              background: white;
            }
            .sample-info {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ccc;
            }
            .sample-info p {
              margin: 5px 0;
              font-size: 12px;
            }
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              .qr-container {
                border: 1px solid #000;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h3>LEVITICA HEALTHCARE</h3>
            <p>Sample Tracking QR Code</p>
            <div class="qr-code" id="qr-code">
              <!-- QR will be rendered here -->
              <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="white"/>
                <text x="100" y="100" text-anchor="middle" font-size="10" fill="black">QR Code Placeholder</text>
              </svg>
            </div>
            <div class="sample-info">
              <p><strong>Sample ID:</strong> ${sample.id}</p>
              <p><strong>Patient:</strong> ${sample.patientName}</p>
              <p><strong>Test Type:</strong> ${sample.testType}</p>
              <p><strong>Barcode:</strong> ${sample.barcode}</p>
              <p><strong>Collection Date:</strong> ${sample.collectionTime}</p>
            </div>
            <p style="margin-top: 20px; font-size: 10px;">Scan this QR code to track sample status</p>
          </div>
        </body>
      </html>
    `;
  };

  // Quick action handlers
  const handleMarkCollected = () => {
    if (!currentSample) {
      setToast({ message: "Please select a sample first", type: "warning" });
      return;
    }
    updateSampleStatus(currentSample.id, "Collected", "Collection Room");
  };

  const handleMarkInTransit = () => {
    if (!currentSample) {
      setToast({ message: "Please select a sample first", type: "warning" });
      return;
    }
    if (currentSample.status !== "Collected") {
      setToast({
        message: "Sample must be Collected before marking In Transit",
        type: "error",
      });
      return;
    }
    updateSampleStatus(currentSample.id, "In Transit", "In Transit");
  };

  const handleStartProcessing = () => {
    if (!currentSample) {
      setToast({ message: "Please select a sample first", type: "warning" });
      return;
    }
    if (!["In Lab", "In Transit"].includes(currentSample.status)) {
      setToast({
        message: "Sample must be In Lab or In Transit to start processing",
        type: "error",
      });
      return;
    }
    updateSampleStatus(currentSample.id, "Processing", "Chemistry Lab");
  };

  const handleCompleteTest = () => {
    if (!currentSample) {
      setToast({ message: "Please select a sample first", type: "warning" });
      return;
    }
    if (currentSample.status !== "Processing") {
      setToast({
        message: "Sample must be Processing to complete",
        type: "error",
      });
      return;
    }
    updateSampleStatus(currentSample.id, "Processed", "Storage");
  };

  const filteredSamples = samples.filter(
    (sample) =>
      sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.testId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const statusOptions = {
    Pending: { color: "bg-gray-100 text-gray-800" },
    Collected: { color: "bg-blue-100 text-blue-800" },
    "In Transit": { color: "bg-yellow-100 text-yellow-800" },
    "In Lab": { color: "bg-purple-100 text-purple-800" },
    Processing: { color: "bg-indigo-100 text-indigo-800" },
    Processed: { color: "bg-green-100 text-green-800" },
    Storage: { color: "bg-teal-100 text-teal-800" },
    Disposed: { color: "bg-red-100 text-red-800" },
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Sample Tracking
            </h2>
            <p className="text-gray-500">
              Track samples with barcode/QR code support throughout the testing
              process
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              icon="fas fa-qrcode"
              onClick={handleScanBarcode}
            >
              Scan Barcode/QR
            </Button>
            <Button
              variant="primary"
              icon="fas fa-sync-alt"
              onClick={loadSampleData}
            >
              Refresh Tracking
            </Button>
          </div>
        </div>

        {/* Search and Scanner */}
        <div className="bg-white p-4 rounded border card-shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Search by barcode, patient name, or test ID..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-info-circle"></i>
              <span>Scan or enter barcode to track sample</span>
            </div>
          </div>
        </div>

        {/* Current Sample Info */}
        {currentSample && (
          <div className="bg-white p-4 rounded border card-shadow border-blue-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Currently Tracked Sample
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Sample ID</p>
                    <p className="font-medium">{currentSample.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient</p>
                    <p className="font-medium">{currentSample.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${statusOptions[currentSample.status]?.color || "bg-gray-100"}`}
                    >
                      {currentSample.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{currentSample.location}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentSample(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}

        {/* Samples Table */}
        <div className="bg-white rounded border card-shadow overflow-hidden">
          <DataTable
            columns={[
              { key: "barcode", title: "Barcode", sortable: true },
              { key: "testId", title: "Test ID", sortable: true },
              { key: "patientName", title: "Patient", sortable: true },
              { key: "testType", title: "Test Type", sortable: true },
              { key: "sampleType", title: "Sample Type", sortable: true },
              {
                key: "collectionTime",
                title: "Collection Time",
                sortable: true,
              },
              {
                key: "status",
                title: "Status",
                sortable: true,
                render: (value) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${statusOptions[value]?.color || "bg-gray-100"}`}
                  >
                    {value}
                  </span>
                ),
              },
              { key: "location", title: "Current Location", sortable: true },
              {
                key: "actions",
                title: "Actions",
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewQR(row);
                      }}
                      className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                      title="View QR Code"
                    >
                      <i className="fas fa-qrcode"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrintLabel(row);
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                      title="Print Label"
                    >
                      <i className="fas fa-print"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateSampleStatus(row.id, "Processed", "Storage");
                      }}
                      className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                      title="Mark as Processed"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  </div>
                ),
              },
            ]}
            data={filteredSamples}
            onRowClick={handleRowClick}
            emptyMessage="No samples found. Start by registering tests."
          />
        </div>

        {/* Sample Tracking Timeline */}
        {currentSample && (
          <div className="bg-white p-6 rounded border card-shadow">
            <h3 className="text-lg font-semibold mb-4">
              Sample Journey - {currentSample.patientName}
            </h3>
            <div className="relative">
              <div className="flex justify-between items-center mb-8">
                {stages.map((stage, index) => {
                  const currentStageIndex =
                    statusStageMap[currentSample.status] ?? 0;
                  const isCompleted = index <= currentStageIndex;
                  const isCurrent = index === currentStageIndex;
                  return (
                    <div
                      key={stage}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
                        ${isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}
                        ${isCurrent ? "ring-4 ring-green-200" : ""}
                      `}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">{stage}</span>
                      {isCurrent && (
                        <span className="text-xs text-green-600 mt-1">
                          Current
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Temperature</p>
                  <p className="text-xl font-bold">
                    {currentSample.temperature}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collected By</p>
                  <p className="font-medium">{currentSample.collectedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Action</p>
                  <p className="font-medium">{currentSample.nextAction}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            className="p-4 bg-white border rounded-lg hover:bg-blue-50 transition-colors text-center group"
            onClick={handleMarkCollected}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200">
              <i className="fas fa-syringe text-blue-600 text-xl"></i>
            </div>
            <p className="font-medium">Mark Collected</p>
          </button>

          <button
            className="p-4 bg-white border rounded-lg hover:bg-green-50 transition-colors text-center group"
            onClick={handleMarkInTransit}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200">
              <i className="fas fa-truck text-green-600 text-xl"></i>
            </div>
            <p className="font-medium">Mark In Transit</p>
          </button>

          <button
            className="p-4 bg-white border rounded-lg hover:bg-purple-50 transition-colors text-center group"
            onClick={handleStartProcessing}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200">
              <i className="fas fa-flask text-purple-600 text-xl"></i>
            </div>
            <p className="font-medium">Start Processing</p>
          </button>

          <button
            className="p-4 bg-white border rounded-lg hover:bg-teal-50 transition-colors text-center group"
            onClick={handleCompleteTest}
          >
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200">
              <i className="fas fa-check-circle text-teal-600 text-xl"></i>
            </div>
            <p className="font-medium">Complete Test</p>
          </button>
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      <Modal
        isOpen={showScannerModal}
        onClose={() => setShowScannerModal(false)}
        title="Scan Barcode/QR Code"
      >
        <div className="space-y-4">
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <div className="w-48 h-48 mx-auto border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-qrcode text-4xl text-gray-400"></i>
            </div>
            <p className="text-gray-600 mb-4">
              Position barcode/QR code within the frame
            </p>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Or Enter Barcode Manually
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter barcode (e.g., BC001)"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
              />
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-end"
              onClick={() => performBarcodeLookup(scannedCode)}
            >
              Lookup
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowScannerModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={simulateBarcodeScan}>
              Simulate Scan
            </Button>
          </div>
        </div>
      </Modal>

      {/* QR Code Modal - Now with actual visible QR code */}
      <Modal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        title="Sample QR Code"
        size="sm"
      >
        {qrSample && (
          <div className="text-center space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg inline-block mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-md">
                {/* Actual QR Code rendered using qrcode.react */}
                <QRCodeSVG
                  value={qrSample.qrCodeData}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="font-medium text-lg">{qrSample.patientName}</p>
              <p className="text-sm text-gray-500">Sample ID: {qrSample.id}</p>
              <p className="text-sm text-gray-500">
                Barcode: {qrSample.barcode}
              </p>
              <p className="text-sm text-gray-500">
                Test Type: {qrSample.testType}
              </p>
              <p className="text-xs text-gray-400 mt-2 break-all">
                {qrSample.qrCodeData}
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                icon="fas fa-print"
                onClick={handlePrintQR}
                className="flex-1"
              >
                Print QR Code
              </Button>
              <Button
                variant="primary"
                icon="fas fa-download"
                onClick={() => {
                  setToast({
                    message: `QR Code for ${qrSample.id} saved`,
                    type: "success",
                  });
                }}
                className="flex-1"
              >
                Download QR
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Toast
          key={toast.message + Date.now()}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default SampleTracking;