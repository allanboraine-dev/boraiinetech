import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, CalendarCheck, Loader2, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Message, BookingDetails } from '../types';
import emailjs from '@emailjs/browser';

export const AIReceptionist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hello! I'm Aria, the AI receptionist for Boraine Tech. How can I help you elevate your business today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await geminiService.sendMessage(userMsg.content);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);

      // If a booking was made, trigger EmailJS notification
      if (response.bookingData) {
        const { clientName, contactInfo, topic } = response.bookingData;

        const templateParams = {
          from_name: clientName,
          client_name: clientName,
          contact_info: contactInfo || 'Not provided',
          topic: topic,
          message: `New booking via Aria AI: ${topic}`,
          to_email: 'allanboraine@gmail.com'
        };

        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(
          (result) => {
            console.log('Automated Booking Email Sent:', result.text);
          },
          (error) => {
            console.error('Failed to send automated booking email:', error.text);
          }
        );
      }

    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: "Network issue. Please try again.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-boraine-100 animate-in slide-in-from-bottom-10 fade-in duration-300">

          {/* Header */}
          <div className="bg-boraine-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-boraine-600 flex items-center justify-center relative">
                <Bot size={24} className="text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-boraine-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Aria | AI Receptionist</h3>
                <p className="text-xs text-boraine-300">Online • Boraine Tech</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-boraine-300 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`
                    max-w-[80%] rounded-2xl p-3 text-sm shadow-sm
                    ${msg.role === 'user'
                      ? 'bg-boraine-700 text-white rounded-br-none'
                      : msg.role === 'system'
                        ? 'bg-red-50 text-red-600 border border-red-100'
                        : 'bg-white text-boraine-900 border border-boraine-100 rounded-bl-none'}
                  `}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-boraine-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-boraine-500" />
                  <span className="text-xs text-boraine-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-boraine-100">
            <div className="flex items-center gap-2 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AI, support, or book a meeting..."
                className="w-full bg-boraine-50 text-boraine-900 placeholder-boraine-400 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-boraine-500 text-sm transition-all"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-1.5 bg-boraine-900 text-white rounded-full hover:bg-boraine-700 disabled:opacity-50 disabled:hover:bg-boraine-900 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-boraine-400 flex items-center justify-center gap-1">
                <Sparkles size={10} /> Powered by Gemini
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105
          ${isOpen ? 'bg-boraine-700 rotate-90 opacity-0 pointer-events-none absolute' : 'bg-gradient-to-r from-boraine-900 to-boraine-700 text-white hover:shadow-blue-900/30'}
        `}
      >
        <MessageSquare size={28} />
      </button>

      {/* Fake button to fade back in if needed, but handled by conditional rendering logic mostly */}
      {!isOpen && (
        <div className="absolute -top-12 right-0 bg-white px-4 py-2 rounded-lg shadow-lg border border-boraine-100 whitespace-nowrap animate-bounce">
          <p className="text-xs font-semibold text-boraine-800">Need ICT Help? Chat with Aria!</p>
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-b border-r border-boraine-100 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};