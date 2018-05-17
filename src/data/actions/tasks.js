import {getAll, updateItem, addItem, getItem, deleteItem} from './indexeddb-service';

export const TASKS_ADD = 'TASKS_ADD';
export const TASKS_DELETE = 'TASKS_DELETE';
export const TASKS_UPDATE = 'TASKS_UPDATE';
export const TASKS_ADD_ERROR = 'TASKS_ADD_ERROR';
export const TASKS_UPDATE_ERROR = 'TASKS_UPDATE_ERROR';
export const TASKS_GET = 'TASKS_GET';
export const TASKS_GET_ALL = 'TASKS_GET_ALL';
export const TASKS_SELECT = 'TASKS_SELECT';

export const getAllTasks = () => async (dispatch, getState) => {
  const tasks = await getAll('tasks');

  dispatch({
    type: TASKS_GET_ALL,
    tasks
  });
};

export const addTask = (task) => async (dispatch, getState) => {
  let id;
  try {
    id = await addItem('tasks', task);
  } catch (error) {
    dispatch({
      type: TASKS_ADD_ERROR,
      error
    });
    return;
  }

  dispatch({
    type: TASKS_ADD,
    task: {...task, id}
  });
};

export const updateTask = (task) => async (dispatch) => {
  try {
    await updateItem('tasks', task);
  } catch (error) {
    dispatch({
      type: TASKS_UPDATE_ERROR,
      error
    });
    return;
  }

  dispatch({
    type: TASKS_UPDATE,
    task
  });
};

export const deleteTask = (task) => async (dispatch) => {
  await deleteItem('tasks', task.id);
  
  dispatch({
    type: TASKS_GET_ALL,
    task
  });
};

export const selectRandomTask = (params = {}) => (dispatch, getState) => {
  const criteria = { ...params, fun: 0 };

  const acceptedTaskss = (getState().tasks || [])
    .filter(task => task.fun >= criteria.fun);

  const randomItem = getRandomItem(acceptedTaskss);

  return dispatch(selectTask(task));
}

export const selectTask = (task) => {
  return {
    type: TASKS_SELECT,
    task
  };
}

export const completeTask = (task) => (dispatch) => {
  const completedTask = { ...task, completed: true };
  return updateTask(completedTask)(dispatch);
}

function getRandomItem(collection) {
  const idx = Math.floor(Math.random() * collection.length);
  return collection[idx];
}