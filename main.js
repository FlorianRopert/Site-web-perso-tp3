document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    const collapseDiv = this.closest('.collapse');
                    if (collapseDiv) {
                        const toggleButton = document.querySelector(`[data-bs-target="#${collapseDiv.id}"]`);
                        if (toggleButton && toggleButton.getAttribute('aria-expanded') === 'true') {
                            new bootstrap.Collapse(collapseDiv, { toggle: false }).hide();
                        }
                    }
                }
            }
        });
    });

    const elementsToAnimate = document.querySelectorAll(
        '.p-5.mb-4.rounded-3.jumbotron-color, .h-100.p-5.rounded-3.dark-card-color, .h-100.p-5.border.rounded-3.light-card-color'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });


    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
});
document.addEventListener("DOMContentLoaded", function () {

    // Classes CSS à manipuler
    const HIGHLIGHT_CLASS = 'highlighted-section';
    const SCROLL_DURATION_MS = 600;

    // NOUVELLE VARIABLE : Durée en millisecondes pendant laquelle l'ombre restera visible (2.5 secondes)
    const HIGHLIGHT_DURATION_MS = 2500;


    // 1. Gérer l'animation du scroll-reveal (code inchangé)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.p-5, .h-100').forEach(el => {
        if (!el.classList.contains('flex-shrink-0') && !el.classList.contains('d-flex')) {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        }
    });

    // 2. Gérer la mise en évidence de la section de contenu
    const navLinks = document.querySelectorAll('.btn-toggle-nav a');
    const contentSections = document.querySelectorAll('.flex-grow-1 > div');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // A. Retirer la mise en évidence de toutes les autres sections
                contentSections.forEach(section => section.classList.remove(HIGHLIGHT_CLASS));

                // B. Appliquer la mise en évidence à la section ciblée
                targetSection.classList.add(HIGHLIGHT_CLASS);

                // C. Défilement fluide vers la section
                window.scroll({
                    top: targetSection.offsetTop - 30,
                    behavior: 'smooth'
                });

                // D. MODIFICATION : Utilisation de la nouvelle durée pour retirer l'effet
                setTimeout(() => {
                    targetSection.classList.remove(HIGHLIGHT_CLASS);
                }, HIGHLIGHT_DURATION_MS);

                // Optionnel: Maintenir l'ouverture/fermeture du menu parent
                let parentCollapse = this.closest('.collapse');
                if (parentCollapse && !parentCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(parentCollapse, { toggle: true });
                }
            }
        });
    });

    // 3. Gestion de l'état initial au chargement (Mise à jour pour inclure la mise en évidence)
    const currentHash = window.location.hash;
    if (currentHash) {
        const initialLink = document.querySelector(`.btn-toggle-nav a[href="${currentHash}"]`);
        if (initialLink) {
            const initialSection = document.querySelector(currentHash);

            // Applique la mise en évidence au chargement si un hash est présent
            if (initialSection) {
                initialSection.classList.add(HIGHLIGHT_CLASS);
                // MODIFICATION : Utilisation de la nouvelle durée pour retirer l'effet
                setTimeout(() => {
                    initialSection.classList.remove(HIGHLIGHT_CLASS);
                }, HIGHLIGHT_DURATION_MS);
            }

            // S'assurer que le menu parent est bien ouvert
            let parentCollapse = initialLink.closest('.collapse');
            if (parentCollapse && !parentCollapse.classList.contains('show')) {
                new bootstrap.Collapse(parentCollapse, { toggle: true });
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('mainHeader');

    // --- Événement Principal (FK Sapinera) ---
    const fkSapineraButton = document.getElementById('toggleRulesButton');
    const fkSapineraRulesContainer = document.getElementById('sapineraRulesContainer');

    // --- Ancien Host 1 (Taupe Gun UHC) ---
    const tgButton = document.getElementById('toggleTaupeGunRulesButton');
    const tgRulesContainer = document.getElementById('taupeGunRulesContainer');

    // --- Ancien Host 2 (FK Kukulkan) ---
    const kukulkanButton = document.getElementById('toggleKukulkanRulesButton');
    const kukulkanRulesContainer = document.getElementById('kukulkanRulesContainer');


    // --- Fonction Générique de Bascule des Règles ---
    function toggleRules(button, container, defaultText, activeText) {
        if (button && container) {
            button.addEventListener('click', function () {
                if (container.style.display === 'none') {
                    container.style.display = 'block'; // Affiche le conteneur
                    button.textContent = activeText;
                    // Défile vers les règles affichées
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    container.style.display = 'none'; // Masque le conteneur
                    button.textContent = defaultText;
                }
            });
        }
    }

    // --- Script de défilement (Header) ---
    function checkScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Vérifie au chargement

    // --- Activation des Bascules de Règles ---
    const fkSapineraDefaultText = 'Voir les Règles Détaillées FK';
    const fkSapineraActiveText = 'Masquer les Règles Détaillées FK';
    const fkGenericDefaultText = 'Voir les Règles';
    const fkGenericActiveText = 'Masquer les Règles';

    // FK Sapinera (En haut de page)
    toggleRules(fkSapineraButton, fkSapineraRulesContainer, fkSapineraDefaultText, fkSapineraActiveText);

    // Taupe Gun
    toggleRules(tgButton, tgRulesContainer, fkGenericDefaultText, fkGenericActiveText);

    // FK Kukulkan (Ancien Host)
    toggleRules(kukulkanButton, kukulkanRulesContainer, fkGenericDefaultText, fkGenericActiveText);

});