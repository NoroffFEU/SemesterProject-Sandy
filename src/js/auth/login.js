import { API_KEY } from "../../../services/api/apiKey.js";

export async function login({email, password}) {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        if (response.ok) {
            const body = await response.json();
            const { accessToken: token, ...user } = body.data;

            console.log(token);
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return body.data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unable to login');
        }
    } catch (error) {
        console.error(error);
    }
    throw new Error('Login failed :(');
};