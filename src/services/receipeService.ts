import {api} from '@/lib/api';
import {RecipeResponse} from "@/types/recipe";

export type CreateRecipePayload = {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    imageUrl?: string;
};

export async function createRecipe(payload: CreateRecipePayload) {
    try {
        const {data} = await api.post('/recipes', payload);
        return data;
    } catch (err) {
        console.error('Create recipe error:', err);
        throw err;
    }
}

export async function getRecipeById(id: string): Promise<RecipeResponse> {
    try {
        const {data} = await api.get(`/recipes/${id}`);
        return data;
    } catch (err) {
        console.error(`Error fetching recipe ${id}:`, err);
        throw err;
    }
}

export async function getAllRecipes(): Promise<RecipeResponse[]> {
    try {
        const {data} = await api.get(`/recipes`);
        return data;
    } catch (err) {
        console.error(`Error fetching recipes`, err);
        throw err;
    }
}

export async function getMyRecipes(): Promise<RecipeResponse[]> {
    try {
        const {data} = await api.get('/recipes/me/list');
        return data;
    } catch (err) {
        console.error(`Error fetching recipes`, err);
        throw err;
    }
}

export async function searchRecipes(query: string): Promise<RecipeResponse[]> {
    try {
        const {data} = await api.get('/recipes/search', {
            params: {q: query},
        });
        return data;
    } catch (err) {
        console.error(`Error fetching recipes`, err);
        throw err;
    }
}

export async function rateRecipe(recipeId: string, value: number) {
    try {
        const { data } = await api.post(`/recipes/${recipeId}/rate`, { value });
        return data;
    } catch (err) {
        console.error('Rate recipe error:', err);
        throw err;
    }
}




