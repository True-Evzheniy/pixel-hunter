import {initialState, MAX_LEVEL} from "./constants";
import {isFailed} from "./data/data";
import toggleLevel from "./data/toggleLevel";
import tickTimer from "./data/tick-timer";

class GameModel {
  constructor(playerName, questions) {
    this._state = GameModel.createState();
    this._name = playerName;
    this._questions = questions;
  }

  static createState() {
    return Object.assign({}, initialState);
  }

  get state() {
    return Object.assign({}, this._state);
  }

  get levelData() {
    return this._questions[this._state.level - 1];
  }

  get levelType() {
    return this.levelData.type;
  }

  get gameOver() {
    return this._state.level > MAX_LEVEL || isFailed(this._state);
  }

  isCorrect(answer) {
    if (!answer) {
      return false;
    }
    return answer.every(
        (item, index) => item === this.levelData.answers[index].type
    );
  }

  toggleLevel(answerType) {
    this._state = toggleLevel(answerType, this._state);
  }

  reset() {
    this._state = GameModel.createInitialState;
  }

  tick() {
    const newTimer = tickTimer(this._state);
    this._state.timer = newTimer;

    return newTimer;
  }
}

export default GameModel;
