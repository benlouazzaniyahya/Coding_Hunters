import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const CodeAssistantChat = ({ isLoggedIn }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const messagesEndRef = useRef(null);
  const GEMINI_API_KEY = 'AIzaSyBs0YzkPOL2WVCxUyeXe51zCWmij17n9Nk';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isCodeRelated = (text) => {
    const codeKeywords = [
      'code', 'function', 'bug', 'error', 'programming',
      'javascript', 'python', 'java', 'c++', 'react',
      'node', 'express', 'mongodb', 'database', 'api',
      'frontend', 'backend', 'fullstack', 'web', 'development',
      'debug', 'fix', 'issue', 'problem', 'solution',
      'algorithm', 'data structure', 'syntax', 'compile',
      'runtime', 'framework', 'library', 'package', 'module',
      'create', 'generate', 'build', 'implement', 'make',
      'write', 'develop', 'coding', 'program', 'script',
      'component', 'class', 'method', 'application', 'project'
    ];
    
    return codeKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (!isLoggedIn) {
      setMessages([
        ...messages,
        { role: 'user', content: input },
        { role: 'assistant', content: 'Please log in to use the code assistant. This feature is only available for authenticated users.' }
      ]);
      setInput('');
      return;
    }

    if (!isCodeRelated(input)) {
      setMessages([
        ...messages,
        { role: 'user', content: input },
        { role: 'assistant', content: 'I can only help with code-related questions. Please ask something about programming, debugging, or development.' }
      ]);
      setInput('');
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: "You are a code assistant specialized in helping developers write and understand code. Rules:\n" +
                    "1. Only answer questions related to programming, development, and code creation\n" +
                    "2. When asked to create code, provide complete, working examples with necessary imports and explanations\n" +
                    "3. Always follow best practices and include error handling\n" +
                    "4. If the request is not code-related, politely decline\n\n" +
                    "Current request: " + input
            }]
          }]
        }
      );

      const assistantMessage = {
        role: 'assistant',
        content: response.data.candidates[0].content.parts[0].text
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isVisible && (
      <div className={`fixed bottom-4 right-4 w-96 ${isMinimized ? 'h-14' : 'h-[500px]'} bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 ease-in-out`}>
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Code Assistant</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-blue-500 rounded transition-colors"
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-blue-500 rounded transition-colors"
            title="Close"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      )}

      {!isMinimized && (
        <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoggedIn ? "Ask about code..." : "Please login to use the code assistant"}
            disabled={!isLoggedIn}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            disabled={!isLoggedIn || !input.trim() || isLoading}
            className={`px-4 py-2 rounded-lg ${
              isLoggedIn
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            Send
          </button>
        </div>
      </form>
      )}
    </div>
    )
  );
};

export default CodeAssistantChat;
