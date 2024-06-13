import { showGraphs } from './graphs.js';

export const showProfile = (userData) => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Welcome, ${userData.login}</h1>
    <button id="logout">Logout</button>
    <div id="graphs"></div>
  `;
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('jwt');
    location.reload();
  });
  showGraphs();
};
