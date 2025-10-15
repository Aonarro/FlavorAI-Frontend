'use client';

import {useEffect, useMemo} from 'react';
import {RecipeCard} from '@/components/molecules/RecipeCard';
import {Input} from '@/components/atoms/input';
import {useRecipesStore} from "@/store/useRecipesStore";
import {getAllRecipes, searchRecipes} from "@/services/receipeService";
import {debounce} from 'lodash';


export default function AllRecipesTemplate() {
    const {recipes, search, setRecipes, setSearch} = useRecipesStore();

    const debouncedSearch = useMemo(
        () =>
            debounce(async (query: string) => {
                if (query.trim()) {
                    const results = await searchRecipes(query);
                    setRecipes(results);
                } else {
                    const all = await getAllRecipes();
                    setRecipes(all);
                }
            }, 400),
        [setRecipes]
    );

    useEffect(() => {
        debouncedSearch(search);
        return () => debouncedSearch.cancel();
    }, [search, debouncedSearch]);


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
            <Input
                placeholder="Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6"
            />

            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                ))}
            </div>
        </div>
    );
}
