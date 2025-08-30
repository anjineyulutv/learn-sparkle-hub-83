import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { Feed } from '@/components/social/Feed';
import { StudyGroups } from '@/components/social/StudyGroups';
import { AIAssistant } from '@/components/social/AIAssistant';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, BarChart3, Search, MessageCircle, User, Settings } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('feed');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'feed':
        return <Feed />;
      case 'groups':
        return <StudyGroups />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'explore':
        return <ExploreSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'progress':
        return <ProgressSection />;
      case 'messages':
        return <MessagesSection />;
      case 'profile':
        return <ProfileSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto bg-background shadow-elegant min-h-screen flex flex-col">
        <Header />
        
        <div className="flex flex-1">
          <Sidebar activeItem={activeSection} onItemChange={setActiveSection} />
          
          <main className="flex-1 p-6 overflow-y-auto">
            {renderMainContent()}
          </main>
          
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

// Explore Section Component
function ExploreSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
        <Search className="h-8 w-8 text-social-blue" />
        Explore
      </h1>
      
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>Content powered by Azure Cognitive Search with AI-driven recommendations</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Machine Learning Fundamentals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Explore ML algorithms and applications</p>
            <div className="flex gap-2">
              <Badge variant="outline">AI/ML</Badge>
              <Badge variant="outline">Beginner</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Web Development Bootcamp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Build full-stack applications</p>
            <div className="flex gap-2">
              <Badge variant="outline">Web Dev</Badge>
              <Badge variant="outline">Full Stack</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Cloud Computing with Azure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Master cloud services and deployment</p>
            <div className="flex gap-2">
              <Badge variant="outline">Azure</Badge>
              <Badge variant="outline">Cloud</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Achievements Section Component
function AchievementsSection() {
  const achievements = [
    { icon: '🎯', title: 'First Post', description: 'Share your first learning experience', earned: true },
    { icon: '🔥', title: '7-Day Streak', description: 'Post for 7 consecutive days', progress: 3, total: 7 },
    { icon: '🤝', title: 'Helper', description: 'Help 10 people with their questions', earned: true },
    { icon: '📚', title: 'Knowledge Seeker', description: 'Join 5 study groups', progress: 3, total: 5 },
    { icon: '🏆', title: 'Top Contributor', description: 'Get 100 likes on your posts', progress: 45, total: 100 },
    { icon: '💻', title: 'Code Master', description: 'Share 20 code snippets', progress: 8, total: 20 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
        <Trophy className="h-8 w-8 text-warning" />
        Achievements
      </h1>
      
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>Achievement tracking via Azure Functions with progress stored in Cosmos DB</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h3 className="font-semibold mb-2">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
              {achievement.earned ? (
                <Badge className="bg-success text-success-foreground">Earned</Badge>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {achievement.progress}/{achievement.total}
                  </div>
                  <Progress value={(achievement.progress! / achievement.total!) * 100} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Progress Section Component
function ProgressSection() {
  const learningPaths = [
    { name: 'JavaScript Fundamentals', progress: 75 },
    { name: 'Azure Cloud Basics', progress: 45 },
    { name: 'React Development', progress: 30 },
    { name: 'Machine Learning', progress: 15 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-social-blue" />
        Learning Progress
      </h1>
      
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>Progress tracking via Azure Functions with analytics in Application Insights</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Learning Paths</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {learningPaths.map((path, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{path.name}</span>
                <span className="text-muted-foreground">{path.progress}%</span>
              </div>
              <Progress value={path.progress} className="h-3" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Posts Created</span>
              <span className="font-semibold">8/10</span>
            </div>
            <Progress value={80} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span>Study Sessions</span>
              <span className="font-semibold">5/7</span>
            </div>
            <Progress value={71} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <div className="font-medium">Completed: JavaScript Functions</div>
              <div className="text-muted-foreground">2 hours ago</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Joined: React Study Group</div>
              <div className="text-muted-foreground">1 day ago</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Achievement: Helper Badge</div>
              <div className="text-muted-foreground">2 days ago</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Messages Section Component
function MessagesSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
        <MessageCircle className="h-8 w-8 text-social-blue" />
        Messages
      </h1>
      
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>Real-time messaging via Azure SignalR Service with message history in Cosmos DB</span>
        </div>
      </div>

      <Card className="h-96">
        <CardHeader>
          <CardTitle>💬 Study Group: JavaScript Fundamentals</CardTitle>
        </CardHeader>
        <CardContent className="h-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Real-time chat functionality will be available soon!</p>
            <p className="text-sm mt-2">Connect with your study group members</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Profile Section Component
function ProfileSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
        <User className="h-8 w-8 text-social-purple" />
        Your Profile
      </h1>
      
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>User profiles managed by Azure AD B2C with data in Cosmos DB</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
              M
            </div>
            <div>
              <h2 className="text-2xl font-bold">Manas Kumar</h2>
              <p className="text-muted-foreground">Full-Stack Developer & Learning Enthusiast</p>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-warning text-warning-foreground">JavaScript Expert</Badge>
                <Badge className="bg-social-blue text-white">Azure Learner</Badge>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-social-blue">156</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">24</div>
              <div className="text-sm text-muted-foreground">Helped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">8</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Section Component
function SettingsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
        <Settings className="h-8 w-8 text-muted-foreground" />
        Settings
      </h1>
      
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>User preferences stored in Cosmos DB with Azure AD B2C authentication</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">New messages</label>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Study group updates</label>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">AI recommendations</label>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Weekly progress reports</label>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Index;