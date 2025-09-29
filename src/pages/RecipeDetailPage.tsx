import { useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { useRecipeStore } from '@/store/recipeStore';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, ChefHat, Tag, Scale, List, CookingPot, Utensils, Archive, Presentation, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
const detailSections = [
  { key: 'ingredients', title: 'Ingredients', icon: List },
  { key: 'prepMethod', title: 'Prep Method', icon: Utensils },
  { key: 'cookingMethod', title: 'Cooking Method', icon: CookingPot },
  { key: 'qcCheckpoints', title: 'QC Checkpoints', icon: CheckCircle },
  { key: 'storage', title: 'Storage', icon: Archive },
  { key: 'plating', title: 'Plating', icon: Presentation },
  { key: 'notes', title: 'Notes', icon: Info },
];
const metaSections = [
  { key: 'yield', title: 'Yield', icon: Scale },
  { key: 'nutrition', title: 'Nutrition (Est.)', icon: ChefHat },
  { key: 'allergens', title: 'Allergens/Tags', icon: AlertTriangle },
  { key: 'costing', title: 'Costing (Est.)', icon: Tag },
];
export function RecipeDetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const getRecipeById = useRecipeStore((state) => state.getRecipeById);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const recipe = recipeId ? getRecipeById(recipeId) : undefined;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }
  const handleDeleteConfirm = () => {
    deleteRecipe(recipe.id);
    toast.success(`Recipe "${recipe.dishName}" has been deleted.`);
    setIsDeleteDialogOpen(false);
    navigate('/recipes');
  };
  return (
    <>
      <Toaster />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        itemName={recipe.dishName}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/recipes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Library
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link to={`/recipes/${recipe.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold">{recipe.dishName}</h1>
          <p className="text-xl text-muted-foreground mt-1">{recipe.localName}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge>{recipe.category}</Badge>
            <Badge variant="secondary">{recipe.classification}</Badge>
          </div>
          <p className="mt-4 text-lg max-w-3xl">{recipe.description}</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {detailSections.map(section => {
              const content = recipe[section.key as keyof typeof recipe];
              if (!content || (Array.isArray(content) && content.length === 0)) return null;
              return (
                <Card key={section.key}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <section.icon className="mr-3 h-5 w-5 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {section.key === 'ingredients' && Array.isArray(content) ? (
                      <div className="space-y-4">
                        {(content as { section?: string; items: string[] }[]).map((ingSection, idx) => (
                          <div key={idx}>
                            {ingSection.section && <h4 className="font-semibold mb-2">{ingSection.section}</h4>}
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                              {ingSection.items.map((item, itemIdx) => <li key={itemIdx}>{item}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : Array.isArray(content) ? (
                      <ol className="list-decimal pl-5 space-y-2">
                        {content.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ol>
                    ) : (
                      <p>{content.toString()}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <aside className="md:col-span-1 space-y-6 md:sticky top-24 self-start">
            {metaSections.map(section => {
              const content = recipe[section.key as keyof typeof recipe];
              if (!content) return null;
              return (
                <Card key={section.key}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <section.icon className="mr-3 h-5 w-5 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{content.toString()}</p>
                  </CardContent>
                </Card>
              );
            })}
          </aside>
        </div>
      </motion.div>
    </>
  );
}