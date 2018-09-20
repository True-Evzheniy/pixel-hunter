import renderScreen from "./utils/render-screen";
import IntroView from "./screens/intro-view";
import GreetingView from "./screens/greeting-view";
import rulesScreen from "./screens/rules-screen";
import gameScreen from "./screens/game-screen";
import statsScreen from "./screens/stats-screen";
import GameModel from "./game-model";
import resize from "./data/resize";


let questions;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const prepareData = (questionsData) => {
  return new Promise((resolve) => {
    const imageData = [];
    const loadedImages = [];

    questionsData.forEach((question) => {
      question.answers.forEach((answer) => {
        imageData.push(answer.image);
      });
    });

    imageData.forEach((data) => {
      const image = new Image();

      image.src = data.url;
      image.onload = () => {
        loadedImages.push(image);
        const size = resize(data, image);
        data.width = size.width;
        data.height = size.height;

        if (loadedImages.length === imageData.length) {
          resolve(questionsData);
        }
      };
    });
  });
};
class Application {
  static start() {
    Application.showInto();
    fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then(prepareData)
      .then((data) => (questions = data))
      .then(() => Application.showGreeting())
      .catch(console.error);
  }

  static showInto() {
    renderScreen(new IntroView(Application.showGreeting).element);
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
    renderScreen(statsScreen(model));
  }
}

export default Application;
