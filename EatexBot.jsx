"use client";

import { useRef, useState } from "react";

export default function EatexBot() {
  const idCounter = useRef(0);
  const createMessageId = (prefix) =>
    globalThis.crypto?.randomUUID?.() ??
    `${prefix}-${Date.now()}-${idCounter.current++}`;

  const [messages, setMessages] = useState([
    {
      id: "bot-initial",
      sender: "bot",
      text: "👋 Hello! I’m Eatex Bot. How may I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const sanitizedInput = input.trim();
    const userMessage = {
      id: createMessageId("user"),
      sender: "user",
      text: sanitizedInput,
    };
    setMessages((prev) => [...prev, userMessage]);

    let reply = "";
    const lower = sanitizedInput.toLowerCase();

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
      reply = `✅ Your order for "${sanitizedInput}" has been received! We'll prepare it right away.`;
    } else {
      reply =
        "I’m here to assist politely. Could you please tell me what you’d like to order?";
    }

    setMessages((prev) => [
      ...prev,
      {
        id: createMessageId("bot"),
        sender: "bot",
        text: reply,
      },
    ]);
    setInput("");
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Eatex Bot</h2>

      <div role="log" aria-live="polite" style={styles.chatBox}>
        {messages.map((msg) => (
          <div
            key={msg.id}
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
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
          aria-label="Type your message"
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button} aria-label="Send message">
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
