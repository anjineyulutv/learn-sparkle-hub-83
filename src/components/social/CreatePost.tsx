import { useState } from 'react';
import { Image, Code, BarChart3, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface CreatePostProps {
  onPost?: (content: string) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState('');
  const maxLength = 500;

  const handlePost = () => {
    if (content.trim()) {
      onPost?.(content.trim());
      setContent('');
    }
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;
  const canPost = content.trim().length > 0 && !isOverLimit;

  return (
    <Card className="mb-6 shadow-elegant">
      <CardContent className="p-6">
        <Textarea
          placeholder="Share your learning journey, ask questions, or help others..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] border-0 resize-none focus-visible:ring-0 text-base"
          maxLength={maxLength}
        />
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-social-blue">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-social-purple">
              <Code className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-success">
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-warning">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge 
              variant={isOverLimit ? "destructive" : "secondary"} 
              className="text-xs"
            >
              {remainingChars}/{maxLength}
            </Badge>
            <Button 
              onClick={handlePost}
              disabled={!canPost}
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground shadow-glow"
            >
              Share
            </Button>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}