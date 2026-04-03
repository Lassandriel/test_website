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
setupCookieBanner();
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

// --- Cookie Banner & Analytics ---
function setupCookieBanner() {
    const consent = localStorage.getItem('cookieConsent');
    
    if (consent === 'all') {
        initAnalytics();
        return;
    } else if (consent === 'essential') {
        return; // Nur essenziell, kein Analytics laden
    }

    // Banner in den DOM einfügen, falls noch keine Auswahl getroffen wurde
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner glass-card entrance-animate';
    banner.innerHTML = `
        <div class="cookie-content">
            <h3 data-i18n="cookie_title">Cookie-Einstellungen</h3>
            <p data-i18n="cookie_text">Wir nutzen Cookies auf unserer Website...</p>
            <div class="cookie-links">
                <a href="imprint.html#imprint" data-i18n="imprint_link">Impressum</a> |
                <a href="imprint.html#privacy" data-i18n="privacy_link">Datenschutz</a>
            </div>
        </div>
        <div class="cookie-buttons">
            <button id="cookie-reject" class="btn btn-secondary" data-i18n="cookie_reject">Nur essenzielle</button>
            <button id="cookie-accept" class="btn" data-i18n="cookie_accept">Alle akzeptieren</button>
        </div>
    `;

    document.body.appendChild(banner);

    const closeBanner = (status: 'all' | 'essential') => {
        localStorage.setItem('cookieConsent', status);
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => banner.remove(), 400);
        if (status === 'all') initAnalytics();
    };

    document.getElementById('cookie-accept')?.addEventListener('click', () => closeBanner('all'));
    document.getElementById('cookie-reject')?.addEventListener('click', () => closeBanner('essential'));
}

function initAnalytics() {
    console.log("Analytics initialized (Consent granted).");
    // Hier das Google Analytics (GA4) Skript dynamisch einfügen
}

// --- FAQ Accordion ---
function setupFAQ() {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.faq-header');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const contentId = btn.getAttribute('aria-controls');
            const content = contentId ? document.getElementById(contentId) : null;

            // Close all others first
            buttons.forEach(other => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    const otherId = other.getAttribute('aria-controls');
                    const otherContent = otherId ? document.getElementById(otherId) : null;
                    if (otherContent) {
                        otherContent.style.maxHeight = '0px';
                        otherContent.style.opacity = '0';
                    }
                }
            });

            // Toggle current
            btn.setAttribute('aria-expanded', (!expanded).toString());
            if (content) {
                if (expanded) {
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                } else {
                    content.style.maxHeight = '300px';
                    content.style.opacity = '1';
                }
            }
        });
    });
}
setupFAQ();



// --- Easter Egg Logic ---
function setupEasterEgg() {
    // These emoji will fly across the screen when triggered
    const chickenEmojis = ['🐔', '🐣', '🐥', '🐤', '🦆', '🐧', '🐓', '🦅'];

    const triggerEasterEgg = () => {
        const emoji = document.createElement('span');
        emoji.className = 'easter-chicken';
        emoji.textContent = chickenEmojis[Math.floor(Math.random() * chickenEmojis.length)];
        emoji.style.fontSize = (Math.floor(Math.random() * 24) + 28) + 'px';
        emoji.style.top = Math.floor(Math.random() * 70) + 5 + '%';
        emoji.style.bottom = 'auto';

        // 50/50: go left-to-right or right-to-left
        if (Math.random() > 0.5) {
            emoji.style.left = '-80px';
            emoji.style.right = 'auto';
            emoji.style.animationName = 'chicken-run';
        } else {
            emoji.style.right = '-80px';
            emoji.style.left = 'auto';
            emoji.style.animationName = 'chicken-run-rtl';
        }

        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 9000);
    };

    // Only click/tap on the easter egg hint triggers it (desktop + mobile)
    document.querySelectorAll('.easter-hint-container').forEach(el => {
        el.addEventListener('click', () => {
            for (let i = 0; i < 10; i++) setTimeout(triggerEasterEgg, i * 200);
        });
        (el as HTMLElement).style.cursor = 'pointer';
    });
}
setupEasterEgg();


// --- Contact Form Logic ---
function setupContactForm() {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (!form) return;

    let successMsg = document.querySelector('.contact-success-msg') as HTMLElement;
    if (!successMsg) {
        successMsg = document.createElement('p');
        successMsg.className = 'contact-success-msg';
        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn?.insertAdjacentElement('afterend', successMsg);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (form.querySelector('#name') as HTMLInputElement).value.trim();
        const email = (form.querySelector('#email') as HTMLInputElement).value.trim();
        const message = (form.querySelector('#message') as HTMLTextAreaElement).value.trim();

        const subject = encodeURIComponent(`Nachricht von ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);
        const mailto = `mailto:contact@nhywyll.com?subject=${subject}&body=${body}`;

        window.location.href = mailto;

        const strings = translations[currentLanguage];
        successMsg.textContent = strings?.['contact_success'] ?? 'Message sent!';
        successMsg.style.display = 'block';
        form.reset();

        setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
    });
}
setupContactForm();