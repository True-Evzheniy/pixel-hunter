import StatsView from "./stats-view";
import getRenderContainer from "../utils/render-container";
import HeaderView from "../templates/header-veiw";
import Application from "../application";


const statsScreen = (data) => {
  const container = getRenderContainer();
  const header = new HeaderView();
  const stats = new StatsView(data);

  header.onBackButton = Application.start;

  container.appendChild(header.element);
  container.appendChild(stats.element);

  return container;
};

export default statsScreen;
