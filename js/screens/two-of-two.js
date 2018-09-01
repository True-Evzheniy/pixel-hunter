import getElementFromTemplate from "../utils/get-element-from-template";
import getAnswersHandler from "../utils/answer-handler";
import handleBackButtonClick from "../utils/back-button-handler";
import {toggleScreens} from "../data/data";
import getHeader from "../templates/header";
import getProgressBar from "../templates/progressBar";
import resize from "../data/resize";
import {FrameSize, QuestionTypes} from "../constants";

const getOption = ({url, width, height}, index) => {
  const size = resize(FrameSize[QuestionTypes.TWO_OF_TWO], {width, height});

  return `
<div class="game__option">
  <img src="${url}" alt="Option ${index}" width="${size.width}" height="${
  size.height
}">
  <label class="game__answer game__answer--photo">
    <input class="visually-hidden" name="question${index}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint">
    <input class="visually-hidden" name="question${index}" type="radio" value="painting">
    <span>Рисунок</span>
  </label>
</div>`;
};

const getTwoOfTwoScreen = (state, level) => {
  const {question, answers} = level;
  const template = `
${getHeader(state)}
<section class="game">
  <p class="game__task">${question}</p>
  <form class="game__content">
    ${answers.map((answer, index) => getOption(answer.image, index + 1)).join(``)}
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
