import { html } from '@polymer/lit-element';

export const SharedStyles = html`
<style>
  :host {
    display: block;
    box-sizing: border-box;
  }

  section {
    padding: 24px;
  }

  section > * {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-primary-text-color);
  }

  @media (min-width: 460px) {
    h2 {
      font-size: 36px;
    }
  }

  .circle {
    display: block;
    width: 64px;
    height: 64px;
    margin: 0 auto;
    text-align: center;
    border-radius: 50%;
    background: var(--app-primary-color);
    color: var(--app-light-text-color);
    font-size: 30px;
    line-height: 64px;
  }
</style>
`;
