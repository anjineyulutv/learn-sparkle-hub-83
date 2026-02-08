
-- Create study_groups table
CREATE TABLE public.study_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create study_group_members table
CREATE TABLE public.study_group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Enable RLS
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;

-- Study Groups RLS policies
CREATE POLICY "Study groups are viewable by everyone"
  ON public.study_groups FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create study groups"
  ON public.study_groups FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators can update their study groups"
  ON public.study_groups FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Creators can delete their study groups"
  ON public.study_groups FOR DELETE
  USING (auth.uid() = created_by);

-- Study Group Members RLS policies
CREATE POLICY "Group members are viewable by everyone"
  ON public.study_group_members FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can join groups"
  ON public.study_group_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups"
  ON public.study_group_members FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_study_groups_updated_at
  BEFORE UPDATE ON public.study_groups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for study_group_members
ALTER PUBLICATION supabase_realtime ADD TABLE public.study_group_members;

-- Create a database function for leaderboard (activity-based)
CREATE OR REPLACE FUNCTION public.get_leaderboard(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  user_id UUID,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  posts_count BIGINT,
  likes_received BIGINT,
  groups_joined BIGINT,
  total_score BIGINT
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT
    p.user_id,
    p.username,
    p.display_name,
    p.avatar_url,
    COALESCE(pc.posts_count, 0) AS posts_count,
    COALESCE(lr.likes_received, 0) AS likes_received,
    COALESCE(gj.groups_joined, 0) AS groups_joined,
    (COALESCE(pc.posts_count, 0) * 10 + COALESCE(lr.likes_received, 0) * 5 + COALESCE(gj.groups_joined, 0) * 3) AS total_score
  FROM public.profiles p
  LEFT JOIN (
    SELECT author_id, COUNT(*) AS posts_count
    FROM public.posts
    GROUP BY author_id
  ) pc ON pc.author_id = p.user_id
  LEFT JOIN (
    SELECT po.author_id, COUNT(*) AS likes_received
    FROM public.post_likes pl
    JOIN public.posts po ON po.id = pl.post_id
    GROUP BY po.author_id
  ) lr ON lr.author_id = p.user_id
  LEFT JOIN (
    SELECT sgm.user_id, COUNT(*) AS groups_joined
    FROM public.study_group_members sgm
    GROUP BY sgm.user_id
  ) gj ON gj.user_id = p.user_id
  ORDER BY total_score DESC
  LIMIT limit_count;
$$;
