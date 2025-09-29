import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useRecipeStore } from '@/store/recipeStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, PlusCircle, MoreVertical, Trash2 } from 'lucide-react';
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};
const getBadgeVariant = (classification: string) => {
  switch (classification) {
    case 'Core':
    case 'Core (Rotating)':
      return 'default';
    case 'Special':
    case 'Special (Authentic)':
      return 'secondary';
    case 'Experimental':
      return 'outline';
    default:
      return 'default';
  }
};
export function RecipesPage() {
  const recipes = useRecipeStore((state) => state.recipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [classificationFilter, setClassificationFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const categories = useMemo(() => ['all', ...Array.from(new Set(recipes.map(r => r.category)))], [recipes]);
  const classifications = useMemo(() => ['all', ...Array.from(new Set(recipes.map(r => r.classification)))], [recipes]);
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.localName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
      const matchesClassification = classificationFilter === 'all' || recipe.classification === classificationFilter;
      return matchesSearch && matchesCategory && matchesClassification;
    });
  }, [recipes, searchTerm, categoryFilter, classificationFilter]);
  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteRecipe(deleteTarget.id);
      toast.success(`Recipe "${deleteTarget.name}" has been deleted.`);
      setDeleteTarget(null);
    }
  };
  return (
    <>
      <Toaster />
      <DeleteConfirmationDialog
        isOpen={!!deleteTarget}
        onOpenChange={(isOpen) => !isOpen && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deleteTarget?.name || ''}
      />
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-start flex-wrap gap-4"
        >
          <div>
            <h1 className="text-4xl font-display font-bold">Recipe Library</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Browse, search, and manage the entire culinary collection.
            </p>
          </div>
          <Button onClick={() => navigate('/recipes/new')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Recipe
          </Button>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={classificationFilter} onValueChange={setClassificationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by classification" />
            </SelectTrigger>
            <SelectContent>
              {classifications.map(cls => <SelectItem key={cls} value={cls}>{cls === 'all' ? 'All Classifications' : cls}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredRecipes.map(recipe => (
            <motion.div key={recipe.id} variants={itemVariants} className="relative group">
              <Card className="h-full flex flex-col transition-all duration-200 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
                <Link to={`/recipes/${recipe.id}`} className="block flex flex-col flex-grow">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg group-hover:text-primary">{recipe.dishName}</CardTitle>
                      <Badge variant={getBadgeVariant(recipe.classification)} className="flex-shrink-0">{recipe.classification}</Badge>
                    </div>
                    <CardDescription>{recipe.localName}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{recipe.description}</p>
                  </CardContent>
                </Link>
              </Card>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setDeleteTarget({ id: recipe.id, name: recipe.dishName })}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {filteredRecipes.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No recipes found.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </>
  );
}