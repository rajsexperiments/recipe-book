import { NavLink } from 'react-router-dom';
import { BookOpen, ChefHat, CheckSquare, ClipboardList, LayoutDashboard, Users, MessageSquare, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/recipes', icon: BookOpen, label: 'Recipes' },
  { to: '/sops', icon: ClipboardList, label: 'SOPs' },
  { to: '/training', icon: Users, label: 'Training' },
  { to: '/checklist', icon: CheckSquare, label: 'Pilot Checklist' },
  { to: '/feedback', icon: MessageSquare, label: 'Feedback Form' },
  { to: '/feedback-results', icon: BarChart2, label: 'Feedback Results' },
];
export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-background border-r fixed h-full">
      <div className="flex items-center justify-center h-20 border-b">
        <ChefHat className="h-8 w-8 text-primary" />
        <h1 className="ml-3 text-2xl font-display font-bold text-foreground">
          Culinary Codex
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t text-center text-xs text-muted-foreground">
        <p>Built with ��️ at Cloudflare</p>
      </div>
    </aside>
  );
}