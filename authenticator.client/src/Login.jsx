import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Login = () => {
    const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const fetchSecureData = async () => {
        try {
            const token = await getAccessTokenSilently(); //get the url from the asp.net backend
            const response = await axios.get('/api/Auth/secure', {
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
                <button style={{ width: "30%", position: "relative", left: "42.5%" }} onClick={() => loginWithRedirect()}>Log In</button>
            ) : ( //if logged in display the logged in screen 
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
