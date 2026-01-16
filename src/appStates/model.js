const state = {
  pageStatus: '', // start | game
  gameState: {
    gameStatus: 'default', // default | start | draw | gameOver
    currentPlayer: 'X', // X | O
    gameField: Array(9).fill(''),
    movesCount: 0,
    winningCombination: null,
    score: {
      X: 0,
      O: 0,
    },
  },
  uiState: {
    lastGameStatus: 'default', // default | draw | gameOver
    lastWinner: null, // X | O
    numberOfParties: 0,
  },
};

export default state;
