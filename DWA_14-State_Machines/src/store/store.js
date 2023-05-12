// @ts-check

import { Action } from "./actions.js";
import { reducer } from "./reducers.js";

/**
 * @typedef {object} State
 * @prop {number} value
 */
export const State = {};

/**
 * @callback GetState
 * @returns {State}
 */

/**
 * @callback EmptyFn
 */

/**
 * @callback Dispatch
 * @param {Action} action
 */

/**
 * @callback Subscription
 * @param {State} prev
 * @param {State} next
 */

/**
 * @typedef {object} Store
 * @prop {GetState} getState
 * @prop {Subscription} subscribe
 * @prop {Dispatch} dispatch
 */

/**
 * @type {State}
 */
export const initialState = {
  value: 0,
};

/**
 * @type {Array<Subscription>}
 */

let subscribers = [];

/**
 * @type {Array<State>}
 */
const states = [
  {
    value: 0,
  },
];

/**
 * @returns {State}
 */
export const getState = () => {
  return Object.freeze({ ...states[0] });
};

/**
 * @param {Action} action
 */

export const dispatch = (action) => {
  const prev = getState();
  const next = reducer(prev, action);

  const handler = (item) => item(prev, next);

  subscribers.forEach(handler);

  states.unshift(next);
};

/**
 * @param {Subscription} subscription
 * @return {EmptyFn}
 */
export const subscribe = (subscription) => {
  subscribers.push(subscription);

  const filterHandler = (item) => item !== subscription;

  const unsubscribe = () => {
    const newSubscribers = subscribers.filter(filterHandler);
    subscribers = newSubscribers;
  };

  return unsubscribe;
};
