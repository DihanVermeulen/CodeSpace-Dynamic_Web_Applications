import { COUNTER_STEPS } from "../constants/counterSteps.js";

const countByMethod = (method, value) => {
  let counterValue = value;
  if (method === "subtract") {
    counterValue -= COUNTER_STEPS;
    return counterValue;
  }
  counterValue += COUNTER_STEPS;
  return counterValue;
};

export default countByMethod;
