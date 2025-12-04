import onChange from "../utils/onChange.js"
import generateStartPage from '../pages/startPage.js'
import {generateGamePage, generateGameFieldInner} from "../pages/gamePage.js"

import players from "../config/playersConfig.js";

const switchPage = (watchedState, elements, currentPage = 'start') => {
  if (currentPage !== 'start' && currentPage !== 'game') return;
  currentPage === 'start' ? generateStartPage(watchedState, elements) : generateGamePage(watchedState, elements);
};

const renderGameStatusItem = ({ gameState: { currentPlayer} }, gameStatus) => {
  if (gameStatus === 'start') return;
  const gameMessage = gameStatus === 'draw' ? 'Ничья!' : `Победил: ${players[currentPlayer].name}`;
  alert(gameMessage);
};

const renderGameScoreItem = ({ gameState: { score } }, gameStatus) => {
  const [firstPlayer, secondPlayer] = Object.keys(players)
  console.log(firstPlayer);
  console.log(secondPlayer);
  const scoreMessage = `${players[firstPlayer].name} ${score[firstPlayer]} : ${score[secondPlayer]} ${players[secondPlayer].name}`;
  alert(scoreMessage);
};

export default (state, elements) => {
  const watchedState = onChange(state, (path, value, prev) => {
    console.log('path', path);
    switch (path) {
      case 'pageStatus': {
        switchPage(watchedState, elements, value);
        break;
      }
      case 'gameState.gameStatus': {
        renderGameStatusItem(watchedState, value);
        break;
      }
      case 'gameState.gameField': {
        const { gameFieldElement } = elements;
        generateGameFieldInner(watchedState, gameFieldElement);
        break;
      }
      case 'gameState.score.X': {
        renderGameScoreItem(watchedState);
        break;
      }
      case 'gameState.score.O': {
        console.log('player2');
        renderGameScoreItem(watchedState);
        break;
      }
      default: {
        break;
      }
    }
  });
  return watchedState;
};