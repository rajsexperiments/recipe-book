import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useRecipeStore } from '@/store/recipeStore';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import type { Recipe } from '@/types';
const recipeSchema = z.object({
  dishName: z.string().min(1, "Dish name is required."),
  localName: z.string().min(1, "Local name is required."),
  category: z.enum(['Breakfast', 'Lunch', 'Brunch', 'Brunch/Lunch', 'Breakfast/Lunch', 'Lunch (Side)', 'Brunch/Beverage']),
  classification: z.enum(['Core', 'Special', 'Experimental', 'Special (Authentic)', 'Core (Rotating)']),
  description: z.string().min(1, "Description is required."),
  ingredients: z.array(z.object({
    section: z.string().optional(),
    items: z.array(z.string().min(1, "Ingredient cannot be empty.")).min(1, "At least one ingredient is required."),
  })).min(1, "At least one ingredient section is required."),
  prepMethod: z.array(z.string().min(1, "Prep step cannot be empty.")).min(1, "At least one prep step is required."),
  cookingMethod: z.array(z.string().min(1, "Cooking step cannot be empty.")).min(1, "At least one cooking step is required."),
  yield: z.string().min(1, "Yield is required."),
  nutrition: z.string().min(1, "Nutrition info is required."),
  allergens: z.string().min(1, "Allergens info is required."),
  costing: z.string().min(1, "Costing info is required."),
  qcCheckpoints: z.array(z.string().min(1, "QC step cannot be empty.")).min(1, "At least one QC step is required."),
  storage: z.array(z.string().min(1, "Storage info cannot be empty.")).min(1, "At least one storage info is required."),
  plating: z.string().min(1, "Plating info is required."),
  notes: z.string().optional(),
});
type RecipeFormData = z.infer<typeof recipeSchema>;
// Specific editors to replace generic StringListEditor for type safety
const PrepMethodEditor = ({ control }: { control: Control<RecipeFormData> }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "prepMethod" });
  return (
    <div className="space-y-4">
      <FormLabel>Prep Method</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <FormField control={control} name={`prepMethod.${index}`} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
          <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append('')}><PlusCircle className="mr-2 h-4 w-4" /> Add Step</Button>
    </div>
  );
};
const CookingMethodEditor = ({ control }: { control: Control<RecipeFormData> }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "cookingMethod" });
  return (
    <div className="space-y-4">
      <FormLabel>Cooking Method</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <FormField control={control} name={`cookingMethod.${index}`} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
          <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append('')}><PlusCircle className="mr-2 h-4 w-4" /> Add Step</Button>
    </div>
  );
};
const QcCheckpointsEditor = ({ control }: { control: Control<RecipeFormData> }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "qcCheckpoints" });
  return (
    <div className="space-y-4">
      <FormLabel>QC Checkpoints</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <FormField control={control} name={`qcCheckpoints.${index}`} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
          <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append('')}><PlusCircle className="mr-2 h-4 w-4" /> Add Step</Button>
    </div>
  );
};
const StorageEditor = ({ control }: { control: Control<RecipeFormData> }) => {
  const { fields, append, remove } = useFieldArray({ control, name: "storage" });
  return (
    <div className="space-y-4">
      <FormLabel>Storage</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <FormField control={control} name={`storage.${index}`} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
          <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append('')}><PlusCircle className="mr-2 h-4 w-4" /> Add Step</Button>
    </div>
  );
};
const IngredientItemsEditor = ({ nestIndex, control }: { nestIndex: number; control: Control<RecipeFormData> }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: `ingredients.${nestIndex}.items` as `ingredients.${number}.items`,
    });
    return (
      <div className="pl-4 space-y-2">
        {fields.map((item, k) => (
          <div key={item.id} className="flex items-start gap-2">
            <FormField
              control={control}
              name={`ingredients.${nestIndex}.items.${k}`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input {...field} placeholder="e.g., Foxtail Millet: 60g" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(k)} disabled={fields.length <= 1}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="secondary" size="sm" onClick={() => append('')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Ingredient
        </Button>
      </div>
    );
  };
export function RecipeFormPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { addRecipe, updateRecipe, getRecipeById } = useRecipeStore();
  const isEditing = Boolean(recipeId);
  const recipe = isEditing ? getRecipeById(recipeId!) : null;
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      dishName: '', localName: '', description: '',
      category: 'Breakfast', classification: 'Core',
      ingredients: [{ section: 'Main Ingredients', items: [''] }],
      prepMethod: [''], cookingMethod: [''],
      yield: '', nutrition: '', allergens: '', costing: '',
      qcCheckpoints: [''], storage: [''], plating: '', notes: '',
    },
  });
  const { fields: ingredientSections, append: appendIngredientSection, remove: removeIngredientSection } = useFieldArray({ control: form.control, name: "ingredients" });
  useEffect(() => {
    if (isEditing && recipe) {
      form.reset(recipe as unknown as RecipeFormData);
    }
  }, [isEditing, recipe, form]);
  const onSubmit = (data: RecipeFormData) => {
    const finalData: Recipe = {
      ...data,
      id: isEditing && recipeId ? recipeId : `${Date.now()}-${data.dishName.toLowerCase().replace(/\s+/g, '-')}`,
      notes: data.notes || '',
    };
    if (isEditing) {
      updateRecipe(finalData);
      toast.success("Recipe updated successfully!");
    } else {
      addRecipe(finalData);
      toast.success("Recipe created successfully!");
    }
    navigate(`/recipes/${finalData.id}`);
  };
  return (
    <>
      <Toaster />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-display">{isEditing ? 'Edit Recipe' : 'Create New Recipe'}</CardTitle>
                <CardDescription>Fill in the details for the recipe below, organized into sections.</CardDescription>
              </CardHeader>
            </Card>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="methods">Methods & Details</TabsTrigger>
                <TabsTrigger value="meta">Meta & Info</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="mt-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="dishName" render={({ field }) => (<FormItem><FormLabel>Dish Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="localName" render={({ field }) => (<FormItem><FormLabel>Local Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="category" render={({ field }) => (<FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{['Breakfast', 'Lunch', 'Brunch', 'Brunch/Lunch', 'Breakfast/Lunch', 'Lunch (Side)', 'Brunch/Beverage'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="classification" render={({ field }) => (<FormItem><FormLabel>Classification</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{['Core', 'Special', 'Experimental', 'Special (Authentic)', 'Core (Rotating)'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>)} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="methods" className="mt-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                        <FormLabel>Ingredients</FormLabel>
                        {ingredientSections.map((section, index) => (
                            <div key={section.id} className="p-4 border rounded-lg space-y-4">
                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`ingredients.${index}.section`}
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormControl><Input {...field} placeholder="Section Name (e.g., For the Curry)" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeIngredientSection(index)} disabled={ingredientSections.length <= 1}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <IngredientItemsEditor nestIndex={index} control={form.control} />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendIngredientSection({ section: '', items: [''] })}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Ingredient Section
                        </Button>
                    </div>
                    <Separator />
                    <PrepMethodEditor control={form.control} />
                    <Separator />
                    <CookingMethodEditor control={form.control} />
                    <Separator />
                    <QcCheckpointsEditor control={form.control} />
                    <Separator />
                    <StorageEditor control={form.control} />
                    <Separator />
                    <FormField control={form.control} name="plating" render={({ field }) => (<FormItem><FormLabel>Plating</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="notes" render={({ field }) => (<FormItem><FormLabel>Notes</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="meta" className="mt-6">
                <Card>
                  <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="yield" render={({ field }) => (<FormItem><FormLabel>Yield</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="nutrition" render={({ field }) => (<FormItem><FormLabel>Nutrition (Est.)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="allergens" render={({ field }) => (<FormItem><FormLabel>Allergens/Tags</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="costing" render={({ field }) => (<FormItem><FormLabel>Costing (Est.)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit">{isEditing ? 'Save Changes' : 'Create Recipe'}</Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </>
  );
}