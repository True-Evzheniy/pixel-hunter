import {AnswerTypes, MAX_LEVEL} from "../constants";

const statusTemlates = {
  [AnswerTypes.WRONG]: `<li class="stats__result stats__result--wrong"></li>`,
  [AnswerTypes.SLOW]: `<li class="stats__result stats__result--slow"></li>`,
  [AnswerTypes.FAST]: `<li class="stats__result stats__result--fast"></li>`,
  [AnswerTypes.NORMAL]: `<li class="stats__result stats__result--correct"></li>`,
  UNKNOWN: `<li class="stats__result stats__result--unknown"></li>`
};

const getStatusBar = (answers) => {
  return answers
    .map((answer) => statusTemlates[answer.type])
    .concat(new Array(MAX_LEVEL - answers.lengt).fill(statusTemlates.UNKNOWN))
    .join(``);
};

export default getStatusBar;
