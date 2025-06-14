
export interface Model {
  id: string;
  name: string;
  category: string;
  provider: string;
  isFree: boolean;
  description: string;
  contextLimit: number;
}

export const allModels: Model[] = [
  // OpenAI Models
  { id: 'openrouter:openai/codex-mini', name: 'Codex Mini', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Specialized for code generation', contextLimit: 200000 },
  { id: 'openrouter:openai/o4-mini-high', name: 'o4 Mini High', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Same as o4-mini with reasoning_effort set to high', contextLimit: 200000 },
  { id: 'openrouter:openai/o3', name: 'o3', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Well-rounded model for math, science, coding, and visual reasoning', contextLimit: 200000 },
  { id: 'openrouter:openai/o4-mini', name: 'o4 Mini', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Compact reasoning model with multimodal capabilities', contextLimit: 200000 },
  { id: 'openrouter:openai/gpt-4.1', name: 'GPT-4.1', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Flagship model for advanced instruction following', contextLimit: 1050000 },
  { id: 'openrouter:openai/gpt-4.1-mini', name: 'GPT-4.1 Mini', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Mid-sized model with 1M context window', contextLimit: 1050000 },
  { id: 'openrouter:openai/gpt-4.1-nano', name: 'GPT-4.1 Nano', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Fast, low-latency model with 1M context', contextLimit: 1050000 },
  { id: 'openrouter:openai/o1-pro', name: 'o1 Pro', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Uses more compute for better reasoning', contextLimit: 200000 },
  { id: 'openrouter:openai/gpt-4o-mini-search-preview', name: 'GPT-4o Mini Search Preview', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Specialized for web search', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4o-search-preview', name: 'GPT-4o Search Preview', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Specialized for web search', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4.5-preview', name: 'GPT-4.5 (Preview)', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Research preview with enhanced reasoning', contextLimit: 128000 },
  { id: 'openrouter:openai/o3-mini-high', name: 'o3 Mini High', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Same as o3-mini with reasoning_effort set to high', contextLimit: 200000 },
  { id: 'openrouter:openai/o3-mini', name: 'o3 Mini', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Cost-efficient model for STEM tasks', contextLimit: 200000 },
  { id: 'openrouter:openai/o1', name: 'o1', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Optimized for math, science, and programming', contextLimit: 200000 },
  { id: 'openrouter:openai/gpt-4o-20241120', name: 'GPT-4o (2024-11-20)', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Enhanced creative writing and file processing', contextLimit: 128000 },
  { id: 'openrouter:openai/o1-preview-20240912', name: 'o1 Preview (2024-09-12)', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Experimental model for STEM tasks', contextLimit: 128000 },
  { id: 'openrouter:openai/o1-mini-20240912', name: 'o1 Mini (2024-09-12)', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Experimental smaller o1 model', contextLimit: 128000 },
  { id: 'openrouter:openai/o1-mini', name: 'o1 Mini', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Smaller o1 model for STEM tasks', contextLimit: 128000 },
  { id: 'openrouter:openai/o1-preview', name: 'o1 Preview', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Preview of o1 model', contextLimit: 128000 },
  { id: 'openrouter:openai/chatgpt-4o', name: 'ChatGPT-4o', category: 'openai', provider: 'OpenAI', isFree: false, description: 'ChatGPT version of GPT-4o with RLHF', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4o-20240806', name: 'GPT-4o (2024-08-06)', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Improved structured outputs', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4o-mini-20240718', name: 'GPT-4o Mini (2024-07-18)', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Cost-effective multimodal model', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4o-mini', name: 'GPT-4o Mini', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Affordable multimodal model', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4o', name: 'GPT-4o', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Fast multimodal model', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4o-20240513', name: 'GPT-4o (2024-05-13)', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Initial GPT-4o release', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4-turbo', name: 'GPT-4 Turbo', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Latest GPT-4 Turbo with vision', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-4-turbo-preview', name: 'GPT-4 Turbo Preview', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Preview with improved instruction following', contextLimit: 128000 },
  { id: 'openrouter:openai/gpt-3.5-turbo-instruct', name: 'GPT-3.5 Turbo Instruct', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Tuned for instructional prompts', contextLimit: 4000 },
  { id: 'openrouter:openai/gpt-4', name: 'GPT-4', category: 'openai', provider: 'OpenAI', isFree: false, description: 'Flagship model with advanced reasoning', contextLimit: 8000 },
  
  // Anthropic Models
  { id: 'openrouter:anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', category: 'anthropic', provider: 'Anthropic', isFree: false, description: 'Advanced reasoning and coding', contextLimit: 200000 },
  { id: 'openrouter:anthropic/claude-3-opus', name: 'Claude 3 Opus', category: 'anthropic', provider: 'Anthropic', isFree: false, description: 'Most capable Claude model', contextLimit: 200000 },
  { id: 'openrouter:anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet', category: 'anthropic', provider: 'Anthropic', isFree: false, description: 'Balanced Claude model', contextLimit: 200000 },
  { id: 'openrouter:anthropic/claude-3-haiku', name: 'Claude 3 Haiku', category: 'anthropic', provider: 'Anthropic', isFree: false, description: 'Fast Claude model', contextLimit: 200000 },
  
  // Meta/Llama Models
  { id: 'openrouter:meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', category: 'meta', provider: 'Meta', isFree: false, description: 'Largest Llama model', contextLimit: 128000 },
  { id: 'openrouter:meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', category: 'meta', provider: 'Meta', isFree: false, description: 'High performance', contextLimit: 128000 },
  { id: 'openrouter:meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', category: 'meta', provider: 'Meta', isFree: true, description: 'Efficient and free', contextLimit: 128000 },

  // Mistral Models
  { id: 'openrouter:mistralai/mistral-large-2411', name: 'Mistral Large', category: 'mistral', provider: 'Mistral AI', isFree: false, description: 'Latest large model', contextLimit: 32768 },
  { id: 'openrouter:mistralai/mistral-7b-instruct', name: 'Mistral 7B', category: 'mistral', provider: 'Mistral AI', isFree: true, description: 'Compact and efficient', contextLimit: 32768 },
  { id: 'openrouter:mistralai/mixtral-8x7b-instruct', name: 'Mixtral 8x7B', category: 'mistral', provider: 'Mistral AI', isFree: false, description: 'Mixture of experts', contextLimit: 32768 },
  
  // Google Models
  { id: 'openrouter:google/gemini-2.5-flash-preview', name: 'Gemini 2.5 Flash', category: 'google', provider: 'Google', isFree: false, description: 'Fast Gemini model', contextLimit: 128000 },
  { id: 'openrouter:google/gemini-2.5-pro-preview', name: 'Gemini 2.5 Pro', category: 'google', provider: 'Google', isFree: false, description: 'Advanced Gemini model', contextLimit: 128000 },
  { id: 'openrouter:google/gemma-3-4b-it', name: 'Gemma 3 4B', category: 'google', provider: 'Google', isFree: true, description: 'Smaller Gemma model', contextLimit: 128000 },
  
  // Qwen Models
  { id: 'openrouter:qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', category: 'qwen', provider: 'Qwen', isFree: false, description: 'Large Qwen model', contextLimit: 32768 },
  { id: 'openrouter:qwen/qwen-2.5-7b-instruct', name: 'Qwen 2.5 7B', category: 'qwen', provider: 'Qwen', isFree: true, description: 'Smaller Qwen model', contextLimit: 32768 },
  
  // Microsoft Models
  { id: 'openrouter:microsoft/phi-3-mini-128k-instruct', name: 'Phi-3 Mini', category: 'microsoft', provider: 'Microsoft', isFree: true, description: 'Compact Phi model', contextLimit: 128000 },
  
  // DeepSeek Models
  { id: 'openrouter:deepseek/deepseek-chat-v3-0324', name: 'DeepSeek Chat v3', category: 'deepseek', provider: 'DeepSeek', isFree: false, description: 'General purpose chat', contextLimit: 32768 },
  { id: 'openrouter:deepseek/deepseek-coder', name: 'DeepSeek Coder', category: 'deepseek', provider: 'DeepSeek', isFree: false, description: 'Code specialized', contextLimit: 32768 },

  // Free Models Category
  { id: 'openrouter:meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B (Free)', category: 'free', provider: 'Meta', isFree: true, description: 'Free Llama model', contextLimit: 128000 },
  { id: 'openrouter:mistralai/mistral-7b-instruct:free', name: 'Mistral 7B (Free)', category: 'free', provider: 'Mistral AI', isFree: true, description: 'Free Mistral model', contextLimit: 32768 },
  { id: 'openrouter:google/gemma-3-4b-it:free', name: 'Gemma 3 4B (Free)', category: 'free', provider: 'Google', isFree: true, description: 'Free Gemma model', contextLimit: 128000 },
  { id: 'openrouter:qwen/qwen-2.5-7b-instruct:free', name: 'Qwen 2.5 7B (Free)', category: 'free', provider: 'Qwen', isFree: true, description: 'Free Qwen model', contextLimit: 32768 },
  { id: 'openrouter:microsoft/phi-3-mini-128k-instruct:free', name: 'Phi-3 Mini (Free)', category: 'free', provider: 'Microsoft', isFree: true, description: 'Free Phi model', contextLimit: 128000 },
];
