import { Home, Search, Users, MessageCircle, Bot, Trophy, BarChart3, User, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navSections = [
  {
    title: 'Main',
    items: [
      { id: 'feed', label: 'Feed', icon: Home },
      { id: 'explore', label: 'Explore', icon: Search },
      { id: 'groups', label: 'Study Groups', icon: Users },
      { id: 'messages', label: 'Messages', icon: MessageCircle, badge: 2 },
    ]
  },
  {
    title: 'Learning',
    items: [
      { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
      { id: 'achievements', label: 'Achievements', icon: Trophy },
      { id: 'progress', label: 'Progress', icon: BarChart3 },
    ]
  },
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  }
];

interface SidebarProps {
  activeItem: string;
  onItemChange: (itemId: string) => void;
}

export function Sidebar({ activeItem, onItemChange }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Azure Status */}
        <div className="bg-gradient-primary text-primary-foreground p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse-glow"></div>
            <span className="text-sm font-semibold">Demo Mode - Azure Ready</span>
          </div>
        </div>

        {/* Navigation Sections */}
        {navSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Button
                  key={item.id}
                  variant={activeItem === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-all duration-200",
                    activeItem === item.id 
                      ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  )}
                  onClick={() => onItemChange(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}