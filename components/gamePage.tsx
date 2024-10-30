import React from 'react';
import './gamePage.css';
//import mazeImage from './images/ballGame.png'; having trouble with importing images WIP

const games = [
  { title: "Maze Game", description: "Brief Game Description...", image: "mazeGame.jpg" }, // image placeholder
  { title: "Plane Game", description: "Brief Game Description...", image: "planeGame.jpg" },
  { title: "Memory Game", description: "Brief Game Description...", image: "memoryGame.jpg" },
  { title: "Ball Game", description: "Brief Game Description...", image: 'ballGame.png' },
];

const metrics = [
  { label: "HEG Score", value: "0.00" }, // number placeholders WIP
  { label: "HEG", value: "0.00" },
  { label: "HR", value: "0.00" },
  { label: "HRV", value: "0.00" },
];

const GamePage = () => {
  return (
    <div className="game-page">
      <div className="games-section">
        <h2>Games To Improve HEG Score</h2>
        <div className="games-grid">
          {games.map((game, index) => (
            <div key={index} className="game-card">
              <img src={game.image} alt={game.title} />
              <h3>{game.title}</h3>
              <p>{game.description}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="right-section"> 
        {metrics.map((metric, index) => (
          <div key={index} className="metric">
            <h4>{metric.label}</h4>
            <p>{metric.value}</p>
            <div className="chart">[Chart Placeholder]</div>
          </div>
        ))}
        <div className="device-connection">
          <p>Device Connected: ______</p> 
        </div>
      </div>
    </div>
  );
};

export default GamePage;
