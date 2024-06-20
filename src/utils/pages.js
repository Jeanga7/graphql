export { loginPage, SetProfilUSer, showUserPage }

const loginPage = /*html*/`
<div class="container">
    <form id="loginForm" class="login-form">
        <h1>Welcome</h1>
        <span id="line"></span>
        <h4>GraphQL</h4>
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
`

function showUserPage(userData) {
    const app = document.getElementById('app');
    console.log(userData[0].attrs.gender);

    app.innerHTML = /* html */`
    <div id="main-container">
        <div id="menu-section">
            <div id="home" class="btn-menu"></div>
            <div id="pool" class="btn-menu"></div>
            <div id="cursus" class="btn-menu"></div>
            <div id="graph" class="btn-menu"></div>
            <div id="groups" class="btn-menu"></div>
            <div id="school" class="btn-menu"></div>
            <div id="logout" class="btn-menu"></div>
        </div>
        <div id="main-section">
            <div id="header-bar-container">
                <div id="header-first-part">
                    <div id="titre-date-container">
                        <div id="titre">GraphQL Dashboard</div>
                        <div id="date"></div>
                    </div>
                    <div id="dark-mode-toggle">
                        <div id="light-mode"></div>
                        <div id="dark-mode"></div>
                    </div>
                </div>
                <div id="header-bar">
                <div id="photo-user-hearder"></div>
                    <div id="welcome-text">
                        <span id="wecome-user">Welcome, Mr. &nbsp;<strong>${userData[0].attrs.lastName}</strong>.&nbsp;</span>
                        <span id="text">Découvrez une nouvelle façon de visualiser vos progrès et accomplissements .</span>
                    </div>
                </div>
            </div>
            <div id="graph-section"></div>
        </div>
        <div id="profile-section"></div>
    </div>
    `;

    if (userData[0].attrs.gender === 'Feminin') {
        document.getElementById('photo-user-hearder').classList.add('profile-feminin');
    } else {
        document.getElementById('photo-user-hearder').classList.add('profile-masculin');
    }

    function getCurrentDateFormatted() {
        const currentDate = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-GB', options);
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    document.getElementById('date').textContent = getCurrentDateFormatted();
}

function SetProfilUSer(userData) {
    const app = document.getElementById('app');
    app.innerHTML = /* html */ `
      <h1>Welcome, ${userData[0].login}</h1>
      <button id="logout">Logout</button>
      <div id="graphs"></div>
    `;
}