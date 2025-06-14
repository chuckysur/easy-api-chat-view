
import { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatMain from '@/components/ChatMain';
import ApiKeyModal from '@/components/ApiKeyModal';

const Index = () => {
  const [conversations, setConversations] = useState([
    { id: '1', title: 'New conversation', messages: [] }
  ]);
  const [currentConversationId, setCurrentConversationId] = useState('1');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const currentConversation = conversations.find(c => c.id === currentConversationId);

  const addMessage = (message: { role: 'user' | 'assistant'; content: string }) => {
    setConversations(prev => prev.map(conv => 
      conv.id === currentConversationId 
        ? { ...conv, messages: [...conv.messages, { ...message, id: Date.now().toString() }] }
        : conv
    ));
  };

  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConv = { id: newId, title: 'New conversation', messages: [] };
    setConversations(prev => [...prev, newConv]);
    setCurrentConversationId(newId);
  };

  const updateConversationTitle = (id: string, title: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, title } : conv
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar 
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
        onNewConversation={createNewConversation}
        onShowApiKey={() => setShowApiKeyModal(true)}
        hasApiKey={!!apiKey}
      />
      <ChatMain 
        conversation={currentConversation}
        onSendMessage={addMessage}
        onUpdateTitle={updateConversationTitle}
        apiKey={apiKey}
      />
      <ApiKeyModal 
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        apiKey={apiKey}
        onSave={setApiKey}
      />
    </div>
  );
};

export default Index;
