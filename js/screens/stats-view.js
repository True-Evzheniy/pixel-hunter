import AbstractView from "../abstract-view";
import getResultTable from "../templates/result-table";
import {isFailed} from "../data/data";

class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const {state} = this;
    const fail = isFailed(state);

    return `
      <section class="result">
        <h2 class="result__title">${fail ? `Поражение` : `Победа!`}</h2>
        ${getResultTable(state)}
      </section>`;
  }
}

export default StatsView;
