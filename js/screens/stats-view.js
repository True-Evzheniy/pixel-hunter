import AbstractView from "../abstract-view";
import getResultTable from "../templates/result-table";
import {isFailed} from "../data/data";

class StatsView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const {data} = this;
    const fail = isFailed(data[0]);

    return `
      <section class="result">
        <h2 class="result__title">${fail ? `Поражение` : `Победа!`}</h2>
        ${data.map((state, index) => getResultTable(state, index + 1))}
      </section>`;
  }
}

export default StatsView;
