# 🌌 Nhywyll | Premium VTuber & Streamer Portfolio

**Live:** [nhywyll.com](https://nhywyll.com) | **Test/Staging:** [test.nhywyll.com](https://test.nhywyll.com)

Welcome to the official source code for **Nhywyll's Digital Home**. This project is a high-performance, **Cyber-Anime themed hub** designed for VTubers and Content Creators, blending cutting-edge aesthetics with technical excellence.

## 🚀 Key Features

### 🎨 Visual & UX Excellence
- **Glassmorphism Design**: A cohesive UI system using modern translucent layers and neon glow accents.
- **Performance Optimized**: 100/100 Lighthouse focus (LCP priority, CLS prevention via explicit image dimensions, and optimized lazy-loading).
- **Accessibility (A11y)**: Fully semantic HTML5, ARIA labels, and keyboard-friendly navigation.
- **Micro-Interactions**: Smooth hover states, bird-track click effects, and feather particle backgrounds.

### 🌍 Global Presence
- **Multilingual (i18n)**: Instant client-side switching between **English** and **German** with persistent state.
- **Privacy First**: GDPR-compliant cookie management; Google Analytics only loads after explicit consent.

---

## 📁 Project Structure

```text
test_website/
├── scripts/                # Deployment Automation
│   └── deploy-prod.js       # One-click production script
├── public/                 # Static assets (images, logos, icons, fonts)
│   ├── images/
│   │   ├── Emotes/           # Live stream emotes
│   │   ├── media/            # Social media icons
│   │   └── artwork-library/  # Curated artist showcase and commissions
│   ├── fonts/              # Local typography (Outfit)
│   ├── sitemap.xml         # SEO engine optimization
│   └── robots.txt          # Crawler instructions
├── src/                    # Source files for build
│   ├── main.ts               # Core logic: i18n, Transitions, Effects & UI
│   ├── styles.css            # Global modern style themes and variables
│   └── lang/                 # Translation modules (de.ts, en.ts)
├── index.html              # High-impact Hero, About & FAQ
├── links.html              # Social hub with Neon Glow interactions
├── contact.html            # Collaboration & Business center
├── credits.html            # Artist Showcase & Gallery
├── imprint.html            # Legal framework & Privacy policy
└── 404.html                # Custom error page
```

---

## 🛠️ Tech Stack
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## ⚙️ Deployment

The project uses a two-stage deployment process via GitHub Pages:

### Test / Staging (`test.nhywyll.com`)
Changes to the `main` branch are automatically pushed to the test subdomain.
```bash
git push origin main
```

### Production (`nhywyll.com`)
To push the current state to the main domain, use the integrated script:
```bash
npm run deploy:prod
```
*This automatically toggles the CNAME configuration and pushes to the production repository.*

---

## ⚖️ License & Rights
- **Code**: The source code of this project is licensed under the [MIT License](LICENSE).
- **Character Art & Branding**: All original character designs, branding elements, and illustrations are **© Nhywyll** and may not be used without explicit permission.
- **Third-Party Logos**: All platform logos (Twitch, YouTube, etc.) are the property of their respective owners.

---
*Crafted with 💜 by Nhywyll*