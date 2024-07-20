import { useState } from "react";
import axios from "axios";

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-base-200">
      <div className="flex flex-col max-w-md w-full h-5/6 p-4 bg-base-100 rounded-box shadow-lg">
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
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="input input-bordered flex-grow mr-2"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}
