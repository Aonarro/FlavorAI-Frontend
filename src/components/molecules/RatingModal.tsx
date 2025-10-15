'use client';

import {useRatingStore} from '@/store/useRatingStore';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/atoms/dialog';
import {Button} from '@/components/atoms/button';
import {rateRecipe} from "@/services/receipeService";
import { useRouter } from 'next/navigation';


export const RatingModal = () => {
    const {isOpen, recipeId, rating, setRating, closeModal} = useRatingStore();
    const router = useRouter();


    const handleSubmit = async () => {
        if (!recipeId || rating === 0) return;

        try {
            await rateRecipe(recipeId, rating);
            closeModal();
            router.push('/recipes');
        } catch (err) {
            console.error('Rating failed:', err);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rate this recipe</DialogTitle>
                </DialogHeader>

                <div className="flex gap-2 justify-center my-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Button
                            key={value}
                            variant={rating === value ? 'default' : 'outline'}
                            onClick={() => setRating(value)}
                        >
                            {value} ⭐
                        </Button>
                    ))}
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={closeModal}>Cancel</Button>
                    <Button
                        onClick={handleSubmit} disabled={rating === 0}
                    >Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
