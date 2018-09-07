import renderScreen from "./render-screen";
import GreetingView from "../screens/greeting-view";

const handleBackButtonClick = (element, unsubscribe) => {
  const arrow = element.querySelector(`.back`);

  const onBackButtonClick = () => {
    if (unsubscribe) {
      unsubscribe();
    }

    arrow.removeEventListener(`click`, onBackButtonClick);
    renderScreen(new GreetingView().element);
  };

  arrow.addEventListener(`click`, onBackButtonClick);
};

export default handleBackButtonClick;
