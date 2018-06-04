import { LitElement, html } from '@polymer/lit-element';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { navigate, updateOffline, updateDrawerState, updateLayout } from './shared/stores/app/app-store.js';

import { menuIcon } from './shared/components/icons.js';
import './shared/components/snack-bar.js';
import { navFactory } from './shared/components/nav.js';

import { NavigationStyles } from './shared/styles/navigation-styles.js';

import { AppStyles } from './app-styles.js';
import { store } from './store.js';

const navItems = [{
  key: 'home',
  name: 'Home',
  url: ''
}, {
  key: 'tasks',
  name: 'Tasks',
  url: 'tasks'
}, {
  key: 'rewards',
  name: 'Rewards',
  url: 'rewards'
}];

const navToolbar = navFactory(navItems, 'toolbar-list');
const navDrawer = navFactory(navItems, 'drawer-list');

class TazkApp extends connect(store)(LitElement) {
  _render({appTitle, _page, _drawerOpened, _snackbarOpened, _offline}) {

    // Anything that's related to rendering should be done in here.
    return html`
    ${AppStyles}
    ${NavigationStyles}
    <style>

      :host {
        display: block;
        background: var(--app-primary-color);
      }

      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
      }

      .toolbar-top {
        background-color: var(--app-header-background-color);
      }

      [main-title] {
        font-family: 'Pacifico';
        text-transform: lowercase;
        font-size: 30px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }

      .main-content {
        padding-top: 64px;
        min-height: 100vh;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }
    </style>

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn"
          title="Menu"
          on-click="${_ => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
        <div main-title>${appTitle}</div>
      </app-toolbar>

      <!-- This gets hidden on a small screen-->
      ${navToolbar(_page)}
    </app-header>

    <!-- Drawer content -->
    <app-drawer opened="${_drawerOpened}"
        on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
      ${navDrawer(_page)}
    </app-drawer>

    <!-- Main content -->
    <main class="main-content">
      <home-page class="page" active?="${_page === 'home'}"></home-page>
      <rewards-page class="page" active?="${_page === 'rewards'}"></rewards-page>
      <tasks-page class="page" active?="${_page === 'tasks'}"></tasks-page>
      <not-found-page class="page" active?="${_page === '404'}"></not-found-page>
    </main>

    <div class="bottom-bar">
    </div>

    <snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.</snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _offline: Boolean
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => {
      const target = window.decodeURIComponent(location.pathname);
      store.dispatch(navigate(target));
    });

    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));

    installMediaQueryWatcher(`(min-width: 460px)`, (matches) => {
      store.dispatch(updateLayout(matches));
    });
  }
  
  _didRender(properties, changeList) {
    if ('_page' in changeList) {
      const pageTitle = properties.appTitle + ' - ' + changeList._page;

      updateMetadata({
          title: pageTitle,
          description: pageTitle
          // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('tazk-app', TazkApp);
