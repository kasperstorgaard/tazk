import { LitElement, html } from '@polymer/lit-element';

export const navFactory = (items, navClass) => (page) => html`
    <nav class="${navClass}">
    ${items.map(item => html`
        <a selected?="${page === item.key}" href="/${item.url}">${item.name}</a>
    `)}
    </nav>
`;