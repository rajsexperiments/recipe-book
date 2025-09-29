import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { recipes } from "@/data/recipes";
import { useFeedbackStore } from "@/store/feedbackStore";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
const feedbackSchema = z.object({
  recipeId: z.string().min(1, { message: "Please select a recipe." }),
  flavor: z.number().min(1).max(5),
  texture: z.number().min(1).max(5),
  aroma: z.number().min(1).max(5),
  appearance: z.number().min(1).max(5),
  portionSize: z.number().min(1).max(5),
  overallImpression: z.number().min(1).max(5),
  comments: z.string().max(500, "Comments must be 500 characters or less.").optional(),
});
const scoreLabels = ["Poor", "Below Average", "Average", "Good", "Excellent"];
const ratingFields: { name: keyof z.infer<typeof feedbackSchema>, label: string, description: string }[] = [
    { name: "flavor", label: "Flavor", description: "Spiciness, Salt, Tang" },
    { name: "texture", label: "Texture", description: "Fluffy, Mushy, Crisp, Soft" },
    { name: "aroma", label: "Aroma", description: "Freshness, Spices" },
    { name: "appearance", label: "Appearance", description: "Color, Garnish" },
    { name: "portionSize", label: "Portion Size", description: "Value for the price" },
    { name: "overallImpression", label: "Overall Impression", description: "Your final verdict" },
];
export function FeedbackPage() {
  const addFeedback = useFeedbackStore((state) => state.addFeedback);
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      flavor: 3,
      texture: 3,
      aroma: 3,
      appearance: 3,
      portionSize: 3,
      overallImpression: 3,
      comments: "",
    },
  });
  function onSubmit(values: z.infer<typeof feedbackSchema>) {
    const recipe = recipes.find(r => r.id === values.recipeId);
    if (!recipe) return;
    const feedbackData = {
        ...values,
        recipeName: recipe.dishName,
        comments: values.comments || undefined,
    };
    addFeedback(feedbackData);
    toast.success("Thank you for your feedback!", {
      description: `Your review for ${recipe.dishName} has been submitted.`,
    });
    form.reset();
  }
  return (
    <>
      <Toaster />
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold">Pilot Taster Scoring Sheet</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Your feedback is crucial for refining our recipes. Please be honest and detailed.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>New Feedback Entry</CardTitle>
              <CardDescription>Rate a recipe on a scale of 1 (Poor) to 5 (Excellent).</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="recipeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipe Name</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a recipe to review" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {recipes.map(recipe => (
                              <SelectItem key={recipe.id} value={recipe.id}>{recipe.dishName}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ratingFields.map(({ name, label, description }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormDescription>{description}</FormDescription>
                            <FormControl>
                                <div className="flex items-center gap-4 pt-2">
                                    <Slider
                                        min={1}
                                        max={5}
                                        step={1}
                                        value={[field.value]}
                                        onValueChange={(value) => field.onChange(value[0])}
                                    />
                                    <span className="font-bold text-lg text-primary w-8 text-center">{field.value}</span>
                                </div>
                            </FormControl>
                            <div className="text-center text-sm text-muted-foreground">{scoreLabels[field.value - 1]}</div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What did you like or dislike? Any suggestions?"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit Feedback</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}