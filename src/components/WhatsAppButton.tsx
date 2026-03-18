import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // Replace this with your actual phone number (include country code, no + or spaces)
  const phoneNumber = "254742776921"; 
  const message = "Hello Bamboo Woods! I would like to know more about...";
  
  // This automatically formats the spaces in your message for the web
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      // Notice: No animate-pulse or animate-bounce here. Just a clean hover effect!
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-[#25D366] hover:bg-[#20bd5c] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;