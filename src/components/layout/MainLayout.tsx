import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandMenu } from '@/components/CommandMenu';
export function MainLayout() {
  const [openCommandMenu, setOpenCommandMenu] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandMenu((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Sidebar />
      <CommandMenu open={openCommandMenu} setOpen={setOpenCommandMenu} />
      <div className="md:ml-64 flex flex-col">
        <Header setOpenCommandMenu={setOpenCommandMenu} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}