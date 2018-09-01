import {QuestionTypes, initialState, AnswerTypes, MAX_LEVEL} from "../constants";
import getOneOfThreeScreen from "../screens/one-of-three";
import getTinderLikeScreen from "../screens/tinder-like";
import getTwoOfTwoScreen from "../screens/two-of-two";
import toggleLevel from "./toggleLevel";
import getCorrectAnswerType from "./getCorrectAnswerType";
import renderScreen from "../utils/render-screen";
import getStatsScreen from "../screens/stats";

export const GameScreens = {
  [QuestionTypes.ONE_OF_THREE]: getOneOfThreeScreen,
  [QuestionTypes.TWO_OF_TWO]: getTwoOfTwoScreen,
  [QuestionTypes.TINDER_LIKE]: getTinderLikeScreen
};

export const questions = [
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `https://k43.kn3.net/956572A45.jpg`,
          width: 468,
          height: 458
        },
        type: `painting`
      },
      {
        image: {
          url: `https://k38.kn3.net/AD92BA712.jpg`,
          width: 468,
          height: 458
        },
        type: `painting`
      }
    ]
  },
  {
    type: `one-of-three`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        image: {
          url: `http://i.imgur.com/eSlWjE7.jpg`,
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: `https://i.redd.it/0uvt7jy0hy2y.jpg`,
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: `https://k32.kn3.net/5C7060EC5.jpg`,
          width: 304,
          height: 455
        },
        type: `painting`
      }
    ]
  },
  {
    type: `tinder-like`,
    question: `Угадай, фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://i.imgur.com/gUeK0qE.jpg`,
          width: 705,
          height: 455
        },
        type: `photo`
      }
    ]
  },
  {
    type: `one-of-three`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        image: {
          url: `http://i.imgur.com/GbcYNPw.jpg`,
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: `http://i.imgur.com/zHRZW1C.jpg`,
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: `https://k36.kn3.net/E9B401148.jpg`,
          width: 304,
          height: 455
        },
        type: `painting`
      }
    ]
  },
  {
    type: `tinder-like`,
    question: `Угадай, фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://i.imgur.com/rY9u55S.jpg`,
          width: 705,
          height: 455
        },
        type: `photo`
      }
    ]
  },
  {
    type: `one-of-three`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        image: {
          url: `https://i.redd.it/cfw21jscl03y.jpg`,
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: `http://i.imgur.com/dWTKNtv.jpg`,
          width: 304,
          height: 455
        },
        type: `photo`
      },
      {
        image: {
          url: `https://k34.kn3.net/4244FE50B.jpg`,
          width: 304,
          height: 455
        },
        type: `painting`
      }
    ]
  },
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://i.imgur.com/167pXyY.jpg`,
          width: 468,
          height: 458
        },
        type: `photo`
      },
      {
        image: {
          url: `https://k42.kn3.net/D660F0768.jpg`,
          width: 468,
          height: 458
        },
        type: `painting`
      }
    ]
  },
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `https://k41.kn3.net/FF5009BF0.jpg`,
          width: 468,
          height: 458
        },
        type: `painting`
      },
      {
        image: {
          url: `http://i.imgur.com/jP4C1IS.jpg`,
          width: 468,
          height: 458
        },
        type: `photo`
      }
    ]
  },
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://i.imgur.com/mz0MSsy.jpg`,
          width: 468,
          height: 458
        },
        type: `photo`
      },
      {
        image: {
          url: `https://k31.kn3.net/4BF6BBF0E.jpg`,
          width: 468,
          height: 458
        },
        type: `painting`
      }
    ]
  },
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `http://i.imgur.com/ncXRs5Y.jpg`,
          width: 468,
          height: 458
        },
        type: `photo`
      },
      {
        image: {
          url: `http://i.imgur.com/1KegWPz.jpg`,
          width: 468,
          height: 458
        },
        type: `photo`
      }
    ]
  }
];

export const renderFirstGameScreen = () => {
  const firstLevel = questions[0]
  const firstGameScreen = GameScreens[firstLevel.type](initialState, firstLevel);

  renderScreen(firstGameScreen);
};

export const isCorrect = (answer, state) => {
  return answer.every(
      (item, index) => item === questions[state.level - 1].answers[index].type
  );
};

export const isFailed = (state) => {
  return state.lives < 0;
};

export const isEnded = (state) => {
  return state.level > MAX_LEVEL;
};

export const toggleScreens = (answer, state) => {
  const correct = isCorrect(answer, state);
  const answerType = correct
    ? getCorrectAnswerType(state.timer)
    : AnswerTypes.WRONG;
  const newState = toggleLevel(answerType, state);

  if (isFailed(newState) || isEnded(newState)) {
    renderScreen(getStatsScreen(newState));
    return;
  }

  const newLevel = questions[newState.level - 1];

  renderScreen(GameScreens[newLevel.type](newState, newLevel));
};
