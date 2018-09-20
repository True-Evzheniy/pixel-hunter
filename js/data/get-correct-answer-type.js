import {AnswerTypes} from "../constants";

const getCorrectAnswerType = (timerTime) => {
  if (timerTime < 10) {
    return AnswerTypes.SLOW;
  }

  if (timerTime > 20) {
    return AnswerTypes.FAST;
  }

  return AnswerTypes.NORMAL;
};

export default getCorrectAnswerType;
