import renderScreen from "./utils/render-screen";
import IntroView from "./screens/intro-view";
import GreetingView from "./screens/greeting-view";
import rulesScreen from "./screens/rules-screen";
import gameScreen from "./screens/game-screen";
import statsScreen from "./screens/stats-screen";

class Application {
  static showInto() {
    renderScreen(new IntroView(Application.showGreeting).element);
  }

  static showGreeting() {
    renderScreen(new GreetingView(Application.showRulesScreen).element);
  }

  static showRulesScreen() {
    renderScreen(rulesScreen());
  }

  static showGame(model) {
    renderScreen(gameScreen(model));
  }

  static showStats(model) {
    renderScreen(statsScreen(model));
  }
}

export default Application;
