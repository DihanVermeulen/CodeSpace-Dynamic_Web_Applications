// @ts-check

import { subscribe, dispatch, getState } from "./store/store.js";
import { add, subtract, reset } from "./store/actions.js";

subscribe((_, next) => console.log(next));
dispatch(add());
dispatch(add());
dispatch(subtract());
dispatch(reset());
