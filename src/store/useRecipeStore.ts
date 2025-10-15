import { create } from 'zustand';
import { RecipeResponse } from '@/types/recipe';

interface RecipeState {
    recipe: RecipeResponse | null;
    setRecipe: (recipe: RecipeResponse) => void;
    clearRecipe: () => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
    recipe: null,
    setRecipe: (recipe) => set({ recipe }),
    clearRecipe: () => set({ recipe: null }),
}));
