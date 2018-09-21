import OneOfThreeView from "../screens/one-of-three-view";
import ThinderLikeView from "../screens/tinder-like-view";
import TwoOfTwoView from "../screens/two-of-two-view";
import {QuestionTypes, AnswerTypes} from "../constants";
import getCorrectAnswerType from "../data/get-correct-answer-type";
import HeaderView from "../templates/header-veiw";
import getRenderContainer from "../utils/render-container";
import Application from "../application";
import ConfirmationView from "./confirmation-view";
import isDebug from "../utils/is-debug";
import DebugView from "./debug-view";

const gameScreen = (model) => {
  const container = getRenderContainer();
  const game = getRenderContainer();
  const header = new HeaderView(model.state);
  const confirmation = new ConfirmationView();
  let timeout;
  const debug = isDebug();
  let debugView;

  if (debug) {
    debugView = new DebugView();
    document.body.appendChild(debugView.element);
  }

  const stopTimeout = () => {
    clearTimeout(timeout);
  };

  const updateView = (spot, view) => {
    spot.innerHTML = ``;
    spot.appendChild(view.element);
  };

  const toggleScreens = (answer) => {
    const correct = model.isCorrect(answer);
    const answerType = correct
      ? getCorrectAnswerType(model.state.timer)
      : AnswerTypes.WRONG;

    stopTimeout();
    model.toggleLevel(answerType);

    if (model.gameOver) {
      Application.showStats(model);
      return;
    }
    const {state} = model;

    header.updateTimer(state);
    header.updateLives(state);
    updateView(game, getGameView());
    startTimeout();
  };

  const getHint = (level) => {
    return JSON.stringify(level.answers.map((answer)=> answer.type));
  };

  const getGameView = () => {
    const {state, levelData, levelType} = model;

    if (debug) {
      debugView.show(getHint(levelData));
    }

    switch (levelType) {
      case QuestionTypes.TWO_OF_TWO:
        return new TwoOfTwoView(state, levelData, toggleScreens);
      case QuestionTypes.ONE_OF_THREE:
        return new OneOfThreeView(state, levelData, toggleScreens);
      case QuestionTypes.TINDER_LIKE:
        return new ThinderLikeView(state, levelData, toggleScreens);
      default:
        throw new Error(`incorrect type of GameView`);
    }
  };

  const firstGameScreen = getGameView().element;
  const startTimeout = () => {
    timeout = setTimeout(() => {
      const timer = model.tick();

      if (timer) {
        header.updateTimer(model.state);
        startTimeout();
      } else {
        toggleScreens(false);
      }
    }, 1000);
  };

  const handleCloseConfirmation = () => {
    container.removeChild(confirmation.element);
    startTimeout();
  };

  confirmation.onCloseButtonClick = handleCloseConfirmation;
  confirmation.onCancelButtonClick = handleCloseConfirmation;
  confirmation.onOkButtonClick = Application.start;

  header.onBackButton = () => {
    stopTimeout();
    container.appendChild(confirmation.element);
  };

  startTimeout();
  game.appendChild(firstGameScreen);
  container.appendChild(header.element);
  container.appendChild(game);

  return container;
};

export default gameScreen;
