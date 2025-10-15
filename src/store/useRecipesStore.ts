import { create } from 'zustand';
import { RecipeResponse } from '@/types/recipe';

interface RecipesState {
    recipes: RecipeResponse[];
    search: string;
    setRecipes: (recipes: RecipeResponse[]) => void;
    setSearch: (search: string) => void;
    clearRecipes: () => void;
}

export const useRecipesStore = create<RecipesState>((set) => ({
    recipes: [],
    search: '',
    setRecipes: (recipes) => set({ recipes }),
    setSearch: (search) => set({ search }),
    clearRecipes: () => set({ recipes: [] }),
}));
