import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';

import config from '../auth_config.json';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Auth0Provider
            domain={config.domain}
            clientId={config.clientId}
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
    </StrictMode>
);
