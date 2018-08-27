import getElementFromTemplate from "../utils/get-element-from-template";
import handleBackButtonClick from "../utils/back-button-handler";
import {toggleScreens} from "../data/data";

const getOneOfThreeScreen = (state) => {
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
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
  `;

  const element = getElementFromTemplate(template);
  const formElement = element.querySelector(`form`);
  const images = formElement.querySelectorAll(`img`);

  const showNextScreen = (answer) => {
    unsubscribe();
    toggleScreens(answer, state);
  };

  const answerHandler = (event) => {
    if (event.target.tagName === `IMG`) {
      const answer = new Array(3).fill(`photo`);
      images.forEach((img, index) => {
        if (event.target === img) {
          answer[index] = `painting`;
        }

        showNextScreen(answer);
      });
    }
  };

  const unsubscribe = () => {
    formElement.removeEventListener(`click`, answerHandler);
  };

  formElement.addEventListener(`click`, answerHandler);
  handleBackButtonClick(element, unsubscribe);

  return element;
};

export default getOneOfThreeScreen;
