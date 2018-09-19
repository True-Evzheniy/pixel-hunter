import AbstractView from "../abstract-view";
import getProgressBar from "../templates/progressBar";
import resize from "../data/resize";
import {FrameSize, QuestionTypes} from "../constants";

class OneOfThreeView extends AbstractView {
  constructor(state, level, callback) {
    super();
    this.level = level;
    this.state = state;
    this.callback = callback;
    this.handleAnswers = this.handleAnswers.bind(this);
    this.answerHandler = this.answerHandler.bind(this);
  }

  static getOption({url, width, height}, index) {
    const size = resize(FrameSize[QuestionTypes.ONE_OF_THREE], {
      width,
      height
    });

    return `
    <div class="game__option">
    <img src="${url}" alt="Option ${index + 1}" width="${size.width}" height="${
  size.height
}">
  </div>`;
  }

  get template() {
    const {answers, question} = this.level;
    const {state} = this;

    return `
      <section class="game">
        <p class="game__task">${question}</p>
        <form class="game__content  game__content--triple">
          ${answers
            .map((answer, index) =>
              OneOfThreeView.getOption(answer.image, index + 1)
            )
            .join(``)}
        </form>
        ${getProgressBar(state.answers)}
      </section>`;
  }

  bind() {
    this.formElement = this._element.querySelector(`form`);
    this.images = this.formElement.querySelectorAll(`img`);
    this.formElement.addEventListener(`click`, this.answerHandler);
  }

  unbind() {
    this.formElement.removeEventListener(`click`, this.answersHandler);
  }

  answerHandler(event) {
    if (event.target.tagName === `IMG`) {
      const answer = new Array(3).fill(`photo`);
      this.images.forEach((img, index) => {
        if (event.target === img) {
          answer[index] = `painting`;
        }
      });
      this.handleAnswers(answer);
    }
  }

  handleAnswers(answer) {
    this.unbind();
    this.callback(answer, this.state);
  }
}

export default OneOfThreeView;
