import { useState } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container">
      <img
        src="/mascot_mango_msmoon.png"
        alt="Mascot Mango"
        className="mascot"
      />

      <h1>🍀 Lucky Mango</h1>

      <div className="mango-grid">
        {[...Array(20)].map((_, i) => (
          <button key={i} className="mango-btn">🥭</button>
        ))}
      </div>

      <div className="button-group">
        <button className="start-btn">Start</button>
        <button className="buy-btn">Buy Ticket</button>
        <button className="how-btn" onClick={() => setShowModal(true)}>How to Play</button>
      </div>

      {/* ✅ Modal แสดงเมื่อกดปุ่ม */}
      {showModal && (
  <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>How to Play Lucky Mango</h2>

      <h3>🎮 Game Objective</h3>
      <p>Select one mango from the garden to randomly receive a SHIDO prize remaining in the game.</p>

      <h3>🎟️ Ticket Rules</h3>
      <p>Each ticket lets you pick the number of times allowed by that ticket,
         from the 20 total prizes in the game.</p>
      <ul>
        <p>4000 SHIDO → 5 picks</p>
        <p>3400 SHIDO → 4 picks</p>
        <p>2700 SHIDO → 3 picks</p>
        <p>1900 SHIDO → 2 picks</p>
        <p>1000 SHIDO → 1 pick</p>
      </ul>

      <h3>🎁 Available Prizes (Total: 20)</h3>
      <ol>
        <p>1 prize of 5000 SHIDO</p>
        <p>1 prize of 3900 SHIDO</p>
        <p> prize of 2000 SHIDO</p>
        <p>7 prizes of 200 SHIDO</p>
        <p>10 prizes of 100 SHIDO</p>
      </ol>

      <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
    </div>
        </div>
      )}
    </div>
  );
}

export default App;
