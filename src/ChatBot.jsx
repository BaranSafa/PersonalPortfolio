import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots, FaEraser } from "react-icons/fa";
import "./ChatBot.css";

const QUICK_REPLIES = ["Skills", "Projects", "Education", "Contact", "About"];

const getBotResponse = (msg) => {
  const m = msg.toLowerCase().trim();

  if (m.match(/^(hi|hello|hey|merhaba|selam)/))
    return "Hey! 👋 I'm Baran's AI assistant. Ask me about his skills, projects, education, or how to contact him!";

  if (m.includes("skill") || m.includes("tech") || m.includes("stack") || m.includes("language"))
    return "Baran's tech stack:\n\n🐍 Python & Machine Learning (90%)\n⚛️ React & JavaScript (80%)\n🌐 HTML / CSS / PHP (85%)\n🗄️ MySQL & MongoDB\n🔧 Git, C# / .NET\n\nCheck the Skills page for the full breakdown!";

  if (m.includes("project"))
    return "Featured projects:\n\n📈 Fin-TAP — Stock Price Prediction (LSTM)\n🧠 Brain Tumor MRI — CNN/Xception deep learning\n📝 Dynamic Blog — PHP + MySQL CRUD\n💼 This Portfolio — React + Tauri\n\nClick the Projects tab to explore them!";

  if (m.includes("education") || m.includes("university") || m.includes("school") || m.includes("degree"))
    return "🎓 Education:\n\n• Istanbul Topkapı University\n  Computer Engineering (English)\n  Full Scholarship · 2022–2026\n\n• Ümraniye Center Anatolian High School\n  2018–2022";

  if (m.includes("experience") || m.includes("work") || m.includes("job") || m.includes("career"))
    return "💼 Experience:\n\nAccounting Office – Office Staff (2021–2025)\nInvoice data entry, document tracking, and client file organization.";

  if (m.includes("contact") || m.includes("email") || m.includes("reach") || m.includes("mail"))
    return "📬 Contact Baran:\n\n✉️ baransafataskin@gmail.com\n📍 Ümraniye / İstanbul, Turkey\n📞 +90 552 258 64 36\n\nOr use the Contact page to send a message directly!";

  if (m.includes("github") || m.includes("linkedin") || m.includes("social"))
    return "🔗 Social links:\n\n• GitHub: github.com/BaranSafa\n• LinkedIn: linkedin.com/in/baransafataskin\n• Email: baransafataskin@gmail.com";

  if (m.includes("about") || m.includes("who") || m.includes("baran"))
    return "👤 Baran Safa Taşkın:\n\n4th-year Computer Engineering student at Istanbul Topkapı University with a full scholarship. Passionate about AI, ML, and modern web development.\n\n\"Programming isn't about what you know; it's about what you can figure out.\"";

  if (m.includes("ai") || m.includes("machine learning") || m.includes("deep learning") || m.includes("ml"))
    return "🤖 AI/ML Skills:\n\nBaran specializes in Python-based ML with:\n• Scikit-Learn for classical ML\n• TensorFlow & Keras for deep learning\n• CNN & LSTM architectures\n• Data analysis with Pandas & NumPy";

  if (m.includes("help") || m.includes("menu") || m.includes("command") || m.includes("?"))
    return "💡 You can ask me about:\n\n🔹 Skills — tech stack & proficiency\n🔹 Projects — what Baran built\n🔹 Education — university & school\n🔹 Experience — work history\n🔹 Contact — how to reach him\n🔹 About — who is Baran";

  return "🤔 I'm not sure about that.\nTry asking about: Skills, Projects, Education, Contact, or About.";
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Baran's AI Assistant. 🤖\n\nWhat would you like to know?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 900);
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(input); };

  const clearChat = () =>
    setMessages([{ id: Date.now(), text: "Chat cleared. How can I help you? 🧹", sender: "bot" }]);

  return (
    <>
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)} title="Chat with AI">
          <FaCommentDots />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-title">
              <FaRobot />
              <span>DevBot AI</span>
              <span className="bot-status-dot" />
            </div>
            <div className="header-controls">
              <button onClick={clearChat} title="Clear chat"><FaEraser /></button>
              <button onClick={() => setIsOpen(false)} title="Close"><FaTimes /></button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="bot-avatar"><FaRobot /></div>
                )}
                <div className="bubble" style={{ whiteSpace: "pre-line" }}>{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="bot-avatar"><FaRobot /></div>
                <div className="bubble typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            {QUICK_REPLIES.map((r) => (
              <button key={r} className="quick-reply-btn" onClick={() => sendMessage(r)}>
                {r}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask anything..."
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
