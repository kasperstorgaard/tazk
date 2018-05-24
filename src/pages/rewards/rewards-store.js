import {getAll, updateItem, addItem, getItem, deleteItem} from '../../api.js';

export const ADD = 'tazk/rewards/ADD';
export const DELETE = 'tazk/rewards/DELETE';
export const UPDATE = 'tazk/rewards/UPDATE';
export const ADD_ERROR = 'tazk/rewards/ADD_ERROR';
export const UPDATE_ERROR = 'tazk/rewards/UPDATE_ERROR';
export const GET = 'tazk/rewards/GET';
export const GET_ALL = 'tazk/rewards/GET_ALL';
export const SELECT = 'tazk/rewards/SELECT';

export const getAllRewards = () => async (dispatch, getState) => {
  const rewards = await getAll('rewards');

  dispatch({
    type: GET_ALL,
    rewards
  });
};

export const addReward = (reward) => async (dispatch, getState) => {
  let id;
  try {
    id = await addItem('rewards', reward);
  } catch (error) {
    dispatch({
      type: ADD_ERROR,
      error
    });
    return;
  }

  dispatch({
    type: ADD,
    reward: {...reward, id}
  });
};

export const updateReward = (reward) => async (dispatch) => {
  try {
    await updateItem('rewards', reward);
  } catch (error) {
    dispatch({
      type: UPDATE_ERROR,
      error
    });
    return;
  }

  dispatch({
    type: UPDATE,
    reward
  });
};

export const deleteReward = (reward) => async (dispatch) => {
  await deleteItem('rewards', reward.id);
  
  dispatch({
    type: GET_ALL,
    reward
  });
};

export const selectRandomReward = (params = {}) => (dispatch, getState) => {
  const criteria = { ...params, fun: 0 };

  const acceptedRewards = (getState().rewards || [])
    .filter(reward => reward.fun >= criteria.fun);

  const randomItem = getRandomItem(acceptedRewards);

  return dispatch(selectReward(reward));
}

export const selectReward = (reward) => {
  return {
    type: SELECT,
    reward
  };
}

function getRandomItem(collection) {
  const idx = Math.floor(Math.random() * collection.length);
  return collection[idx];
}

export function reducer (state = {items: [], errors: {}, selected: null}, action) {
  switch (action.type) {
    case ADD:
    case GET_ALL:
    case UPDATE:
    case DELETE:
      return {
        ...state,
        items: items(state.items, action)
      };
    case ADD_ERROR:
    case UPDATE_ERROR:
      return {
        ...state,
        errors: errors(state.errors, action)
      };
    case SELECT:
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
    case ADD:
      return [...state, action.reward];
    case GET_ALL:
      return action.rewards;
    case UPDATE:
      return state.reduce((all, item) => {
        const nextItem = item.id === action.reward.id ? action.reward : item;
        return all.concat([nextItem]);
      }, []);
    case DELETE:
      return state.filter(item => item.id !== action.reward.id);
  }
}

function errors (state = {}, action) {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        add: action.error
      };
    case UPDATE_ERROR:
      return {
        ...state,
        update: action.error
      };
  }
}

export default reducer;