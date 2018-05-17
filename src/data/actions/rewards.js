import {getAll, updateItem, addItem, getItem, deleteItem} from './indexeddb-service';

export const REWARDS_ADD = 'REWARDS_ADD';
export const REWARDS_DELETE = 'REWARDS_DELETE';
export const REWARDS_UPDATE = 'REWARDS_UPDATE';
export const REWARDS_ADD_ERROR = 'REWARDS_ADD_ERROR';
export const REWARDS_UPDATE_ERROR = 'REWARDS_UPDATE_ERROR';
export const REWARDS_GET = 'REWARDS_GET';
export const REWARDS_GET_ALL = 'REWARDS_GET_ALL';
export const REWARDS_SELECT = 'REWARDS_SELECT';

export const getAllRewards = () => async (dispatch, getState) => {
  const rewards = await getAll('rewards');

  dispatch({
    type: REWARDS_GET_ALL,
    rewards
  });
};

export const addReward = (reward) => async (dispatch, getState) => {
  let id;
  try {
    id = await addItem('rewards', reward);
  } catch (error) {
    dispatch({
      type: REWARDS_ADD_ERROR,
      error
    });
    return;
  }

  dispatch({
    type: REWARDS_ADD,
    reward: {...reward, id}
  });
};

export const updateReward = (reward) => async (dispatch) => {
  try {
    await updateItem('rewards', reward);
  } catch (error) {
    dispatch({
      type: REWARDS_UPDATE_ERROR,
      error
    });
    return;
  }

  dispatch({
    type: REWARDS_UPDATE,
    reward
  });
};

export const deleteReward = (reward) => async (dispatch) => {
  await deleteItem('rewards', reward.id);
  
  dispatch({
    type: REWARDS_GET_ALL,
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
    type: REWARDS_SELECT,
    reward
  };
}

function getRandomItem(collection) {
  const idx = Math.floor(Math.random() * collection.length);
  return collection[idx];
}