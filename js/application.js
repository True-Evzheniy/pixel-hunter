import renderScreen from "./utils/render-screen";
import IntroView from "./screens/intro-view";
import GreetingView from "./screens/greeting-view";
import rulesScreen from "./screens/rules-screen";
import gameScreen from "./screens/game-screen";
import statsScreen from "./screens/stats-screen";
import GameModel from "./game-model";
import Loader from "./loader";
import ErrorView from "./screens/error-view";
import handleRotate from "./utils/rotate";

let questions;

class Application {
  static start() {
    Application.showInto();
    Loader.loadData()
      .then((data) => (questions = data))
      .then(() => Application.showGreeting())
      .catch(Application.showError);
  }

  static showInto() {
    renderScreen(new IntroView(handleRotate).element);
  }

  static showGreeting() {
    renderScreen(new GreetingView(Application.showRulesScreen).element);
  }

  static showRulesScreen() {
    renderScreen(rulesScreen());
  }

  static showGame(name) {
    const model = new GameModel(name, questions);

    renderScreen(gameScreen(model));
  }

  static showStats(model) {
    Loader.saveResult(model.state, model.player)
      .then(() => Loader.loadResulsts(model.player))
      .then((res) => renderScreen(statsScreen(res)));
  }

  static showError(error) {
    renderScreen(new ErrorView(error).element);
  }
}

export default Application;
