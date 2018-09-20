import RulesView from "./rules-view";
import Application from "../application";
import getRenderContainer from "../utils/render-container";
import HeaderView from "../templates/header-veiw";

const rulesScreen = () => {
  let name = ``;
  const rules = new RulesView();
  const container = getRenderContainer();
  const header = new HeaderView();

  header.onBackButton = Application.showGreeting;

  rules.onFormSubmit = (event) => {
    event.preventDefault();
    rules.unbind();

    Application.showGame(name);
  };

  rules.onInputChange = (event) => {
    const {value} = event.target;
    name = value;

    if (value) {
      rules.button.disabled = false;
    } else {
      rules.button.disabled = true;
    }
  };

  container.appendChild(header.element);
  container.appendChild(rules.element);

  return container;
};

export default rulesScreen;
