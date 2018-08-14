const mainContainer = document.getElementById(`main`);

export default (getScreen) => {
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }

  mainContainer.appendChild(getScreen());
};
