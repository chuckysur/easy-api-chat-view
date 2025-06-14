
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
  apiKey: string;
  model: string;
}

const ChatMain = ({ conversation, onSendMessage, apiKey, model }: ChatMainProps) => {
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
  
  const callOpenRouter = async (messages: { role: string; content: string }[], model: string): Promise<string> => {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': `${window.location.origin}`,
        'X-Title': 'Lovable AI Chat',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response received';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenRouter API key in the header to start chatting.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: input.trim() };
    onSendMessage(userMessage);
    setInput('');
    setIsLoading(true);

    const botMessagePlaceholder: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '...' };
    onSendMessage(botMessagePlaceholder);

    try {
      const apiMessages = conversation.map(({ role, content }) => ({ role, content }));
      apiMessages.push({ role: 'user', content: userMessage.content });

      const response = await callOpenRouter(apiMessages, model);
      
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
