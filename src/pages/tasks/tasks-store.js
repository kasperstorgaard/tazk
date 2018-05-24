import {getAll, updateItem, addItem, getItem, deleteItem} from '../../api.js';

export const ADD = 'tazk/tasks/ADD';
export const DELETE = 'tazk/tasks/DELETE';
export const UPDATE = 'tazk/tasks/UPDATE';
export const ADD_ERROR = 'tazk/tasks/ADD_ERROR';
export const UPDATE_ERROR = 'tazk/tasks/UPDATE_ERROR';
export const GET = 'tazk/tasks/GET';
export const GET_ALL = 'tazk/tasks/GET_ALL';
export const SELECT = 'tazk/tasks/SELECT';

export const getAllTasks = () => async (dispatch, getState) => {
  const tasks = await getAll('tasks');

  dispatch({
    type: GET_ALL,
    tasks
  });
};

export const addTask = (task) => async (dispatch, getState) => {
  let id;
  try {
    id = await addItem('tasks', task);
  } catch (error) {
    dispatch({
      type: ADD_ERROR,
      error
    });
    return;
  }

  dispatch({
    type: ADD,
    task: {...task, id}
  });
};

export const updateTask = (task) => async (dispatch) => {
  try {
    await updateItem('tasks', task);
  } catch (error) {
    dispatch({
      type: UPDATE_ERROR,
      error
    });
    return;
  }

  dispatch({
    type: UPDATE,
    task
  });
};

export const deleteTask = (task) => async (dispatch) => {
  await deleteItem('tasks', task.id);
  
  dispatch({
    type: GET_ALL,
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
    type: SELECT,
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
        selected: action.task
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
      return [...state, action.task];
    case GET_ALL:
      return action.tasks;
    case UPDATE:
      return state.reduce((all, item) => {
        const nextItem = item.id === action.task.id ? action.task : item;
        return all.concat([nextItem]);
      }, []);
    case DELETE:
      return state.filter(item => item.id !== action.task.id);
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