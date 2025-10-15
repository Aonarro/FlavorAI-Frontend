import CreateRecipeForm from "@/components/molecules/RecipeForm";

export default function AddRecipeTemplate() {
    return (
        <div className="w-full max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">Add a New Recipe</h1>
            <CreateRecipeForm />
        </div>
    );
}
