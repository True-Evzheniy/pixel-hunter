import {initialState, MAX_LEVEL, AnswerTypes} from "../constants";

const toggleLevel = (answer, {level, lives}) => {
  level++;

  if (level >= MAX_LEVEL) {
    return false;
  }
  if (answer === AnswerTypes.WRONG) {
    lives--;
  }

  if (lives < 0) {
    return false;
  }

  return Object.assign({}, initialState, {level, lives});
};

export default toggleLevel;
