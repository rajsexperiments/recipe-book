import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Feedback } from '@/types';
interface FeedbackState {
  feedbackEntries: Feedback[];
  addFeedback: (entry: Omit<Feedback, 'id' | 'timestamp'>) => void;
}
export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedbackEntries: [],
      addFeedback: (entry) =>
        set((state) => ({
          feedbackEntries: [
            ...state.feedbackEntries,
            {
              ...entry,
              id: new Date().toISOString() + Math.random(),
              timestamp: new Date().toISOString(),
            },
          ],
        })),
    }),
    {
      name: 'culinary-codex-feedback',
      storage: createJSONStorage(() => localStorage),
    }
  )
);