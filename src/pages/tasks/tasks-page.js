import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { SharedStyles } from '../../shared/styles/shared-styles.js';
import { GlobalActions } from '../../shared/styles/global-actions-styles.js';
import { ButtonStyles } from '../../shared/styles/button-styles.js';

import { PageViewElement } from '../../shared/components/page-view-element.js';
import '../../shared/components/card/generic-card.js';

import { store } from '../../store.js';

// We are lazy loading its reducer.

import {reducer, getAllTasks}  from './tasks-store.js';

store.addReducers({
  tasks: reducer
});
const defaultImg = 'images/banana-380.png';

class TasksPage extends connect(store)(PageViewElement) {
  constructor() {
    super();
    store.dispatch(getAllTasks());
  }
  _render({_tasks}) {
    return html`
      ${SharedStyles}
      ${ButtonStyles}
      ${GlobalActions}
      <style>
        ul {
          list-style-type: none;
          padding: 0 var(--app-distance-large);
        }

        li {
          margin-bottom: var(--app-distance-medium);
        }

        li:last-child {
          margin-bottom: 0;
        }

        .plus-sign {
          margin-top: -8px;
          display: inline-block;
          line-height: 64px;
        }
      </style>
      <section>
        <h2 class="page-title">Tasks</h2>
          <ul>
              ${_tasks.map(task => html`
                  <li>
                    <generic-card>
                      <h3 slot="title">${task.name}</h3>
                      <button slot="actions">edit</button>
                      <button slot="actions" class="negative">delete</button>
                    </generic-card>
                  </li>
              `)}
          </ul>
      </section>
      <div class="global-actions">
        <button class="fab xlarge">
          <span class="plus-sign">+</span>
        </button>
      </div>
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
