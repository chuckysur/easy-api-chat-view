
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, User, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatMainProps {
  conversation?: Conversation;
  onSendMessage: (message: { role: 'user' | 'assistant'; content: string }) => void;
  onUpdateTitle: (id: string, title: string) => void;
  apiKey: string;
}

const ChatMain = ({ conversation, onSendMessage, onUpdateTitle, apiKey }: ChatMainProps) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const callOpenAI = async (messages: { role: string; content: string }[]): Promise<string> => {
    console.log('Making API call to OpenAI with messages:', messages);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
      }
    }

    const data = await response.json();
    console.log('OpenAI API response data:', data);
    
    return data.choices[0]?.message?.content || 'No response received';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenAI API key in the sidebar to start chatting.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    onSendMessage({ role: 'user', content: userMessage });

    // Update conversation title if it's the first message
    if (conversation && conversation.messages.length === 0) {
      const title = userMessage.length > 30 ? userMessage.substring(0, 30) + '...' : userMessage;
      onUpdateTitle(conversation.id, title);
    }

    try {
      // Prepare messages for API call
      const conversationMessages = conversation?.messages || [];
      const apiMessages = [
        ...conversationMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      console.log('Sending messages to OpenAI:', apiMessages);
      
      // Make actual API call to OpenAI
      const response = await callOpenAI(apiMessages);
      onSendMessage({ role: 'assistant', content: response });
      
      toast({
        title: "Success",
        description: "Response received from ChatGPT!",
      });
      
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      onSendMessage({ 
        role: 'assistant', 
        content: `Error: ${errorMessage}. Please check your API key and try again.` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-500">
          <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold mb-2">Welcome to AI Chat</h2>
          <p>Select a conversation or start a new one to begin chatting.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl font-semibold mb-2">How can I help you today?</h2>
              <p>Start a conversation by typing a message below.</p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {conversation.messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`rounded-lg p-4 ${
                    message.role === 'user' 
                      ? 'bg-gray-100 ml-auto max-w-xs' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="resize-none min-h-[44px] max-h-[200px] pr-12"
                disabled={isLoading}
              />
              <div className="absolute right-2 bottom-2">
                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim() || isLoading}
                  className="h-8 w-8 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatMain;
