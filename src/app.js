import { showLoginForm } from './components/loginForm.js';
import { showProfile } from './components/profile.js';
import { fetchUserData } from './utils/api.js';

const app = document.getElementById('app');

const isAuthenticated = () => {
  let jwt = localStorage.getItem('jwt');
  return jwt !== null && jwt !== "undefined"
};

const init = async () => {
  const userData = await fetchUserData();
  if (isAuthenticated()&&userData!==undefined) {
    showProfile(userData);
  } else {
    showLoginForm();
  }
};

init();
