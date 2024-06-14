import { fetchUserData } from '../utils/api.js';
import { showProfile } from './profile.js';

export const showLoginForm = () => {
    const app = document.getElementById('app');
    app.innerHTML = /*html*/`
    <form id="loginForm">
      <input type="text" id="username" placeholder="Username or Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p id="error" style="color: red;"></p>
    </form>
  `;

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

const authenticate = async (username, password) => {
    const response = await fetch('https://learn.zone01dakar.sn/api/auth/signin', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
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
