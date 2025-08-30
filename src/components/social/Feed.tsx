import { useState, useEffect } from 'react';
import { CreatePost } from './CreatePost';
import { Post } from './Post';
import { useToast } from '@/hooks/use-toast';

interface PostData {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle?: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  replies: number;
  shares: number;
  liked: boolean;
  type?: 'text' | 'question' | 'achievement';
}

const mockPosts: PostData[] = [
  {
    id: '1',
    author: { name: 'Alice Chen', avatar: 'A' },
    content: "Just completed my first Azure deployment! The learning curve was steep but totally worth it. Anyone else working on cloud projects? #Azure #LearningJourney",
    timestamp: new Date(Date.now() - 3600000),
    likes: 12,
    replies: 3,
    shares: 2,
    liked: false,
    type: 'text'
  },
  {
    id: '2',
    author: { name: 'Bob Kumar', avatar: 'B' },
    content: "Question: What's the best way to structure a React application for scalability? Working on a social learning platform and want to get the architecture right from the start. Any recommendations? #React #Architecture",
    timestamp: new Date(Date.now() - 7200000),
    likes: 8,
    replies: 5,
    shares: 1,
    liked: false,
    type: 'question'
  },
  {
    id: '3',
    author: { name: 'Sarah Johnson', avatar: 'S' },
    content: "Loving the collaborative approach to learning here! Just joined a study group for machine learning and already learning so much from peers. The community aspect makes all the difference. 🤝 #CommunityLearning #MachineLearning",
    timestamp: new Date(Date.now() - 10800000),
    likes: 15,
    replies: 7,
    shares: 4,
    liked: true,
    type: 'text'
  },
  {
    id: '4',
    author: { name: 'David Lee', avatar: 'D' },
    content: "🏆 Achievement Unlocked: Completed my 30-day coding streak! The consistency really pays off. Thanks to everyone in the JavaScript Fundamentals group for the motivation and support!",
    timestamp: new Date(Date.now() - 14400000),
    likes: 24,
    replies: 12,
    shares: 6,
    liked: false,
    type: 'achievement'
  }
];

export function Feed() {
  const [posts, setPosts] = useState<PostData[]>(mockPosts);
  const { toast } = useToast();

  const handleCreatePost = (content: string) => {
    const newPost: PostData = {
      id: Date.now().toString(),
      author: { name: 'Manas Kumar', avatar: 'M' },
      content,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      shares: 0,
      liked: false,
      type: 'text'
    };

    setPosts(prev => [newPost, ...prev]);
    
    toast({
      title: "Post shared successfully!",
      description: "Your post has been added to the feed.",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleReply = (postId: string) => {
    toast({
      title: "Reply feature",
      description: "Reply functionality coming soon!",
    });
  };

  const handleShare = (postId: string) => {
    toast({
      title: "Shared!",
      description: "Post has been shared to your network.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost onPost={handleCreatePost} />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLike={handleLike}
            onReply={handleReply}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
}