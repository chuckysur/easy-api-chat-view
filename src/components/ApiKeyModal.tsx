
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Save, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSave: (apiKey: string) => void;
}

const ApiKeyModal = ({ isOpen, onClose, apiKey, onSave }: ApiKeyModalProps) => {
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(tempApiKey);
    toast({
      title: "API Key Saved",
      description: "Your OpenRouter API key has been saved successfully. You can now start chatting!",
    });
    onClose();
  };

  const handleClose = () => {
    setTempApiKey(apiKey);
    setShowKey(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-color)]">
        <DialogHeader>
          <DialogTitle>OpenRouter API Key</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your OpenRouter API key to use a wide variety of models. Your API key is stored locally.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenRouter API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="sk-or-..."
                className="pr-10 bg-[var(--input-bg)] border-[var(--border-color)]"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-[var(--text-color)]"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
            <h4 className="font-medium text-blue-300 mb-2">How to get your OpenRouter API key:</h4>
            <ol className="text-sm text-blue-400 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center">openrouter.ai/keys <ExternalLink className="w-3 h-3 ml-1" /></a></li>
              <li>Sign in to your OpenRouter account</li>
              <li>Click "Create Key"</li>
              <li>Copy the key and paste it here</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={handleClose} className="bg-[var(--secondary-color)] border-[var(--border-color)] hover:bg-[var(--secondary-color)]/80">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!tempApiKey.trim()} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80">
            <Save className="w-4 h-4 mr-2" />
            Save API Key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
