import { useState, useEffect } from 'react';
import { CreatePost } from './CreatePost';
import { Post } from './Post';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

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
  category?: string;
  tags?: string[];
  link_preview?: any;
}

export function Feed() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts: PostData[] = postsData?.map(post => {
        const postType = post.post_type as 'text' | 'question' | 'achievement';
        
        return {
          id: post.id,
          author: {
            name: 'Anjineyulu',
            avatar: 'A',
            handle: 'anjineyulu'
          },
          content: post.content,
          timestamp: new Date(post.created_at),
          likes: post.likes_count || 0,
          replies: post.replies_count || 0,
          shares: post.shares_count || 0,
          liked: false,
          type: postType || 'text',
          category: post.category,
          tags: post.tags,
          link_preview: post.link_preview
        };
      }) || [];

      // Check likes for authenticated user
      if (user && formattedPosts.length > 0) {
        const { data: likes } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id)
          .in('post_id', formattedPosts.map(p => p.id));

        const likedPostIds = new Set(likes?.map(l => l.post_id) || []);
        
        formattedPosts.forEach(post => {
          post.liked = likedPostIds.has(post.id);
        });
      }

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // If no posts exist or there's an error, show the mock posts for demo
      const mockPosts: PostData[] = [
        {
          id: '1',
          author: { name: 'Anjineyulu', avatar: 'A' },
          content: "🚀 Hiring an intern/contractor! I'm hiring for a short term project in Applied AI. Must haves: - Experience with Instructor/Structured output generation from LLMs. - Experience with prompting LLMs by understanding Biz outcomes. - Knowing or ready to pickup LiteLLM or Gateway by Portkey. How to apply: email your best GenAI project at rachitt01@gmail.com",
          timestamp: new Date(Date.now() - 3600000),
          likes: 5,
          replies: 2,
          shares: 1,
          liked: false,
          type: 'text',
          category: '🚀 Hiring/Internship Opportunity',
          tags: ['hiring', 'AI', 'internship', 'LLM']
        },
        {
          id: '2',
          author: { name: 'Anjineyulu', avatar: 'A' },
          content: "💡 POLL: How many have cleared JEE Mains (general cutoff)? This helps when I speak to founders. No bias if you haven't - I understand coaching is expensive. Let's focus on skills and passion! 📊 Results: Yes (12 votes), No (1 vote)",
          timestamp: new Date(Date.now() - 7200000),
          likes: 15,
          replies: 8,
          shares: 3,
          liked: false,
          type: 'question',
          category: '💡 AI/ML Update',
          tags: ['poll', 'JEE', 'community']
        },
        {
          id: '3',
          author: { name: 'Anjineyulu', avatar: 'A' },
          content: "🚀 Congratulations to everyone who got internships this semester! @PayPal intern and others - proud of your achievements! For others, remember: அடிமேல் அடி அடித்தால் அம்மியும் நகரும் (Persistent effort moves even the stone). Keep pushing!",
          timestamp: new Date(Date.now() - 10800000),
          likes: 18,
          replies: 12,
          shares: 6,
          liked: true,
          type: 'achievement',
          category: '🚀 Hiring/Internship Opportunity',
          tags: ['congratulations', 'internships', 'motivation']
        },
        {
          id: '4',
          author: { name: 'Anjineyulu', avatar: 'A' },
          content: "🤖 Creative AI is making waves! A meme creating AI SaaS made $100k with just 3 founders. Check out SuperMeme.ai - it's incredibly good at creating contextual memes with perfect semantics. Think of it as raising the bar for meme creators, not replacing them!",
          timestamp: new Date(Date.now() - 14400000),
          likes: 8,
          replies: 4,
          shares: 2,
          liked: false,
          type: 'text',
          category: '🤖 Creative AI in Action',
          tags: ['AI', 'creative', 'SaaS', 'memes']
        },
        {
          id: '5',
          author: { name: 'Anjineyulu', avatar: 'A' },
          content: "📚 Deep Learning Interview Book - Essential reading for anyone preparing for AI/ML interviews. Also sharing some exciting updates about Freshworks founder Girish Mathrubootham and early startup investments. The entrepreneurial ecosystem is thriving!",
          timestamp: new Date(Date.now() - 18000000),
          likes: 12,
          replies: 6,
          shares: 4,
          liked: false,
          type: 'text',
          category: '📚 RAG & AI Copilots',
          tags: ['deep-learning', 'interviews', 'startups']
        },
        {
          id: '6',
          author: { name: 'Anjineyulu', avatar: 'A' },
          content: "🚀 Cuebo.ai is hiring 2 interns! They build tools for sales teams and are growing fast. Work with text/audio data, LLMs, NLP models. Requirements: Python, Git, LLMs/NLP experience is a plus. Minimum 3 month commitment, potential full-time conversion.",
          timestamp: new Date(Date.now() - 21600000),
          likes: 10,
          replies: 5,
          shares: 3,
          liked: false,
          type: 'text',
          category: '🚀 Hiring/Internship Opportunity',
          tags: ['Cuebo', 'sales-tools', 'NLP', 'Python']
        },
        {
          id: '7',
          author: { name: 'Anjineyulu', avatar: 'A' },
          content: "💡 Network is terrible due to cyclone 😭 Trying to sustain on mobile data. Community support during natural disasters shows our resilience. Thanks everyone for understanding the connectivity issues during our calls!",
          timestamp: new Date(Date.now() - 25200000),
          likes: 4,
          replies: 8,
          shares: 1,
          liked: false,
          type: 'text',
          category: '💡 AI/ML Update',
          tags: ['cyclone', 'network', 'community', 'support']
        }
      ];
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (content: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create posts.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          content,
          author_id: user.id,
          post_type: 'text'
        });

      if (error) throw error;

      toast({
        title: "Post shared successfully!",
        description: "Your post has been added to the feed.",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error creating post",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts.",
        variant: "destructive"
      });
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.liked) {
        // Unlike
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        await supabase
          .from('posts')
          .update({ likes_count: Math.max(0, post.likes - 1) })
          .eq('id', postId);
      } else {
        // Like
        await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: user.id });

        await supabase
          .from('posts')
          .update({ likes_count: post.likes + 1 })
          .eq('id', postId);
      }
    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: "Error updating like",
        description: "Failed to update like. Please try again.",
        variant: "destructive"
      });
    }
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

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost onPost={handleCreatePost} />
      
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLike}
              onReply={handleReply}
              onShare={handleShare}
            />
          ))
        )}
      </div>
    </div>
  );
}