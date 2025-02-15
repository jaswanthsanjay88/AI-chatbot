'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [isThinking, setIsThinking] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
      onFinish: () => setIsThinking(false),
      onStart: () => setIsThinking(true),
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md py-4 mx-auto">
        <div className="flex-grow overflow-y-auto p-2">
            {messages.map((m) => (
                <div key={m.id} className="mb-2">
                    <div className={`font-bold ${m.role === 'user' ? 'text-blue-500' : 'text-green-500'}`}>
                        {m.role === 'user' ? 'You:' : 'AI:'}
                    </div>
                    <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
            ))}
            {isThinking && <div className="text-gray-500">Thinking...</div>}
        </div>
        <form onSubmit={handleSubmit} className="p-2 border-t border-gray-300">
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                placeholder="Type your message..."
                onChange={handleInputChange}
            />
            <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                Send
            </button>
        </form>
    </div>
  );
}
