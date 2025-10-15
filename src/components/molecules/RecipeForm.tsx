'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/button';
import {createRecipe} from "@/services/receipeService";

type CreateRecipeFormValues = {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
};

export default function CreateRecipeForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateRecipeFormValues>();

    const router = useRouter();

    const onSubmit = async (data: CreateRecipeFormValues) => {
        try {
            const recipe = await createRecipe(data);
            toast.success('Recipe created successfully');
            reset();
            router.push(`/recipes/${recipe.id}`);
        } catch (err) {
            console.error(err);
            toast.error('Failed to create recipe');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow"
        >
            <FormField
                label="Title"
                error={errors.title?.message}
                {...register('title', {
                    required: 'Title is required',
                    minLength: { value: 3, message: 'Minimum 3 characters' },
                })}
            />

            <FormField
                label="Description"
                error={errors.description?.message}
                {...register('description', {
                    required: 'Description is required',
                    minLength: { value: 5, message: 'Minimum 5 characters' },
                })}
            />

            <FormField
                label="Ingredients (separate by ,)"
                error={errors.ingredients?.message}
                {...register('ingredients', {
                    required: 'Ingredients are required',
                })}
            />

            <FormField
                label="Instructions"
                error={errors.instructions?.message}
                {...register('instructions', {
                    required: 'Instructions are required',
                })}
            />

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Recipe'}
            </Button>
        </form>
    );
}
