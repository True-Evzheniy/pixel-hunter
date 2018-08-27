import toggleLevel from "./toggleLevel";
import {AnswerTypes, initialState} from "../constants";
import {expect} from "chai";

describe(`toggleLevel`, () => {
  it(`increase leveld if lives > 0`, () => {
    expect(toggleLevel(AnswerTypes.NORMAL, initialState)).to.be.deep.equal({
      level: 2,
      lives: 3,
      timer: 30,
      answers: [AnswerTypes.NORMAL]
    });
  });

  it(`return false if lives < 0`, () => {
    expect(
        toggleLevel(
            AnswerTypes.NORMAL,
            Object.assign({}, initialState, {lives: -1})
        )
    ).to.be.equal(false);
  });

  it(`return false if level more then  10`, () => {
    expect(
        toggleLevel(
            AnswerTypes.NORMAL,
            Object.assign({}, initialState, {level: 10})
        )
    ).to.be.equal(false);
  });

  it(`decrease lives if answer is wrong`, () => {
    expect(toggleLevel(AnswerTypes.WRONG, initialState)).to.be.deep.equal({
      level: 2,
      lives: 2,
      timer: 30,
      answers: [AnswerTypes.WRONG]
    });
  });
});
