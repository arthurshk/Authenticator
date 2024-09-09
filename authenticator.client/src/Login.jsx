import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect } from 'react';

const Login = () => {
    const handleLoginSuccess = async (response) => {
        const { credential } = response;
        try {
            const res = await axios.post('/api/auth/google-login', { token: credential });
            localStorage.setItem('token', res.data.token);
            console.log("Login successful, token saved.");
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const fetchProtectedData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found, please log in.');
            return;
        }

        try {
            const res = await axios.get('/api/protected', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Protected data:", res.data);
        } catch (error) {
            console.error('Error fetching protected data', error);
        }
    };

    useEffect(() => {
        fetchProtectedData();
    }, []);

    return (
        <GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID">
            <div>
                <h1>Login with Google</h1>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => console.log('Login Failed')}
                />
                <button onClick={fetchProtectedData}>
                    Fetch Protected Data
                </button>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
