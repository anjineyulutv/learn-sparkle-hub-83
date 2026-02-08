import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Users, MessageCircle, Bot, Trophy, BarChart3, User, Settings } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Feed', href: '/' },
  { icon: Search, label: 'Explore', href: '/explore' },
  { icon: Users, label: 'Study Groups', href: '/groups' },
  { icon: MessageCircle, label: 'Messages', href: '/messages' },
  { icon: Bot, label: 'AI Assistant', href: '/ai-assistant' },
  { icon: Trophy, label: 'Achievements', href: '/achievements' },
  { icon: BarChart3, label: 'Progress', href: '/progress' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-80 bg-card border-r border-border p-6">
      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                isActive 
                  ? 'bg-gradient-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className={`h-5 w-5 transition-colors ${
                isActive ? 'text-primary-foreground' : 'group-hover:text-social-purple'
              }`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}