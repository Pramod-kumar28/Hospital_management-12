import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Messaging = () => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState('')
  const [notificationSettings, setNotificationSettings] = useState({
    appointmentReminders: true,
    labResults: true,
    messages: true,
    emergencyAlerts: true
  })
  const [sentMessages, setSentMessages] = useState([])

  const contacts = [
    { id: "nurse-kavya", name: "Nurse Kavya", role: "Ward Nurse", icon: "user-nurse", color: "blue" },
    { id: "dr-sharma", name: "Dr. Sharma", role: "Cardiology", icon: "user-md", color: "green" },
    { id: "reception", name: "Reception", role: "Front Desk", icon: "user-tie", color: "purple" },
    { id: "dr-patel", name: "Dr. Patel", role: "Orthopedics", icon: "user-md", color: "yellow" }
  ]

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    setLoading(true)
    setTimeout(() => {
      setMessages([
        { 
          id: 1, 
          from: "Nurse Kavya", 
          message: "Patient in bed 101 needs pain medication", 
          time: "10:15 AM", 
          read: false,
          type: "incoming"
        },
        { 
          id: 2, 
          from: "Reception", 
          message: "New appointment request from Priya Singh", 
          time: "9:30 AM", 
          read: true,
          type: "incoming"
        },
        { 
          id: 3, 
          from: "Dr. Sharma", 
          message: "Can you consult on the CT scan for patient in 205?", 
          time: "Yesterday", 
          read: true,
          type: "incoming"
        }
      ])
      setLoading(false)
    }, 800)
  }

  const initiateVideoCall = (contactName) => {
    toast.info(`Initiating video call with ${contactName}...`, { icon: "🎥" });
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedRecipient) return
    
    const recipient = contacts.find(contact => contact.id === selectedRecipient)
    
    const sentMsg = {
      id: Date.now(),
      to: recipient.name,
      message: newMessage,
      time: "Just now",
      type: "outgoing"
    }
    
    setSentMessages(prev => [sentMsg, ...prev])
    toast.success("Message dispatched");
    
    setNewMessage('')
    setSelectedRecipient('')
  }

  const handleMarkAsRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }

  const allMessages = [...messages, ...sentMessages].sort((a, b) => b.id - a.id)

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in bg-gray-50 min-h-screen">
      <ToastContainer position="bottom-right" theme="light" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Messages and Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Messages Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Recent Messages</h2>
            
            <div className="space-y-3">
              {allMessages.map(msg => (
                <div 
                  key={msg.id} 
                  onClick={() => msg.type === 'incoming' && handleMarkAsRead(msg.id)}
                  className={`relative flex items-center p-4 rounded-lg border transition-all cursor-pointer ${
                    msg.type === 'incoming' && !msg.read 
                      ? 'bg-blue-50 border-blue-100 shadow-sm' 
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-user text-blue-500 text-lg"></i>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-800">{msg.type === 'outgoing' ? `To: ${msg.to}` : msg.from}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{msg.time}</span>
                        {msg.type === 'incoming' && !msg.read && (
                          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1 truncate">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Send New Message Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Send New Message</h2>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <select 
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none appearance-none"
                style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em'}}
                required
              >
                <option value="">Select Recipient</option>
                {contacts.map(c => <option key={c.id} value={c.id}>{c.name} ({c.role})</option>)}
              </select>
              
              <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none" 
                rows="4" 
                placeholder="Type your message here..."
                required
              />
              
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full sm:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Contacts and Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-widest">Quick Contacts</h3>
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between group">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setSelectedRecipient(contact.id)}
                  >
                    <div className={`w-10 h-10 bg-${contact.color}-100 rounded-full flex items-center justify-center mr-3 text-${contact.color}-600`}>
                      <i className={`fas fa-${contact.icon}`}></i>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">{contact.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-medium">{contact.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => initiateVideoCall(contact.name)}
                    className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                  >
                    <i className="fas fa-video"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-widest">Notification Settings</h3>
            <div className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <button 
                    onClick={() => setNotificationSettings(prev => ({...prev, [key]: !value}))}
                    className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    <div className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform ${value ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Messaging