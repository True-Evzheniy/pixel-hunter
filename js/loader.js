import resize from "./data/resize";

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = `11091987`;

const toJSON = (response) => response.json();

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class Loader {
  async loadData() {
    try {
      const response = await fetch(`${SERVER_URL}/questions`);
      const data = checkStatus(response);
      const dataJSON = await toJSON(data);

      const loadedData = await this._preloadData(dataJSON);
      this.onSuccess(loadedData);
    } catch (error) {
      this.onError(error);
    }
  }

  async saveResult(data, playerName) {
    try {
      const options = {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": `application/json`
        },
        method: `POST`
      };

      const response = fetch(
          `${SERVER_URL}/stats/${APP_ID}-${playerName}`,
          options
      );
      checkStatus(response);
      this.loadResulsts(playerName);
    } catch (error) {
      this.onError(error);
    }
  }

  async loadResulsts(playerName) {
    try {
      const response = fetch(`${SERVER_URL}/stats/${APP_ID}-${playerName}`);
      const data = checkStatus(response);
      const dataJSON = await toJSON(data);

      this.onSuccess(dataJSON);
    } catch (error) {
      this.onError(error);
    }
  }

  async _preloadData(questionsData) {
    const imageData = [];
    const loadedImages = [];

    questionsData.forEach((question) => {
      question.answers.forEach((answer) => {
        imageData.push(answer.image);
      });
    });

    const preloadImage = (data) => {
      return new Promise((resolve) => {
        const image = new Image();

        image.src = data.url;
        image.onload = () => {
          const size = resize(data, image);
          data.width = size.width;
          data.height = size.height;

          resolve();
        };
      });
    };

    imageData.forEach((data) => {
      loadedImages.push(preloadImage(data));
    });

    await Promise.all(loadedImages);

    return questionsData;
  }

  onSuccess() {}

  onError() {}
}

export default Loader;
