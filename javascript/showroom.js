document.addEventListener("DOMContentLoaded", () => {
    const idVoiture = localStorage.getItem("voitureSelectionnee");
    const voiture = voitures.find(v => v.id == idVoiture);

    if (voiture) {
        document.getElementById("car-title").innerText = `${voiture.marque} ${voiture.modele}`;
        document.getElementById("car-price").innerText = `${voiture.prix.toLocaleString('fr-DZ')} DZD`;
        
        const carousel = document.getElementById("carousel");
        if (carousel) {
            carousel.innerHTML = `
                <div class="slide">
                    <img src="../${voiture.image}" alt="${voiture.modele}" style="width:100%; max-height:500px; object-fit:cover; border-radius: 15px;">
                </div>
            `;
        }

        const estReservee = Math.random() > 0.8; 
        const statut = estReservee ? "<span style='color: #ff3333;'>🔴 Déjà Réservée</span>" : "<span style='color: #00ffcc;'>🟢 Disponible</span>";
    
        const descriptionEl = document.getElementById("car-desc");
        if (descriptionEl) {
            descriptionEl.innerHTML = `
                <strong>Statut :</strong> ${statut} <br><br>
                Ce véhicule de catégorie <strong>${voiture.categorie}</strong> représente l'excellence automobile. 
                Profitez d'une expérience de conduite unique avec la <strong>${voiture.marque} ${voiture.modele}</strong>.
            `;
        }
        const btnReserver = document.querySelector(".btn-reserver");
        if (estReservee && btnReserver) {
            btnReserver.innerText = "Véhicule Indisponible";
            btnReserver.style.background = "#333";
            btnReserver.style.color = "#888";
            btnReserver.disabled = true;
        }
    }

    window.gererReservation = function() {
        const estConnecte = localStorage.getItem("utilisateurConnecte");
        if (!estConnecte || estConnecte !== 'true') {
            alert("Vous devez être connecté pour réserver un véhicule.");
            window.location.href = "auth.html"; 
        else {
            const acompte = voiture.prix * 0.10;
            alert(`Réservation confirmée ! Un acompte de ${acompte.toLocaleString('fr-DZ')} DZD sera prélevé.`);
        } 
        }
    };
});






