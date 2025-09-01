import { useState } from 'react';
import { Edit, MapPin, Calendar, Link2, Trophy, Users, BookOpen, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  location: string;
  joinDate: Date;
  website?: string;
  skills: string[];
  stats: {
    totalPoints: number;
    postsCount: number;
    helpedUsers: number;
    studyGroups: number;
    achievements: number;
    learningStreak: number;
  };
}

interface UserPost {
  id: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: number;
  type: 'text' | 'question' | 'achievement';
}

const mockProfile: UserProfile = {
  id: 'user1',
  name: 'Manas Kumar',
  avatar: 'M',
  title: 'Full-Stack Developer & Learning Enthusiast',
  bio: "Passionate about technology, continuous learning, and helping others grow. Currently diving deep into cloud technologies and machine learning. Always excited to collaborate on interesting projects!",
  location: 'San Francisco, CA',
  joinDate: new Date('2024-01-15'),
  website: 'https://manaskumar.dev',
  skills: ['JavaScript', 'React', 'Node.js', 'Azure', 'Python', 'TypeScript', 'Docker', 'GraphQL'],
  stats: {
    totalPoints: 2450,
    postsCount: 89,
    helpedUsers: 34,
    studyGroups: 6,
    achievements: 12,
    learningStreak: 15
  }
};

const mockUserPosts: UserPost[] = [
  {
    id: '1',
    content: "Just completed my Azure Functions certification! The serverless approach is really powerful for building scalable applications. Anyone else working with serverless architectures?",
    timestamp: new Date(Date.now() - 3600000),
    likes: 23,
    replies: 8,
    type: 'achievement'
  },
  {
    id: '2',
    content: "Question: What's the best approach for state management in large React applications? Currently evaluating Redux Toolkit vs Zustand vs Context API. Would love to hear your experiences!",
    timestamp: new Date(Date.now() - 86400000),
    likes: 15,
    replies: 12,
    type: 'question'
  },
  {
    id: '3',
    content: "Sharing a great resource I found for learning Docker containerization. The hands-on examples really helped me understand the fundamentals better. Link in comments!",
    timestamp: new Date(Date.now() - 172800000),
    likes: 31,
    replies: 6,
    type: 'text'
  }
];

const recentAchievements = [
  { title: 'Azure Expert', icon: '🏆', date: '2 days ago' },
  { title: 'Helper Badge', icon: '🤝', date: '1 week ago' },
  { title: '15-Day Streak', icon: '🔥', date: '2 weeks ago' },
  { title: 'Community Leader', icon: '⭐', date: '3 weeks ago' }
];

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      toast({
        title: "Edit mode",
        description: "You can now edit your profile information.",
      });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const formatPostDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Profile
        </h1>
        <Button 
          onClick={handleEdit}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Azure Integration Note */}
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>User profiles managed by Azure AD B2C with data in Cosmos DB</span>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-background to-muted/30">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-32 w-32 text-4xl">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {mockProfile.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold">{mockProfile.name}</h2>
                <p className="text-lg text-muted-foreground">{mockProfile.title}</p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {mockProfile.bio}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{mockProfile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(mockProfile.joinDate)}</span>
                </div>
                {mockProfile.website && (
                  <div className="flex items-center gap-1">
                    <Link2 className="h-4 w-4" />
                    <a href={mockProfile.website} className="text-social-blue hover:underline">
                      Portfolio
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {mockProfile.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-social-blue">
              {mockProfile.stats.totalPoints.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Points</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-social-purple">
              {mockProfile.stats.postsCount}
            </div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {mockProfile.stats.helpedUsers}
            </div>
            <div className="text-sm text-muted-foreground">Helped</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {mockProfile.stats.studyGroups}
            </div>
            <div className="text-sm text-muted-foreground">Groups</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">
              {mockProfile.stats.achievements}
            </div>
            <div className="text-sm text-muted-foreground">Badges</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {mockProfile.stats.learningStreak}
            </div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {mockUserPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {mockProfile.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{mockProfile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPostDate(post.timestamp)}
                        </p>
                      </div>
                    </div>
                    <Badge variant={
                      post.type === 'achievement' ? 'default' :
                      post.type === 'question' ? 'secondary' : 'outline'
                    }>
                      {post.type}
                    </Badge>
                  </div>
                  
                  <p className="leading-relaxed">{post.content}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{post.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {recentAchievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">Earned {achievement.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups">
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Study Groups</h3>
            <p className="text-muted-foreground">Your study groups and communities will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}