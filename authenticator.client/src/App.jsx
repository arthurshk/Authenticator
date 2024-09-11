import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>,
    document.getElementById('root')
);
export default app;