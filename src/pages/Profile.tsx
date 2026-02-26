import { useState, useEffect } from 'react';
import { Edit, MapPin, Calendar, Link2, Trophy, Users, BookOpen, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface ProfileData {
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

interface UserPost {
  id: string;
  content: string;
  created_at: string;
  likes_count: number;
  replies_count: number;
  post_type: string | null;
}

interface UserStats {
  totalPoints: number;
  postsCount: number;
  likesReceived: number;
  studyGroups: number;
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [stats, setStats] = useState<UserStats>({ totalPoints: 0, postsCount: 0, likesReceived: 0, studyGroups: 0 });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchPosts();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    if (data) setProfile(data);
    setLoading(false);
  };

  const fetchPosts = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('posts')
      .select('id, content, created_at, likes_count, replies_count, post_type')
      .eq('author_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  const fetchStats = async () => {
    if (!user) return;
    
    const [postsRes, likesRes, groupsRes] = await Promise.all([
      supabase.from('posts').select('id', { count: 'exact', head: true }).eq('author_id', user.id),
      supabase.from('post_likes').select('id', { count: 'exact', head: true })
        .in('post_id', (await supabase.from('posts').select('id').eq('author_id', user.id)).data?.map(p => p.id) || []),
      supabase.from('study_group_members').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ]);

    const postsCount = postsRes.count || 0;
    const likesReceived = likesRes.count || 0;
    const studyGroups = groupsRes.count || 0;
    const totalPoints = postsCount * 10 + likesReceived * 5 + studyGroups * 3;

    setStats({ totalPoints, postsCount, likesReceived, studyGroups });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      toast({
        title: "Edit mode",
        description: "You can now edit your profile information.",
      });
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const formatPostDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const displayName = profile?.display_name || profile?.username || user?.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Profile
        </h1>
        <Button onClick={handleEdit} variant="outline" className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-background to-muted/30">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-32 w-32 text-4xl">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold">{displayName}</h2>
                <p className="text-lg text-muted-foreground">@{profile?.username || user?.email?.split('@')[0]}</p>
              </div>
              {profile?.bio && (
                <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {profile?.created_at ? formatDate(profile.created_at) : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-social-blue">{stats.totalPoints.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-social-purple">{stats.postsCount}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{stats.likesReceived}</div>
            <div className="text-sm text-muted-foreground">Likes Received</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{stats.studyGroups}</div>
            <div className="text-sm text-muted-foreground">Groups</div>
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
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">Start sharing your learning journey!</p>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{displayName}</p>
                          <p className="text-sm text-muted-foreground">{formatPostDate(post.created_at)}</p>
                        </div>
                      </div>
                      {post.post_type && (
                        <Badge variant="outline">{post.post_type}</Badge>
                      )}
                    </div>
                    <p className="leading-relaxed">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{post.likes_count} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{post.replies_count} replies</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
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
