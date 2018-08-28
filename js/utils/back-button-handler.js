import renderScreen from "./render-screen";
import greetingScreen from "../screens/greeting";

const handleBackButtonClick = (element, unsubscribe) => {
  const arrow = element.querySelector(`.back`);

  const onBackButtonClick = () => {
    if (unsubscribe) {
      unsubscribe();
    }

    arrow.removeEventListener(`click`, onBackButtonClick);
    renderScreen(greetingScreen());
  };

  arrow.addEventListener(`click`, onBackButtonClick);
};

export default handleBackButtonClick;
