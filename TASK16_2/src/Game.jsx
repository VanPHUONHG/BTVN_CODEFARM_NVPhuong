import React, { useState } from "react";

const Game = () => {
  const [numPlayers, setNumPlayers] = useState(0); // số lượng người chơi
  const [players, setPlayers] = useState([]); // thông tin người chơi
  const [currentTurn, setCurrentTurn] = useState(0); // lượt hiện tại
  const [history, setHistory] = useState([]); // lịch sử tung xúc xắc
  const [winner, setWinner] = useState(null); // người thắng

  // Khởi tạo người chơi
  const startGame = () => {
    if (numPlayers < 2 || numPlayers > 6) {
      alert("Vui lòng chọn từ 2 đến 6 người chơi!");
      return;
    }
    const newPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      id: i,
      name: `Người chơi ${i + 1}`,
      position: 0,
    }));
    setPlayers(newPlayers);
    setCurrentTurn(0);
    setHistory([]);
    setWinner(null);
  };

  // Tung xúc xắc
  const rollDice = () => {
    if (winner) return; // có người thắng thì dừng
    const dice = Math.floor(Math.random() * 6) + 1;

    setPlayers((prev) => {
      const updated = [...prev];
      updated[currentTurn].position += dice;

      // Nếu về đích
      if (updated[currentTurn].position >= 30) {
        setWinner(updated[currentTurn].name);
      }

      return updated;
    });

    // Lưu lịch sử
    setHistory((prev) => [
      ...prev,
      `${players[currentTurn].name} tung được ${dice}`,
    ]);

    // Nếu không phải số 6 thì chuyển lượt
    if (dice !== 6 && !winner) {
      setCurrentTurn((prev) => (prev + 1) % players.length);
    }
  };

  // Reset game
  const resetGame = () => {
    setNumPlayers(0);
    setPlayers([]);
    setCurrentTurn(0);
    setHistory([]);
    setWinner(null);
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>🎲 Cuộc đua xúc xắc 🎲</h1>

      {!players.length ? (
        <div>
          <h3>Chọn số người chơi (2 - 6):</h3>
          <input
            type="number"
            min="2"
            max="6"
            value={numPlayers}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
          />
          <br />
          <button onClick={startGame} style={{ marginTop: 10 }}>
            Bắt đầu chơi
          </button>
        </div>
      ) : (
        <div>
          <h3>Lượt của: {players[currentTurn].name}</h3>
          <button onClick={rollDice} disabled={!!winner}>
            Tung xúc xắc
          </button>
          <button onClick={resetGame} style={{ marginLeft: 10 }}>
            Chơi lại
          </button>

          <h2>🏁 Vị trí người chơi</h2>
          <ul>
            {players.map((p) => (
              <li key={p.id}>
                {p.name}: ô {p.position}
              </li>
            ))}
          </ul>

          {winner && (
            <h2 style={{ color: "green" }}>🎉 {winner} đã chiến thắng!</h2>
          )}

          <h2>📜 Lịch sử tung xúc xắc</h2>
          <ul>
            {history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game;
