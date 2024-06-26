import { fetchUserData, showSlides } from '../utils/api.js';
import { loginPage } from '../utils/pages.js';
import { showProfile } from './profile.js';

export const showLoginForm = () => {
    const app = document.getElementById('app');
    app.innerHTML = loginPage
    showSlides();

    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const token = await authenticate(username, password);
            localStorage.setItem('jwt', token);
            const userData = await fetchUserData();
            showProfile(userData);
        } catch (err) {
            document.getElementById('error').textContent = 'Invalid credentials';
        }
    });
};

const encodeBase64 = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
};


const authenticate = async (username, password) => {
    const credentials = encodeBase64(`${username}:${password}`);
    const response = await fetch('https://learn.zone01dakar.sn/api/auth/signin', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + credentials,
            // 'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error('Authentication failed');
    }
};
