import { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SearchResult {
  id: string;
  name: string;
  type: 'user' | 'group' | 'topic';
  avatar?: string;
}

const mockSearchResults: SearchResult[] = [
  { id: '1', name: 'Alice Chen', type: 'user', avatar: 'A' },
  { id: '2', name: 'JavaScript Fundamentals', type: 'group', avatar: 'JS' },
  { id: '3', name: 'React Hooks', type: 'topic' },
  { id: '4', name: 'Sarah Johnson', type: 'user', avatar: 'S' },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = mockSearchResults.filter(result =>
        result.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            🎓 Kosaksi Social
          </div>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search people, topics, groups..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="pl-10 pr-4 transition-all duration-300 focus:shadow-glow"
            />
          </div>
          
          {/* Search Results */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-elegant animate-fade-in z-50">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
                  onClick={() => {
                    setShowSearchResults(false);
                    setSearchQuery('');
                  }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                      {result.avatar || result.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">{result.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
              3
            </Badge>
          </Button>
          
          <Avatar className="h-8 w-8 cursor-pointer hover:shadow-glow transition-all duration-300">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
              M
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}