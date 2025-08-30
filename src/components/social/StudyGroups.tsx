import { useState } from 'react';
import { Users, Plus, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';

interface StudyGroup {
  id: string;
  title: string;
  description: string;
  members: number;
  status: 'Active' | 'Inactive';
  tags: string[];
  joined: boolean;
}

const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learn JavaScript from basics to advanced concepts. Perfect for beginners and those looking to solidify their foundation.',
    members: 245,
    status: 'Active',
    tags: ['JavaScript', 'Beginner', 'Fundamentals'],
    joined: true
  },
  {
    id: '2',
    title: 'Azure Cloud Certification',
    description: 'Prepare for Azure certifications together. Share resources, take practice tests, and support each other.',
    members: 189,
    status: 'Active',
    tags: ['Azure', 'Certification', 'Cloud'],
    joined: false
  },
  {
    id: '3',
    title: 'React Advanced Patterns',
    description: 'Deep dive into advanced React patterns, performance optimization, and modern development practices.',
    members: 156,
    status: 'Active',
    tags: ['React', 'Advanced', 'Patterns'],
    joined: true
  },
  {
    id: '4',
    title: 'Machine Learning Study Group',
    description: 'Explore ML algorithms, work on projects together, and discuss the latest in AI/ML research.',
    members: 203,
    status: 'Active',
    tags: ['ML', 'AI', 'Python'],
    joined: false
  }
];

export function StudyGroups() {
  const [groups, setGroups] = useState<StudyGroup[]>(mockStudyGroups);
  const { toast } = useToast();

  const handleJoinGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const newJoinedStatus = !group.joined;
        return {
          ...group,
          joined: newJoinedStatus,
          members: newJoinedStatus ? group.members + 1 : group.members - 1
        };
      }
      return group;
    }));

    const group = groups.find(g => g.id === groupId);
    toast({
      title: group?.joined ? "Left study group" : "Joined study group!",
      description: group?.joined 
        ? `You've left ${group.title}` 
        : `Welcome to ${group?.title}! Start collaborating with other learners.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Study Groups
        </h1>
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Azure Integration Note */}
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-info">
          <span className="font-semibold">🔗 Azure Integration:</span>
          <span>Groups managed in Cosmos DB with real-time chat via SignalR</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <Card 
            key={group.id} 
            className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-fade-in"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{group.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{group.members} members</span>
                    <Badge 
                      variant={group.status === 'Active' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {group.status}
                    </Badge>
                  </div>
                </div>
                {group.joined && (
                  <Star className="h-5 w-5 text-warning fill-current" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {group.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleJoinGroup(group.id)}
                  variant={group.joined ? "outline" : "default"}
                  className={group.joined 
                    ? "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground" 
                    : "bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground"
                  }
                >
                  {group.joined ? 'Leave Group' : 'Join Group'}
                </Button>
                <Button variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}