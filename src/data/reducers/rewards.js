import {
  REWARDS_GET_ALL,
  REWARDS_ADD,
  REWARDS_ADD_ERROR,
  REWARDS_DELETE,
  REWARDS_UPDATE,
  REWARDS_UPDATE_ERROR,
  REWARDS_SELECT
} from '../actions/rewards.js';

function rewards (state = {items: [], errors: {}, selected: null}, action) {
  switch (action.type) {
    case REWARDS_ADD:
    case REWARDS_GET_ALL:
    case REWARDS_UPDATE:
    case REWARDS_DELETE:
      return {
        ...state,
        items: items(state.items, action)
      };
    case REWARDS_ADD_ERROR:
    case REWARDS_UPDATE_ERROR:
      return {
        ...state,
        errors: errors(state.errors, action)
      };
    case REWARDS_SELECT:
      return {
        ...state,
        selected: action.reward
      };
    default: 
      return {
        ...state
      };
  }
}

// sub reducers
function items (state = [], action) {
  switch (action.type) {
    case REWARDS_ADD:
      return [...state, action.reward];
    case REWARDS_GET_ALL:
      return action.rewards;
    case REWARDS_UPDATE:
      return state.reduce((all, item) => {
        const nextItem = item.id === action.reward.id ? action.reward : item;
        return all.concat([nextItem]);
      }, []);
    case REWARDS_DELETE:
      return state.filter(item => item.id !== action.reward.id);
  }
}

function errors (state = {}, action) {
  switch (action.type) {
    case REWARDS_ADD_ERROR:
      return {
        ...state,
        add: action.error
      };
    case REWARDS_UPDATE_ERROR:
      return {
        ...state,
        update: action.error
      };
  }
}

export default rewards;