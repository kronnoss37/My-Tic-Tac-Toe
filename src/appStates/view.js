import onChange from "../utils/onChange.js"
import generateStartPage from '../pages/startPage.js'
import { generateGamePage, generateGameFieldInner, generateSidebar } from '../pages/gamePage.js';
import notifyUser from "../services/notification.js";

const switchPage = (watchedState, elements, currentPage = 'start') => {
  if (currentPage !== 'start' && currentPage !== 'game') return;
  currentPage === 'start' ? generateStartPage(watchedState, elements) : generateGamePage(watchedState, elements);
};

const showTheWinningCombination = (winningCombination, gameFieldElement) => {
  if (!gameFieldElement) return;
  if (winningCombination === null) return;

  const classes = [
    ['horizontal', 'horizontal--first'],
    ['horizontal', 'horizontal--second'],
    ['horizontal', 'horizontal--third'],
    ['vertical', 'vertical--first'],
    ['vertical', 'vertical--second'],
    ['vertical', 'vertical--third'],
    ['main-diagonal'],
    ['secondary-diagonal'],
  ];

  const currentCombination = classes[winningCombination];
  gameFieldElement.classList.add(...currentCombination);

  requestAnimationFrame(() => {
    gameFieldElement.classList.add(`${currentCombination[0]}__show`);
  });
};

export default (state, elements) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'pageStatus': {
        switchPage(watchedState, elements, value);
        break;
      }
      case 'gameState.gameStatus': {
        notifyUser(elements, watchedState.gameState);
        break;
      }
      case 'gameState.gameField': {
        const { gameFieldElement } = elements;
        generateGameFieldInner(watchedState, gameFieldElement);
        break;
      }
      case 'gameState.movesCount': {
        generateSidebar(watchedState);
        break;
      }
      case 'gameState.winningCombination': {
        const { gameFieldElement } = elements;
        showTheWinningCombination(value, gameFieldElement);
        break;
      }
      default: {
        break;
      }
    }
  });
  return watchedState;
};