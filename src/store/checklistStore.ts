import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialChecklistData } from '@/data/checklist';
import type { ChecklistItem, ChecklistWeek } from '@/types';
interface ChecklistState {
  checklist: ChecklistWeek[];
  completedTasks: Set<string>;
  toggleTask: (taskId: string) => void;
  addWeek: (title: string) => void;
  updateWeek: (weekNumber: number, title: string) => void;
  deleteWeek: (weekNumber: number) => void;
  addTask: (weekIndex: number, task: { title: string; description: string }) => void;
  updateTask: (weekIndex: number, updatedTask: ChecklistItem) => void;
  deleteTask: (weekIndex: number, taskId: string) => void;
}
export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      checklist: initialChecklistData,
      completedTasks: new Set(),
      toggleTask: (taskId) =>
        set((state) => {
          const newCompletedTasks = new Set(state.completedTasks);
          if (newCompletedTasks.has(taskId)) {
            newCompletedTasks.delete(taskId);
          } else {
            newCompletedTasks.add(taskId);
          }
          return { completedTasks: newCompletedTasks };
        }),
      addWeek: (title) =>
        set((state) => {
          const newWeekNumber = state.checklist.length > 0 ? Math.max(...state.checklist.map(w => w.week)) + 1 : 1;
          const newWeek: ChecklistWeek = { week: newWeekNumber, title, tasks: [] };
          return { checklist: [...state.checklist, newWeek] };
        }),
      updateWeek: (weekNumber, title) =>
        set((state) => ({
          checklist: state.checklist.map((week) =>
            week.week === weekNumber ? { ...week, title } : week
          ),
        })),
      deleteWeek: (weekNumber) =>
        set((state) => ({
          checklist: state.checklist.filter((week) => week.week !== weekNumber),
        })),
      addTask: (weekIndex, task) =>
        set((state) => {
          const newChecklist = [...state.checklist];
          if (newChecklist[weekIndex]) {
            const newTask: ChecklistItem = {
              ...task,
              id: `task-${Date.now()}`,
            };
            newChecklist[weekIndex] = {
              ...newChecklist[weekIndex],
              tasks: [...newChecklist[weekIndex].tasks, newTask],
            };
          }
          return { checklist: newChecklist };
        }),
      updateTask: (weekIndex, updatedTask) =>
        set((state) => {
          const newChecklist = [...state.checklist];
          if (newChecklist[weekIndex]) {
            newChecklist[weekIndex] = {
              ...newChecklist[weekIndex],
              tasks: newChecklist[weekIndex].tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              ),
            };
          }
          return { checklist: newChecklist };
        }),
      deleteTask: (weekIndex, taskId) =>
        set((state) => {
          const newChecklist = [...state.checklist];
          if (newChecklist[weekIndex]) {
            newChecklist[weekIndex] = {
              ...newChecklist[weekIndex],
              tasks: newChecklist[weekIndex].tasks.filter((task) => task.id !== taskId),
            };
          }
          const newCompletedTasks = new Set(state.completedTasks);
          newCompletedTasks.delete(taskId);
          return { checklist: newChecklist, completedTasks: newCompletedTasks };
        }),
    }),
    {
      name: 'culinary-codex-checklist-dynamic',
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === 'completedTasks' && Array.isArray(value)) {
            return new Set(value);
          }
          return value;
        },
        replacer: (key, value) => {
          if (key === 'completedTasks' && value instanceof Set) {
            return Array.from(value);
          }
          return value;
        },
      }),
    }
  )
);