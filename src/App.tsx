import React, { useState } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTicketPage, setShowTicketPage] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [tickets, setTickets] = useState<number>(0);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [pickedIndexes, setPickedIndexes] = useState<number[]>([]);
  const [prizesWon, setPrizesWon] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [lastPrize, setLastPrize] = useState<string | null>(null);
  const [prizePool, setPrizePool] = useState<string[]>([]);

  const getTotalShido = (): number => {
    return prizesWon.reduce((total, prize) => {
      const match = prize.match(/(\d+)/);
      return match ? total + parseInt(match[1]) : total;
    }, 0);
  };

  const handlePick = (index: number): void => {
    if (!isPlaying || selectedCount >= tickets || pickedIndexes.includes(index)) return;

    let prize: string | null = null;
    if (prizePool.length > 0) {
      const randomIndex = Math.floor(Math.random() * prizePool.length);
      prize = prizePool[randomIndex];
      const newPool = [...prizePool];
      newPool.splice(randomIndex, 1);
      setPrizePool(newPool);
    }

    if (prize) {
      setPrizesWon([...prizesWon, prize]);
      setLastPrize(prize);
    } else {
      setLastPrize(null);
    }

    setSelectedCount(selectedCount + 1);
    setPickedIndexes([...pickedIndexes, index]);
    setShowResult(true);
    setTimeout(() => setShowResult(false), 2000);
  };

  return (
    <div className="container">
      <img src="/mascot_mango_msmoon.png" alt="Mascot Mango" className="mascot" loading="lazy" />
      <img src="/lucky-mango-logo.png" alt="Lucky Mango Logo" className="logo" loading="lazy" />

      <div className="mango-grid">
        {[...Array(20)].map((_, i) => (
          <button
            key={i}
            className="mango-btn"
            onClick={() => handlePick(i)}
            disabled={pickedIndexes.includes(i)}
          >
            <img
              src="/mango-icon.png"
              alt="Mango"
              className="mango-img"
              style={{ opacity: pickedIndexes.includes(i) ? 0.4 : 1 }}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <div className="status-bar">
        <div className="status-left">🎟️ Tickets: {tickets}</div>
        <div className="status-right">🥭 Remaining: {20 - selectedCount} / 20</div>
        <div className="status-right">🎁 Total Rewards: {getTotalShido()} SHIDO</div>
      </div>

      <div className="button-group">
        <button className="start-btn" onClick={() => setIsPlaying(true)}>Start</button>
        <button className="buy-btn" onClick={() => setShowTicketPage(true)}>Buy Ticket</button>
        <button className="how-btn" onClick={() => setShowModal(true)}>How to Play</button>
      </div>

      {showResult && (
        <div className="result-banner">
          <img
            src={lastPrize ? "/mascot-win.png" : "/mascot-lose.png"}
            alt="Result Mascot"
            className="result-mascot"
            loading="lazy"
          />
          <p>{lastPrize ? `You won: ${lastPrize}` : 'No prize this time 😢'}</p>
        </div>
      )}

      {isPlaying && selectedCount === tickets && (
        <div className="modal-overlay" onClick={() => setIsPlaying(false)}>
          <div className="modal-content summary-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🎁 Summary of Rewards</h2>
            {prizesWon.length > 0 ? (
              <ul>
                {prizesWon.map((prize, i) => (
                  <li key={i}>{prize}</li>
                ))}
              </ul>
            ) : (
              <p>No rewards this round.</p>
            )}
            <p>Total: {getTotalShido()} SHIDO</p>
            <button className="close-btn" onClick={() => setIsPlaying(false)}>Close</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>How to Play Lucky Mango</h2>

            <h3>🎮 Game Objective</h3>
            <p>Select one mango from the garden to randomly receive a SHIDO prize remaining in the game.</p>

            <h3>📜 Ticket Rules</h3>
            <p>Each ticket lets you select the number of times allowed by that ticket, from the 20 total prizes in the game:</p>
            <p>1000 SHIDO — 1 pick</p>
            <p>1900 SHIDO — 2 picks</p>
            <p>2700 SHIDO — 3 picks</p>
            <p>3400 SHIDO — 4 picks</p>
            <p>4000 SHIDO — 5 picks</p>

            <h3>🎁 Available Prizes (Total: 20)</h3>
            <p>10 prizes of 100 SHIDO</p>
            <p>7 prizes of 200 SHIDO</p>
            <p>1 prize of 2500 SHIDO</p>
            <p>1 prize of 3500 SHIDO</p>
            <p>1 prize of 5000 SHIDO</p>

            <button className="close-btn" onClick={() => setShowModal(false)}>Back</button>
          </div>
        </div>
      )}

      {showTicketPage && (
        <div className="modal-overlay" onClick={() => setShowTicketPage(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src="/ticket-icon.png" alt="Ticket Icon" className="ticket-icon" loading="lazy" />
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
                      setTickets(ticket.picks);
                      setSelectedTicket(null);
                      setShowTicketPage(false);
                      setSelectedCount(0);
                      setPickedIndexes([]);
                      setPrizesWon([]);
                      setPrizePool([
                        '🎉 5000 SHIDO',
                        '🎉 3500 SHIDO',
                        '🎉 2500 SHIDO',
                        ...Array(7).fill('🎉 200 SHIDO'),
                        ...Array(10).fill('🎉 100 SHIDO')
                      ]);
                      setIsPlaying(true);
                    }}
                  >
                    Buy
                  </button>
                </li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setShowTicketPage(false)}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
