import { FOO } from '../actions/task.js';

const task = (state = {foo: false}, action) => {
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

export default task;
