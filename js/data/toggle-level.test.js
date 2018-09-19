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

  it(`decrease lives if answer is wrong`, () => {
    expect(toggleLevel(AnswerTypes.WRONG, initialState)).to.be.deep.equal({
      level: 2,
      lives: 2,
      timer: 30,
      answers: [AnswerTypes.WRONG]
    });
  });
});
