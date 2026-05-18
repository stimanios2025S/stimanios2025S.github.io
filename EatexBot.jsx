"use client";

import { useState } from "react";

export default function EatexBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! I’m Eatex Bot. How may I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    let reply = "";
    const lower = input.toLowerCase();

    if (lower.includes("order")) {
      reply = "Great! Please tell me the item name and quantity.";
    } else if (lower.includes("hello") || lower.includes("hi")) {
      reply = "Hello! Welcome to Eatex. Would you like to place an order?";
    } else if (lower.includes("thanks")) {
      reply = "You're very welcome! Anything else I can assist you with?";
    } else if (
      lower.includes("pizza") ||
      lower.includes("burger") ||
      lower.includes("drink")
    ) {
      reply = `✅ Your order for "${input}" has been received! We'll prepare it right away.`;
    } else {
      reply =
        "I’m here to assist politely. Could you please tell me what you’d like to order?";
    }

    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Eatex Bot</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={`${msg.sender}-${idx}`}
            style={{
              ...styles.message,
              ...(msg.sender === "user" ? styles.userMessage : styles.botMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void handleSend();
            }
          }}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={() => void handleSend()} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "480px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginTop: 0,
    marginBottom: "1rem",
    textAlign: "center",
  },
  chatBox: {
    minHeight: "280px",
    maxHeight: "360px",
    overflowY: "auto",
    padding: "0.75rem",
    border: "1px solid #eee",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    marginBottom: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  message: {
    maxWidth: "85%",
    padding: "0.5rem 0.75rem",
    borderRadius: "12px",
    fontSize: "0.95rem",
    lineHeight: 1.35,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0d6efd",
    color: "#fff",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#eceef1",
    color: "#222",
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.6rem 0.75rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "0.95rem",
  },
  button: {
    padding: "0.6rem 0.9rem",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#0d6efd",
    color: "#fff",
    cursor: "pointer",
  },
};
