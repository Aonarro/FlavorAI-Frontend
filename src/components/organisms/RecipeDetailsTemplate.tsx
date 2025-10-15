'use client';

import {useEffect} from 'react';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import {Star} from 'lucide-react';
import {Button} from '@/components/atoms/button';
import {useRecipeStore} from "@/store/useRecipeStore";
import {getRecipeById} from "@/services/receipeService";
import { useRatingStore } from '@/store/useRatingStore';

import {toast} from "sonner";

export default function RecipeDetailsPage() {
    const params = useParams();
    const { recipe, setRecipe, clearRecipe } = useRecipeStore();
    const { openModal } = useRatingStore();


    useEffect(() => {
        if (!params.id) return;
        getRecipeById(params.id as string)
            .then(setRecipe)
            .catch((err) => {
                toast.error(err.message);
                clearRecipe();
            });


    }, [params.id]);

    if (!recipe)
        return <div
            className="text-center py-10 text-gray-500"
        >Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            {recipe.imageUrl && (
                <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    width={800}
                    height={400}
                    className="w-full h-72 object-cover rounded-xl mb-6"
                />
            )}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={
                                i < Math.round(recipe.averageRating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                            }
                        />
                    ))}
                </div>
            </div>

            <p className="text-gray-700 mb-4">{recipe.description}</p>

            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                {recipe.ingredients.split(',').map((ingredient, index) => (
                    <li key={index}>{ingredient.trim()}</li>
                ))}
            </ul>

            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <p className="whitespace-pre-line text-gray-700 mb-8">
                {recipe.instructions}
            </p>

            <Button onClick={() => openModal(recipe.id)} size="lg">
                Rate Recipe
            </Button>
        </div>
    );
}
