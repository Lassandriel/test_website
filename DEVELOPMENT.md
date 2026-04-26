# 🛠️ Development & Maintenance Guide

This document contains everything you need to know about developing, building, and maintaining \*The Vtuber's Website\*\*.

---

## ⚡ Getting Started

### 📦 Prerequisites

- **Node.js**: v18 or later (v20+ recommended)
- **Git**: For version control and deployment

### 🏗️ Installation & Setup

1. **Clone the Repo**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Launch local Workspace**:
   ```bash
   npm run dev
   ```

---

## 📜 Available Commands

| Command               | Description                                                                      |
| :-------------------- | :------------------------------------------------------------------------------- |
| `npm run dev`         | Spins up the **Vite dev server** with Hot Module Replacement (HMR).              |
| `npm run build`       | Compiles TypeScript and builds the project for production.                       |
| `npm run preview`     | Run the local **Production Preview** to test final assets.                       |
| `npm run deploy:prod` | Automated pipeline: Switches CNAME, pushes to Production Repo & reverts to Test. |

---

## 🧩 Maintenance & Updates

### 🌍 Adding/Editing Translations

The project uses a custom i18n system. To add a new language:

1. Create a `src/lang/[lang-code].ts` file based on `en.ts`.
2. Register the new language module in `src/lang/index.ts`.
3. The UI will automatically pick up the new keys via `data-i18n` attributes.

### 🔍 SEO & Sitemap

Each page has a dedicated `<title>` and `<meta description>` in the root HTML files. After adding a new page, remember to update:

1. **`public/sitemap.xml`**: Manually add the new URL for indexing.
2. **`vite.config.ts`**: Register the new file in the `rollupOptions.input` object.

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

_This automatically toggles the CNAME configuration and pushes to the production repository._

---

## 🏗️ Project Structure

```text
test_website/
├── scripts/                # Deployment Automation
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
│   ├── styles.css            # Global style themes and variables
│   └── lang/                 # Translation modules (de.ts, en.ts)
├── index.html              # Hero, About & FAQ
├── links.html              # Social hub
├── contact.html            # Business center
├── credits.html            # Artist Showcase
├── imprint.html            # Legal framework
└── 404.html                # Custom error page
```
