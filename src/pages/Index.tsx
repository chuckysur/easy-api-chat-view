import { useState, useEffect } from 'react';
import ChatMain from '@/components/ChatMain';
import ApiKeyModal from '@/components/ApiKeyModal';
import ChatHeader from '@/components/ChatHeader';
import { allModels } from '@/lib/models';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Index = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [currentModel, setCurrentModel] = useState(allModels[0].id);

  useEffect(() => {
    const savedKey = localStorage.getItem('or-api-key');
    if (savedKey) {
      setApiKey(savedKey);
    }
    
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          // Type guard to validate message structure, fixing the build error.
          const validHistory = parsedHistory.filter((m: any): m is Message => 
            m && typeof m.id === 'string' &&
            typeof m.content === 'string' &&
            ['user', 'assistant', 'system'].includes(m.role)
          );
          setConversation(validHistory);
        }
      } catch (e) {
        console.error("Failed to parse chat history, starting fresh.", e);
        setConversation([{ id: 'init-error', role: 'system', content: "👋 Welcome to AI Chat Interface! Select a model and start chatting." }]);
      }
    } else {
      setConversation([{ id: 'init', role: 'system', content: "👋 Welcome to AI Chat Interface! Select a model and start chatting." }]);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('or-api-key', key);
  };

  const handleSendMessage = (message: Message) => {
    setConversation(prev => {
      // If assistant message is being updated, replace it
      const existing = prev.find(m => m.id === message.id);
      if (existing) {
        return prev.map(m => m.id === message.id ? message : m);
      }
      const newConversation = [...prev, message];
      localStorage.setItem('chatHistory', JSON.stringify(newConversation));
      return newConversation;
    });
  };
  
  const handleClearChat = () => {
    const clearedConversation = [{ id: 'cleared', role: 'system' as const, content: "Chat cleared. Start a new conversation!" }];
    setConversation(clearedConversation);
    localStorage.setItem('chatHistory', JSON.stringify(clearedConversation));
  };

  return (
    <div className="body">
      <div className="chat-container">
        <ChatHeader 
          onModelChange={setCurrentModel}
          onClearChat={handleClearChat}
          onShowApiKey={() => setShowApiKeyModal(true)}
          currentModelId={currentModel}
        />
        <ChatMain 
          conversation={conversation}
          onSendMessage={handleSendMessage}
          model={currentModel}
        />
      </div>
      <ApiKeyModal 
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        apiKey={apiKey}
        onSave={handleSaveApiKey}
      />
    </div>
  );
};

export default Index;
