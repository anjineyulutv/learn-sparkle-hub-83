import { useState } from 'react';
import { Search, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TopicCard {
  id: string;
  title: string;
  description: string;
  followers: number;
  posts: number;
  trending: boolean;
  category: string;
}

const mockTopics: TopicCard[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'Explore ML algorithms, neural networks, and practical applications',
    followers: 1240,
    posts: 89,
    trending: true,
    category: 'AI/ML'
  },
  {
    id: '2',
    title: 'Web Development Bootcamp',
    description: 'Full-stack development with modern frameworks and tools',
    followers: 2100,
    posts: 156,
    trending: true,
    category: 'Web Dev'
  },
  {
    id: '3',
    title: 'Cloud Architecture Patterns',
    description: 'Design scalable and resilient cloud solutions',
    followers: 890,
    posts: 67,
    trending: false,
    category: 'Cloud'
  },
  {
    id: '4',
    title: 'Data Science with Python',
    description: 'Data analysis, visualization, and statistical modeling',
    followers: 1560,
    posts: 134,
    trending: true,
    category: 'Data Science'
  },
  {
    id: '5',
    title: 'DevOps Best Practices',
    description: 'CI/CD, containerization, and infrastructure automation',
    followers: 780,
    posts: 92,
    trending: false,
    category: 'DevOps'
  },
  {
    id: '6',
    title: 'UI/UX Design Principles',
    description: 'Create beautiful and user-friendly interfaces',
    followers: 920,
    posts: 78,
    trending: false,
    category: 'Design'
  }
];

export function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI/ML', 'Web Dev', 'Cloud', 'Data Science', 'DevOps', 'Design'];

  const filteredTopics = mockTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
          <Search className="h-8 w-8 text-social-purple" />
          Explore Topics
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search topics, skills, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-gradient-primary text-primary-foreground" 
                : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTopics.map((topic) => (
          <Card 
            key={topic.id}
            className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {topic.title}
                    {topic.trending && (
                      <Badge className="bg-gradient-primary text-primary-foreground">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </CardTitle>
                  <Badge variant="outline">{topic.category}</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {topic.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{topic.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{topic.posts} posts</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground">
                Explore Topic
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No topics found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
}