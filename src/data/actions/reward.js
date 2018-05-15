export const REWARD_CREATE = 'REWARD_CREATE';
export const REWARD_DELETE = 'REWARD_DELETE';
export const REWARD_UPDATE = 'REWARD_UPDATE';
export const REWARD_GET = 'REWARD_GET';
export const REWARD_GET_ALL = 'REWARD_GET_ALL';

const rewards = [{
  id: '1',
  name: 'high five',
  url: 'https://media.giphy.com/media/120jXUxrHF5QJ2/giphy.gif',
  fun: 0,
  usedTimes: 0
}];

/**
 * Get all the available rewards.
 */
export const getAllRewards = () => (dispatch, getState) => {
  // TODO: get from indexeddb
  // TODO: get from db
  // TODO: sync db with indexeddb

  // simulate work for now
  setTimeout(() => dispatch({
    type: REWARD_GET_ALL,
    rewards
  }), 50);
};

/**
 * Get a random reward based, optionally based on a set of criteria.
 */
export const getRandomReward = (params = {}) => {
  const criteria = Object.assign({
    fun: 0
  }, params);

  const acceptedRewards = rewards
    .filter(reward => reward.fun >= criteria.fun)
    .sort((rewardA, rewardB) => rewardA.given > rewardB.given ? 1 : -1);

  if (!acceptedRewards.length) {
    return null;
  }

  const reward = randomize(availableItems);

  return dispatch({
    type: REWARD_GET,
    item: reward;
  })
}

function randomize(collection) {
  const index = Math.floor(Math.random() * collection.length);
  return collection[index];
}
