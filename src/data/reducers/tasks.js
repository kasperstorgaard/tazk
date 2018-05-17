import {
  TASKS_GET_ALL,
  TASKS_ADD,
  TASKS_ADD_ERROR,
  TASKS_DELETE,
  TASKS_UPDATE,
  TASKS_UPDATE_ERROR,
  TASKS_SELECT
} from '../actions/tasks.js';

function tasks (state = {items: [], errors: {}, selected: null}, action) {
  switch (action.type) {
    case TASKS_ADD:
    case TASKS_GET_ALL:
    case TASKS_UPDATE:
    case TASKS_DELETE:
      return {
        ...state,
        items: items(state.items, action)
      };
    case TASKS_ADD_ERROR:
    case TASKS_UPDATE_ERROR:
      return {
        ...state,
        errors: errors(state.errors, action)
      };
    case TASKS_SELECT:
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
    case TASKS_ADD:
      return [...state, action.task];
    case TASKS_GET_ALL:
      return action.tasks;
    case TASKS_UPDATE:
      return state.reduce((all, item) => {
        const nextItem = item.id === action.task.id ? action.task : item;
        return all.concat([nextItem]);
      }, []);
    case TASKS_DELETE:
      return state.filter(item => item.id !== action.task.id);
  }
}

function errors (state = {}, action) {
  switch (action.type) {
    case TASKS_ADD_ERROR:
      return {
        ...state,
        add: action.error
      };
    case TASKS_UPDATE_ERROR:
      return {
        ...state,
        update: action.error
      };
  }
}

export default tasks;