import {initialState, MAX_LEVEL, AnswerTypes} from "../constants";

const toggleLevel = (answer, state) => {
  let {level, lives, answers: answers} = state;
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

  return {level, lives, timer: initialState.timer, answers: [...answers, answer]};
};

export default toggleLevel;
