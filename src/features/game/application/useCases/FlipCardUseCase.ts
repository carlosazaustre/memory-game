import { Card } from "../../domain/models/Card";

/**
 * Use case for flipping a card in a memory game
 * @class FlipCardUseCase
 *
 * @method execute
 * @param {number} index - The index of the card to flip
 * @param {Card[]} cards - Array of all cards in the game
 * @param {number[]} flippedIndices - Array of indices of currently flipped cards
 * @param {number} score - Current game score
 * @param {number} currentPlayer - The current player
 * @returns {Object} Object containing updated cards array, flipped indices array, score, and current player
 * @returns {Card[]} returns.cards - Updated array of cards
 * @returns {number[]} returns.flippedIndices - Updated array of flipped card indices
 * @returns {number} returns.score - Updated score
 * @returns {number} returns.currentPlayer - Updated current player
 *
 * @description
 * Handles the logic for flipping a card in the memory game:
 * - Prevents flipping more than 2 cards at once
 * - Prevents flipping an already flipped card
 * - Checks for matches when 2 cards are flipped
 * - Updates score when a match is found
 * - Handles unflipping cards after a delay when no match is found
 */
export class FlipCardUseCase {
  execute(
    index: number,
    cards: Card[],
    flippedIndices: number[],
    score: number,
    currentPlayer: number
  ): {
    cards: Card[];
    flippedIndices: number[];
    score: number;
    currentPlayer: number;
    shouldWait?: boolean;
  } {
    if (flippedIndices.length >= 2 || cards[index].isFlipped) {
      return { cards, flippedIndices, score, currentPlayer };
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const newFlippedIndices = [...flippedIndices, index];

    if (flippedIndices.length === 1) {
      const firstCard = newCards[flippedIndices[0]];
      const secondCard = newCards[index];

      if (firstCard.image === secondCard.image) {
        return {
          cards: newCards,
          flippedIndices: [],
          score: score + 1,
          currentPlayer,
        };
      }

      // Mantenemos las cartas volteadas y indicamos que debe esperar
      return {
        cards: newCards,
        flippedIndices: newFlippedIndices,
        score,
        currentPlayer,
        shouldWait: true,
      };
    }

    return {
      cards: newCards,
      flippedIndices: newFlippedIndices,
      score,
      currentPlayer,
    };
  }
}
