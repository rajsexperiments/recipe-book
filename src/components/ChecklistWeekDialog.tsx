import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ChecklistWeek } from '@/types';
const weekSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
});
type WeekFormData = z.infer<typeof weekSchema>;
interface ChecklistWeekDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: WeekFormData) => void;
  week?: ChecklistWeek | null;
}
export function ChecklistWeekDialog({ isOpen, onOpenChange, onSave, week }: ChecklistWeekDialogProps) {
  const form = useForm<WeekFormData>({
    resolver: zodResolver(weekSchema),
    defaultValues: {
      title: '',
    },
  });
  useEffect(() => {
    if (week) {
      form.reset({ title: week.title });
    } else {
      form.reset({ title: '' });
    }
  }, [week, form, isOpen]);
  const handleSave = (data: WeekFormData) => {
    onSave(data);
    onOpenChange(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{week ? 'Edit Week' : 'Add New Week'}</DialogTitle>
          <DialogDescription>
            {week ? 'Update the title for this week.' : 'Enter a title for the new week.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Week Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Final Preparations" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Week</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}