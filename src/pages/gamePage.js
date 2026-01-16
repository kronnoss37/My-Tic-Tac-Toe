import players from "../config/playersConfig.js";
import defineTheWinningCombination from "../game/gameEngine.js";

const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach((attr) => {
    el.setAttribute(attr, attrs[attr]);
  });
};

const generateGameFieldInner = (watchedState, gameFieldElement) => {
  gameFieldElement.innerHTML = '';
  gameFieldElement.className = 'game-field';
  
  const { gameField } = watchedState.gameState;
  gameField.forEach((item, index) => {
    const gameCell = document.createElement('div');
    const options = {
      class: 'game-cell',
      'data-number': `${index}`,
    };
    setAttributes(gameCell, options);

    if (item) {
      gameCell.classList.add('game-cell--disabled', players[item].class);
    }

    gameCell.textContent = item;
    gameFieldElement.append(gameCell);
  });
};

const createSidebarToggleButton = (sidebarElement) => {
  const sidebarToggleButton = document.createElement('button');
  sidebarToggleButton.classList.add('sidebar-toggle');

  const sidebarToggleButtonArrow = document.createElement('span');
  sidebarToggleButtonArrow.classList.add('arrow');

  sidebarToggleButton.append(sidebarToggleButtonArrow);

  sidebarToggleButton.addEventListener('click', () => {
    sidebarToggleButton.classList.toggle('open');
    sidebarElement.classList.toggle('sidebar-open');
  });

  return sidebarToggleButton
};

const getLastGameStatus = (status, currentPlayer) => {
  const player = players[currentPlayer]?.name;
  const statuses = {
    default: 'Нет игр',
    draw: 'Ничья',
    gameOver: `Победа за игроком ${player}`,
  };

  return statuses[status];
}

const normalizeGameInformation = ({ gameState, uiState }) => {
  const { currentPlayer, movesCount, score } = gameState;
  const { lastGameStatus, lastWinner, numberOfParties } = uiState;
  const [firstPlayer, secondPlayer] = Object.keys(players);

  const status = getLastGameStatus(lastGameStatus, lastWinner);
  return [
    `${players[firstPlayer].name} - ${players[firstPlayer].symbol}`,
    `${players[secondPlayer].name} - ${players[secondPlayer].symbol}`,
    `Текущий ход: ${players[currentPlayer].name}`,
    `Номер хода: ${movesCount + 1}`,
    `Счет: ${players[firstPlayer].name} ${score[firstPlayer]} - ${score[secondPlayer]} ${players[secondPlayer].name}`,
    `Статус последней игры: ${status}`,
    `Количество сыгранных партий: ${numberOfParties}`,
  ];
};

const generateSidebar = (watchedState) => {
  let sidebarElement = document.querySelector('.sidebar');
  if(!sidebarElement) {
    sidebarElement = document.createElement('aside');
    sidebarElement.classList.add('sidebar');
  }

  sidebarElement.innerHTML = ''

  const sidebarToggleButton = createSidebarToggleButton(sidebarElement);

  const sidebarBodyElement = document.createElement('div');
  sidebarBodyElement.classList.add('sidebar-content');

  const sidebarTitleElement = document.createElement('h2');
  sidebarTitleElement.classList.add('sidebar-title');
  sidebarTitleElement.textContent = 'Игровая информация';

  const sidebarListElement = document.createElement('ul');
  sidebarListElement.classList.add('sidebar-list');

  const sidebarListItems = normalizeGameInformation(watchedState);
  sidebarListItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    sidebarListElement.append(listItem);
  });

  sidebarBodyElement.append(sidebarTitleElement, sidebarListElement);
  sidebarElement.append(sidebarToggleButton, sidebarBodyElement);
  return sidebarElement;
};


const generateGamePage = (watchedState, elements) => {
  const { mainContainerElement } = elements;
  mainContainerElement.innerHTML = '';

  const gameElement = document.createElement('div');
  gameElement.classList.add('game');

  const { gameState } = watchedState;
  gameState.gameStatus = 'start';

  const gameTitle = document.createElement('h1');
  gameTitle.classList.add('game-title');
  gameTitle.textContent = 'Tic-Tac-Toe';

  const gameField = document.createElement('div');
  elements.gameFieldElement = gameField;

  gameField.addEventListener('click', (event) => {
    const isGameCell = event.target.classList.contains('game-cell');
    if (!isGameCell) return;

    const gameCell = event.target;
    const currentPlayer = players[gameState.currentPlayer];

    const gameCellNumber = Number(gameCell.dataset.number);

    if (gameState.gameField[gameCellNumber]) return;

    gameState.gameField[gameCellNumber] = currentPlayer.symbol;

    gameState.movesCount += 1;
    if (gameState.movesCount >= 5) defineTheWinningCombination(watchedState);

    if (gameState.gameStatus === 'draw' || gameState.gameStatus === 'gameOver') {
      gameField.classList.add('game-field--disabled');
    }

    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
  });

  generateGameFieldInner(watchedState, gameField);

  gameElement.append(gameTitle, gameField);

  const sidebarElement = generateSidebar(watchedState);
  mainContainerElement.append(gameElement, sidebarElement);
};

export { generateGamePage, generateGameFieldInner, generateSidebar };
