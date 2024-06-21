export { loginPage, showUserPage };

const loginPage = /*html*/ `
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
`;

function showUserPage(data) {
    const app = document.getElementById("app");

    app.innerHTML = /* html */ `
    <div id="main-container">
        ${createMenuSection()}
        <div id="main-section">
            ${createHeaderBar(data.user)}
            ${createGraphSection()}
        </div>
        ${createProfileSection(data)}
    </div>
    `;

    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    setGender(data.user[0].attrs.gender);

    setNationality(data.user[0].attrs.nationality1.toLowerCase());

    document.getElementById("date").textContent = getCurrentDateFormatted();
}

function createMenuSection() {
    return /* html */ `
    <div id="menu-section">
        <div id="home" class="btn-menu"></div>
        <div id="pool" class="btn-menu"></div>
        <div id="cursus" class="btn-menu"></div>
        <div id="graph" class="btn-menu"></div>
        <div id="groups" class="btn-menu"></div>
        <div id="school" class="btn-menu"></div>
        <div id="logout" class="btn-menu"></div>
    </div>`;
}

function createHeaderBar(userData) {
    let title = userData[0].attrs.gender == 'Masculin' ? 'Mr' : 'Mme';

    return /* html */`
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
                <span id="wecome-user">Welcome, ${title} &nbsp;<strong>${userData[0].attrs.lastName}</strong>.&nbsp;</span>
                <span id="text">Découvrez une nouvelle façon de visualiser vos progrès et accomplissements .</span>
            </div>
        </div>
    </div>`;
}

function createGraphSection() {
    return /* html */`
    <div id="graph-section-container">
        <div id="graph-info">
            <div id="graph-title">SKILLS GRAPH</div>
            <div id="infos">ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius magni dicta eveniet aliquid velit tempora sunt, omnis sapiente assumenda labore amet ratione et ullam reprehenderit, perspiciatis veniam explicabo libero cumque.</div>
        </div>
        <div id="graph-section"></div>
    </div>`;
}

function createProfileSection(data) {
    return /* html */`
    <div id="profile-section">
        <div id="profile-card-container">
            <div id="first-part-profile">
                <div id="id-profile-container">
                    <div id="username-container">
                        <div id="firstname">${data.user[0].attrs.firstName}</div>
                        <div id="lastname">${data.user[0].attrs.lastName}</div>
                    </div>
                    <div id="photo-prolile-container">
                        <div id="cercle-photo"></div>
                        <div id="photo-profile"></div>
                        <div id="user-drapeau"></div>
                    </div>
                </div>
                <div id="current-rank">Recuperer Rank</div>
            </div>
            <div id="second-part-profile">
                <div id="total-xp-container">
                    <div id="xp-title">Total XP</div>
                    <div id="xp-bloc">
                        <div id="xp-icon"></div>
                        <div id="xp-value">${formatAmount(data.transaction_aggregate.aggregate.sum.amount)}</div>
                    </div>
                </div>
                <div id="level-container">
                    <div id="level-title">Level</div>
                    <div id="level-bloc">
                        <div id="level-icon"></div>
                        <div id="level-value">${data.event_user[0].level}</div>
                    </div>
                </div>
                <div id="ratio-container">
                    <div id="ratio-title">Ratio</div>
                    <div id="ratio-bloc">
                        <div id="ratio-icon"></div>
                        <div id="ratio-value">${Number(data.user[0].auditRatio).toFixed(1)}</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="xp-board-container">
            <div id="xp-board-title">XP Board</div>
            <div id="xp-board-graph"></div>
        </div>
    </div>`;
}

function formatAmount(amount) {
    let amountInKB = amount / 1000;
    let displayAmount = amountInKB;
    let displayUnit = 'KB';
    
    if (amountInKB > 1000) {
        displayAmount = amountInKB / 1000;
        displayUnit = 'MB';
        displayAmount = Math.floor(displayAmount * 100) / 100;
    }

    return `${displayAmount} ${displayUnit}`;
}

function setGender(gender) {
    if (gender === "Féminin") {
        document
            .getElementById("photo-user-hearder")
            .classList.add("profile-feminin");
        document.getElementById("photo-profile").classList.add("profile-feminin2");
    } else {
        document
            .getElementById("photo-user-hearder")
            .classList.add("profile-masculin");
        document.getElementById("photo-profile").classList.add("profile-masculin2");
    }
}

function getCurrentDateFormatted() {
    const currentDate = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    const formattedDate = currentDate.toLocaleDateString("en-GB", options);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

function setNationality(nationality) {
    switch (nationality) {
        case "senegal":
            document.getElementById("user-drapeau").classList.add("drapeau-sn");
            break;
        case "mali":
            document.getElementById("user-drapeau").classList.add("drapeau-mali");
            break;
        case "guinea":
            document.getElementById("user-drapeau").classList.add("drapeau-guinee");
            break;
        case "guinea bissau":
            document.getElementById("user-drapeau").classList.add("drapeau-guinee-bissau");
            break;
        case "congo":
            document.getElementById("user-drapeau").classList.add("drapeau-congo");
            break;
        case "benin":
            document.getElementById("user-drapeau").classList.add("drapeau-benin");
            break;
        default:
            document.getElementById("user-drapeau").classList.add("drapeau-internationale");
            break;
    }
}


