
const generateStartPage = (watchedState, elements) => {
  const { mainContainerElement } = elements;
  mainContainerElement.innerHTML = '';

  const startGameElement = document.createElement('div');
  startGameElement.classList.add('start-game');

  const startGameTitle = document.createElement('h1');
  startGameTitle.classList.add('visually-hidden');
  startGameTitle.textContent = 'Начать игру';

  const startGameButton = document.createElement('button');
  startGameButton.classList.add('start-game_button');
  startGameButton.type = 'button';
  startGameButton.textContent = 'Начать игру';

  startGameElement.append(startGameTitle, startGameButton);
  mainContainerElement.append(startGameElement);

  startGameButton.addEventListener('click', () => {
    watchedState.pageStatus = 'game';
  });
};

export default generateStartPage