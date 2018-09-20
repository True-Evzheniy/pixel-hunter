import {DEBUG} from "../constants";

const isDebug = () => {
  const hash = window.location.hash.replace(`#`, ``);

  return hash.toLowerCase() === DEBUG;
};

export default isDebug;
