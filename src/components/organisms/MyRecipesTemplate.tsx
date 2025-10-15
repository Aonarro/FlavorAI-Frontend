'use client'
import React, {useEffect, useRef} from 'react';
import {RecipeCard} from "@/components/molecules/RecipeCard";
import {getMyRecipes} from "@/services/receipeService";
import {useRecipesStore} from "@/store/useRecipesStore";
import {useAuthStore} from "@/store/useAuthStore";

const MyRecipesTemplate = () => {
    const {recipes, setRecipes, clearRecipes} = useRecipesStore();
    const {user} = useAuthStore();
    const fetched = useRef(false);
    useEffect(() => {
        if (!user?.id || fetched.current) return;
        fetched.current = true;

        getMyRecipes()
            .then(setRecipes)
            .catch((err) => {
                console.error('Failed to load your recipes:', err);
                clearRecipes();
            });

        // очищаем при размонтировании
        return () => clearRecipes();
    }, [user?.id, setRecipes, clearRecipes]);


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Recipes</h1>

            {recipes.length === 0 ? (
                <p className="text-muted-foreground">You haven&#39;t added any
                    recipes yet.</p>
            ) : (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                    ))}
                </div>
            )}
        </div>
    );

};

export default MyRecipesTemplate;