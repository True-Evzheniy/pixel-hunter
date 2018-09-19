import {should} from "chai";
import tickTimer from "./tick-timer";
import {initialState} from "../constants";

should();

describe(`tickTimer`, () => {
  it(`icrease timer if time more then null`, () => {
    tickTimer(initialState)
      .should.equal(29);
  });

  it(`return false if time less then null`, () => {
    tickTimer(Object.assign({}, initialState, {timer: 0})).should.equal(
        false
    );
  });
});
