import StatsView from "./stats-view";


const statsScreen = (model) => {
  const stats = new StatsView(model.state);

  return stats.element;
};

export default statsScreen;
