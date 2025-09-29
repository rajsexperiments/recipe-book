import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useRecipeStore } from '@/store/recipeStore';
import { BookOpen, CheckSquare, ClipboardList, LayoutDashboard, Users, MessageSquare, BarChart2 } from 'lucide-react';
const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/recipes', icon: BookOpen, label: 'Recipes' },
  { to: '/sops', icon: ClipboardList, label: 'SOPs' },
  { to: '/training', icon: Users, label: 'Training' },
  { to: '/checklist', icon: CheckSquare, label: 'Pilot Checklist' },
  { to: '/feedback', icon: MessageSquare, label: 'Feedback Form' },
  { to: '/feedback-results', icon: BarChart2, label: 'Feedback Results' },
];
interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const runCommand = (command: () => unknown) => {
    setOpen(false);
    command();
  };
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Command Menu</DialogTitle>
      <DialogDescription className="sr-only">
        Use this command menu to search for recipes and navigate through the application.
      </DialogDescription>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map((item) => (
            <CommandItem
              key={item.to}
              onSelect={() => runCommand(() => navigate(item.to))}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recipes">
          {recipes.map((recipe) => (
            <CommandItem
              key={recipe.id}
              onSelect={() => runCommand(() => navigate(`/recipes/${recipe.id}`))}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>{recipe.dishName}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}