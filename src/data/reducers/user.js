import { FOO } from '../actions/user.js';

const user = (state = {foo: false}, action) => {
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

export default user;