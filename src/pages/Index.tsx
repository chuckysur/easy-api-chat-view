
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
      setConversation(JSON.parse(savedHistory));
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
    const clearedConversation = [{ id: 'cleared', role: 'system', content: "Chat cleared. Start a new conversation!" }];
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
          apiKey={apiKey}
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
