import getElementFromTemplate from "../utils/get-element-from-template";
import handleBackButtonClick from "../utils/back-button-handler";
import {toggleScreens} from "../data/data";
import getHeader from "../templates/header";
import getProgressBar from "../templates/progressBar";
import resize from "../data/resize";
import {FrameSize, QuestionTypes} from "../constants";

const getOption = ({url, width, height}, index) => {
  const size = resize(FrameSize[QuestionTypes.ONE_OF_THREE], {width, height});

  return `
  <div class="game__option">
  <img src="${url}" alt="Option ${index + 1}" width="${size.width}" height="${
  size.height
}">
</div>`;
};

const getOneOfThreeScreen = (state, level) => {
  const {answers, question} = level;
  const template = `
  ${getHeader(state)}
  <section class="game">
    <p class="game__task">${question}</p>
    <form class="game__content  game__content--triple">
      ${answers
        .map((answer, index) => getOption(answer.image, index + 1))
        .join(``)}
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
