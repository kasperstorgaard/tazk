import { html } from "@polymer/lit-element";

export const NavigationStyles = html`
  <style>
    .toolbar-list {
      display: none;
    }

    .toolbar-list > a {
      display: inline-block;
      color: var(--app-header-text-color);
      text-decoration: none;
      line-height: 30px;
      padding: 4px 24px;
    }

    .toolbar-list > a[selected] {
      color: var(--app-header-selected-color);
      border-bottom: 4px solid var(--app-header-selected-color);
    }

    .menu-btn {
      background: none;
      border: none;
      fill: var(--app-header-text-color);
      cursor: pointer;
      height: 44px;
      width: 44px;
    }

    app-drawer {
      z-index: var(--app-z-index-menu);
    }

    .drawer-list {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 24px;
      background: var(--app-drawer-background-color);
      position: relative;
    }

    .drawer-list > a {
      display: block;
      text-decoration: none;
      color: var(--app-drawer-text-color);
      line-height: 40px;
      padding: 0 24px;
    }

    .drawer-list > a[selected] {
      color: var(--app-drawer-selected-color);
    }

    .toolbar-list {
      display: none;
    }

    .toolbar-list > a {
      display: inline-block;
      color: var(--app-header-text-color);
      text-decoration: none;
      line-height: 30px;
      padding: 4px 24px;
    }

    .toolbar-list > a[selected] {
      color: var(--app-header-selected-color);
      border-bottom: 4px solid var(--app-header-selected-color);
    }

    .menu-btn {
      background: none;
      border: none;
      fill: var(--app-header-text-color);
      cursor: pointer;
      height: 44px;
      width: 44px;
    }

    .drawer-list {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 24px;
      background: var(--app-drawer-background-color);
      position: relative;
    }

    .drawer-list > a {
      display: block;
      text-decoration: none;
      color: var(--app-drawer-text-color);
      line-height: 40px;
      padding: 0 24px;
    }

    .drawer-list > a[selected] {
      color: var(--app-drawer-selected-color);
    }

    .bottom-bar {
      position: fixed;
      bottom: 0;
      height: calc(var(--app-size-unit) * 8 + var(--app-distance-medium));
      width: 100%;
      background: var(--app-secondary-color);
    }
  </style>
`;