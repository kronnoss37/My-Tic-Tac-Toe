import players from "../config/playersConfig.js";

const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach((attr) => {
    el.setAttribute(attr, attrs[attr]);
  });
};

const resetGameState = ({ gameState }) => {
  gameState.gameStatus = 'start'
  gameState.gameField = Array(9).fill('');
  gameState.movesCount = 0;
};

const defineTheWinningCombination = (watchedState) => {
  const winnigCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const { gameState } = watchedState;

  winnigCombinations.forEach((combination) => { // optimization
    const [firstEl, secondEl, thirdEl] = combination.map((index) => gameState.gameField[index]);

    if (!(firstEl || secondEl || thirdEl)) return;

    if (firstEl === secondEl && secondEl === thirdEl) {
      gameState.gameStatus = 'gameOver';
      gameState.score[gameState.currentPlayer] += 1;
      resetGameState(watchedState)
    }
  });

  if (gameState.movesCount === 9) {
    gameState.gameStatus = 'draw';
    resetGameState(watchedState)
  }
};

const generateGameFieldInner = (watchedState, gameFieldElement) => {
  gameFieldElement.innerHTML = '';
  const { gameField } = watchedState.gameState;
  gameField.forEach((item, index) => {
    const gameCell = document.createElement('div');
    const options = {
      class: 'game-cell',
      'data-number': `${index}`,
    };
    setAttributes(gameCell, options);

    if (item) {
      gameCell.classList.add('disabledDiv', players[item].class);
    }

    gameCell.textContent = item;
    gameFieldElement.append(gameCell);
  });
};


const generateGamePage = (watchedState, elements) => {
  const { mainContainerElement } = elements;
  mainContainerElement.innerHTML = '';

  const gameElement = document.createElement('div');
  gameElement.classList.add('game');

  const gameTitle = document.createElement('h1');
  gameTitle.classList.add('game-title');
  gameTitle.textContent = 'Tic-Tac-Toe';

  const gameField = document.createElement('div');
  gameField.classList.add('game-field');
  elements.gameFieldElement = gameField;

  gameField.addEventListener('click', (event) => {
    const isGameCell = event.target.classList.contains('game-cell');
    if (!isGameCell) return;

    const { gameState } = watchedState;
    const gameCell = event.target;
    const currentPlayer = players[gameState.currentPlayer];

    const gameCellNumber = Number(gameCell.dataset.number);

    if (gameState.gameField[gameCellNumber]) return;

    gameState.gameField[gameCellNumber] = currentPlayer.symbol;

    gameState.movesCount += 1;
    if (gameState.movesCount >= 5) defineTheWinningCombination(watchedState);

    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
  });

  generateGameFieldInner(watchedState, gameField);

  gameElement.append(gameTitle, gameField);
  mainContainerElement.append(gameElement);
};

export { generateGamePage, generateGameFieldInner };
