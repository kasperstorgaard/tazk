import { html } from '@polymer/lit-element';

export const AppStyles = html`
  <style>
    :host {
      /* areas (consider moving) */
      --app-header-background-color: white;
      --app-header-text-color: var(--app-dark-text-color);
      --app-header-selected-color: var(--app-primary-color);

      --app-drawer-width: 256px;
      --app-drawer-background-color: var(--app-secondary-color);
      --app-drawer-text-color: var(--app-light-text-color);
      --app-drawer-selected-color: #78909C;
    }
  </style>
`;