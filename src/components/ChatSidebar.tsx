
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Settings, Key } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  messages: any[];
}

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onShowApiKey: () => void;
  hasApiKey: boolean;
}

const ChatSidebar = ({ 
  conversations, 
  currentConversationId, 
  onSelectConversation, 
  onNewConversation,
  onShowApiKey,
  hasApiKey
}: ChatSidebarProps) => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      <div className="p-4">
        <Button 
          onClick={onNewConversation}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          New chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 flex items-center hover:bg-gray-800 transition-colors ${
              currentConversationId === conv.id ? 'bg-gray-800' : ''
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-3 flex-shrink-0" />
            <span className="truncate text-sm">{conv.title}</span>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <Button
          onClick={onShowApiKey}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <Key className="w-4 h-4 mr-3" />
          API Key
          {hasApiKey && (
            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;
