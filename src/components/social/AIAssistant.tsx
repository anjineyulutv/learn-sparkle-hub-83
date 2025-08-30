import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const aiSuggestions = [
  "Can you explain React hooks with examples?",
  "Create a study plan for Azure certification",
  "Help me debug this JavaScript code",
  "What are the best practices for REST APIs?",
  "How do I improve my coding interview skills?"
];

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    content: "Hi! I'm your AI learning assistant. I can help you with coding questions, study plans, career advice, and more. What would you like to learn today?",
    isUser: false,
    timestamp: new Date()
  }
];

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('react') && message.includes('hook')) {
      return "React hooks are functions that let you use state and other React features in functional components. Here are the most common ones:\n\n1. **useState**: Manages component state\n2. **useEffect**: Handles side effects\n3. **useCallback**: Memoizes functions\n4. **useMemo**: Memoizes values\n\nWould you like me to show you specific examples of any of these?";
    }
    
    if (message.includes('azure') && message.includes('certification')) {
      return "Here's a study plan for Azure certification:\n\n**Week 1-2**: Azure Fundamentals (AZ-900)\n- Cloud concepts\n- Core Azure services\n- Security and compliance\n\n**Week 3-4**: Choose specialization:\n- Developer (AZ-204)\n- Solutions Architect (AZ-305)\n- Administrator (AZ-104)\n\n**Resources**: Microsoft Learn, practice tests, hands-on labs. Would you like specific resources for any track?";
    }
    
    if (message.includes('debug') || message.includes('error')) {
      return "I'd be happy to help debug your code! For the best assistance, please share:\n\n1. The error message you're seeing\n2. The relevant code snippet\n3. What you expected to happen\n4. Steps to reproduce the issue\n\nCommon debugging techniques:\n- Use console.log() strategically\n- Check the browser developer tools\n- Verify data types and structures\n- Test edge cases";
    }
    
    return "That's a great question! I'm here to help with coding, learning paths, career advice, and technical concepts. Could you provide more specific details about what you'd like to learn or the problem you're trying to solve?";
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
    toast({
      title: "AI Assistant",
      description: "Processing your question...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
          <Bot className="h-8 w-8 text-social-purple" />
          AI Learning Assistant
        </h1>
      </div>

      {/* Azure Integration Note */}
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>Powered by Azure OpenAI Service with personalized recommendations</span>
        </div>
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Smart Learning Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {aiSuggestions.slice(0, 3).map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-lg cursor-pointer transition-colors"
            >
              <p className="text-sm">💡 "{suggestion}"</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[500px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Chat with AI Assistant</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className={message.isUser 
                    ? "bg-gradient-primary text-primary-foreground" 
                    : "bg-social-blue text-white"
                  }>
                    {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                    message.isUser 
                      ? 'bg-gradient-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-social-blue text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="bg-gradient-primary hover:bg-gradient-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}