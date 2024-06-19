import { SetProfilUSer } from '../utils/pages.js';
import { showGraphs } from './graphs.js';

export const showProfile = (userData) => {
  SetProfilUSer(userData);

  handleLogout();
  showGraphs();
};

function handleLogout() {
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('jwt');
    location.reload();
  });
}