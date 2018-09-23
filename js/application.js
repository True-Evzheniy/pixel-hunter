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
    const loader = new Loader();
    Application.showInto();
    loader.onSuccess = (data) => {
      questions = data;
      Application.showGreeting();
    };
    loader.onError = Application.showError;
    loader.loadData();
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
    const loader = new Loader();

    loader.saveResult(model.state, model.player);
    loader.onError = Application.showError;
    loader.onSuccess = (data) => renderScreen(statsScreen(data));
  }

  static showError(error) {
    renderScreen(new ErrorView(error).element);
  }
}

export default Application;
