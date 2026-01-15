import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots, FaEraser } from "react-icons/fa";
import "./ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I am Baran's AI Assistant. 🤖", 
      sender: "bot" 
    },
    { 
      id: 2, 
      text: "Here are some topics you can ask me about:\n\n🔹 Skills\n🔹 Projects\n🔹 Education\n🔹 Experience\n🔹 Contact\n\nJust type a keyword!", 
      sender: "bot" 
    }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping, isOpen]);

  const getBotResponse = (msg) => {
    const lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) 
      return "Hi there! How can I help you today?";
    
    if (lowerMsg.includes("skill") || lowerMsg.includes("tech") || lowerMsg.includes("stack")) 
      return "Baran is proficient in:\n• Python & AI\n• React & Tauri\n• C# & .NET\n• SQL & MongoDB";
    
    if (lowerMsg.includes("education") || lowerMsg.includes("university") || lowerMsg.includes("school"))
      return "Baran is a 4th-year Computer Engineering student at Topkapı University with a full scholarship. 🎓";

    if (lowerMsg.includes("experience") || lowerMsg.includes("work") || lowerMsg.includes("job"))
      return "He has 3 years of experience in an Accounting Office (Data/Docs) and recently worked as a Customer Representative.";

    if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("mail")) 
      return "You can reach him at: baransafataskin@gmail.com 📧";
    
    if (lowerMsg.includes("project")) 
      return "Key Projects:\n1. Stock Price Prediction (AI)\n2. Hospital Appointment System (C#)\n3. This Portfolio (Tauri/React)";

    if (lowerMsg.includes("help") || lowerMsg.includes("menu"))
      return "Available commands:\n🔹 Skills\n🔹 Projects\n🔹 Education\n🔹 Experience\n🔹 Contact";

    return "I'm not sure about that. Try asking about 'Help' or 'Menu'.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (input.trim().toLowerCase() === "clear") {
      setMessages([
        { id: Date.now(), text: "Chat history cleared. How can I help? 🧹", sender: "bot" }
      ]);
      setInput("");
      return;
    }

    const newMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getBotResponse(newMsg.text);
      const botMsg = { id: Date.now() + 1, text: responseText, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200); 
  };

  return (
    <>
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <FaCommentDots />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-title">
              <FaRobot />
              <span>DevBot AI</span>
            </div>
            <div className="header-controls">
                <button onClick={() => setMessages([{ id: 1, text: "Chat cleared.", sender: "bot" }])} title="Clear Chat" style={{marginRight:'10px'}}>
                    <FaEraser />
                </button>
                <button onClick={() => setIsOpen(false)}><FaTimes /></button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="bubble" style={{whiteSpace: 'pre-line'}}>{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <div className="bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type 'Help' for commands..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit"><FaPaperPlane /></button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;