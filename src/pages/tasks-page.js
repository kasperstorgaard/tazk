import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { SharedStyles } from '../components/shared-styles.js';
import { PageViewElement } from '../components/page-view-element.js';

import { store } from '../store.js';

// We are lazy loading its reducer.
import tasks from '../data/reducers/tasks.js';
import {getAllTasks}  from '../data/actions/tasks.js';

store.addReducers({
  tasks
});

class TasksPage extends connect(store)(PageViewElement) {
  constructor() {
    super();
    store.dispatch(getAllTasks());
  }
  _render({_tasks}) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Tasks</h2>
        <ul>
            ${_tasks.map(task => html`
                <li>${task.name}</li>
            `)}
        </ul>
      </section>
    `;
  }

  static get properties() { return {
    _tasks: Array
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._tasks = state.tasks.items;
  }
}

window.customElements.define('tasks-page', TasksPage);
