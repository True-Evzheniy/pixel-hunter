import AbstractView from "../abstract-view";
import getProgressBar from "../templates/progress-bar";
import resize from "../data/resize";
import {FrameSize, QuestionTypes} from "../constants";
import getAnswersHandler from "../utils/answer-handler";

class TwoOfTwoView extends AbstractView {
  constructor(state, level, callback) {
    super();
    this.level = level;
    this.state = state;
    this.callback = callback;
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  static getOption({url, width, height}, index) {
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
  }

  get template() {
    const {question, answers} = this.level;
    const {state} = this;

    return `
    <section class="game">
      <p class="game__task">${question}</p>
      <form class="game__content">
        ${answers
          .map((answer, index) =>
            TwoOfTwoView.getOption(answer.image, index + 1)
          )
          .join(``)}
      </form>
      ${getProgressBar(state.answers)}
    </section>
    `;
  }

  bind() {
    this.formElement = this._element.querySelector(`form`);
    this.answersHandler = getAnswersHandler(this.handleAnswers);
    this.formElement.addEventListener(`change`, this.answersHandler);
  }

  unbind() {
    this.formElement.removeEventListener(`click`, this.answersHandler);
  }

  handleAnswers(answer) {
    this.unbind();
    this.callback(answer, this.state);
  }
}

export default TwoOfTwoView;
