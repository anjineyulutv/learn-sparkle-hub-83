import { TrendingUp, Users, Award, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface TrendingTopic {
  topic: string;
  discussions: number;
}

interface SuggestedUser {
  name: string;
  avatar: string;
  role: string;
}

const trendingTopics: TrendingTopic[] = [
  { topic: '#ReactHooks', discussions: 847 },
  { topic: '#AzureCertification', discussions: 523 },
  { topic: '#JavaScriptTips', discussions: 392 },
  { topic: '#WebDevelopment', discussions: 289 },
];

const suggestedUsers: SuggestedUser[] = [
  { name: 'Alice Chen', avatar: 'A', role: 'Frontend Developer' },
  { name: 'Sarah Johnson', avatar: 'S', role: 'Data Scientist' },
  { name: 'David Lee', avatar: 'D', role: 'DevOps Engineer' },
];

const userStats = {
  learningStreak: 7,
  postsThisWeek: 12,
  peopleHelped: 8,
  groupsJoined: 3
};

export function RightSidebar() {
  return (
    <div className="w-80 bg-sidebar/50 border-l border-sidebar-border p-4 space-y-6 overflow-y-auto">
      {/* AI Assistant Widget */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-primary-foreground/90">
            Quick help based on your activity:
          </p>
          <div className="space-y-2">
            <div className="bg-white/10 hover:bg-white/20 p-3 rounded-lg cursor-pointer transition-colors">
              <p className="text-sm">"What should I learn next in JavaScript?"</p>
            </div>
            <div className="bg-white/10 hover:bg-white/20 p-3 rounded-lg cursor-pointer transition-colors">
              <p className="text-sm">"Review my recent code submission"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-social-blue" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.topic}
              className="p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors"
            >
              <div className="font-semibold text-social-blue">{topic.topic}</div>
              <div className="text-sm text-muted-foreground">
                {topic.discussions} discussions
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-warning" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Learning Streak</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{userStats.learningStreak} days</span>
                <span>🔥</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Posts This Week</span>
              <span className="font-semibold">{userStats.postsThisWeek}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">People Helped</span>
              <span className="font-semibold">{userStats.peopleHelped}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Groups Joined</span>
              <span className="font-semibold">{userStats.groupsJoined}</span>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="space-y-2 mt-4 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span>Weekly Goal</span>
              <span>8/10 posts</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Suggested Connections */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-success" />
            People You May Know
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.name} className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate">{user.role}</div>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Connect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}