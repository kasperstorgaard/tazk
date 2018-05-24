import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { SharedStyles } from '../../shared/styles/shared-styles.js';
import { PageViewElement } from '../../shared/components/page-view-element.js';

import { store } from '../../store.js';

class HomePage extends connect(store)(PageViewElement) {
  _render({_rewards}) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Home</h2>
      </section>
    `;
  }

  static get properties() { return {
  }}

  _stateChanged(state) {
  }
}

window.customElements.define('home-page', HomePage);
