'use strict';

const screens = [
  `intro`,
  `greeting`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
  `stats`,
];
const templates = Array.from(document.querySelectorAll(`template`));
const screenTemplates = screens.map((screen) => {
  return templates.find((template) => template.id === screen);
});
const container = document.getElementById(`main`);

const renderScreen = (screenNumber) => {
  container.innerHTML = screenTemplates[screenNumber].innerHTML;
};

const ScreenToggler = {
  _currentScreen: 1,

  get activeScreen() {
    return this._currentScreen;
  },

  increase() {
    if (this._currentScreen === screens.length - 1) {
      return;
    }

    this._currentScreen++;
    renderScreen(this._currentScreen);
  },

  decrease() {
    if (this._currentScreen === 0) {
      return;
    }

    this._currentScreen--;
    renderScreen(this._currentScreen);
  }
};

const handleKeyup = (event) => {
  if (event.keyCode === 39) {
    ScreenToggler.increase();
  }

  if (event.keyCode === 37) {
    ScreenToggler.decrease();
  }
};

renderScreen(ScreenToggler.activeScreen);

document.addEventListener(`keyup`, handleKeyup);
