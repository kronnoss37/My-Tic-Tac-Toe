import players from "../config/playersConfig.js";

const createMessage = ({ gameStatus, currentPlayer }) => {
  const player = players[currentPlayer].name;
  const messages = {
    start: `Ходит: ${player}`,
    draw: `Ничья.`,
    gameOver: `Победил: ${player}`,
  };

  return messages[gameStatus];
};

const removeNotification = (element) => () => {
  element.addEventListener('transitionend', () => {
    element.remove();
  });
  element.classList.add('notification-hidden');
};

const createNotification = (message, delay) => {
  const notificationElement = document.createElement('div')
  notificationElement.classList.add('notification');

  requestAnimationFrame(() => {
    notificationElement.classList.add('notification-show');
  })

  const messageElement = document.createElement('p')
  messageElement.classList.add('notification-message');
  messageElement.textContent = message
 
  const closeElement = document.createElement('div')
  closeElement.classList.add('notification-close');

  notificationElement.addEventListener('click', removeNotification(notificationElement));

  notificationElement.append(messageElement, closeElement)
  setTimeout(removeNotification(notificationElement), delay);

  return notificationElement;
}

const notifyUser = (elements, gameState) => {
  const { notificationWrapperElement } = elements;
  if (!notificationWrapperElement) return;

  const notificationDelay = 3000;

  const message = createMessage(gameState);
  const notification = createNotification(message, notificationDelay);
  notificationWrapperElement.append(notification);
}

export default notifyUser;