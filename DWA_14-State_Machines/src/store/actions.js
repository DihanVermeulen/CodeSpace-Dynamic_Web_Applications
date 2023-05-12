// @ts-check

/**
 * Increments the number value by one
 *
 * @typedef {object} Add
 * @prop {"ADD"} type
 */

/**
 * @typedef {Add | Subtract | Reset} Action
 */
export const Action = {};

/**
 * Decrements the number value by one
 *
 * @typedef {object} Subtract
 * @prop {"SUBTRACT"} type
 */

/**
 * Resets the number value to 0
 *
 * @typedef {object} Reset
 * @prop {"RESET"} type
 */

/**
 * @returns {Add}
 */
export const add = () => {
  return {
    type: "ADD",
  };
};

/**
 * @returns {Reset}
 */
export const reset = () => {
  return {
    type: "RESET",
  };
};

/**
 * @returns {Subtract}
 */
export const subtract = () => {
  return {
    type: "SUBTRACT",
  };
};
