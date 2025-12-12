import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'

const Messages = () => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    setLoading(true)
    setTimeout(() => {
      setMessages([
        {
          id: 'MSG-001',
          doctor: 'Dr. Meena Rao',
          department: 'Cardiology',
          lastMessage: 'Your test results look good. Continue with the medication.',
          time: 'Today, 10:30 AM',
          unread: false,
          messages: [
            { id: 1, sender: 'doctor', text: 'Hello Ravi, how are you feeling today?', time: '10:00 AM' },
            { id: 2, sender: 'patient', text: 'I\'m feeling better, doctor. The dizziness has reduced.', time: '10:15 AM' },
            { id: 3, sender: 'doctor', text: 'That\'s good to hear. Your test results look good. Continue with the medication.', time: '10:30 AM' }
          ]
        },
        {
          id: 'MSG-002',
          doctor: 'Dr. Sharma',
          department: 'Orthopedics',
          lastMessage: 'Don\'t forget to do the exercises I showed you.',
          time: 'Yesterday, 3:45 PM',
          unread: true,
          messages: [
            { id: 1, sender: 'doctor', text: 'How is your knee pain?', time: 'Yesterday, 3:00 PM' },
            { id: 2, sender: 'patient', text: 'It\'s better when I rest, but still painful when walking.', time: 'Yesterday, 3:30 PM' },
            { id: 3, sender: 'doctor', text: 'Don\'t forget to do the exercises I showed you. That will help with recovery.', time: 'Yesterday, 3:45 PM' }
          ]
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor)
    // Mark as read when opening conversation
    setMessages(prev => prev.map(msg => 
      msg.id === doctor.id ? { ...msg, unread: false } : msg
    ))
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedDoctor) return
    
    const updatedMessages = messages.map(doctor => {
      if (doctor.id === selectedDoctor.id) {
        return {
          ...doctor,
          lastMessage: newMessage,
          time: 'Just now',
          messages: [
            ...doctor.messages,
            { id: doctor.messages.length + 1, sender: 'patient', text: newMessage, time: 'Just now' }
          ]
        }
      }
      return doctor
    })
    
    setMessages(updatedMessages)
    setNewMessage('')
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="h-[calc(100vh-8rem)] animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">💬 Messages</h2>
        <p className="text-gray-500 text-sm mt-1">Chat with your healthcare providers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Doctors List */}
        <div className="bg-white rounded-xl card-shadow border p-6 lg:col-span-1 overflow-hidden flex flex-col">
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Your Doctors</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="fas fa-search absolute right-3 top-2.5 text-gray-400"></i>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map(doctor => (
              <div
                key={doctor.id}
                onClick={() => handleSelectDoctor(doctor)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedDoctor?.id === doctor.id 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-user-md text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{doctor.doctor}</p>
                      <p className="text-sm text-gray-600">{doctor.department}</p>
                    </div>
                  </div>
                  {doctor.unread && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 truncate">{doctor.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">{doctor.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-xl card-shadow border p-6 lg:col-span-2 flex flex-col">
          {selectedDoctor ? (
            <>
              {/* Chat Header */}
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-user-md text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedDoctor.doctor}</p>
                      <p className="text-sm text-gray-600">{selectedDoctor.department}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:text-gray-800">
                      <i className="fas fa-phone"></i>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800">
                      <i className="fas fa-video"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {selectedDoctor.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                      message.sender === 'patient' 
                        ? 'bg-blue-100 text-blue-800 rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-75">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t pt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message here..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    <i className="fas fa-paperclip"></i>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    <i className="fas fa-camera"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-comments text-blue-500 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a doctor to start chatting</h3>
              <p className="text-gray-500">Choose a healthcare provider from the list to send messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages