const state = {
  pageStatus: '', // start | game
  gameState: {
    gameStatus: 'start', // start | draw | gameOver
    currentPlayer: 'X', // X | O
    gameField: Array(9).fill(''),
    movesCount: 0,
    score: {
      X: 0,
      O: 0,
    },
  },
  uiState: {},
};

export default state;
