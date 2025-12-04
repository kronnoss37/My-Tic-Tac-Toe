import initView from './appStates/view.js';
import state from './appStates/model.js';
import bindController from './appStates/controller.js';


const elements = {
  mainContainerElement: document.querySelector('main > .container'),
};
const watchedState = initView(state, elements);
bindController(watchedState, elements);
