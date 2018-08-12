const getElementFromString = (templateString) => {
  const element = document.createElement(`div`);

  element.innerHTML = templateString;

  return element;
};

export default getElementFromString;
