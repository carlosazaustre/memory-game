import { create } from "zustand";
import { fetchLogos } from "../utils/api";

interface Card {
  image: string;
  id: number;
  isFlipped: boolean;
}

interface Logo {
  name: string;
  url: string;
}

interface GameState {
  cards: Card[];
  flippedIndices: number[];
  score: number;
  setCards: (cards: Card[]) => void;
  flipCard: (index: number) => void;
  resetGame: () => void;
}

const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  flippedIndices: [],
  score: 0,
  setCards: (cards) => set({ cards }),
  flipCard: (index) => {
    const { cards, flippedIndices, score } = get();
    if (flippedIndices.length < 2 && !cards[index].isFlipped) {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      set({ flippedIndices: [...flippedIndices, index], cards: newCards });

      if (flippedIndices.length === 1) {
        const firstCard = newCards[flippedIndices[0]];
        const secondCard = newCards[index];

        if (firstCard.image === secondCard.image) {
          set({ score: score + 1, flippedIndices: [] });
        } else {
          setTimeout(() => {
            firstCard.isFlipped = false;
            secondCard.isFlipped = false;
            set({ cards: [...newCards], flippedIndices: [] });
          }, 1000);
        }
      }
    }
  },
  resetGame: async () => {
    const logos = await fetchLogos();
    const logoUrls = logos.map((logo) => logo.image); // cambiado de 'url' a 'image'
    const shuffledCards = [...logoUrls, ...logoUrls]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ image, id: index, isFlipped: false }));
    set({ cards: shuffledCards, score: 0, flippedIndices: [] });
  },
}));

export default useGameStore;
