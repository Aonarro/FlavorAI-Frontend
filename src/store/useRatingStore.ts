import { create } from 'zustand';

interface RatingState {
    isOpen: boolean;
    recipeId: string | null;
    rating: number;
    openModal: (recipeId: string) => void;
    closeModal: () => void;
    setRating: (value: number) => void;
}

export const useRatingStore = create<RatingState>((set) => ({
    isOpen: false,
    recipeId: null,
    rating: 0,
    openModal: (id) => set({ isOpen: true, recipeId: id }),
    closeModal: () => set({ isOpen: false, recipeId: null, rating: 0 }),
    setRating: (value) => set({ rating: value }),
}));
