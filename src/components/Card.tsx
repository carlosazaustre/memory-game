import React from "react";

interface CardProps {
  image: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      {isFlipped ? (
        <img src={image} alt="Card" />
      ) : (
        <div className="card-back" />
      )}
    </div>
  );
};

export default Card;
