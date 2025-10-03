import React from "react";

const Card = ({ card, onFlip }) => {
  return (
    <div
      onClick={() => !card.isFlipped && onFlip(card.id)}
      style={{
        width: "100px",
        height: "150px",
        border: "2px solid black",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        cursor: "pointer",
        backgroundColor: card.isFlipped ? "#fff" : "#444",
        color: card.isFlipped ? "#000" : "#fff",
        margin: "5px",
      }}
    >
      {card.isFlipped ? (card.isLucky ? "🌟" : "💔") : "❓"}
    </div>
  );
};

export default Card;
