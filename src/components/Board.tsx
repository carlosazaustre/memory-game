import React, { useEffect } from "react";
import Card from "./Card";
import useGameStore from "../store/useGameStore";
import { fetchLogos } from "../utils/api";

const Board = () => {
  const { cards, score, flipCard, resetGame, setCards } = useGameStore();

  useEffect(() => {
    const initializeBoard = async () => {
      const logos = await fetchLogos();
      const logoUrls = logos.map((logo) => logo.image); // cambiado de 'url' a 'image'
      const shuffledCards = [...logoUrls, ...logoUrls]
        .sort(() => Math.random() - 0.5)
        .map((image, index) => ({ image, id: index, isFlipped: false }));
      setCards(shuffledCards);
    };

    initializeBoard();
  }, [setCards]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <button onClick={resetGame}>Reset Game</button>
      <div className="board">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            image={card.image}
            isFlipped={card.isFlipped}
            onClick={() => flipCard(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
