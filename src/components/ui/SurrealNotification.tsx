import { useState, useEffect } from 'react';
import { X, Zap, Brain, MessageSquare, Bell, Upload, Users, Database } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeatureStatus {
  id: string;
  name: string;
  status: 'coming-soon' | 'partial' | 'demo-only';
  description: string;
  icon: React.ReactNode;
  eta?: string;
}

const nonFunctionalFeatures: FeatureStatus[] = [
  {
    id: 'real-data',
    name: 'Real Data Integration',
    status: 'demo-only',
    description: 'Currently showing mock data. Real Supabase integration needed for posts, messages, and user data.',
    icon: <Database className="h-4 w-4" />,
    eta: 'Backend setup required'
  },
  {
    id: 'ai-responses',
    name: 'Real AI Assistant',
    status: 'demo-only',
    description: 'AI responses are pre-programmed. Needs Azure OpenAI integration for dynamic conversations.',
    icon: <Brain className="h-4 w-4" />,
    eta: 'AI service setup required'
  },
  {
    id: 'real-messaging',
    name: 'Live Messaging',
    status: 'demo-only',
    description: 'Messages are simulated. Real-time chat requires SignalR and proper backend.',
    icon: <MessageSquare className="h-4 w-4" />,
    eta: 'Real-time service needed'
  },
  {
    id: 'notifications',
    name: 'Push Notifications',
    status: 'coming-soon',
    description: 'Notification system not implemented. Settings exist but no actual notifications sent.',
    icon: <Bell className="h-4 w-4" />,
    eta: 'Notification service needed'
  },
  {
    id: 'file-uploads',
    name: 'File Uploads',
    status: 'coming-soon',
    description: 'No file upload functionality. Profile pictures and attachments not supported yet.',
    icon: <Upload className="h-4 w-4" />,
    eta: 'Storage setup required'
  },
  {
    id: 'study-groups',
    name: 'Study Groups Management',
    status: 'partial',
    description: 'Study groups shown in messages but no creation/management interface exists.',
    icon: <Users className="h-4 w-4" />,
    eta: 'Group management UI needed'
  }
];

const surrealMessages = [
  "🚀 Welcome to the Future (Almost)!",
  "✨ You've Entered the Demo Dimension!",
  "🎭 Reality Check: Some Magic Still Loading...",
  "🌈 Exploring the Land of Possibilities!",
  "🎪 Step Right Up to the Feature Preview!"
];

export function SurrealNotification() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % surrealMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: FeatureStatus['status']) => {
    switch (status) {
      case 'demo-only': return 'bg-warning/20 text-warning border-warning/30';
      case 'coming-soon': return 'bg-info/20 text-info border-info/30';
      case 'partial': return 'bg-social-purple/20 text-social-purple border-social-purple/30';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getStatusLabel = (status: FeatureStatus['status']) => {
    switch (status) {
      case 'demo-only': return 'Demo Mode';
      case 'coming-soon': return 'Coming Soon';
      case 'partial': return 'Partial';
      default: return 'Unknown';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
      <Card className="bg-gradient-to-br from-background via-muted/30 to-background border-2 border-social-purple/30 shadow-glow animate-floating">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Zap className="h-5 w-5 text-social-purple animate-pulse" />
                <div className="absolute -inset-1 bg-social-purple/20 rounded-full animate-ping"></div>
              </div>
              <h3 className="font-bold text-sm bg-gradient-primary bg-clip-text text-transparent animate-shimmer">
                {surrealMessages[currentMessage]}
              </h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
            <p className="text-xs text-muted-foreground leading-relaxed">
              🎪 <strong>Welcome to our interactive preview!</strong> Some features are still being crafted in our digital workshop. Here's what's currently in "demo mode":
            </p>

            {nonFunctionalFeatures.map((feature, index) => (
              <div 
                key={feature.id}
                className="p-3 rounded-lg bg-muted/30 border border-muted/50 space-y-2 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse">
                      {feature.icon}
                    </div>
                    <span className="font-medium text-xs">{feature.name}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-0 animate-pulse ${getStatusColor(feature.status)}`}
                  >
                    {getStatusLabel(feature.status)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                {feature.eta && (
                  <p className="text-xs text-social-blue font-medium animate-pulse">
                    ⏳ {feature.eta}
                  </p>
                )}
              </div>
            ))}

            <div className="pt-2 border-t border-muted/50">
              <p className="text-xs text-muted-foreground text-center animate-shimmer">
                🌟 <strong>Everything else works perfectly!</strong> Feel free to explore, create posts, chat with the AI, and navigate through all the beautiful interfaces!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}