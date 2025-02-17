import React, { Component, useState, useEffect } from 'react';
import '../../../styles/memoryGame.css';
let appleImage = '../../dist/images/apple.png';
let cherriesImage = '../../dist/images/cherries.png';
let bananaImage = '../../dist/images/banana.png';
let orangeImage = '../../dist/images/orange.png';


const fruits = [
  { color: 'red', type: 'cherries', image: cherriesImage },
  { color: 'red', type: 'apple', image: appleImage },
  { color: 'yellow', type: 'banana', image: bananaImage },
  { color: 'orange', type: 'orange', image: orangeImage},
];

const MemoryGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentFruits, setCurrentFruits] = useState([]);
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const generateFruits = () => { // no work yet
    const numFruits = level + 2;
    const newFruits = Array.from({ length: numFruits }, () => {
      const randomIndex = Math.floor(Math.random() * fruits.length);
      return fruits[randomIndex];
    });
    setCurrentFruits(newFruits);
  };

  const generateQuestion = () => { // no work yet
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    
  };


  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <div className="info-bar">
        <p>Level: {level}</p>
        <p>Score: {score}</p>
      </div>

      <div className="fruits-container">
        {currentFruits.map((fruit, index) => (
          <div key={index} className="fruit">
            <img
              className="fruit-image"
              src={fruit.image}
            />
          </div>
        ))}
      </div>

      <div className="question-section">
        <p className="question">{question}</p>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
        <button className="submit-btn" onClick={checkAnswer}>
          Submit
        </button>
      </div>

      <div className="feedback">
        {isCorrect === true && <p className="correct">Correct!</p>}
        {isCorrect === false && <p className="wrong">Wrong!</p>}
      </div>

      {isCorrect && (
        <button className="next-level-btn" onClick={nextLevel}>
          Next Level
        </button>
      )}
    </div>
  );
  
};

export default MemoryGame;
