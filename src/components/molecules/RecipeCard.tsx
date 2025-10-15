import Image from 'next/image';
import {Star} from 'lucide-react';
import {RecipeResponse} from "@/types/recipe";
import Link from "next/link";

export const RecipeCard = ({recipe}: { recipe: RecipeResponse }) => {
    return (
        <Link href={`/recipes/${recipe.id}`}>
            <div
                className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
                {recipe.imageUrl && (
                    <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        width={300}
                        height={200}
                        className="rounded-xl object-cover mb-3"
                    />
                )}
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{recipe.description}</p>
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
        </Link>
    )

};
