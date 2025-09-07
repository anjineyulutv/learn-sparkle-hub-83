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
        .select(`
          *,
          profiles!posts_author_id_fkey (
            display_name,
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts: PostData[] = postsData?.map(post => {
        const profile = post.profiles as any;
        const postType = post.post_type as 'text' | 'question' | 'achievement';
        
        return {
          id: post.id,
          author: {
            name: profile?.display_name || profile?.username || 'Anonymous',
            avatar: profile?.avatar_url || profile?.display_name?.[0] || 'A',
            handle: profile?.username
          },
          content: post.content,
          timestamp: new Date(post.created_at),
          likes: post.likes_count || 0,
          replies: post.replies_count || 0,
          shares: post.shares_count || 0,
          liked: false, // We'll check this separately
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
      toast({
        title: "Error loading posts",
        description: "Failed to load posts. Please try again.",
        variant: "destructive"
      });
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