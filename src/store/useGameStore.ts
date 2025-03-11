import { create } from "zustand";
import { Card } from "@/features/game/domain/models/Card";
import { Player } from "@/features/game/domain/models/Player";
import { LogotypesApiRepository } from "@/features/game/infrastructure/repositories/LogotypesApiRepository";
import { FetchLogosUseCase } from "@/features/game/application/useCases/FetchLogosUseCase";
import { FlipCardUseCase } from "@/features/game/application/useCases/FlipCardUseCase";

const logoRepository = new LogotypesApiRepository();
const fetchLogosUseCase = new FetchLogosUseCase(logoRepository);
const flipCardUseCase = new FlipCardUseCase();

interface GameState {
  cards: Card[];
  flippedIndices: number[];
  players: Player[];
  currentPlayer: number;
  setCards: (cards: Card[]) => void;
  flipCard: (index: number) => void;
  resetGame: () => void;
}

const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  flippedIndices: [],
  players: [
    { id: 1, name: "Jugador 1", score: 0 },
    { id: 2, name: "Jugador 2", score: 0 },
  ],
  currentPlayer: 0,
  setCards: (cards) => set({ cards }),
  flipCard: (index) => {
    const { cards, flippedIndices, players, currentPlayer } = get();
    const result = flipCardUseCase.execute(
      index,
      cards,
      flippedIndices,
      players[currentPlayer].score,
      currentPlayer
    );

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer].score = result.score;

    if (result.shouldWait) {
      // Primero actualizamos el estado para mostrar las cartas
      set({
        cards: result.cards,
        flippedIndices: result.flippedIndices,
        players: updatedPlayers,
      });

      // Después de 1 segundo, volteamos las cartas y cambiamos el turno
      setTimeout(() => {
        const newCards = [...result.cards];
        const [firstIndex, secondIndex] = result.flippedIndices;
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;

        set({
          cards: newCards,
          flippedIndices: [],
          currentPlayer: currentPlayer === 0 ? 1 : 0,
          players: updatedPlayers,
        });
      }, 1000);
      return;
    }

    set({
      cards: result.cards,
      flippedIndices: result.flippedIndices,
      currentPlayer: result.currentPlayer,
      players: updatedPlayers,
    });
  },
  resetGame: async () => {
    const cards = await fetchLogosUseCase.execute();
    set({
      cards,
      flippedIndices: [],
      currentPlayer: 0,
      players: [
        { id: 1, name: "Jugador 1", score: 0 },
        { id: 2, name: "Jugador 2", score: 0 },
      ],
    });
  },
}));

export default useGameStore;
