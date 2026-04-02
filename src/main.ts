import './styles.css';
import { translations } from './lang/index';

// Sprache festlegen
let currentLanguage = localStorage.getItem('language') || 'de';

// Die Funktion zum Texte austauschen
function updateTexts() {
    console.log("updateTexts läuft für:", currentLanguage);
    const strings = translations[currentLanguage];
    if (!strings) {
        console.error("Keine Texte für Sprache gefunden:", currentLanguage);
        return;
    }

    const elements = document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-placeholder]');
    
    elements.forEach(el => {
        const htmlEl = el as HTMLElement;
        // Wir prüfen die Attribute nacheinander
        const key = htmlEl.getAttribute('data-i18n') || 
                    htmlEl.getAttribute('data-i18n-html') || 
                    htmlEl.getAttribute('data-i18n-placeholder');

        if (key && strings[key]) {
            if (htmlEl.hasAttribute('data-i18n')) {
                htmlEl.textContent = strings[key];
            } else if (htmlEl.hasAttribute('data-i18n-html')) {
                htmlEl.innerHTML = strings[key];
            } else if (htmlEl.hasAttribute('data-i18n-placeholder')) {
                (htmlEl as HTMLInputElement).placeholder = strings[key];
            }
        }
    });

    document.documentElement.lang = currentLanguage;
    updateActiveButton();
}

// Buttons optisch aktualisieren
function updateActiveButton() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        const lang = (btn as HTMLElement).dataset.lang;
        if (lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 4. Event Listener für Buttons
function setupLanguageButtons() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = (btn as HTMLElement).dataset.lang;
            if (lang && lang !== currentLanguage) {
                currentLanguage = lang;
                localStorage.setItem('language', lang);
                updateTexts();
            }
        });
    });
}
// 6. Mobile Menü Logik
function setupNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
            menuToggle.classList.toggle('open');
            navUl.classList.toggle('open');
        });
    }
}

// Theme Toggle (Dark/Light Mode)
function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.classList.toggle('light-theme');
            const newTheme = isLight ? 'light' : 'dark';
            document.documentElement.dataset.theme = newTheme;
            localStorage.setItem('theme', newTheme);
            
            // Icon wechseln (optional, falls du das im alten Code hattest)
            themeToggle.textContent = isLight ? '☀️' : '🌙';
        });
    }
}

// Und die Aufrufe oben in den Start-Bereich (oder ans Ende der Datei) hinzufügen:
setupNavigation();
setupTheme();
// START (Vite führt das Script erst aus, wenn das DOM bereit ist, 
// daher brauchen wir hier oft kein DOMContentLoaded mehr)
updateTexts();
setupLanguageButtons();

// Global verfügbar machen für Notfälle
(window as any).setLanguage = (lang: string) => {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTexts();
};