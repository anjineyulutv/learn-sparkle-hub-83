import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

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

interface PostProps {
  post: PostData;
  onLike?: (postId: string) => void;
  onReply?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function Post({ post, onLike, onReply, onShare }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'question':
        return '❓';
      case 'achievement':
        return '🏆';
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                {post.author.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {getPostTypeIcon() && (
                  <span className="text-sm">{getPostTypeIcon()}</span>
                )}
                <span className="font-semibold text-card-foreground">{post.author.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(post.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-card-foreground leading-relaxed mb-4">{post.content}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 transition-colors ${isLiked ? 'text-destructive' : 'text-muted-foreground'} hover:text-destructive`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-social-blue"
            onClick={() => onReply?.(post.id)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.replies}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-success"
            onClick={() => onShare?.(post.id)}
          >
            <Share className="h-4 w-4" />
            <span>{post.shares}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}