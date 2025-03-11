import React, { useEffect } from "react";
import Card from "./Card";
import useGameStore from "@/store/useGameStore";

const Board = () => {
  const { cards, players, currentPlayer, flipCard, resetGame } = useGameStore();

  useEffect(() => {
    // Inicializar el juego al montar el componente
    resetGame();
  }, [resetGame]);

  return (
    <div>
      <div className="players">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`player ${currentPlayer === index ? "active" : ""}`}
          >
            <h3>{player.name}</h3>
            <p>Puntos: {player.score}</p>
          </div>
        ))}
      </div>
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
