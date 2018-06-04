import { html } from '@polymer/lit-element';

export const SharedStyles = html`
<style>
  :host {
    display: block;
    box-sizing: border-box;
  }

  section {
    padding: var(--app-space-vertical-medium) var(--app-space-horizontal-medium);
  }

  section > * {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
  }

  h2 {
    font-size: var(--app-font-size-large);
    color: var(--app-primary-text-color);
  }

  h2, h3 {
    font-weight: 400;
  }

  .page-title {
    text-align: center;
  }

</style>
`;
