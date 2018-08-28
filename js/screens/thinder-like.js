import getElementFromTemplate from "../utils/get-element-from-template";
import getAnswersHandler from "../utils/answer-handler";
import handleBackButtonClick from "../utils/back-button-handler";
import {toggleScreens} from "../data/data";
import getHeader from "../templates/header";
import getProgressBar from "../templates/progressBar";

const getThinderLikeScreen = (state) => {
  const template = `
  ${getHeader(state)}
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${getProgressBar(state.answers)}
  `;
  const element = getElementFromTemplate(template);
  const formElement = element.querySelector(`form`);

  const showNextScreen = (answer) => {
    unsubscribe();
    toggleScreens(answer, state);
  };

  const unsubscribe = () => {
    formElement.removeEventListener(`change`, answersHandler);
  };

  const answersHandler = getAnswersHandler(showNextScreen);

  formElement.addEventListener(`change`, answersHandler);
  handleBackButtonClick(element, unsubscribe);

  return element;
};

export default getThinderLikeScreen;
