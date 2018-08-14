const getAnswerHandler = (callback) => (event) => {
  const form = event.currentTarget;
  const formInputs = Array.from(form.elements);
  const questionNames = new Set();
  const checkedInputs = formInputs.filter((input) => input.checked === true);

  formInputs.forEach((input) => questionNames.add(input.name));

  if (checkedInputs.length === questionNames.size) {
    callback();
  }
};

export default getAnswerHandler;
