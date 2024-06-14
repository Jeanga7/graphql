import { fetchUserData } from '../utils/api.js';
import { showProfile } from './profile.js';

export const showLoginForm = () => {
    const app = document.getElementById('app');
    app.innerHTML = /*html*/`
   
    <div class="container">
        <form id="loginForm" class="login-form">
            <h2>Login</h2>
            <div class="input-group">
                <input type="text" id="username" placeholder="Username or Email" required />
            </div>
            <div class="input-group">
                <input type="password" id="password" placeholder="Password" required />
            </div>
            <button type="submit" class="login-button">Login</button>
            <p id="error" class="error-message"></p>
        </form>

        <div class="slideshow-container">
            <div class="mySlides fade">
                <div class="card">
                    <h3>Bienvenue</h3>
                    <p>Découvrez une nouvelle façon de visualiser vos progrès et accomplissements. Connectez-vous pour
                        accéder à votre profil personnalisé, consulter vos statistiques et suivre votre parcours
                        éducatif avec des graphiques interactifs.</p>
                </div>
            </div>

            <div class="mySlides fade">
                <div class="card">
                    <h3>À propos de notre plateforme</h3>
                    <p>Notre plateforme utilise GraphQL pour vous fournir des données précises et en temps réel. Grâce à
                        une interface utilisateur intuitive et des graphiques détaillés, vous pouvez facilement suivre
                        votre XP, vos projets, et bien plus encore.</p>
                </div>
            </div>

            <div class="mySlides fade">
                <div class="card">
                    <h3>Fonctionnalités</h3>
                    <ul>
                        <li>Suivi de l'XP et des projets</li>
                        <li>Graphiques interactifs et animés</li>
                        <li>Statistiques détaillées et personnalisées</li>
                        <li>Interface utilisateur intuitive et conviviale</li>
                    </ul>
                </div>
            </div>

            <div class="mySlides fade">
                <div class="card">
                    <h3>Sécurité</h3>
                    <p>Nous prenons la sécurité de vos données très au sérieux. Votre connexion est protégée par un
                        système d'authentification robuste utilisant des jetons JWT. Vos informations personnelles
                        restent confidentielles et sécurisées.</p>
                </div>
            </div>

            <div class="mySlides fade">
                <div class="card">
                    <h3>Rejoignez-nous</h3>
                    <p>Si vous n'avez pas encore de compte, inscrivez-vous dès maintenant pour bénéficier de toutes les
                        fonctionnalités de notre plateforme. Rejoignez notre communauté d'apprenants et suivez votre
                        progression en temps réel.</p>
                </div>
            </div>
        </div>
    </div>
`;

    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("mySlides");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 5000);
    }



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
