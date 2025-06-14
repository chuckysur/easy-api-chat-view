
import { useState, useMemo } from 'react';
import { allModels, Model } from '@/lib/models';

interface ChatHeaderProps {
  onModelChange: (modelId: string) => void;
  onClearChat: () => void;
  onShowApiKey: () => void;
  currentModelId: string;
}

const ChatHeader = ({ onModelChange, onClearChat, onShowApiKey, currentModelId }: ChatHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');

  const filteredModels = useMemo(() => {
    return allModels.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           model.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = currentCategory === 'all' || 
                             model.category === currentCategory ||
                             (currentCategory === 'free' && model.isFree);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, currentCategory]);

  const selectedModel = allModels.find(m => m.id === currentModelId);

  const categories = [
    { key: 'all', name: '🌟 All Models' },
    { key: 'openai', name: '🟢 OpenAI' },
    { key: 'anthropic', name: '🔵 Anthropic' },
    { key: 'meta', name: '🦙 Meta/Llama' },
    { key: 'mistral', name: '🚀 Mistral' },
    { key: 'google', name: '🔍 Google' },
    { key: 'qwen', name: '📚 Qwen' },
    { key: 'microsoft', name: '🖥️ Microsoft' },
    { key: 'deepseek', name: '🤿 DeepSeek' },
    { key: 'free', name: '💰 Free Models' },
  ];

  return (
    <>
      <div className="header">
        <h2>🤖 AI Chat Interface</h2>
        <div className="header-controls">
          <div className="status-indicator connected">
            <span>●</span> Ready
          </div>
          <button onClick={onShowApiKey}>🔑 API Key</button>
          <button id="clear-btn" onClick={onClearChat}>🗑️ Clear Chat</button>
        </div>
      </div>
      
      <div className="model-container">
        <input 
          type="text" 
          id="model-search" 
          className="model-search" 
          placeholder="🔍 Search models by name or provider..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="model-categories">
          {categories.map(cat => (
            <button 
              key={cat.key}
              className={`category-btn ${currentCategory === cat.key ? 'active' : ''}`}
              onClick={() => setCurrentCategory(cat.key)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="model-select-container">
          <select id="model-select" value={currentModelId} onChange={(e) => onModelChange(e.target.value)}>
            {filteredModels.map(model => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
          <div id="model-info" className="model-info">
            {selectedModel?.description}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
