import { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface LeaderboardEntry {
  user_id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  posts_count: number;
  likes_received: number;
  groups_joined: number;
  total_score: number;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase.rpc('get_leaderboard', { limit_count: 10 });

      if (error) throw error;
      setEntries((data as LeaderboardEntry[]) || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-warning" />;
    if (index === 1) return <Medal className="h-5 w-5 text-muted-foreground" />;
    if (index === 2) return <Medal className="h-5 w-5 text-warning" />;
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">#{index + 1}</span>;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No activity yet. Start posting to climb the ranks!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry, index) => {
          const isCurrentUser = user?.id === entry.user_id;
          const displayName = entry.display_name || entry.username || 'Anonymous';
          const initial = displayName.charAt(0).toUpperCase();

          return (
            <div
              key={entry.user_id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex-shrink-0 w-6 flex justify-center">
                {getRankIcon(index)}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">
                  {displayName}
                  {isCurrentUser && <span className="text-xs text-muted-foreground ml-1">(you)</span>}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{entry.posts_count} posts</span>
                  <span>·</span>
                  <span>{entry.likes_received} likes</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs font-bold">
                <Star className="h-3 w-3 mr-1" />
                {entry.total_score}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
