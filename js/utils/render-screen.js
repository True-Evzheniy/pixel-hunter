const mainContainer = document.getElementById(`main`);

export default (screen) => {
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }

  mainContainer.appendChild(screen);
};
