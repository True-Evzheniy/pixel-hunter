import getElementFromTemplate from "../utils/get-element-from-template";
import renderScreen from "../utils/render-screen";
import game1Screen from "../screens/game-1";
import handleBackButtonClick from "../utils/back-button-handler";

const getRulesScreen = () => {
  const template = `
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>
  `;

  const element = getElementFromTemplate(template);
  const form = element.querySelector(`.rules__form`);
  const input = form.querySelector(`.rules__input`);
  const button = form.querySelector(`.rules__button`);

  const onInputChange = (event) => {
    const {value} = event.target;

    if (value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    unsubscribe();

    renderScreen(game1Screen);
  };

  const unsubscribe = () => {
    input.removeEventListener(`input`, onInputChange);
    form.removeEventListener(`submit`, onFormSubmit);
  };

  input.addEventListener(`input`, onInputChange);
  form.addEventListener(`submit`, onFormSubmit);
  handleBackButtonClick(element, unsubscribe);

  return element;
};

export default getRulesScreen;
