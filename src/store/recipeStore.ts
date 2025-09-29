import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Recipe } from '@/types';
import { recipes as initialRecipes } from '@/data/recipes';
interface RecipeState {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: string) => void;
  getRecipeById: (recipeId: string) => Recipe | undefined;
}
export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipes: initialRecipes,
      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [...state.recipes, recipe],
        })),
      updateRecipe: (updatedRecipe) =>
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
          ),
        })),
      deleteRecipe: (recipeId) =>
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
        })),
      getRecipeById: (recipeId) => {
        return get().recipes.find((recipe) => recipe.id === recipeId);
      },
    }),
    {
      name: 'culinary-codex-recipes',
      storage: createJSONStorage(() => localStorage),
    }
  )
);