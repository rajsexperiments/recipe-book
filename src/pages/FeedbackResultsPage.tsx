import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useFeedbackStore } from '@/store/feedbackStore';
import { recipes } from '@/data/recipes';
import { Star, MessageSquare, ChefHat } from 'lucide-react';
const ratingFields = [
    { key: "flavor", label: "Flavor" },
    { key: "texture", label: "Texture" },
    { key: "aroma", label: "Aroma" },
    { key: "appearance", label: "Appearance" },
    { key: "portionSize", label: "Portion Size" },
    { key: "overallImpression", label: "Overall" },
];
export function FeedbackResultsPage() {
  const feedbackEntries = useFeedbackStore((state) => state.feedbackEntries);
  const aggregatedData = useMemo(() => {
    const recipeFeedback = new Map<string, { scores: Record<string, number[]>, comments: string[], name: string }>();
    recipes.forEach(recipe => {
        recipeFeedback.set(recipe.id, {
            scores: { flavor: [], texture: [], aroma: [], appearance: [], portionSize: [], overallImpression: [] },
            comments: [],
            name: recipe.dishName,
        });
    });
    feedbackEntries.forEach(entry => {
        const recipeData = recipeFeedback.get(entry.recipeId);
        if (recipeData) {
            Object.keys(recipeData.scores).forEach(key => {
                recipeData.scores[key].push(entry[key as keyof typeof entry] as number);
            });
            if (entry.comments) {
                recipeData.comments.push(entry.comments);
            }
        }
    });
    return Array.from(recipeFeedback.values()).filter(data => data.comments.length > 0 || data.scores.overallImpression.length > 0);
  }, [feedbackEntries]);
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-display font-bold">Feedback Results</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Aggregated scores and comments from pilot tasters.
        </p>
      </motion.div>
      {aggregatedData.length === 0 ? (
        <Card className="text-center py-16">
            <CardHeader>
                <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle>No Feedback Yet</CardTitle>
                <CardDescription>Submit a review from the feedback form to see results here.</CardDescription>
            </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {aggregatedData.map((data, index) => {
            const totalReviews = data.scores.overallImpression.length;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{data.name}</CardTitle>
                    <CardDescription>{totalReviews} review{totalReviews !== 1 && 's'}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ratingFields.map(field => {
                      const scores = data.scores[field.key];
                      const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                      return (
                        <div key={field.key}>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium">{field.label}</p>
                            <div className="flex items-center text-sm font-semibold text-primary">
                              <Star className="h-4 w-4 mr-1 fill-current" />
                              {average.toFixed(1)} / 5.0
                            </div>
                          </div>
                          <Progress value={average * 20} />
                        </div>
                      );
                    })}
                    {data.comments.length > 0 && (
                      <div className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center"><MessageSquare className="h-4 w-4 mr-2" />Comments</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                          {data.comments.map((comment, i) => (
                            <p key={i} className="text-sm text-muted-foreground border-l-2 border-primary pl-3">"{comment}"</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}