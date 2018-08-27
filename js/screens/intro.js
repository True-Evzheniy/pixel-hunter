import getElementFromTemplate from "../utils/get-element-from-template";
import renderScreen from "../utils/render-screen";
import greetingScreen from "../screens/greeting";

const getInroScreen = () => {
  const template = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
  `;
  const element = getElementFromTemplate(template);
  const asterisk = element.querySelector(`.intro__asterisk`);

  const onAsreriskClick = () => {
    renderScreen(greetingScreen());
  };

  asterisk.addEventListener(`click`, onAsreriskClick);

  return element;
};

export default getInroScreen;
