import { useState } from 'react';
import { Trophy, Star, Target, Zap, Users, BookOpen, Award, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'learning' | 'social' | 'milestones' | 'special';
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  earnedDate?: Date;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Share your first learning experience',
    icon: <Target className="h-6 w-6" />,
    category: 'learning',
    earned: true,
    earnedDate: new Date(Date.now() - 604800000),
    points: 10,
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Learning Streak',
    description: 'Post for 7 consecutive days',
    icon: <Zap className="h-6 w-6" />,
    category: 'learning',
    earned: false,
    progress: 5,
    maxProgress: 7,
    points: 50,
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Helper',
    description: 'Help 10 people with their questions',
    icon: <Users className="h-6 w-6" />,
    category: 'social',
    earned: true,
    earnedDate: new Date(Date.now() - 259200000),
    points: 25,
    rarity: 'common'
  },
  {
    id: '4',
    title: 'Knowledge Seeker',
    description: 'Join 5 different study groups',
    icon: <BookOpen className="h-6 w-6" />,
    category: 'social',
    earned: false,
    progress: 3,
    maxProgress: 5,
    points: 30,
    rarity: 'common'
  },
  {
    id: '5',
    title: 'Community Leader',
    description: 'Create and lead a successful study group',
    icon: <Award className="h-6 w-6" />,
    category: 'milestones',
    earned: false,
    points: 100,
    rarity: 'epic'
  },
  {
    id: '6',
    title: 'Coding Master',
    description: 'Complete advanced coding challenges',
    icon: <Trophy className="h-6 w-6" />,
    category: 'learning',
    earned: false,
    points: 75,
    rarity: 'rare'
  },
  {
    id: '7',
    title: 'Beta Pioneer',
    description: 'One of the first 100 users of the platform',
    icon: <Star className="h-6 w-6" />,
    category: 'special',
    earned: true,
    earnedDate: new Date(Date.now() - 1209600000),
    points: 200,
    rarity: 'legendary'
  },
  {
    id: '8',
    title: 'Marathon Learner',
    description: 'Maintain a 30-day learning streak',
    icon: <Zap className="h-6 w-6" />,
    category: 'milestones',
    earned: false,
    progress: 7,
    maxProgress: 30,
    points: 150,
    rarity: 'epic'
  }
];

const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common': return 'bg-muted text-muted-foreground';
    case 'rare': return 'bg-social-blue text-white';
    case 'epic': return 'bg-social-purple text-white';
    case 'legendary': return 'bg-gradient-primary text-primary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getCategoryIcon = (category: Achievement['category']) => {
  switch (category) {
    case 'learning': return <BookOpen className="h-4 w-4" />;
    case 'social': return <Users className="h-4 w-4" />;
    case 'milestones': return <Trophy className="h-4 w-4" />;
    case 'special': return <Star className="h-4 w-4" />;
    default: return <Target className="h-4 w-4" />;
  }
};

export function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', icon: <Trophy className="h-4 w-4" /> },
    { id: 'learning', label: 'Learning', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'social', label: 'Social', icon: <Users className="h-4 w-4" /> },
    { id: 'milestones', label: 'Milestones', icon: <Trophy className="h-4 w-4" /> },
    { id: 'special', label: 'Special', icon: <Star className="h-4 w-4" /> }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? mockAchievements 
    : mockAchievements.filter(achievement => achievement.category === selectedCategory);

  const earnedAchievements = mockAchievements.filter(a => a.earned);
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);
  const completionRate = Math.round((earnedAchievements.length / mockAchievements.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
          <Trophy className="h-8 w-8 text-warning" />
          Achievements
        </h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-2xl font-bold">{totalPoints.toLocaleString()}</p>
              </div>
              <Star className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Earned</p>
                <p className="text-2xl font-bold">{earnedAchievements.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold">{completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-social-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold">#47</p>
              </div>
              <Award className="h-8 w-8 text-social-purple" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-2"
            >
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAchievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`transition-all duration-300 hover:-translate-y-1 ${
                    achievement.earned 
                      ? 'hover:shadow-elegant bg-gradient-to-br from-background to-muted/30' 
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${
                        achievement.earned 
                          ? 'bg-gradient-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {achievement.earned ? achievement.icon : <Lock className="h-6 w-6" />}
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <CardTitle className={`text-lg ${!achievement.earned ? 'opacity-60' : ''}`}>
                        {achievement.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getCategoryIcon(achievement.category)}
                        <span className="capitalize">{achievement.category}</span>
                        <span>•</span>
                        <span>{achievement.points} pts</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className={`text-sm leading-relaxed ${!achievement.earned ? 'opacity-60' : ''}`}>
                      {achievement.description}
                    </p>
                    
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {achievement.earned && achievement.earnedDate && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Trophy className="h-3 w-3" />
                        <span>Earned {achievement.earnedDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}