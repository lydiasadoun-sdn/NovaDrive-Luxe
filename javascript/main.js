document.addEventListener("DOMContentLoaded", () => {
    const catalogue = document.getElementById("catalogue");
    const boutonsFiltres = document.querySelectorAll(".btn-filtre");

    if (!catalogue) return;

    function afficherVoitures(filtre) {
        catalogue.innerHTML = "";

        const voituresFiltrees = voitures.filter(voiture => {
            if (filtre === "Toutes") return true;
            return voiture.categorie === filtre;
        });

        voituresFiltrees.forEach(voiture => {
            const prixFormate = voiture.prix.toLocaleString('fr-DZ');

            const carteHTML = `
                <div class="carte">
                    <img src="${voiture.image}" alt="${voiture.modele}" class="carte-img">
                    <div class="carte-info">
                        <span class="carte-tag">${voiture.categorie}</span>
                        <h3>${voiture.marque} ${voiture.modele}</h3>
                        <p class="carte-prix">${prixFormate} DZD</p>
                        <button class="btn-reserver" onclick="allerVersShowroom(${voiture.id})">Consulter</button>
                    </div>
                </div>
            `;
            catalogue.innerHTML += carteHTML;
        });
    }

    afficherVoitures("Toutes");

    boutonsFiltres.forEach(bouton => {
        bouton.addEventListener("click", () => {
            boutonsFiltres.forEach(b => b.classList.remove("actif"));
            bouton.classList.add("actif");
            const categorieChoisie = bouton.getAttribute("data-categorie");
            afficherVoitures(categorieChoisie);
        });
    });
});

function allerVersShowroom(id) {
    localStorage.setItem("voitureSelectionnee", id);
    window.location.href = "content/showroom.html";
}
document.addEventListener("DOMContentLoaded", () => {
    const userMenu = document.getElementById("user-menu");
    const estConnecte = localStorage.getItem("utilisateurConnecte");
    const nomUtilisateur = localStorage.getItem("userName") || "Client";

    if (userMenu) {
        if (estConnecte === 'true') {
            userMenu.innerHTML = `
                <a href="#" style="color: #00e5ff;"> ${nomUtilisateur}</a>
                <button onclick="deconnexion()" style="background:transparent; border:none; color:red; cursor:pointer; font-weight:bold;">Déconnexion</button>
            `;
        } else {
            userMenu.innerHTML = `
                <a href="content/auth.html" style="background:#00e5ff; color:#000; padding:5px 15px; border-radius:20px;">Se connecter</a>
            `;
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("profile-sidebar");
    const closeBtn = document.getElementById("close-sidebar");

    document.addEventListener('click', (event) => {
        if (event.target.closest('#profil')) {
            const estConnecte = localStorage.getItem("utilisateurConnecte");

            if (estConnecte === 'true') {
                const userName = localStorage.getItem("userName") || "Utilisateur";
                document.getElementById("user-info").innerHTML = `<h2 style="display:inline-block; margin:20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Bonjour, ${userName}</h2>`;
                sidebar.classList.add('active');
            } else {
                alert("Vous n'êtes pas connecté, connectez-vous");
            }
            return; 
        }

        
        const isCloseBtn = event.target === closeBtn;
        const clickedOutside = !sidebar.contains(event.target) && !event.target.closest('#profil');

        if (isCloseBtn || clickedOutside) {
            sidebar.classList.remove('active');
        }
    });
});

function deconnexion() {
    localStorage.removeItem("utilisateurConnecte"); 
    alert("Vous avez été déconnecté.");
    window.location.reload();
}