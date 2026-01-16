const resetGameState = ({ gameState }) => {
  setTimeout(() => {
    gameState.gameStatus = 'start';
    gameState.gameField = Array(9).fill('');
    gameState.movesCount = 0;
    gameState.winningCombination = null;
  }, 3000);
};

const defineTheWinningCombination = (watchedState) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const { gameState, uiState } = watchedState;

  winningCombinations.forEach((combination, index) => {
    // optimization
    const [firstEl, secondEl, thirdEl] = combination.map((index) => gameState.gameField[index]);

    if (!(firstEl || secondEl || thirdEl)) return;

    if (firstEl === secondEl && secondEl === thirdEl) {
      gameState.gameStatus = 'gameOver';
      uiState.lastGameStatus = 'gameOver';
      gameState.score[gameState.currentPlayer] += 1;
      uiState.lastWinner = gameState.currentPlayer;
      gameState.winningCombination = index;
    }
  });

  if (gameState.movesCount === 9 && gameState.gameStatus !== 'gameOver') {
    gameState.gameStatus = 'draw';
    uiState.lastGameStatus = 'draw';
  }

  if (gameState.gameStatus === 'gameOver' || gameState.gameStatus === 'draw') {
    uiState.numberOfParties += 1;
    resetGameState(watchedState);
  }
};

export default defineTheWinningCombination
