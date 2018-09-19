import getCorrectAnswerType from "./getCorrectAnswerType";
import {AnswerTypes} from "../constants";

describe(`getCorrectAnswerType`, () => {
  it(`return slow type if time less then 10`, () => {
    getCorrectAnswerType(9).should.equals(AnswerTypes.SLOW);
  });
  it(`return slow type if time more then 20`, () => {
    getCorrectAnswerType(21).should.equals(AnswerTypes.FAST);
  });
  it(`return slow type if time between 10 and 20`, () => {
    getCorrectAnswerType(20).should.equals(AnswerTypes.NORMAL);
  });
});
