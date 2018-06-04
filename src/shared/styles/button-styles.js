import { html } from '@polymer/lit-element';

export const ButtonStyles = html`
<style>
  button {
    padding: var(--app-space-vertical-small) var(--app-space-horizontal-medium);

    background: var(--app-primary-color-info);

    color: var(--app-secondary-text-color);
    font-size: var(--app-font-size-medium);

    outline: none;
    border: none;
  }

  button.negative {
    background: var(--app-primary-color-negative);
  }

  button.fab {
    box-sizing: border-box;
    bottom: var(--app-distance-large);
    width: calc(var(--app-size-unit) * 6);
    height: calc(var(--app-size-unit) * 6);
    padding: 0;
    border-radius: 50%;
  }

  button.fab.large {
    width: calc(var(--app-size-unit) * 12);
    height: calc(var(--app-size-unit) * 12);
    font-size: var(--app-font-size-large);
  }

  button.fab.xlarge {
    width: calc(var(--app-size-unit) * 16);
    height: calc(var(--app-size-unit) * 16);
    font-size: var(--app-font-size-xlarge);
  }

  button.fab + button.fab {
    margin-left: var(--app-distance-medium);
  }
</style>
`;
