import { showUserPage } from '../utils/pages.js';

export const showProfile = (userData) => {
  showUserPage(userData)

  handleLogout();
};

function handleLogout() {
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('jwt');
    location.reload();
  });
}