import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatMainProps {
  conversation: Message[];
  onSendMessage: (message: Message) => void;
  model: string;
}

const ChatMain = ({ conversation, onSendMessage, model }: ChatMainProps) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);
  
  const callPuterAI = async (latestMessage: string, history: { role: string; content: string }[], model: string): Promise<string> => {
    const puter = (window as any).puter;
    if (!puter || !puter.ai) {
      throw new Error("Puter.js script is not loaded correctly. Please ensure you are logged into Puter.");
    }
  
    const response = await puter.ai.chat(latestMessage, {
      model: model,
      messages: history,
    });
  
    console.log("Puter.ai response:", response);
  
    if (response?.choices?.[0]?.message?.content) {
      return response.choices[0].message.content;
    }
    if (response?.content) {
        return response.content;
    }
    if (response?.text) {
      return response.text;
    }
    if (typeof response === 'string') {
        return response;
    }
  
    throw new Error("Unsupported response format from Puter.ai. Check console for details.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: input.trim() };
    onSendMessage(userMessage);
    setInput('');
    setIsLoading(true);

    const botMessagePlaceholder: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '...' };
    onSendMessage(botMessagePlaceholder);

    try {
      const history = conversation.map(({ role, content }) => ({ role, content }));
      const response = await callPuterAI(userMessage.content, history, model);
      
      const finalBotMessage: Message = { id: botMessagePlaceholder.id, role: 'assistant', content: response };
      onSendMessage(finalBotMessage);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      const errorBotMessage: Message = { id: botMessagePlaceholder.id, role: 'assistant', content: `Error: ${errorMessage}` };
      onSendMessage(errorBotMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div id="messages" className="messages">
        {conversation.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="content">
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && conversation[conversation.length - 1]?.role === 'assistant' && (
           <div className="message assistant loading">
             <div className="content">
               Thinking
               <div className="dots">
                 <div className="dot"></div>
                 <div className="dot"></div>
                 <div className="dot"></div>
               </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-area">
        <textarea
          id="input"
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="💬 Type your message here... (Shift+Enter for new line)"
          disabled={isLoading}
        />
        <button id="send-btn" type="submit" disabled={!input.trim() || isLoading}>
          Send 🚀
        </button>
      </form>
    </div>
  );
};

export default ChatMain;
