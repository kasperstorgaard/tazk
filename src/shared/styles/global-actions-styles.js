import { html } from '@polymer/lit-element';

export const GlobalActions = html`
    <style>
        .global-actions {
            position: fixed;
            display: flex;
            width: 100vw;
            justify-content: center;
            bottom: var(--app-distance-medium);
            z-index: var(--app-z-index-global-cta);
        }

        .global-actions button {
            box-shadow: 0 0 8px rgba(0,0,0,0.3);
        }
    </style>
`;
