export const botReplies = (message) => {
  const text = message.toLowerCase();
 
  if (text.includes("hello") || text.includes("hi")) {
    return "Hi 👋 How can I help you today?";
  }
 
  if (text.includes("hostel")) {
    return "We help manage hostels, PGs, bookings, rent & complaints.";
  }
 
  if (text.includes("contact")) {
    return "You can contact us at support@hostelapp.com 📧";
  }
 
  if (text.includes("price") || text.includes("cost")) {
    return "Pricing depends on hostel size. Please contact our team 💼";
  }
 
  return "I'm not sure 🤔 Can you please rephrase?";
};