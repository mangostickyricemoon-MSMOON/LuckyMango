import React, { useState } from 'react';
import './App.css';

import mangoIcon from './assets/mango-icon.png';
import mascotWin from './assets/mascot-win.png';
import mascotLose from './assets/mascot-lose.png';
import logo from './assets/lucky-mango-logo.png';
import ticketIcon from './assets/ticket-icon.png';

function App() {
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const [picksTotal, setPicksTotal] = useState(0);
  const [picksAvailable, setPicksAvailable] = useState(0);
  const [pickedIndexes, setPickedIndexes] = useState<number[]>([]);
  const [rewardsWon, setRewardsWon] = useState<string[]>([]);
  const [prizePool, setPrizePool] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameLocked, setGameLocked] = useState(false);

  const handlePick = (index: number): void => {
    if (!gameStarted || gameLocked || picksAvailable <= 0) return;

    if (pickedIndexes.includes(index)) {
      setPickedIndexes(pickedIndexes.filter(i => i !== index));
      setPicksAvailable(picksAvailable + 1);
    } else {
      if (picksAvailable > 0) {
        setPickedIndexes([...pickedIndexes, index]);
        setPicksAvailable(picksAvailable - 1);
      }
    }
  };

  const handleStart = (): void => {
    const newPrizes: string[] = [];
    let pool = [...prizePool];

    pickedIndexes.forEach(() => {
      const randomIndex = Math.floor(Math.random() * pool.length);
      newPrizes.push(pool[randomIndex]);
      pool.splice(randomIndex, 1);
    });

    setRewardsWon(newPrizes);
    setPrizePool(pool);
    setShowSummaryModal(true);
    setGameLocked(true);
  };

  const getTotalShido = (): number => {
    return rewardsWon.reduce((total, prize) => {
      const match = prize.match(/(\d+)/);
      return match ? total + parseInt(match[1]) : total;
    }, 0);
  };

  const resetGame = (): void => {
    setPicksTotal(0);
    setPicksAvailable(0);
    setPickedIndexes([]);
    setRewardsWon([]);
    setPrizePool([]);
    setGameStarted(false);
    setGameLocked(false);
    setShowSummaryModal(false);
  };

  return (
    <div className="container">
        <div className="logo-banner">
        <img src={logo} alt="Lucky Mango Logo" className="logo" loading="lazy" />
        </div>

        <div className="status-bar">
            <div className="status-left">🎟️ Ticket: ({picksAvailable} / {picksTotal})</div>
        </div>

        <div className="mango-grid">
            {Array.from({ length: 4 }).map((_, rowIndex) => (
        <div key={rowIndex} className="mango-row">
          {Array.from({ length: 5 }).map((_, colIndex) => {
          const index = rowIndex * 5 + colIndex;
          return (
            <button
              key={index}
              className="mango-btn"
              onClick={() => handlePick(index)}
              style={{
                opacity: pickedIndexes.includes(index) ? 0.4 : 1,
                borderColor: pickedIndexes.includes(index) ? '#4caf50' : '#ffb300'
            }}
          >
              <img src={mangoIcon} alt="Mango" className="mango-img" loading="lazy" />
           </button>
           );
          })}
        </div>
        ))}

              <div className="status-bar">
          <div className="status-right">🎁 Total Rewards: {getTotalShido()} SHIDO</div>
      </div>

      <div className="button-group">
        <button
          className={`start-btn ${picksAvailable === 0 && pickedIndexes.length === picksTotal ? 'active' : 'disabled'}`}
          onClick={handleStart}
          disabled={picksAvailable !== 0}
        >
          Start
        </button>
      </div>

      <div className="bottom-nav">
          <button className="nav-btn">🏠 Home</button>
          <button className="nav-btn">🎁 Rewards</button>
          <button className="nav-btn">👤 Profile</button>
          <button className="nav-btn">⚙️ Settings</button>
      </div>

    </div>
      

      {showTicketModal && (
        <div className="modal-overlay" onClick={() => setShowTicketModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={ticketIcon} alt="Ticket Icon" className="ticket-icon" loading="lazy" />
            <h2>🎟️ Choose Your Ticket</h2>
            <ul className="ticket-list">
              {[
                { price: 1000, picks: 1 },
                { price: 1900, picks: 2 },
                { price: 2700, picks: 3 },
                { price: 3400, picks: 4 },
                { price: 4000, picks: 5 }
              ].map((ticket, index) => (
                <li key={index}>
                  💰 {ticket.price} SHIDO → {ticket.picks} pick{ticket.picks > 1 ? 's' : ''}
                  <button
                    className="buy-ticket-btn"
                    onClick={() => {
                      setPicksTotal(ticket.picks);
                      setPicksAvailable(ticket.picks);
                      setShowTicketModal(false);
                      setGameStarted(true);
                      setGameLocked(false);
                      setPrizePool([
                        '🎉 5000 SHIDO',
                        '🎉 3500 SHIDO',
                        '🎉 2500 SHIDO',
                        ...Array(7).fill('🎉 200 SHIDO'),
                        ...Array(10).fill('🎉 100 SHIDO')
                      ]);
                    }}
                  >
                    Buy
                  </button>
                </li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setShowTicketModal(false)}>Back</button>
          </div>
        </div>
      )}

      {showHowToModal && (
        <div className="modal-overlay" onClick={() => setShowHowToModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>How to Play Lucky Mango</h2>
            <p>🎮 Select mangoes based on your ticket picks. You can change your selection until you press Start.</p>
            <p>🎟️ Ticket prices:</p>
            <ul>
              <li>1000 SHIDO — 1 pick</li>
              <li>1900 SHIDO — 2 picks</li>
              <li>2700 SHIDO — 3 picks</li>
              <li>3400 SHIDO — 4 picks</li>
              <li>4000 SHIDO — 5 picks</li>
            </ul>
            <p>🎁 Prizes:</p>
            <ul>
              <li>1 prize of 5000 SHIDO</li>
              <li>1 prize of 3500 SHIDO</li>
              <li>1 prize of 2500 SHIDO</li>
              <li>7 prizes of 200 SHIDO</li>
              <li>10 prizes of 100 SHIDO</li>
            </ul>
            <button className="close-btn" onClick={() => setShowHowToModal(false)}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
