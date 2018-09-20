export const AnswerTypes = {
  FAST: `fast`,
  SLOW: `slow`,
  NORMAL: `normal`,
  WRONG: `wrong`
};

export const Points = {
  [AnswerTypes.FAST]: 150,
  [AnswerTypes.SLOW]: 50,
  [AnswerTypes.NORMAL]: 100,
  [AnswerTypes.WRONG]: 0
};

export const TimerRanges = {
  BLINK: 5,
  SLOW: 10,
  FAST: 20
};

export const initialState = {
  lives: 3,
  level: 1,
  timer: 30,
  answers: []
};

export const MAX_LEVEL = 10;

export const QuestionTypes = {
  TWO_OF_TWO: `two-of-two`,
  ONE_OF_THREE: `one-of-three`,
  TINDER_LIKE: `tinder-like`
};

export const Bonuses = {
  [AnswerTypes.FAST]: 50,
  [AnswerTypes.SLOW]: -50,
  [AnswerTypes.NORMAL]: 100,
  LIVES: 50
};

export const FrameSize = {
  [QuestionTypes.TINDER_LIKE]: {
    width: 705,
    height: 455
  },
  [QuestionTypes.TWO_OF_TWO]: {
    width: 486,
    height: 458
  },
  [QuestionTypes.ONE_OF_THREE]: {
    width: 304,
    height: 455
  }
};

export const DEBUG = `debug`;
