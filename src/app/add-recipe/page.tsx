import React from 'react';
import AddRecipeTemplate from "@/components/molecules/CreateRecipesForm";

const AddRecipePage = () => {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-100"
        >
            <AddRecipeTemplate/>
        </div>
    );
};

export default AddRecipePage;