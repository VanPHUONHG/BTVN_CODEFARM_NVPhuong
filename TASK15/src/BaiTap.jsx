import React, { useState } from "react";

const GuessingGame = () => {
  const [level, setLevel] = useState("easy");
  const [secretNumber, setSecretNumber] = useState(generateRandom("easy"));
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("playing");
  const [turnsLeft, setTurnsLeft] = useState(10);

  function generateRandom(level) {
    if (level === "easy") return Math.floor(Math.random() * 50) + 1;
    if (level === "medium") return Math.floor(Math.random() * 100) + 1;
    return Math.floor(Math.random() * 200) + 1;
  }

  const handleGuess = () => {
    if (!guess || status !== "playing") return;

    const num = parseInt(guess, 10);
    let result = "";

    if (num === secretNumber) {
      setStatus("win");
      result = "Lúa về rồi";
    } else {
      const newTurns = turnsLeft - 1;
      setTurnsLeft(newTurns);
      result = num > secretNumber ? "⬆️ Cao hơn" : "⬇️ Thấp hơn";
      if (newTurns === 0) {
        setStatus("lose");
        result = ` Vỡ bát rồi: ${secretNumber}`;
      }
    }

    setHistory([...history, { num, result }]);
    setGuess("");
  };

  const resetGame = () => {
    setSecretNumber(generateRandom(level));
    setGuess("");
    setHistory([]);
    setStatus("playing");
    setTurnsLeft(10);
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "30px auto",
        textAlign: "center",
        background: "linear-gradient(135deg, #1a1a1a, #2c2c2c)",
        color: "#ffd700",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
        🎲 Trò chơi Quý Tộc
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px" }}>Mức cược:</label>
        <select
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
            resetGame();
          }}
          style={{
            padding: "8px 15px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
            background: "#333",
            color: "#ffd700",
          }}
        >
          <option value="easy">Cửa nhỏ (1$-50$)</option>
          <option value="medium">Cửa vừa (1$-100$)</option>
          <option value="hard">Cửa lớn (1$-200$)</option>
        </select>
      </div>

      {status === "playing" && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Nhập số..."
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "2px solid #ffd700",
              marginRight: "10px",
              width: "120px",
              textAlign: "center",
              background: "#111",
              color: "#ffd700",
              fontWeight: "bold",
            }}
          />
          <button
            onClick={handleGuess}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#ffd700",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Mở bát
          </button>
        </div>
      )}

      <p style={{ fontSize: "18px" }}>Lượt còn lại: {turnsLeft}</p>

      {status === "win" && (
        <p style={{ color: "lime", fontSize: "20px" }}>
          {" "}
          Lúa về Bạn thắng rồi!
        </p>
      )}
      {status === "lose" && (
        <p style={{ color: "red", fontSize: "20px" }}>Thua rồi !</p>
      )}

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h4 style={{ borderBottom: "1px solid #ffd700", paddingBottom: "5px" }}>
          📜 Lịch sử đoán:
        </h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((h, index) => {
            const range =
              level === "easy" ? 50 : level === "medium" ? 100 : 200;
            const diff = Math.abs(h.num - secretNumber);
            const near = diff <= range * 0.3;
            return (
              <li
                key={index}
                style={{
                  color: near ? "lime" : "red",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                {h.num} ➝ {h.result}
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "2px solid #ffd700",
          background: "transparent",
          color: "#ffd700",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🔄 Chơi lại
      </button>
    </div>
  );
};

export default GuessingGame;
