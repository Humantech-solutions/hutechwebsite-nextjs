"use client";

import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', content: 'Hello! Welcome to Hutech Solutions. How can we help you today?' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'bot', 
        content: "Thank you for reaching out. One of our solution experts will be with you shortly. In the meantime, feel free to explore our services or products." 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#001A3D] p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0171c1] flex items-center justify-center border-2 border-white/20">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-none">Hutech Assistant</h4>
                  <span className="text-[11px] text-[#0171c1] font-bold">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="h-[350px] overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-[13px] ${
                    msg.role === 'user' 
                      ? 'bg-[#0171c1] text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#0171c1] transition-all"
              />
              <button 
                type="submit"
                className="bg-[#001A3D] text-white p-2 rounded-full hover:bg-[#0171c1] transition-colors shadow-md shadow-[#001A3D]/20"
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
        className="w-16 h-16 bg-[#001A3D] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#001A3D]/30 border-2 border-white/10 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <Motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </Motion.div>
          ) : (
            <Motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={28} fill="currentColor" />
            </Motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#001A3D] animate-pulse"></span>
        )}
      </Motion.button>
    </div>
  );
}
