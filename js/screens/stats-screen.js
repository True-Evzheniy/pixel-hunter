import StatsView from "./stats-view";
import getRenderContainer from "../utils/render-container";
import HeaderView from "../templates/header-veiw";
import Application from "../application";


const statsScreen = (model) => {
  const container = getRenderContainer();
  const header = new HeaderView();
  const stats = new StatsView(model.state);

  header.onBackButton = Application.showGreeting;

  container.appendChild(header.element);
  container.appendChild(stats.element);

  return container;
};

export default statsScreen;
