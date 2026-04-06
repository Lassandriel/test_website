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
setupPageTransitions();
setupEffects();
setupNavigation();
setupTheme();
setupCookieBanner();
updateTexts();
setupLanguageButtons();

// Global verfügbar machen für Notfälle
(window as any).setLanguage = (lang: string) => {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTexts();
};

// --- Smooth Page Transitions ---
function setupPageTransitions() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Wenn die Seite lädt, main mit page-enter Klasse versehen
    mainContent.classList.add('page-enter');

    // Nach der Animation die Klasse entfernen, um transform-Seiteneffekte (wie bei z-index oder fixed) zu vermeiden
    mainContent.addEventListener('animationend', (e) => {
        if (e.animationName === 'pageEnterAnim') {
            mainContent.classList.remove('page-enter');
        }
    });

    // Alle internen Links abfangen
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');

        if (!link || !link.href) return;

        const targetAttr = link.getAttribute('target');

        try {
            const url = new URL(link.href);

            // Nur bei Links auf derselben Domain, die nicht im neuen Tab öffnen
            if (url.origin === window.location.origin && targetAttr !== '_blank') {
                
                // Wenn der Link auf die exakt gleiche Seite zeigt (z.B. nur ein Anker wie #privacy)
                if (url.pathname === window.location.pathname) {
                    return; // Normales Scroll-Verhalten des Browsers zulassen
                }

                // Für "mailto:" oder "tel:" ignorieren (die URL origin ist dann anders oder es wirft Fehler, aber zur Sicherheit)
                if (link.getAttribute('href')?.startsWith('mailto:')) return;

                e.preventDefault();
                
                // Aktuelle Animationen entfernen, Exit-Animation starten
                mainContent.classList.remove('page-enter');
                mainContent.classList.add('page-exit');

                // Warten bis Animation fertig ist, dann weiterleiten
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500); // Entspricht der Dauer der pageExitAnim
            }
        } catch (err) {
            // Ignorieren falls URL ungültig ist
        }
    });
}

// --- Background Effects & Bird Tracks ---
function setupEffects() {
    // 1. Feather Particles Background
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-container';
    document.body.prepend(particlesContainer); // Ganz nach hinten

    const createFeather = () => {
        const feather = document.createElement('div');
        feather.className = 'feather-particle';
        
        // Zufällige Startposition, Größe und Animationsdauer
        const startPosX = Math.random() * 100; // 0 bis 100vw
        const size = Math.random() * 0.5 + 0.5; // 0.5 bis 1
        const duration = Math.random() * 10 + 10; // 10s bis 20s
        const delay = Math.random() * 5; // 0s bis 5s

        feather.style.left = `${startPosX}vw`;
        feather.style.transform = `scale(${size})`;
        feather.style.animationDuration = `${duration}s`;
        feather.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(feather);

        // Entfernen, wenn die Animation durch ist, um DOM-Müll zu vermeiden
        setTimeout(() => {
            feather.remove();
        }, (duration + delay) * 1000);
    };

    // Erzeuge periodisch neue Federn
    setInterval(createFeather, 800);

    // Initial ein paar Federn spawnen
    for (let i = 0; i < 15; i++) {
        createFeather();
    }

    // 2. Bird Track Click Effect
    document.addEventListener('click', (e) => {
        const track = document.createElement('div');
        track.className = 'bird-track';
        
        // Position genau unter der Maus
        track.style.left = `${e.clientX}px`;
        track.style.top = `${e.clientY}px`;
        
        // Leichte, zufällige Rotation für organischen Look
        const rotation = Math.random() * 40 - 20; // -20deg bis +20deg
        track.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
        
        // Die Animation überschreibt transform, also nutzen wir ein Wrapper-Element für die Rotation
        // Das bedeutet, der Wrapper rotiert, das Kind pulsiert/fadet
        // -> Um das in CSS beizubehalten, habe ich das scale() direkt hier in TS entfernt und belasse es im CSS
        
        // Besserer Fix: CSS-Variablen für die Rotation
        track.style.setProperty('--track-rot', `${rotation}deg`);

        document.body.appendChild(track);

        // Element nach der Animation entfernen (0.8s)
        setTimeout(() => {
            track.remove();
        }, 800);
    });
}

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
            <h3 data-i18n="cookie_title">cookie_title</h3>
            <p data-i18n="cookie_text">cookie_text</p>
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
        banner.style.transform = 'translateY(90%)';
        setTimeout(() => banner.remove(), 400);
        if (status === 'all') initAnalytics();
    };

    document.getElementById('cookie-accept')?.addEventListener('click', () => closeBanner('all'));
    document.getElementById('cookie-reject')?.addEventListener('click', () => closeBanner('essential'));
}

function initAnalytics() {
    console.log("Analytics initialized (Consent granted).");
    
    // Google Analytics (GA4) Skript dynamisch einfügen
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-R18WRP31XQ';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-R18WRP31XQ');
    `;
    document.head.appendChild(script2);
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

    // Toggle button switching
    const toggleBtns = form.querySelectorAll<HTMLButtonElement>('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (form.querySelector('#name') as HTMLInputElement).value.trim();
        const message = (form.querySelector('#message') as HTMLTextAreaElement).value.trim();
        const activeToggle = form.querySelector<HTMLButtonElement>('.toggle-btn.active');
        const inquiryType = activeToggle?.dataset.value ?? 'business';

        const strings = translations[currentLanguage];
        const subjectPrefix = strings?.['contact_subject_prefix'] ?? 'Message from';
        const recipient = inquiryType === 'fan' ? 'fan@nhywyll.com' : 'contact@nhywyll.com';

        const subject = encodeURIComponent(`${subjectPrefix} ${name}`);
        const body = encodeURIComponent(message);
        const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

        window.location.href = mailto;

        successMsg.textContent = strings?.['contact_success'] ?? 'Your mail program has been opened!';
        successMsg.style.display = 'block';
        form.reset();
        // Reset toggle back to Business
        toggleBtns.forEach((b, i) => b.classList.toggle('active', i === 0));

        setTimeout(() => { successMsg.style.display = 'none'; }, 7000);
    });
}
setupContactForm();