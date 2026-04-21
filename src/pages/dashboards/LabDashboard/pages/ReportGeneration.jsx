// src/pages/dashboards/LabDashboard/pages/ReportGeneration.jsx
import React, { useState, useEffect, useRef } from "react";
import DataTable from "../../../../components/ui/Tables/DataTable";
import SearchBar from "../../../../components/common/SearchBar/SearchBar";
import Button from "../../../../components/common/Button/Button";
import Modal from "../../../../components/common/Modal/Modal";
import LoadingSpinner from "../../../../components/common/LoadingSpinner/LoadingSpinner";
import Toast from "../../../../components/common/Toast/Toast";
import html2pdf from "html2pdf.js";

const ReportGeneration = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDownloadProgress, setShowDownloadProgress] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentReport, setCurrentReport] = useState(null);
  const [template, setTemplate] = useState("standard");
  const [selectedReports, setSelectedReports] = useState([]);
  const [toast, setToast] = useState(null);
  const pdfContentRef = useRef(null);

  const [pendingTests, setPendingTests] = useState([
    {
      id: "TEST-2024-005",
      patientName: "Amit Shah",
      patientId: "PAT-005",
      testType: "Diabetes Panel",
      sampleDate: "2024-01-16",
    },
    {
      id: "TEST-2024-006",
      patientName: "Meera Rai",
      patientId: "PAT-006",
      testType: "Thyroid Profile",
      sampleDate: "2024-01-16",
    },
    {
      id: "TEST-2024-007",
      patientName: "Sanjay Dutt",
      patientId: "PAT-007",
      testType: "Kidney Function",
      sampleDate: "2024-01-17",
    },
  ]);

  // Complete test results data with actual values
  const testResultsData = {
    CBC: {
      results: [
        {
          parameter: "Hemoglobin",
          result: "14.2",
          unit: "g/dL",
          reference: "13.5 - 17.5",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "RBC Count",
          result: "5.1",
          unit: "M/µL",
          reference: "4.5 - 5.9",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "WBC Count",
          result: "7.8",
          unit: "x10³/µL",
          reference: "4.5 - 11.0",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Platelets",
          result: "250",
          unit: "x10³/µL",
          reference: "150 - 450",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Hematocrit",
          result: "42.5",
          unit: "%",
          reference: "40 - 54",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "MCV",
          result: "88",
          unit: "fL",
          reference: "80 - 100",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "MCH",
          result: "29.5",
          unit: "pg",
          reference: "27 - 31",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "MCHC",
          result: "33.5",
          unit: "g/dL",
          reference: "32 - 36",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "RDW",
          result: "13.2",
          unit: "%",
          reference: "11.5 - 14.5",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Neutrophils",
          result: "65",
          unit: "%",
          reference: "40 - 70",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Lymphocytes",
          result: "28",
          unit: "%",
          reference: "20 - 40",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Monocytes",
          result: "5",
          unit: "%",
          reference: "2 - 8",
          status: "Normal",
          flag: "",
        },
      ],
      impression:
        "All hematological parameters are within normal reference ranges. No evidence of anemia, infection, or bleeding disorder. Complete blood count is unremarkable.",
    },
    "Lipid Profile": {
      results: [
        {
          parameter: "Total Cholesterol",
          result: "185",
          unit: "mg/dL",
          reference: "< 200",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "HDL Cholesterol",
          result: "55",
          unit: "mg/dL",
          reference: "> 40",
          status: "Normal",
          flag: "Good",
        },
        {
          parameter: "LDL Cholesterol",
          result: "110",
          unit: "mg/dL",
          reference: "< 100",
          status: "Borderline",
          flag: "High",
        },
        {
          parameter: "Triglycerides",
          result: "150",
          unit: "mg/dL",
          reference: "< 150",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "VLDL",
          result: "30",
          unit: "mg/dL",
          reference: "< 30",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Non-HDL Cholesterol",
          result: "130",
          unit: "mg/dL",
          reference: "< 130",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Cholesterol/HDL Ratio",
          result: "3.36",
          unit: "ratio",
          reference: "< 4.5",
          status: "Normal",
          flag: "",
        },
      ],
      impression:
        "Lipid profile shows optimal HDL cholesterol levels. LDL cholesterol is slightly elevated (borderline high). Recommend dietary modifications including reduced saturated fats and increased physical activity. Follow-up lipid profile in 3-6 months.",
    },
    "Liver Function": {
      results: [
        {
          parameter: "ALT (SGPT)",
          result: "32",
          unit: "U/L",
          reference: "10 - 40",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "AST (SGOT)",
          result: "28",
          unit: "U/L",
          reference: "10 - 35",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "ALP",
          result: "85",
          unit: "U/L",
          reference: "30 - 120",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "GGT",
          result: "25",
          unit: "U/L",
          reference: "8 - 40",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Total Bilirubin",
          result: "0.8",
          unit: "mg/dL",
          reference: "0.3 - 1.2",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Direct Bilirubin",
          result: "0.2",
          unit: "mg/dL",
          reference: "0.0 - 0.3",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Total Protein",
          result: "7.2",
          unit: "g/dL",
          reference: "6.0 - 8.0",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Albumin",
          result: "4.2",
          unit: "g/dL",
          reference: "3.5 - 5.0",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Globulin",
          result: "3.0",
          unit: "g/dL",
          reference: "2.0 - 3.5",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "A/G Ratio",
          result: "1.4",
          unit: "ratio",
          reference: "1.0 - 2.0",
          status: "Normal",
          flag: "",
        },
      ],
      impression:
        "Liver function tests are within normal limits. No evidence of hepatocellular damage or cholestasis. Synthetic function of the liver appears normal.",
    },
    "Kidney Function": {
      results: [
        {
          parameter: "Creatinine",
          result: "0.9",
          unit: "mg/dL",
          reference: "0.7 - 1.3",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "BUN",
          result: "14",
          unit: "mg/dL",
          reference: "7 - 20",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "BUN/Creatinine Ratio",
          result: "15.6",
          unit: "ratio",
          reference: "10 - 20",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Uric Acid",
          result: "5.2",
          unit: "mg/dL",
          reference: "3.5 - 7.2",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Sodium",
          result: "141",
          unit: "mmol/L",
          reference: "135 - 145",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Potassium",
          result: "4.2",
          unit: "mmol/L",
          reference: "3.5 - 5.1",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Chloride",
          result: "102",
          unit: "mmol/L",
          reference: "98 - 107",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Bicarbonate",
          result: "24",
          unit: "mmol/L",
          reference: "22 - 28",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Calcium",
          result: "9.5",
          unit: "mg/dL",
          reference: "8.5 - 10.5",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Phosphorus",
          result: "3.5",
          unit: "mg/dL",
          reference: "2.5 - 4.5",
          status: "Normal",
          flag: "",
        },
      ],
      impression:
        "Renal function tests are within normal limits. Electrolyte balance is maintained. No evidence of acute or chronic kidney disease.",
    },
    "Thyroid Profile": {
      results: [
        {
          parameter: "TSH (Ultrasensitive)",
          result: "2.5",
          unit: "µIU/mL",
          reference: "0.5 - 4.5",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "T3 (Total)",
          result: "1.2",
          unit: "ng/mL",
          reference: "0.8 - 2.0",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "T4 (Total)",
          result: "8.5",
          unit: "µg/dL",
          reference: "5.0 - 12.0",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Free T3",
          result: "3.2",
          unit: "pg/mL",
          reference: "2.3 - 4.2",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Free T4",
          result: "1.2",
          unit: "ng/dL",
          reference: "0.8 - 1.8",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Anti-TPO Antibody",
          result: "15",
          unit: "IU/mL",
          reference: "< 35",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Anti-Tg Antibody",
          result: "20",
          unit: "IU/mL",
          reference: "< 40",
          status: "Normal",
          flag: "",
        },
      ],
      impression:
        "Thyroid function tests are euthyroid. No evidence of hyperthyroidism or hypothyroidism. Thyroid autoantibodies are negative.",
    },
    "Diabetes Panel": {
      results: [
        {
          parameter: "Fasting Glucose",
          result: "92",
          unit: "mg/dL",
          reference: "70 - 100",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Postprandial Glucose",
          result: "128",
          unit: "mg/dL",
          reference: "< 140",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "HbA1c",
          result: "5.4",
          unit: "%",
          reference: "4.0 - 5.6",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Insulin (Fasting)",
          result: "8.5",
          unit: "µIU/mL",
          reference: "2.6 - 24.9",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "C-Peptide",
          result: "1.2",
          unit: "ng/mL",
          reference: "0.5 - 2.0",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "HOMA-IR",
          result: "1.94",
          unit: "index",
          reference: "< 2.5",
          status: "Normal",
          flag: "",
        },
      ],
      impression:
        "Glycemic parameters are within normal limits. HbA1c indicates good long-term glucose control. No evidence of diabetes mellitus or insulin resistance.",
    },
    "Urine Culture": {
      results: [
        {
          parameter: "Color",
          result: "Yellow",
          unit: "",
          reference: "Yellow",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Appearance",
          result: "Clear",
          unit: "",
          reference: "Clear",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "pH",
          result: "6.5",
          unit: "",
          reference: "5.0 - 8.0",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Specific Gravity",
          result: "1.020",
          unit: "",
          reference: "1.005 - 1.030",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Protein",
          result: "Negative",
          unit: "",
          reference: "Negative",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Glucose",
          result: "Negative",
          unit: "",
          reference: "Negative",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Ketones",
          result: "Negative",
          unit: "",
          reference: "Negative",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Blood",
          result: "Negative",
          unit: "",
          reference: "Negative",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Leukocytes",
          result: "Negative",
          unit: "",
          reference: "Negative",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Nitrite",
          result: "Negative",
          unit: "",
          reference: "Negative",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Bacteria",
          result: "None",
          unit: "",
          reference: "None",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Epithelial Cells",
          result: "Few",
          unit: "",
          reference: "Few",
          status: "Normal",
          flag: "",
        },
        {
          parameter: "Casts",
          result: "None",
          unit: "",
          reference: "None",
          status: "Normal",
          flag: "",
        },
      ],
      impression:
        "Urinalysis is normal. No evidence of urinary tract infection, hematuria, proteinuria, or glucosuria. Specific gravity and pH are within normal limits.",
    },
  };

  const getTestResults = (testType) => {
    return testResultsData[testType] || testResultsData["CBC"];
  };

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    setLoading(true);
    setTimeout(() => {
      const reportData = [
        {
          id: "REP-2024-001",
          testId: "TEST-2024-001",
          patientName: "Rajesh Kumar",
          patientId: "PAT-001",
          testType: "CBC",
          completionDate: "2024-01-15",
          status: "Ready",
          verifiedBy: "Dr. Sharma",
          format: "PDF",
          accessCode: "ACCESS001",
          age: 45,
          gender: "Male",
          referringDoctor: "Dr. Gupta",
          sampleCollectionDate: "2024-01-14",
          sampleType: "Blood (EDTA)",
        },
        {
          id: "REP-2024-002",
          testId: "TEST-2024-002",
          patientName: "Priya Sharma",
          patientId: "PAT-002",
          testType: "Lipid Profile",
          completionDate: "2024-01-15",
          status: "Pending Review",
          verifiedBy: "",
          format: "Draft",
          accessCode: "ACCESS002",
          age: 34,
          gender: "Female",
          referringDoctor: "Dr. Mehta",
          sampleCollectionDate: "2024-01-14",
          sampleType: "Blood (Serum)",
        },
        {
          id: "REP-2024-003",
          testId: "TEST-2024-003",
          patientName: "Suresh Patel",
          patientId: "PAT-003",
          testType: "Kidney Function",
          completionDate: "2024-01-14",
          status: "Ready",
          verifiedBy: "Dr. Mehta",
          format: "PDF",
          accessCode: "ACCESS003",
          age: 52,
          gender: "Male",
          referringDoctor: "Dr. Sharma",
          sampleCollectionDate: "2024-01-13",
          sampleType: "Blood (Serum)",
        },
        {
          id: "REP-2024-004",
          testId: "TEST-2024-004",
          patientName: "Anita Mehta",
          patientId: "PAT-004",
          testType: "Liver Function",
          completionDate: "2024-01-14",
          status: "Ready",
          verifiedBy: "Dr. Rao",
          format: "PDF",
          accessCode: "ACCESS004",
          age: 38,
          gender: "Female",
          referringDoctor: "Dr. Gupta",
          sampleCollectionDate: "2024-01-13",
          sampleType: "Blood (Serum)",
        },
      ];
      setReports(reportData);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleGenerateReport = (test) => {
    const newReport = {
      id: `REP-${new Date().getFullYear()}-${String(reports.length + 100).padStart(3, "0")}`,
      testId: test.id,
      patientName: test.patientName,
      patientId: test.patientId,
      testType: test.testType,
      completionDate: new Date().toISOString().split("T")[0],
      status: "Ready",
      verifiedBy: "Dr. Automatic",
      format: "PDF",
      accessCode: `ACCESS${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      age: Math.floor(Math.random() * 50) + 20,
      gender: Math.random() > 0.5 ? "Male" : "Female",
      referringDoctor: "Dr. System",
      sampleCollectionDate: new Date().toISOString().split("T")[0],
      sampleType: "Blood",
    };
    setReports([newReport, ...reports]);
    setPendingTests(pendingTests.filter((t) => t.id !== test.id));
    setShowGenerateModal(false);
    setToast({
      message: `Report generated successfully for ${test.patientName}!`,
      type: "success",
    });
  };

  const handlePreviewReport = (report) => {
    setCurrentReport(report);
    setShowPreviewModal(true);
  };

  // Fixed print function: opens a new window with the report content and triggers print
  const handlePrintReport = (reportId) => {
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    const testData = getTestResults(report.testType);
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      setToast({
        message: "Please allow pop-ups to print the report",
        type: "error",
      });
      return;
    }

    const htmlContent = generateFullPrintHTML(report, testData);
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  // Generates a complete HTML document for printing with inline styles
  const generateFullPrintHTML = (report, testData) => {
    const results = testData.results;
    const impression = testData.impression;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${report.id} - Lab Report</title>
          <meta charset="utf-8" />
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              background: white;
              padding: 30px 20px;
              color: #1e293b;
            }
            .report-container {
              max-width: 1000px;
              margin: 0 auto;
              background: white;
              border: 1px solid #e2e8f0;
              box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #2563eb;
              padding: 25px 20px 20px;
            }
            .header h1 {
              color: #1e40af;
              font-size: 28px;
              letter-spacing: 1px;
              margin-bottom: 8px;
            }
            .header p {
              color: #475569;
              font-size: 13px;
              margin: 4px 0;
            }
            .badge-row {
              display: flex;
              justify-content: space-between;
              background: #f8fafc;
              padding: 12px 20px;
              margin: 15px 20px;
              border-radius: 8px;
              font-size: 12px;
              border: 1px solid #e2e8f0;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin: 20px;
              padding: 18px;
              background: #f9fafb;
              border-radius: 10px;
              border: 1px solid #e2e8f0;
            }
            .info-item {
              display: flex;
              font-size: 13px;
              line-height: 1.6;
            }
            .info-label {
              font-weight: 700;
              width: 110px;
              color: #334155;
            }
            .info-value {
              color: #0f172a;
              font-weight: 500;
            }
            table {
              width: calc(100% - 40px);
              margin: 20px;
              border-collapse: collapse;
              font-size: 12px;
              box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            th {
              background: #1e40af;
              color: white;
              padding: 12px 12px;
              text-align: left;
              font-weight: 600;
            }
            td {
              padding: 10px 12px;
              border-bottom: 1px solid #e2e8f0;
            }
            tr:nth-child(even) {
              background-color: #f8fafc;
            }
            .status-normal {
              color: #10b981;
              font-weight: 700;
            }
            .status-borderline {
              color: #f59e0b;
              font-weight: 700;
            }
            .clinical-box {
              background: #eff6ff;
              margin: 20px;
              padding: 18px 22px;
              border-radius: 10px;
              border-left: 5px solid #2563eb;
            }
            .clinical-box h4 {
              color: #1e3a8a;
              margin-bottom: 12px;
              font-size: 15px;
            }
            .clinical-box p {
              font-size: 13px;
              line-height: 1.5;
              color: #1e293b;
              font-style: italic;
            }
            .footer-signatures {
              display: flex;
              justify-content: space-between;
              margin: 35px 20px 25px;
              padding-top: 20px;
              border-top: 1px solid #cbd5e1;
            }
            .signature-block {
              text-align: left;
            }
            .signature-block p {
              margin: 3px 0;
              font-size: 12px;
            }
            .stamp-placeholder {
              width: 110px;
              height: 60px;
              border: 1px dashed #94a3b8;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #64748b;
              font-size: 9px;
              border-radius: 6px;
            }
            .footer-note {
              text-align: center;
              font-size: 9px;
              color: #64748b;
              padding: 15px 20px 25px;
              border-top: 1px solid #f1f5f9;
              margin-top: 10px;
            }
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              .report-container {
                box-shadow: none;
                border: none;
              }
              .badge-row, .info-grid, table, .clinical-box, .footer-signatures {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="report-container">
            <div class="header">
              <h1>LEVITICA HEALTHCARE</h1>
              <p>Diagnostic Laboratory Division | NABL Accredited | ISO 15189:2022</p>
              <p>Regional Centers: Mumbai | Delhi | Bangalore | Hyderabad</p>
            </div>
            
            <div class="badge-row">
              <span><strong>Report ID:</strong> ${report.id}</span>
              <span><strong>Issue Date:</strong> ${report.completionDate}</span>
              <span><strong>Access Code:</strong> ${report.accessCode}</span>
            </div>
            
            <div class="info-grid">
              <div class="info-item"><span class="info-label">Patient Name:</span><span class="info-value">${report.patientName}</span></div>
              <div class="info-item"><span class="info-label">Patient ID:</span><span class="info-value">${report.patientId}</span></div>
              <div class="info-item"><span class="info-label">Age / Gender:</span><span class="info-value">${report.age} yrs / ${report.gender}</span></div>
              <div class="info-item"><span class="info-label">Test Type:</span><span class="info-value">${report.testType}</span></div>
              <div class="info-item"><span class="info-label">Sample Date:</span><span class="info-value">${report.sampleCollectionDate || report.completionDate}</span></div>
              <div class="info-item"><span class="info-label">Ref. Physician:</span><span class="info-value">${report.referringDoctor || "Self Referred"}</span></div>
            </div>
            
            <table>
              <thead>
                <tr><th>Parameter</th><th>Result</th><th>Unit</th><th>Reference Range</th><th>Status</th></tr>
              </thead>
              <tbody>
                ${results
                  .map((result) => {
                    const statusClass =
                      result.status === "Normal"
                        ? "status-normal"
                        : "status-borderline";
                    return `<tr>
                    <td><strong>${result.parameter}</strong></td>
                    <td>${result.result}</td>
                    <td>${result.unit || "-"}</td>
                    <td>${result.reference}</td>
                    <td class="${statusClass}">${result.status.toUpperCase()} ${result.flag ? `(${result.flag})` : ""}</td>
                  </tr>`;
                  })
                  .join("")}
              </tbody>
            </table>
            
            <div class="clinical-box">
              <h4>Clinical Interpretation</h4>
              <p>“${impression}”</p>
            </div>
            
            <div class="footer-signatures">
              <div class="signature-block">
                <p><strong>Verified & Released By:</strong></p>
                <p>${report.verifiedBy || "Medical Superintendent"}</p>
                <p style="font-size:10px; color:#475569;">Consultant Pathologist, Reg No: MC202488</p>
              </div>
              <div class="stamp-placeholder">Official Stamp</div>
              <div class="signature-block">
                <p><strong>Digital Authentication:</strong></p>
                <p>Dr. Senior Consultant</p>
                <p style="font-size:10px; color:#475569;">Lab Director | ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div class="footer-note">
              <p><strong>IMPORTANT DISCLAIMER:</strong> This is a digitally verified medical report. Results should be clinically correlated by a registered medical practitioner.</p>
              <p>Support: lab@levitica.com | Emergency: +91-22-1234-5678 | www.levitica.com</p>
              <p>© ${new Date().getFullYear()} Levitica Healthcare Pvt. Ltd. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  // Fixed PDF generation with improved html2pdf settings and full inline styles
  const handleDownloadReport = async (reportId, format = "PDF") => {
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    setShowDownloadProgress(true);
    setDownloadProgress(0);

    try {
      const testData = getTestResults(report.testType);
      const fullHtml = generateFullPrintHTML(report, testData);

      // Create a temporary iframe to render the HTML and capture it for PDF
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.left = "-9999px";
      iframe.style.top = "-9999px";
      iframe.style.width = "800px";
      iframe.style.height = "1100px";
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(fullHtml);
      iframeDoc.close();

      // Wait for images/fonts to settle
      await new Promise((resolve) => setTimeout(resolve, 500));

      const element = iframeDoc.body;

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${report.id}_Lab_Report.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };

      let progressInterval = setInterval(() => {
        setDownloadProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 200);

      await html2pdf().set(opt).from(element).save();

      clearInterval(progressInterval);
      setDownloadProgress(100);

      setTimeout(() => {
        setShowDownloadProgress(false);
        document.body.removeChild(iframe);
        setToast({
          message: `Report downloaded successfully: ${report.id}`,
          type: "success",
        });
      }, 600);
    } catch (error) {
      console.error("PDF generation error:", error);
      setShowDownloadProgress(false);
      setToast({
        message: "Failed to generate PDF. Please try again.",
        type: "error",
      });
    }
  };

  const renderReportContent = () => {
    if (!currentReport) return null;
    const testData = getTestResults(currentReport.testType);
    const results = testData.results;
    const impression = testData.impression;

    return (
      <div
        id="report-content"
        style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
      >
        <div
          style={{
            textAlign: "center",
            borderBottom: "2px solid #1a56db",
            paddingBottom: "15px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#1a56db", margin: 0 }}>LEVITICA HEALTHCARE</h2>
          <p style={{ margin: "5px 0", fontSize: "11px", color: "#666" }}>
            Diagnostic Laboratory Division | NABL Accredited
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#f3f4f6",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <span>
            <strong>Report ID:</strong> {currentReport.id}
          </span>
          <span>
            <strong>Date:</strong> {currentReport.completionDate}
          </span>
          <span>
            <strong>Access:</strong> {currentReport.accessCode}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            marginBottom: "20px",
            padding: "15px",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
          }}
        >
          <div>
            <strong>Patient:</strong> {currentReport.patientName}
          </div>
          <div>
            <strong>ID:</strong> {currentReport.patientId}
          </div>
          <div>
            <strong>Age/Gender:</strong> {currentReport.age || "N/A"} /{" "}
            {currentReport.gender || "N/A"}
          </div>
          <div>
            <strong>Test Type:</strong> {currentReport.testType}
          </div>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#1a56db", color: "white" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>Parameter</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Result</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Unit</th>
              <th style={{ padding: "8px", textAlign: "left" }}>
                Reference Range
              </th>
              <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "8px" }}>
                  <strong>{result.parameter}</strong>
                </td>
                <td style={{ padding: "8px" }}>{result.result}</td>
                <td style={{ padding: "8px" }}>{result.unit}</td>
                <td style={{ padding: "8px" }}>{result.reference}</td>
                <td
                  style={{
                    padding: "8px",
                    color: result.status === "Normal" ? "#10b981" : "#f59e0b",
                    fontWeight: "bold",
                  }}
                >
                  {result.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            background: "#eff6ff",
            padding: "15px",
            borderLeft: "4px solid #1a56db",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", color: "#1e3a8a" }}>
            Clinical Interpretation
          </h4>
          <p style={{ margin: 0, fontSize: "13px" }}>{impression}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #ddd",
          }}
        >
          <div>
            <strong>Verified By:</strong>
            <br />
            {currentReport.verifiedBy || "Pending Verification"}
            <br />
            <span style={{ fontSize: "10px" }}>Consultant Pathologist</span>
          </div>
          <div>
            <strong>Lab Director:</strong>
            <br />
            Dr. Senior Consultant
            <br />
            <span style={{ fontSize: "10px" }}>Digital Signature</span>
          </div>
        </div>
      </div>
    );
  };

  const handleShareReport = (reportId) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      const shareLink = `https://lab.levitica.com/view-report/${report.accessCode}`;
      navigator.clipboard.writeText(shareLink);
      setToast({ message: "Share link copied to clipboard!", type: "info" });
      setCurrentReport(report);
      setShowShareModal(true);
    }
  };

  const handleVerifyReport = (reportId) => {
    const report = reports.find((r) => r.id === reportId);
    if (report && report.status !== "Ready") {
      setReports(
        reports.map((r) =>
          r.id === reportId
            ? { ...r, status: "Ready", verifiedBy: "Dr. Current User" }
            : r,
        ),
      );
      setToast({
        message: `Report ${reportId} verified for release`,
        type: "success",
      });
    }
  };

  const handleSelectReport = (reportId) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter((id) => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  const handleBulkPrint = () => {
    if (selectedReports.length > 0) {
      setToast({
        message: `Initiating print for ${selectedReports.length} reports...`,
        type: "info",
      });
      selectedReports.forEach((reportId) => {
        handlePrintReport(reportId);
      });
      setSelectedReports([]);
    } else {
      setToast({ message: "Please select reports to print", type: "warning" });
    }
  };

  const handleBulkDownload = () => {
    if (selectedReports.length > 0) {
      setToast({
        message: `Processing batch download for ${selectedReports.length} reports...`,
        type: "info",
      });
      selectedReports.forEach((reportId, index) => {
        setTimeout(() => {
          handleDownloadReport(reportId);
        }, index * 1000);
      });
      setSelectedReports([]);
    } else {
      setToast({
        message: "Please select reports to download",
        type: "warning",
      });
    }
  };

  const filteredReports = reports.filter(
    (report) =>
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.testType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Report Generation
            </h2>
            <p className="text-gray-500">
              Generate, preview, and manage lab test reports
            </p>
          </div>
          <div className="flex gap-3">
            {selectedReports.length > 0 && (
              <>
                <Button
                  variant="outline"
                  icon="fas fa-print"
                  onClick={handleBulkPrint}
                >
                  Bulk Print ({selectedReports.length})
                </Button>
                <Button
                  variant="outline"
                  icon="fas fa-download"
                  onClick={handleBulkDownload}
                >
                  Bulk Download
                </Button>
              </>
            )}
            <Button
              variant="primary"
              icon="fas fa-file-medical"
              onClick={() => setShowGenerateModal(true)}
            >
              Generate Report
            </Button>
          </div>
        </div>

        {/* Report Templates */}
        <div className="bg-white p-4 rounded border card-shadow">
          <h3 className="text-lg font-semibold mb-3">Report Templates</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Standard",
              "Comprehensive",
              "Doctor Summary",
              "Patient Friendly",
              "Custom",
            ].map((temp) => (
              <button
                key={temp}
                className={`px-4 py-2 rounded-lg border ${
                  template === temp.toLowerCase()
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setTemplate(temp.toLowerCase())}
              >
                {temp}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded border shadow-sm">
          <SearchBar
            placeholder="Search by patient name, report ID, or test type..."
            onSearch={handleSearch}
            className="w-full"
          />
        </div>

        <div className="bg-white rounded border shadow-sm overflow-hidden">
          <DataTable
            columns={[
              {
                key: "select",
                title: "",
                render: (_, row) => (
                  <input
                    type="checkbox"
                    checked={selectedReports.includes(row.id)}
                    onChange={() => handleSelectReport(row.id)}
                    className="rounded"
                    onClick={(e) => e.stopPropagation()}
                  />
                ),
              },
              { key: "id", title: "Report ID", sortable: true },
              { key: "patientName", title: "Patient", sortable: true },
              { key: "testType", title: "Test Type", sortable: true },
              {
                key: "completionDate",
                title: "Completion Date",
                sortable: true,
              },
              {
                key: "status",
                title: "Status",
                sortable: true,
                render: (value) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      value === "Ready"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
              { key: "verifiedBy", title: "Verified By", sortable: true },
              {
                key: "actions",
                title: "Actions",
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviewReport(row);
                      }}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrintReport(row.id);
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                      <i className="fas fa-print"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadReport(row.id);
                      }}
                      className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    {row.status !== "Ready" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerifyReport(row.id);
                        }}
                        className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                      >
                        <i className="fas fa-check"></i>
                      </button>
                    )}
                  </div>
                ),
              },
            ]}
            data={filteredReports}
            onRowClick={(report) => handlePreviewReport(report)}
            emptyMessage="No reports available. Generate reports from completed tests."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded border shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <i className="fas fa-file-pdf text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Reports</p>
                <p className="text-2xl font-bold text-blue-600">
                  {reports.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded border shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <i className="fas fa-check-circle text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Ready Reports</p>
                <p className="text-2xl font-bold text-green-600">
                  {reports.filter((r) => r.status === "Ready").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded border shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <i className="fas fa-clock text-yellow-600 text-xl"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {reports.filter((r) => r.status === "Pending Review").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded border shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <i className="fas fa-flask text-purple-600 text-xl"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Test Types</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(reports.map((r) => r.testType)).size}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Report Preview"
        size="lg"
      >
        {currentReport && (
          <div>
            {renderReportContent()}
            <div className="flex justify-end gap-3 pt-6 border-t mt-6 no-print">
              <Button
                variant="outline"
                onClick={() => setShowPreviewModal(false)}
              >
                Close
              </Button>
              <Button
                variant="outline"
                icon="fas fa-print"
                onClick={() => handlePrintReport(currentReport.id)}
              >
                Print
              </Button>
              <Button
                variant="outline"
                icon="fas fa-download"
                onClick={() => handleDownloadReport(currentReport.id)}
              >
                Download PDF
              </Button>
              <Button
                variant="primary"
                icon="fas fa-share-alt"
                onClick={() => handleShareReport(currentReport.id)}
              >
                Share Report
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Select Test for Report Generation"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            The following tests are ready for report generation:
          </p>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr className="text-xs uppercase text-gray-500">
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Test Type</th>
                  <th className="px-4 py-3">Completed On</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pendingTests.map((test) => (
                  <tr key={test.id} className="hover:bg-blue-50">
                    <td className="px-4 py-4">
                      <p className="font-bold">{test.patientName}</p>
                      <p className="text-xs text-gray-400">{test.patientId}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {test.testType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">{test.sampleDate}</td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleGenerateReport(test)}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                      >
                        Generate Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setShowGenerateModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Lab Report"
        size="md"
      >
        {currentReport && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-file-pdf text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Report Reference</p>
                <p className="font-bold">{currentReport.id}</p>
                <p className="text-sm text-gray-500">
                  {currentReport.patientName}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://lab.levitica.com/view-report/${currentReport.accessCode}`,
                  );
                  setToast({ message: "Link copied!", type: "success" });
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-3 p-4 border rounded-2xl hover:bg-blue-50"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-link text-blue-600"></i>
                </div>
                <span className="text-sm font-semibold">Copy Link</span>
              </button>
              <button
                onClick={() => {
                  setToast({
                    message: `Email sent to ${currentReport.patientName}`,
                    type: "success",
                  });
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-3 p-4 border rounded-2xl hover:bg-purple-50"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-purple-600"></i>
                </div>
                <span className="text-sm font-semibold">Email Patient</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showDownloadProgress}
        onClose={() => setShowDownloadProgress(false)}
        title="Exporting Report"
        size="sm"
      >
        <div className="py-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * downloadProgress) / 100}
                className="text-blue-600 transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-blue-600">
              {Math.round(downloadProgress)}%
            </div>
          </div>
          <p className="font-bold">Preparing PDF Report</p>
          <p className="text-xs text-gray-400 mt-1">
            Please wait while we generate your document...
          </p>
        </div>
      </Modal>

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

export default ReportGeneration;