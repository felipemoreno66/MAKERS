import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your tech assistant. I can help you with product information, inventory, prices, and specifications. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Send message to n8n webhook
      const response = await fetch('https://hit667366.app.n8n.cloud/webhook/919813eb-9ab9-44aa-becf-3bf471a63067', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          timestamp: new Date().toISOString(),
          source: 'makers-tech-chatbot',
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Parse the webhook response - handle both string and JSON formats
      let botResponseText = "I received your message but couldn't generate a response.";
      
      if (data.output) {
        try {
          // Try to parse if it's a JSON string
          const parsedOutput = JSON.parse(data.output);
          botResponseText = parsedOutput.response || parsedOutput.message || parsedOutput.reply || data.output;
        } catch {
          // If parsing fails, use the output directly
          botResponseText = data.output;
        }
      } else {
        // Fallback to other possible response fields
        botResponseText = data.response || data.message || data.reply || data.text || botResponseText;
      }

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message to webhook:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-chat group animate-pulse-glow"
        size="lg"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-96 max-w-[calc(100vw-3rem)] z-50 bg-card/95 backdrop-blur-lg border-border/50 shadow-elevated flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Bot className="w-5 h-5 text-primary" />
              <span>Tech Assistant</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col space-y-4 pb-4">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-secondary text-secondary-foreground mr-4'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <Bot className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 mt-0.5 text-primary-foreground flex-shrink-0" />
                        )}
                        <span className="text-sm leading-relaxed">{message.text}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about products, prices, or specs..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="flex-shrink-0" disabled={isLoading}>
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
