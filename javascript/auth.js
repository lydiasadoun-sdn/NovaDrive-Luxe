document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const btnRegister = document.getElementById('btn-register');
    const btnLogin = document.getElementById('btn-login');
    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }
    if (btnRegister) {
        btnRegister.addEventListener('click', () => {
            const nom = document.getElementById('reg-nom').value;
            const email = document.getElementById('reg-email').value;
            const mdp = document.getElementById('reg-mdp').value;

            if (nom !== "" && email !== "" && mdp !== "") {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userMdp', mdp);
                localStorage.setItem('userName', nom);
                
                alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
                container.classList.remove("right-panel-active"); 
            } else {
                alert("Veuillez remplir tous les champs pour vous inscrire.");
            }
        });
    }
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            const email = document.getElementById('log-email').value;
            const mdp = document.getElementById('log-mdp').value;
            const savedEmail = localStorage.getItem('userEmail');
            const savedMdp = localStorage.getItem('userMdp');

            if (email === savedEmail && mdp === savedMdp && email !== null) {
                localStorage.setItem('utilisateurConnecte', 'true');
                alert("Connexion réussie ! Bienvenue sur NovaDrive Lux.");
                window.location.href = "../index.html"; 
            } else {
                alert("Email ou mot de passe incorrect. Avez-vous créé un compte ?");
            }
        });
    }
});