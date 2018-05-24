import { html } from '@polymer/lit-element';

export const appProperties = html`
  <style>
    :host {
      --app-drawer-width: 256px;
      display: block;

      --app-primary-color: rgba(41, 171, 135, 1);
      --app-accent-color: rgba(220, 237, 49, 1);
      --app-secondary-color: rgba(54, 53, 55, 1);
      --app-tertiary-color: rgba(239, 45, 86, 1);
      --app-another-color: rgba(237, 125, 58, 1);

      --app-primary-text-color: white;
      --app-secondary-text-color: var(--app-secondary-color);

      --app-header-background-color: white;
      --app-header-text-color: var(--app-dark-text-color);
      --app-header-selected-color: var(--app-primary-color);

      --app-drawer-background-color: var(--app-secondary-color);
      --app-drawer-text-color: var(--app-light-text-color);
      --app-drawer-selected-color: #78909C;
    }
  </style>
`;