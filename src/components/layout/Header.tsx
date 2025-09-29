import { ThemeToggle } from '@/components/ThemeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BookOpen, ChefHat, CheckSquare, ClipboardList, LayoutDashboard, Menu, Users, MessageSquare, BarChart2, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
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
interface HeaderProps {
  setOpenCommandMenu: (open: boolean) => void;
}
export function Header({ setOpenCommandMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-8 md:justify-end">
       <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-72">
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
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
          onClick={() => setOpenCommandMenu(true)}
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline-flex">Search...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <ThemeToggle className="relative top-0 right-0" />
      </div>
    </header>
  );
}