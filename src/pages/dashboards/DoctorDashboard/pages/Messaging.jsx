import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const Messaging = () => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState('')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    setLoading(true)
    setTimeout(() => {
      setMessages([
        { id: 1, from: "Nurse Kavya", message: "Patient in bed 101 needs pain medication", time: "10:15 AM", read: false },
        { id: 2, from: "Reception", message: "New appointment request from Priya Singh", time: "09:30 AM", read: true },
        { id: 3, from: "Dr. Sharma", message: "Can you consult on the CT scan for patient in 205?", time: "Yesterday", read: true }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedRecipient) return
    
    // In real app, this would send to backend
    console.log('Sending message:', { to: selectedRecipient, message: newMessage })
    setNewMessage('')
    setSelectedRecipient('')
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Messaging & Notifications</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 border rounded card-shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-3">Recent Messages</h3>
          <div className="space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-start p-3 border rounded hover:bg-gray-50 ${
                !msg.read ? 'bg-blue-50' : ''
              }`}>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-user text-blue-600"></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{msg.from}</p>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                </div>
                {!msg.read && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0"></span>
                )}
              </div>
            ))}
          </div>

          {/* New Message Form */}
          <div className="mt-6 p-3 border rounded bg-gray-50">
            <h4 className="font-medium mb-2">Send New Message</h4>
            <form onSubmit={handleSendMessage} className="space-y-3">
              <select 
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select Recipient</option>
                <option value="nurse-kavya">Nurse Kavya</option>
                <option value="reception">Reception</option>
                <option value="dr-sharma">Dr. Sharma</option>
                <option value="dr-patel">Dr. Patel</option>
              </select>
              <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full border rounded p-2" 
                rows="3" 
                placeholder="Type your message here..."
                required
              ></textarea>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                <i className="fas fa-paper-plane mr-1"></i> Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="bg-white p-4 border rounded card-shadow">
          <h3 className="text-lg font-semibold mb-3">Quick Contacts</h3>
          <div className="space-y-3">
            {[
              { name: "Nurse Kavya", role: "Ward Nurse", icon: "user-nurse", color: "blue" },
              { name: "Dr. Sharma", role: "Cardiology", icon: "user-md", color: "green" },
              { name: "Reception", role: "Front Desk", icon: "user-tie", color: "purple" },
              { name: "Dr. Patel", role: "Orthopedics", icon: "user-md", color: "yellow" }
            ].map((contact, index) => (
              <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className={`w-10 h-10 bg-${contact.color}-100 rounded-full flex items-center justify-center mr-3`}>
                  <i className={`fas fa-${contact.icon} text-${contact.color}-600`}></i>
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Notification Settings */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Notification Settings</h3>
            <div className="space-y-2">
              {[
                { label: "Appointment Reminders", checked: true },
                { label: "Lab Results", checked: true },
                { label: "Messages", checked: true },
                { label: "Emergency Alerts", checked: true }
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{setting.label}</span>
                  <input 
                    type="checkbox" 
                    defaultChecked={setting.checked}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
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