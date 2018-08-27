import getElementFromTemplate from "../utils/get-element-from-template";
import handleBackButtonClick from "../utils/back-button-handler";
import {toggleScreens} from "../data/data";
import getHeader from "../templates/header";
import getProgressBar from "../templates/progressBar";

const getOneOfThreeScreen = (state) => {
  const template = `
  ${getHeader(state)}
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
    ${getProgressBar(state.answers)}
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
