import getElementFromTemplate from "../utils/get-element-from-template";
import getAnswersHandler from "../utils/answer-handler";
import handleBackButtonClick from "../utils/back-button-handler";
import {toggleScreens} from "../data/data";
import getHeader from "../templates/header";
import getProgressBar from "../templates/progressBar";

const getTwoOfTwoScreen = (state) => {
  const template = `
${getHeader(state)}
<section class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  ${getProgressBar(state.answers)}
</section>
`;
  const element = getElementFromTemplate(template);
  const formElement = element.querySelector(`form`);

  const showNextScreen = (answer) => {
    unsubscribe();
    toggleScreens(answer, state);
  };

  const answersHandler = getAnswersHandler(showNextScreen);

  const unsubscribe = () => {
    formElement.removeEventListener(`change`, answersHandler);
  };

  formElement.addEventListener(`change`, answersHandler);
  handleBackButtonClick(element, unsubscribe);

  return element;
};

export default getTwoOfTwoScreen;
