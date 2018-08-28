import getElementFromTemplate from "../utils/get-element-from-template";
import handleBackButtonClick from "../utils/back-button-handler";
import getHeader from "../templates/header";
import getResultTable from "../templates/result-table";
import {isFailed} from "../data/data";

const getStatsScreen = (state) => {
  const fail = isFailed(state);

  const template = `
  ${getHeader()}
  <section class="result">
      <h2 class="result__title">${fail ? `Поражение` : `Победа!`}</h2>
      ${getResultTable(state)}
  </section>
 `;

  const element = getElementFromTemplate(template);

  handleBackButtonClick(element);

  return element;
};

export default getStatsScreen;
