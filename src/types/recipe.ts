export type RecipeUser = {
    id: string;
    firstName: string;
    lastName: string;
};

export type RecipeRating = {
    value: number;
    userId: string;
};

export type RecipeResponse = {
    id: string;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    imageUrl: string | null;
    averageRating: number | null;
    createdAt: string;
    updatedAt: string;
    user?: RecipeUser;
    ratings: RecipeRating[];
};