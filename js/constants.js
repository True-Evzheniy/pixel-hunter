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
  [AnswerTypes.WRONG]: 0,
};
