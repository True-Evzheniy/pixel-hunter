import OneOfThreeView from "../screens/one-of-three-view";
import ThinderLikeView from "../screens/tinder-like-view";
import TwoOfTwoView from "../screens/two-of-two-view";
import {QuestionTypes, AnswerTypes} from "../constants";
import renderScreen from "../utils/render-screen";
import getCorrectAnswerType from "../data/getCorrectAnswerType";
import StatsView from "../screens/stats-view";
import HeaderView from "../templates/header-veiw";
import getRenderContainer from "../utils/render-container";

const gameScreen = (model) => {
  window.model = model;
  const container = getRenderContainer();
  const game = getRenderContainer();
  const header = new HeaderView(model.state);
  let timeout;

  const updateView = (spot, view) => {
    spot.innerHTML = ``;
    spot.appendChild(view.element);
  };

  const toggleScreens = (answer) => {
    clearTimeout(timeout);

    const correct = model.isCorrect(answer);
    const answerType = correct
      ? getCorrectAnswerType(model.state.timer)
      : AnswerTypes.WRONG;

    model.toggleLevel(answerType);

    if (model.gameOver) {
      renderScreen(new StatsView(model.state).element);
      return;
    }
    startTimeout();
    header.updateTimer(model.state);
    header.updateLives(model.state);
    updateView(game, getGameView());
  };

  const getGameView = () => {
    switch (model.levelType) {
      case QuestionTypes.TWO_OF_TWO:
        return new TwoOfTwoView(model.state, model.levelData, toggleScreens);
      case QuestionTypes.ONE_OF_THREE:
        return new OneOfThreeView(model.state, model.levelData, toggleScreens);
      case QuestionTypes.TINDER_LIKE:
        return new ThinderLikeView(model.state, model.levelData, toggleScreens);
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

  startTimeout();

  game.appendChild(firstGameScreen);
  container.appendChild(header.element);
  container.appendChild(game);

  return container;
};

export default gameScreen;
