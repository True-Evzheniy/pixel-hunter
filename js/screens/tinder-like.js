import getElementFromTemplate from "../utils/get-element-from-template";
import getAnswersHandler from "../utils/answer-handler";
import handleBackButtonClick from "../utils/back-button-handler";
import {toggleScreens} from "../data/data";
import getHeader from "../templates/header";
import getProgressBar from "../templates/progressBar";
import resize from "../data/resize";
import {FrameSize, QuestionTypes} from "../constants";

const getTinderLikeScreen = (state, level) => {
  const {question, answers} = level;
  const {
    image: {width, height, url}
  } = answers[0];
  const size = resize(FrameSize[QuestionTypes.TINDER_LIKE], {width, height});
  const template = `
  ${getHeader(state)}
  <section class="game">
    <p class="game__task">${question}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${url}" alt="Option 1" width="${size.width}" height="${
  size.height
}">
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

export default getTinderLikeScreen;
