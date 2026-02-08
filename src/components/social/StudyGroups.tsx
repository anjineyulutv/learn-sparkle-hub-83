import { useState, useEffect } from 'react';
import { Users, Plus, Star, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface StudyGroup {
  id: string;
  title: string;
  description: string | null;
  members_count: number;
  status: string;
  tags: string[];
  joined: boolean;
  created_by: string;
}

export function StudyGroups() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchGroups();

    const channel = supabase
      .channel('study-groups-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'study_group_members' }, () => {
        fetchGroups();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchGroups = async () => {
    try {
      const { data: groupsData, error } = await supabase
        .from('study_groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!groupsData || groupsData.length === 0) {
        setGroups([]);
        return;
      }

      // Fetch member counts for each group
      const groupIds = groupsData.map(g => g.id);
      const { data: membersData } = await supabase
        .from('study_group_members')
        .select('group_id, user_id')
        .in('group_id', groupIds);

      const memberCountMap = new Map<string, number>();
      const userMemberships = new Set<string>();

      (membersData || []).forEach(m => {
        memberCountMap.set(m.group_id, (memberCountMap.get(m.group_id) || 0) + 1);
        if (user && m.user_id === user.id) {
          userMemberships.add(m.group_id);
        }
      });

      const formattedGroups: StudyGroup[] = groupsData.map(group => ({
        id: group.id,
        title: group.title,
        description: group.description,
        members_count: memberCountMap.get(group.id) || 0,
        status: group.status,
        tags: group.tags || [],
        joined: userMemberships.has(group.id),
        created_by: group.created_by,
      }));

      setGroups(formattedGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to create a group.", variant: "destructive" });
      return;
    }
    if (!newTitle.trim()) {
      toast({ title: "Title required", description: "Please enter a group title.", variant: "destructive" });
      return;
    }

    setCreating(true);
    try {
      const tags = newTags.split(',').map(t => t.trim()).filter(Boolean);

      const { data: newGroup, error } = await supabase
        .from('study_groups')
        .insert({
          title: newTitle.trim(),
          description: newDescription.trim() || null,
          created_by: user.id,
          tags,
        })
        .select()
        .single();

      if (error) throw error;

      // Auto-join the creator
      await supabase
        .from('study_group_members')
        .insert({ group_id: newGroup.id, user_id: user.id });

      toast({ title: "Group created!", description: `"${newTitle}" is now live. You've been automatically added as a member.` });
      setNewTitle('');
      setNewDescription('');
      setNewTags('');
      setDialogOpen(false);
      fetchGroups();
    } catch (error) {
      console.error('Error creating group:', error);
      toast({ title: "Error", description: "Failed to create group. Please try again.", variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to join a group.", variant: "destructive" });
      return;
    }

    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    try {
      if (group.joined) {
        await supabase
          .from('study_group_members')
          .delete()
          .eq('group_id', groupId)
          .eq('user_id', user.id);

        toast({ title: "Left study group", description: `You've left ${group.title}` });
      } else {
        await supabase
          .from('study_group_members')
          .insert({ group_id: groupId, user_id: user.id });

        toast({ title: "Joined study group!", description: `Welcome to ${group.title}! Start collaborating with other learners.` });
      }

      fetchGroups();
    } catch (error) {
      console.error('Error updating membership:', error);
      toast({ title: "Error", description: "Failed to update membership. Please try again.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Study Groups
        </h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground shadow-glow">
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Study Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Input
                  placeholder="Group title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Describe what this group is about..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <Input
                  placeholder="Tags (comma-separated, e.g. React, JavaScript, Beginner)"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>
              <Button
                onClick={handleCreateGroup}
                disabled={creating || !newTitle.trim()}
                className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground"
              >
                {creating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No study groups yet</h3>
          <p className="text-muted-foreground">Be the first to create a study group and start learning together!</p>
        </div>
      ) : (
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
                      <span>{group.members_count} {group.members_count === 1 ? 'member' : 'members'}</span>
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
                {group.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {group.description}
                  </p>
                )}

                {group.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
