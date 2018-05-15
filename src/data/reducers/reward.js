import { FOO } from '../actions/reward.js';

const reward = (state = {foo: false}, action) => {
  switch (action.type) {
    case FOO:
      return {
        ...state,
        foo: true
      };
    default:
      return state;
  }
}

export default reward;
