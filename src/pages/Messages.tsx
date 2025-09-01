import { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';

interface ChatConversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  online: boolean;
  type: 'user' | 'group';
}

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

const mockConversations: ChatConversation[] = [
  {
    id: '1',
    name: 'JavaScript Fundamentals',
    avatar: 'JS',
    lastMessage: 'Alice: Great explanation about closures!',
    timestamp: new Date(Date.now() - 300000),
    unread: 3,
    online: true,
    type: 'group'
  },
  {
    id: '2',
    name: 'Alice Chen',
    avatar: 'A',
    lastMessage: 'Thanks for helping with the React issue!',
    timestamp: new Date(Date.now() - 1800000),
    unread: 1,
    online: true,
    type: 'user'
  },
  {
    id: '3',
    name: 'Azure Study Group',
    avatar: 'AZ',
    lastMessage: 'Bob: Who wants to tackle the next certification?',
    timestamp: new Date(Date.now() - 3600000),
    unread: 0,
    online: true,
    type: 'group'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    avatar: 'S',
    lastMessage: 'The ML resources you shared were perfect!',
    timestamp: new Date(Date.now() - 7200000),
    unread: 0,
    online: false,
    type: 'user'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Alice Chen',
    avatar: 'A',
    content: 'Hey everyone! How\'s the async/await lesson going?',
    timestamp: new Date(Date.now() - 1800000),
    isOwn: false
  },
  {
    id: '2',
    sender: 'Bob Kumar',
    avatar: 'B',
    content: 'Really helpful! The examples made it click for me.',
    timestamp: new Date(Date.now() - 1500000),
    isOwn: false
  },
  {
    id: '3',
    sender: 'You',
    avatar: 'M',
    content: 'Same here! I was struggling with promises before this.',
    timestamp: new Date(Date.now() - 1200000),
    isOwn: true
  },
  {
    id: '4',
    sender: 'Sarah Johnson',
    avatar: 'S',
    content: 'Great! Let\'s move on to error handling next week 👍',
    timestamp: new Date(Date.now() - 900000),
    isOwn: false
  }
];

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation>(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: 'M',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    toast({
      title: "Message sent",
      description: "Your message has been delivered.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatLastSeen = (date: Date) => {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Messages
        </h1>
      </div>

      {/* Azure Integration Note */}
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>Real-time messaging via Azure SignalR Service with message history in Cosmos DB</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[520px]">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedConversation.id === conversation.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className={
                        conversation.type === 'group' 
                          ? "bg-social-blue text-white" 
                          : "bg-gradient-primary text-primary-foreground"
                      }>
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{conversation.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {formatLastSeen(conversation.timestamp)}
                        </span>
                        {conversation.unread > 0 && (
                          <Badge className="bg-destructive text-destructive-foreground h-5 w-5 p-0 text-xs flex items-center justify-center">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={
                    selectedConversation.type === 'group' 
                      ? "bg-social-blue text-white" 
                      : "bg-gradient-primary text-primary-foreground"
                  }>
                    {selectedConversation.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConversation.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.type === 'group' 
                      ? `${Math.floor(Math.random() * 50 + 10)} members`
                      : selectedConversation.online ? 'Online' : 'Offline'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {selectedConversation.type === 'user' && (
                  <>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={message.isOwn 
                      ? "bg-gradient-primary text-primary-foreground" 
                      : "bg-muted"
                    }>
                      {message.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[70%] ${message.isOwn ? 'text-right' : ''}`}>
                    {!message.isOwn && (
                      <p className="text-sm font-medium mb-1">{message.sender}</p>
                    )}
                    <div 
                      className={`p-3 rounded-lg whitespace-pre-wrap ${
                        message.isOwn 
                          ? 'bg-gradient-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="icon"
                  className="bg-gradient-primary hover:bg-gradient-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}