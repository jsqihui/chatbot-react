import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatboxRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, user: true };
    setMessages([...messages, newMessage]);

    setInput("");

    try {
      const response = await axios.post("/api/chat", { message: input });
      const botMessage = { text: response.data.response, user: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error(error);
      // Handle error appropriately, maybe show an error message to the user
    }
  };

  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-base-100">
      <div
        ref={chatboxRef}
        className="flex flex-col max-w-md w-full h-5/6 p-4 bg-base-100 rounded-box shadow-lg overflow-y-auto"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.user ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble ${
                msg.user ? "chat-bubble-primary" : "chat-bubble-secondary"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center max-w-md w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="input input-bordered flex-grow mr-2 max-w-md"
          placeholder="Ask me"
          style={{ width: "100%" }}
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}
