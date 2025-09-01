import { useState } from 'react';
import { TrendingUp, BookOpen, Clock, Target, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  nextLesson: string;
}

interface WeeklyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  icon: React.ReactNode;
}

const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript programming',
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    estimatedTime: '2 weeks',
    difficulty: 'Beginner',
    category: 'Programming',
    nextLesson: 'Advanced Array Methods'
  },
  {
    id: '2',
    title: 'Azure Cloud Basics',
    description: 'Learn cloud computing fundamentals with Microsoft Azure',
    progress: 45,
    totalLessons: 20,
    completedLessons: 9,
    estimatedTime: '3 weeks',
    difficulty: 'Intermediate',
    category: 'Cloud',
    nextLesson: 'Virtual Machines & Storage'
  },
  {
    id: '3',
    title: 'React Development',
    description: 'Build modern web applications with React',
    progress: 30,
    totalLessons: 32,
    completedLessons: 10,
    estimatedTime: '4 weeks',
    difficulty: 'Intermediate',
    category: 'Frontend',
    nextLesson: 'State Management with Hooks'
  },
  {
    id: '4',
    title: 'Machine Learning Basics',
    description: 'Introduction to ML algorithms and applications',
    progress: 15,
    totalLessons: 28,
    completedLessons: 4,
    estimatedTime: '6 weeks',
    difficulty: 'Advanced',
    category: 'AI/ML',
    nextLesson: 'Supervised Learning Concepts'
  }
];

const weeklyGoals: WeeklyGoal[] = [
  {
    id: '1',
    title: 'Study Hours',
    target: 15,
    current: 12,
    unit: 'hours',
    icon: <Clock className="h-4 w-4" />
  },
  {
    id: '2',
    title: 'Lessons Completed',
    target: 8,
    current: 6,
    unit: 'lessons',
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    id: '3',
    title: 'Forum Posts',
    target: 5,
    current: 8,
    unit: 'posts',
    icon: <Target className="h-4 w-4" />
  }
];

const activityData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.1 },
  { day: 'Fri', hours: 2.9 },
  { day: 'Sat', hours: 3.5 },
  { day: 'Sun', hours: 2.1 }
];

const getDifficultyColor = (difficulty: LearningPath['difficulty']) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-success text-success-foreground';
    case 'Intermediate': return 'bg-warning text-warning-foreground';
    case 'Advanced': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export function Progress() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalHoursThisWeek = activityData.reduce((sum, day) => sum + day.hours, 0);
  const avgHoursPerDay = totalHoursThisWeek / 7;
  const overallProgress = Math.round(
    mockLearningPaths.reduce((sum, path) => sum + path.progress, 0) / mockLearningPaths.length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-social-blue" />
          Learning Progress
        </h1>
      </div>

      {/* Azure Integration Note */}
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>Progress tracking via Azure Functions with analytics in Application Insights</span>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Overall Progress</p>
                <p className="text-2xl font-bold">{overallProgress}%</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{totalHoursThisWeek.toFixed(1)}h</p>
              </div>
              <Clock className="h-8 w-8 text-social-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-2xl font-bold">{avgHoursPerDay.toFixed(1)}h</p>
              </div>
              <Calendar className="h-8 w-8 text-social-purple" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Paths</p>
                <p className="text-2xl font-bold">{mockLearningPaths.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="goals">Weekly Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData.map((day, index) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(day.hours / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-sm text-muted-foreground text-right">
                      {day.hours}h
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Learning Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Completed "Advanced Array Methods"</p>
                  <p className="text-sm text-muted-foreground">JavaScript Fundamentals • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-social-blue rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Started "Virtual Machines & Storage"</p>
                  <p className="text-sm text-muted-foreground">Azure Cloud Basics • 1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Achieved 75% completion</p>
                  <p className="text-sm text-muted-foreground">JavaScript Fundamentals • 2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <div className="grid gap-6">
            {mockLearningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <p className="text-muted-foreground">{path.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(path.difficulty)}>
                          {path.difficulty}
                        </Badge>
                        <Badge variant="outline">{path.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {path.estimatedTime} remaining
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-social-blue">{path.progress}%</div>
                      <div className="text-sm text-muted-foreground">
                        {path.completedLessons}/{path.totalLessons} lessons
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ProgressBar value={path.progress} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>Next: {path.nextLesson}</span>
                    </div>
                    <button className="text-sm text-social-blue hover:underline">
                      Continue Learning →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {weeklyGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {goal.icon}
                      {goal.title}
                    </CardTitle>
                    <Badge variant={goal.current >= goal.target ? "default" : "outline"}>
                      {goal.current >= goal.target ? "Complete" : "In Progress"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {goal.current}
                    </span>
                    <span className="text-muted-foreground">
                      / {goal.target} {goal.unit}
                    </span>
                  </div>
                  
                  <ProgressBar 
                    value={(goal.current / goal.target) * 100} 
                    className="h-2"
                  />
                  
                  <div className="text-sm text-muted-foreground">
                    {goal.current >= goal.target 
                      ? `Great job! You've exceeded your goal by ${goal.current - goal.target} ${goal.unit}`
                      : `${goal.target - goal.current} ${goal.unit} remaining`
                    }
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}