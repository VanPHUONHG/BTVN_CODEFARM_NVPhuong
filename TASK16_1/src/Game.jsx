import React, { useState } from "react";

// Card component với hiệu ứng lật mượt mà sử dụng CSS transitions
const Card = ({ card, onFlip }) => {
  const { id, isFlipped, isLucky } = card;

  const handleClick = () => {
    if (!isFlipped) {
      onFlip(id);
    }
  };

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
      style={{
        width: "80px",
        height: "120px",
        margin: "5px",
        perspective: "1000px",
        cursor: isFlipped ? "default" : "pointer",
      }}
    >
      <div
        className="card-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Mặt sau (ẩn) */}
        <div
          className="card-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#4a90e2",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
          }}
        >
          🎴
        </div>
        {/* Mặt trước (hiện khi lật) */}
        <div
          className="card-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: isLucky ? "#f1c40f" : "#e74c3c",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isLucky ? "28px" : "24px",
            color: "white",
          }}
        >
          {isLucky ? "⭐" : "❌"}
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  // Hàm khởi tạo deck mới
  const initCards = () => {
    const ranDom = Math.floor(Math.random() * 12);
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      isFlipped: false,
      isLucky: i === ranDom,
    }));
  };

  const [cards, setCards] = useState(initCards);
  const [turns, setTurns] = useState(3);
  const [status, setStatus] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Lật bài
  const flip = (id) => {
    if (turns === 0 || gameOver) return;

    setCards((prev) =>
      prev.map((card) => {
        if (card.id === id && !card.isFlipped) {
          const newCard = { ...card, isFlipped: true };

          if (newCard.isLucky) {
            setStatus("win");
            setGameOver(true);
          } else {
            setTurns((t) => {
              const newTurns = t - 1;
              if (newTurns === 0) {
                setStatus("lose");
                setGameOver(true);
              }
              return newTurns;
            });
          }

          return newCard;
        }
        return card;
      })
    );
  };

  const resetGame = () => {
    setCards(initCards());
    setTurns(3);
    setStatus(null);
    setGameOver(false);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>🎴 Game Lật Bài May Mắn 🎴</h1>

      <p>🔄 Lượt lật còn lại: {turns}</p>
      {status === "win" && <h2 style={{ color: "green" }}>🎉 Bạn đã thắng!</h2>}
      {status === "lose" && <h2 style={{ color: "red" }}>💔 Bạn đã thua!</h2>}

      <button
        onClick={resetGame}
        style={{
          margin: "10px 0",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "16px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
        }}
        disabled={false}
      >
        🔄 Chơi lại
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "450px",
          margin: "20px auto",
          justifyContent: "center",
        }}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} onFlip={flip} />
        ))}
      </div>

      <style jsx>{`
        .card {
          display: inline-block;
        }
        .card-inner {
          transition: transform 0.6s ease-in-out;
        }
        .card.flipped .card-inner {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Game;
