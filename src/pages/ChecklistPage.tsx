import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlusCircle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useChecklistStore } from '@/store/checklistStore';
import { ChecklistTaskDialog } from '@/components/ChecklistTaskDialog';
import { ChecklistWeekDialog } from '@/components/ChecklistWeekDialog';
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import type { ChecklistItem, ChecklistWeek } from '@/types';
export function ChecklistPage() {
  const { checklist, completedTasks, toggleTask, addWeek, updateWeek, deleteWeek, addTask, updateTask, deleteTask } = useChecklistStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [taskDialogState, setTaskDialogState] = useState<{ isOpen: boolean; weekIndex: number | null; task?: ChecklistItem | null }>({ isOpen: false, weekIndex: null, task: null });
  const [weekDialogState, setWeekDialogState] = useState<{ isOpen: boolean; week?: ChecklistWeek | null }>({ isOpen: false, week: null });
  const [deleteDialogState, setDeleteDialogState] = useState<{ isOpen: boolean; type: 'week' | 'task'; id: number | string; name: string; weekIndex?: number } | null>(null);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const totalTasks = useMemo(() => checklist.reduce((acc, week) => acc + week.tasks.length, 0), [checklist]);
  const progress = useMemo(() => totalTasks > 0 ? (completedTasks.size / totalTasks) * 100 : 0, [completedTasks.size, totalTasks]);
  const handleSaveTask = (data: { title: string; description: string }) => {
    if (taskDialogState.weekIndex === null) return;
    if (taskDialogState.task) {
      updateTask(taskDialogState.weekIndex, { ...taskDialogState.task, ...data });
      toast.success('Task updated successfully.');
    } else {
      addTask(taskDialogState.weekIndex, data);
      toast.success('New task added.');
    }
  };
  const handleSaveWeek = (data: { title: string }) => {
    if (weekDialogState.week) {
      updateWeek(weekDialogState.week.week, data.title);
      toast.success('Week updated successfully.');
    } else {
      addWeek(data.title);
      toast.success('New week added.');
    }
  };
  const handleDeleteConfirm = () => {
    if (!deleteDialogState) return;
    if (deleteDialogState.type === 'week') {
      deleteWeek(deleteDialogState.id as number);
      toast.success(`Week "${deleteDialogState.name}" has been deleted.`);
    } else if (deleteDialogState.type === 'task' && deleteDialogState.weekIndex !== undefined) {
      deleteTask(deleteDialogState.weekIndex, deleteDialogState.id as string);
      toast.success(`Task "${deleteDialogState.name}" has been deleted.`);
    }
    setDeleteDialogState(null);
  };
  if (!isHydrated) {
    return null; // or a loading spinner
  }
  return (
    <>
      <Toaster />
      <ChecklistTaskDialog
        isOpen={taskDialogState.isOpen}
        onOpenChange={(isOpen) => setTaskDialogState({ ...taskDialogState, isOpen })}
        onSave={handleSaveTask}
        task={taskDialogState.task}
      />
      <ChecklistWeekDialog
        isOpen={weekDialogState.isOpen}
        onOpenChange={(isOpen) => setWeekDialogState({ ...weekDialogState, isOpen })}
        onSave={handleSaveWeek}
        week={weekDialogState.week}
      />
      <DeleteConfirmationDialog
        isOpen={!!deleteDialogState?.isOpen}
        onOpenChange={(isOpen) => setDeleteDialogState(ds => ds ? { ...ds, isOpen } : null)}
        onConfirm={handleDeleteConfirm}
        itemName={deleteDialogState?.name || ''}
      />
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-start flex-wrap gap-4"
        >
          <div>
            <h1 className="text-4xl font-display font-bold">Pilot Sprint Checklist</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Track your 4-week progress towards a successful launch.
            </p>
          </div>
          <Button onClick={() => setWeekDialogState({ isOpen: true, week: null })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Week
          </Button>
        </motion.div>
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>
              {completedTasks.size} of {totalTasks} tasks completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {checklist.map((week, weekIndex) => (
            <Card key={week.week}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Week {week.week}: {week.title}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setWeekDialogState({ isOpen: true, week })}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Week
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTaskDialogState({ isOpen: true, weekIndex, task: null })}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Task
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteDialogState({ isOpen: true, type: 'week', id: week.week, name: week.title })}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Week
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                {week.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start p-4 rounded-md border transition-colors hover:bg-accent group"
                  >
                    <Checkbox
                      id={task.id}
                      checked={completedTasks.has(task.id)}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <div className="ml-4 flex-grow">
                      <Label
                        htmlFor={task.id}
                        className={`font-medium ${completedTasks.has(task.id) ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {task.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTaskDialogState({ isOpen: true, weekIndex, task })}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteDialogState({ isOpen: true, type: 'task', id: task.id, name: task.title, weekIndex })}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}