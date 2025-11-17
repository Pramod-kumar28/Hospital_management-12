// import React, { useState, useEffect } from 'react'
// import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

// const Messaging = () => {
//   const [loading, setLoading] = useState(true)
//   const [messages, setMessages] = useState([])
//   const [newMessage, setNewMessage] = useState('')
//   const [selectedRecipient, setSelectedRecipient] = useState('')

//   useEffect(() => {
//     loadMessages()
//   }, [])

//   const loadMessages = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setMessages([
//         { id: 1, from: "Nurse Kavya", message: "Patient in bed 101 needs pain medication", time: "10:15 AM", read: false },
//         { id: 2, from: "Reception", message: "New appointment request from Priya Singh", time: "09:30 AM", read: true },
//         { id: 3, from: "Dr. Sharma", message: "Can you consult on the CT scan for patient in 205?", time: "Yesterday", read: true }
//       ])
//       setLoading(false)
//     }, 1000)
//   }

//   const handleSendMessage = (e) => {
//     e.preventDefault()
//     if (!newMessage.trim() || !selectedRecipient) return
    
//     // In real app, this would send to backend
//     console.log('Sending message:', { to: selectedRecipient, message: newMessage })
//     setNewMessage('')
//     setSelectedRecipient('')
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="animate-fade-in">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-6">Messaging & Notifications</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-4 border rounded card-shadow lg:col-span-2">
//           <h3 className="text-lg font-semibold mb-3">Recent Messages</h3>
//           <div className="space-y-3">
//             {messages.map(msg => (
//               <div key={msg.id} className={`flex items-start p-3 border rounded hover:bg-gray-50 ${
//                 !msg.read ? 'bg-blue-50' : ''
//               }`}>
//                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
//                   <i className="fas fa-user text-blue-600"></i>
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <p className="font-medium">{msg.from}</p>
//                     <span className="text-xs text-gray-500">{msg.time}</span>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
//                 </div>
//                 {!msg.read && (
//                   <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0"></span>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* New Message Form */}
//           <div className="mt-6 p-3 border rounded bg-gray-50">
//             <h4 className="font-medium mb-2">Send New Message</h4>
//             <form onSubmit={handleSendMessage} className="space-y-3">
//               <select 
//                 value={selectedRecipient}
//                 onChange={(e) => setSelectedRecipient(e.target.value)}
//                 className="w-full border rounded p-2"
//                 required
//               >
//                 <option value="">Select Recipient</option>
//                 <option value="nurse-kavya">Nurse Kavya</option>
//                 <option value="reception">Reception</option>
//                 <option value="dr-sharma">Dr. Sharma</option>
//                 <option value="dr-patel">Dr. Patel</option>
//               </select>
//               <textarea 
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="w-full border rounded p-2" 
//                 rows="3" 
//                 placeholder="Type your message here..."
//                 required
//               ></textarea>
//               <button 
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//               >
//                 <i className="fas fa-paper-plane mr-1"></i> Send Message
//               </button>
//             </form>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 border rounded card-shadow">
//           <h3 className="text-lg font-semibold mb-3">Quick Contacts</h3>
//           <div className="space-y-3">
//             {[
//               { name: "Nurse Kavya", role: "Ward Nurse", icon: "user-nurse", color: "blue" },
//               { name: "Dr. Sharma", role: "Cardiology", icon: "user-md", color: "green" },
//               { name: "Reception", role: "Front Desk", icon: "user-tie", color: "purple" },
//               { name: "Dr. Patel", role: "Orthopedics", icon: "user-md", color: "yellow" }
//             ].map((contact, index) => (
//               <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
//                 <div className={`w-10 h-10 bg-${contact.color}-100 rounded-full flex items-center justify-center mr-3`}>
//                   <i className={`fas fa-${contact.icon} text-${contact.color}-600`}></i>
//                 </div>
//                 <div>
//                   <p className="font-medium">{contact.name}</p>
//                   <p className="text-xs text-gray-500">{contact.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Notification Settings */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-3">Notification Settings</h3>
//             <div className="space-y-2">
//               {[
//                 { label: "Appointment Reminders", checked: true },
//                 { label: "Lab Results", checked: true },
//                 { label: "Messages", checked: true },
//                 { label: "Emergency Alerts", checked: true }
//               ].map((setting, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <span className="text-sm">{setting.label}</span>
//                   <input 
//                     type="checkbox" 
//                     defaultChecked={setting.checked}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Messaging
















import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

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
          fromId: "nurse-kavya",
          message: "Patient in bed 101 needs pain medication", 
          time: "10:15 AM", 
          timestamp: new Date().setHours(10, 15, 0),
          read: false,
          type: "incoming"
        },
        { 
          id: 2, 
          from: "Reception", 
          fromId: "reception",
          message: "New appointment request from Priya Singh", 
          time: "09:30 AM", 
          timestamp: new Date().setHours(9, 30, 0),
          read: true,
          type: "incoming"
        },
        { 
          id: 3, 
          from: "Dr. Sharma", 
          fromId: "dr-sharma",
          message: "Can you consult on the CT scan for patient in 205?", 
          time: "Yesterday", 
          timestamp: new Date().setDate(new Date().getDate() - 1),
          read: true,
          type: "incoming"
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedRecipient) return
    
    const recipient = contacts.find(contact => contact.id === selectedRecipient)
    
    // Add to sent messages
    const sentMessage = {
      id: Date.now(),
      to: recipient.name,
      toId: recipient.id,
      message: newMessage,
      time: "Just now",
      timestamp: new Date(),
      type: "outgoing"
    }
    
    setSentMessages(prev => [sentMessage, ...prev])
    
    // Simulate reply after delay
    setTimeout(() => {
      const replies = {
        'nurse-kavya': 'Noted. Will administer medication shortly.',
        'dr-sharma': 'Thanks, I will review the CT scan.',
        'reception': 'Received. Will process the request.',
        'dr-patel': 'Understood. Will follow up.'
      }
      
      const replyMessage = {
        id: Date.now() + 1,
        from: recipient.name,
        fromId: recipient.id,
        message: replies[selectedRecipient] || 'Thank you for your message.',
        time: "Just now",
        timestamp: new Date(),
        read: false,
        type: "incoming"
      }
      
      setMessages(prev => [replyMessage, ...prev])
    }, 2000)
    
    setNewMessage('')
    setSelectedRecipient('')
  }

  const handleMarkAsRead = (messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    )
  }

  const handleContactClick = (contactId) => {
    setSelectedRecipient(contactId)
    // Focus on message input
    setTimeout(() => {
      document.querySelector('textarea')?.focus()
    }, 100)
  }

  const handleNotificationSettingChange = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const messageTime = new Date(timestamp)
    const diffInHours = (now - messageTime) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return messageTime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  const allMessages = [...messages, ...sentMessages].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">💬 Messaging & Notifications</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages Section */}
        <div className="bg-white p-4 border rounded card-shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-3">Recent Messages</h3>
          
          {/* Messages List */}
          <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
            {allMessages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex items-start p-3 border rounded hover:bg-gray-50 cursor-pointer transition-colors ${
                  !msg.read && msg.type === 'incoming' ? 'bg-blue-50 border-blue-200' : ''
                } ${msg.type === 'outgoing' ? 'bg-green-50 border-green-200' : ''}`}
                onClick={() => msg.type === 'incoming' && !msg.read && handleMarkAsRead(msg.id)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                  msg.type === 'outgoing' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <i className={`fas ${msg.type === 'outgoing' ? 'fa-arrow-right text-green-600' : 'fa-user text-blue-600'}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">
                      {msg.type === 'outgoing' ? `To: ${msg.to}` : msg.from}
                    </p>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 break-words">{msg.message}</p>
                </div>
                {msg.type === 'incoming' && !msg.read && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0 mt-2"></span>
                )}
              </div>
            ))}
            
            {allMessages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-comments text-3xl mb-2"></i>
                <p>No messages yet</p>
              </div>
            )}
          </div>

          {/* New Message Form */}
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h4 className="font-medium mb-3">Send New Message</h4>
            <form onSubmit={handleSendMessage} className="space-y-3">
              <select 
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select Recipient</option>
                {contacts.map(contact => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name} - {contact.role}
                  </option>
                ))}
              </select>
              <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                rows="3" 
                placeholder="Type your message here..."
                required
              ></textarea>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newMessage.trim() || !selectedRecipient}
              >
                <i className="fas fa-paper-plane mr-2"></i> 
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* Contacts & Settings Sidebar */}
        <div className="space-y-6">
          {/* Quick Contacts */}
          <div className="bg-white p-4 border rounded card-shadow">
            <h3 className="text-lg font-semibold mb-3">Quick Contacts</h3>
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div 
                  key={contact.id}
                  onClick={() => handleContactClick(contact.id)}
                  className={`flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer transition-colors ${
                    selectedRecipient === contact.id ? 'bg-blue-50 border border-blue-200' : ''
                  }`}
                >
                  <div className={`w-10 h-10 bg-${contact.color}-100 rounded-full flex items-center justify-center mr-3`}>
                    <i className={`fas fa-${contact.icon} text-${contact.color}-600`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.role}</p>
                  </div>
                  {selectedRecipient === contact.id && (
                    <i className="fas fa-check text-green-500 ml-2"></i>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-4 border rounded card-shadow">
            <h3 className="text-lg font-semibold mb-3">Notification Settings</h3>
            <div className="space-y-3">
              {[
                { key: 'appointmentReminders', label: "Appointment Reminders", icon: "calendar-check" },
                { key: 'labResults', label: "Lab Results", icon: "flask" },
                { key: 'messages', label: "Messages", icon: "comments" },
                { key: 'emergencyAlerts', label: "Emergency Alerts", icon: "exclamation-triangle" }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center">
                    <i className={`fas fa-${setting.icon} text-gray-400 mr-3 w-5 text-center`}></i>
                    <span className="text-sm">{setting.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings[setting.key]}
                      onChange={(e) => handleNotificationSettingChange(setting.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
            
            {/* Notification Status */}
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Notifications are</span>
                <span className={`font-medium ${
                  Object.values(notificationSettings).some(setting => setting) 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {Object.values(notificationSettings).some(setting => setting) 
                    ? 'Enabled' 
                    : 'Disabled'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messaging