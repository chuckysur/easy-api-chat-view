
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Clipboard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { toast } = useToast();
  
  const PreComponent = ({ children }: { children?: React.ReactNode[] }) => {
    const [hasCopied, setHasCopied] = useState(false);
    
    if (!children || !Array.isArray(children) || children.length === 0) {
      return <pre />;
    }
    
    const codeElement = children[0] as React.ReactElement;
    const code = codeElement?.props?.children?.[0] ? String(codeElement.props.children[0]) : '';

    const handleCopy = () => {
      if (!code) return;
      navigator.clipboard.writeText(code);
      setHasCopied(true);
      toast({ title: 'Copied to clipboard!' });
      setTimeout(() => setHasCopied(false), 2000);
    };

    return (
      <div className="code-block-wrapper">
        <pre>{children}</pre>
        <button onClick={handleCopy} className="copy-btn">
          {hasCopied ? <Check size={16} /> : <Clipboard size={16} />}
        </button>
      </div>
    );
  };
  
  if (message.content === 'Thinking...') {
    return (
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
    );
  }

  return (
    <div className={`message ${message.role}`}>
      <div className="content">
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
          components={{
            pre: PreComponent,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
