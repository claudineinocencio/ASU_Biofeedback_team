import React, { Component } from 'react';
import '../../styles/gamePage.css';
import MazeGame from './mazeGame/mazeGame';
import PlaneGame from './planeGame/planeGame';
import MemoryGame from './memoryGame/memoryGame';
import BallGame from '../../components/ballGame';

let mazeGameImage = '../../dist/images/mazeGame.png';
let planeGameImage = '../../dist/images/planeGame.png';
let memoryGameImage = '../../dist/images/memoryGame.png';
let ballGameImage = '../../dist/images/ballGame.png';



const games = [
  {title: 'Maze Game', description: 'Find your way out of the maze!', image: mazeGameImage, container: MazeGame},
  {title: 'Plane Game', description: 'Avoid obstacles while flying!', image: planeGameImage, container: PlaneGame},
  {title: 'Memory Game', description: 'Focus and test your memory!', image: memoryGameImage, container: MemoryGame},
  {title: 'Ball Game', description: 'Ball!', image: ballGameImage, container: BallGame},
];

export class GamePage extends Component {


  // checks if user changes view by selecting a game
  state = { 
    currentGame: null, 
  };

  selectGame = (gameId) => {
    this.setState({ currentGame: gameId });
  };

  // null state, no game selected, goes back to default page
  goBackToList = () => {
    this.setState({ currentGame: null });
  };

  renderContent = () => {
    const { currentGame } = this.state;

    if (!currentGame) {
      return (
        <div className="games-section">
          <h2>Games To Improve HEG Score</h2>
          <div className="games-grid">
            {games.map((game) => (
              <div key={game.title} className="game-card">
                <img
                  src={game.image}
                  alt={game.title}
                  
                  onClick={() => this.selectGame(game.title)}
                  style={{ cursor: 'pointer', width: '50%', height: '200px' }}
  
                />
                <h3
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => this.selectGame(game.title)}
                >
                  {game.title}
                </h3>
                <p>{game.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    const selectedGame = games.find((game) => game.title === currentGame);

    // If no matching game is found, fallback to the game list
    if (!selectedGame) {
      return (
        <div>
          <p>Game not found.</p>
          <button onClick={this.goBackToList}>Back to Games</button>
        </div>
      );
    }

    // Render the selected game's component dynamically
    const GameComponent = selectedGame.container;
    return (
      <div className="game-details">
        <button onClick={this.goBackToList}>Back to Games</button>
        <GameComponent />
      </div>
    );
  };

  render() {
    return <div className="game-page">{this.renderContent()}</div>;
  }
}

export default GamePage;