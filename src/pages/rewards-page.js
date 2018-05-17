import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { SharedStyles } from '../components/shared-styles.js';
import { PageViewElement } from '../components/page-view-element.js';

import { store } from '../store.js';

import {reducer, getAllRewards, addReward}  from '../stores/rewards/rewards.js';

store.addReducers({
  rewards: reducer
});

class RewardsPage extends connect(store)(PageViewElement) {
  constructor() {
    super();
    store.dispatch(getAllRewards());
  }
  _render({_rewards}) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Rewards</h2>
        <ul>
            ${_rewards.map(reward => html`
                <li>${reward.name}</li>
            `)}
        </ul>
      </section>
    `;
  }

  static get properties() { return {
    _rewards: Array
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._rewards = state.rewards.items;
  }
}

window.customElements.define('rewards-page', RewardsPage);
