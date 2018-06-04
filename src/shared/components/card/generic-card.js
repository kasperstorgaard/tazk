import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

class GenericCard extends LitElement {
  _render() {
    return html`
      <style>
        :host {
          --card-background-color: var(--app-secondary-color);
          display: flex;
          flex-direction: column;
          justify-content: left;
          padding: 0 var(--app-space-horizontal-medium);

          background-color: var(--card-background-color);
          font-size: var(--app-font-size-base);
        }

        ::slotted(*) {
          margin-top: var(--app-space-vertical-medium);
        }

        .title::slotted(*) {
          margin-bottom: 0;
          color: var(--app-primary-text-color);
          text-align: left;
        }

        .content::slotted(*) {
          color: var(--app-primary-text-color);
        }

        .footer {
          display: flex;
          justify-content: left;
          margin-left: calc(-1 * var(--app-distance-small) / 2);
          margin-right: calc(-1 * var(--app-distance-small) / 2);
        }

        .actions::slotted(button) {
          margin-bottom: var(--app-space-vertical-medium);
          margin-left: calc(var(--app-distance-small) / 2);
          margin-right: calc(var(--app-distance-small) / 2);
        }

      </style>
      <div>
        <slot name="media" class="media">
        </slot>
        <slot name="title" class="title">
        </slot>
        <slot class="content">
        </slot>
        <div class="footer">
          <slot class="actions" name="actions">
          </slot>
        </div>
      </div>
    `;
  }

  static get properties() { return {
  }}
}

window.customElements.define('generic-card', GenericCard);
