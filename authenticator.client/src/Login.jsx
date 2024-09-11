import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Login = () => {
    const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const fetchSecureData = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get('/api/secure', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching secure data:', error);
        }
    };

    return (
        <div>
            {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect()}>Log In</button>
            ) : (
                <div>
                    <button onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                    </button>
                    <button onClick={fetchSecureData}>Fetch Secure Data</button> 
                </div>
            )}
        </div>
    );
};

export default Login;
