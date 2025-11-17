import React, { useState } from 'react';

const NursingNotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState({
    patient: '',
    noteType: 'Routine Observation',
    observation: '',
    details: '',
    priority: 'Low',
    followUp: 'No'
  });

  const nursingNotes = [
    {
      id: 1,
      title: "Patient complained of mild headache",
      details: "Patient reported mild headache. Administered Tylenol 500mg as ordered. Will monitor for improvement.",
      patient: "Patient 1",
      type: "Routine Observation",
      nurse: "Nurse: Kavya",
      date: new Date().toLocaleDateString(),
      priority: "routine"
    },
    {
      id: 2,
      title: "Blood sugar levels elevated",
      details: "Blood sugar levels elevated at 280 mg/dL. Notified Dr. Johnson and administered insulin as ordered.",
      patient: "Patient 2",
      type: "Critical Finding",
      nurse: "Nurse: Kavya",
      date: new Date().toLocaleDateString(),
      priority: "critical"
    },
    {
      id: 3,
      title: "Patient resting comfortably",
      details: "Patient resting comfortably. Vital signs stable. Family visited during visiting hours.",
      patient: "Patient 3",
      type: "Follow-up",
      nurse: "Nurse: Kavya",
      date: new Date().toLocaleDateString(),
      priority: "improving"
    },
    {
      id: 4,
      title: "Dressing change completed",
      details: "Dressing change completed on surgical site. Wound appears clean with minimal drainage.",
      patient: "Patient 4",
      type: "Medication Administration",
      nurse: "Nurse: Kavya",
      date: new Date().toLocaleDateString(),
      priority: "routine"
    },
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'routine': return 'status-stable';
      case 'critical': return 'status-critical';
      case 'improving': return 'status-improving';
      default: return 'status-stable';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'routine': return 'Routine';
      case 'critical': return 'Critical';
      case 'improving': return 'Follow-up';
      default: return 'Routine';
    }
  };

  const filteredNotes = nursingNotes.filter(note =>
    note.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitNote = (e) => {
    e.preventDefault();
    if (newNote.observation && newNote.details) {
      alert('Nursing note saved successfully!');
      setNewNote({
        patient: '',
        noteType: 'Routine Observation',
        observation: '',
        details: '',
        priority: 'Low',
        followUp: 'No'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">📝 Nursing Notes & Observations</h2>

      {/* Notes List */}
      <div className="bg-white p-4 border rounded card-shadow space-y-3">
        {filteredNotes.map(note => (
          <div key={note.id} className="border-b pb-2 fade-in">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-blue-700">{note.title.slice(0,25)}...</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(note.priority)}`}>
                {getPriorityText(note.priority)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{note.details.slice(0,80)}...</p>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400"><i className="fas fa-user-nurse mr-1"></i>{note.nurse}</p>
              <p className="text-xs text-gray-400">{note.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Nursing Note Form */}
      <div className="bg-white p-4 border rounded card-shadow">
        <h3 className="text-lg font-semibold mb-3">Add New Nursing Note</h3>
        <form onSubmit={handleSubmitNote} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select 
                value={newNote.patient}
                onChange={(e) => setNewNote({...newNote, patient: e.target.value})}
                className="w-full border rounded p-2"
              >
                <option value="">Select Patient</option>
                <option value="Patient 1">Patient 1</option>
                <option value="Patient 2">Patient 2</option>
                <option value="Patient 3">Patient 3</option>
                <option value="Patient 4">Patient 4</option>
                <option value="Patient 5">Patient 5</option>
                <option value="Patient 6">Patient 6</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note Type</label>
              <select 
                value={newNote.noteType}
                onChange={(e) => setNewNote({...newNote, noteType: e.target.value})}
                className="w-full border rounded p-2"
              >
                <option value="Routine Observation">Routine Observation</option>
                <option value="Medication Administration">Medication Administration</option>
                <option value="Vital Signs">Vital Signs</option>
                <option value="Patient Education">Patient Education</option>
                <option value="Incident Report">Incident Report</option>
                <option value="Critical Finding">Critical Finding</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observation</label>
            <input 
              type="text" 
              value={newNote.observation}
              onChange={(e) => setNewNote({...newNote, observation: e.target.value})}
              className="w-full border rounded p-2" 
              placeholder="Enter observation title" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
            <textarea 
              value={newNote.details}
              onChange={(e) => setNewNote({...newNote, details: e.target.value})}
              className="w-full border rounded p-2" 
              rows="4" 
              placeholder="Enter detailed notes" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                value={newNote.priority}
                onChange={(e) => setNewNote({...newNote, priority: e.target.value})}
                className="w-full border rounded p-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Required</label>
              <select 
                value={newNote.followUp}
                onChange={(e) => setNewNote({...newNote, followUp: e.target.value})}
                className="w-full border rounded p-2"
              >
                <option value="No">No</option>
                <option value="Yes - Next Shift">Yes - Next Shift</option>
                <option value="Yes - Today">Yes - Today</option>
                <option value="Yes - Immediately">Yes - Immediately</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <i className="fas fa-save mr-1"></i>Save Note
            </button>
            <button 
              type="button" 
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => setNewNote({
                patient: '',
                noteType: 'Routine Observation',
                observation: '',
                details: '',
                priority: 'Low',
                followUp: 'No'
              })}
            >
              <i className="fas fa-times mr-1"></i>Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Search */}
      <div className="block md:hidden bg-white p-4 border rounded card-shadow">
        <input
          type="text"
          placeholder="Search nursing notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded p-2 text-sm"
        />
      </div>
    </div>
  );
};

export default NursingNotes;