"use client";

import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "bot", content: "Hello! Welcome to Hutech Solutions. How can we help you today?" },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { role: "user", content: message }]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Thank you for reaching out. One of our solution experts will be with you shortly. In the meantime, feel free to explore our services or products.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed right-6 bottom-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl md:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#001A3D] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-[#0171c1]">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="text-sm leading-none font-bold">Hutech Assistant</h4>
                  <span className="text-[11px] font-bold text-[#0171c1]">Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="h-[350px] space-y-4 overflow-y-auto bg-gray-50/50 p-6">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-[13px] ${
                      msg.role === "user"
                        ? "rounded-tr-none bg-[#0171c1] text-white"
                        : "rounded-tl-none border border-gray-100 bg-white text-gray-700 shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex gap-2 border-t border-gray-100 bg-white p-4"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-none bg-gray-100 px-4 py-2 text-sm transition-all focus:ring-2 focus:ring-[#0171c1]"
              />
              <button
                type="submit"
                className="rounded-full bg-[#001A3D] p-2 text-white shadow-md shadow-[#001A3D]/20 transition-colors hover:bg-[#0171c1]"
              >
                <Send size={18} />
              </button>
            </form>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <Motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/10 bg-[#001A3D] text-white shadow-2xl shadow-[#001A3D]/30"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <Motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </Motion.div>
          ) : (
            <Motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={28} fill="currentColor" />
            </Motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute top-0 right-0 h-4 w-4 animate-pulse rounded-full border-2 border-[#001A3D] bg-green-500"></span>
        )}
      </Motion.button>
    </div>
  );
}
