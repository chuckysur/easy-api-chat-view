
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
      description: "Your OpenAI API key has been saved successfully. You can now start chatting!",
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key Configuration</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to start chatting with ChatGPT. Your API key is stored locally and never sent to any server except OpenAI.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="sk-..."
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">How to get your OpenAI API key:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center">platform.openai.com/api-keys <ExternalLink className="w-3 h-3 ml-1" /></a></li>
              <li>Sign in to your OpenAI account</li>
              <li>Click "Create new secret key"</li>
              <li>Copy the key and paste it here</li>
            </ol>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2">What you can do:</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Chat with GPT-4 and other OpenAI models</li>
              <li>• Have natural conversations</li>
              <li>• Get help with coding, writing, and more</li>
              <li>• Access the latest ChatGPT capabilities</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Security:</strong> Your API key is stored only in your browser's local storage and is never transmitted to any server other than OpenAI's official API.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!tempApiKey.trim()}>
            <Save className="w-4 h-4 mr-2" />
            Save API Key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
