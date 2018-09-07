import renderScreen from "./utils/render-screen";
import IntroView from "./screens/intro-view";
import GreetingView from "./screens/greeting-view";
import RulesView from "./screens/rules-view";
import {renderFirstGameScreen} from "./data/data";

const showRulesScreen = () => {
  renderScreen(new RulesView(renderFirstGameScreen).element);
};

const showGreetingScreen = () => {
  renderScreen(new GreetingView(showRulesScreen).element);
};

renderScreen(new IntroView(showGreetingScreen).element);
