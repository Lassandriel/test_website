import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';

const PROD_DOMAIN = 'nhywyll.com';
const TEST_DOMAIN = 'test.nhywyll.com';
const REMOTE_NAME = 'production';
const TEMP_BRANCH = 'release-prod-temp';

try {
    console.log('🚀 Starte Produktions-Deployment...');

    // 1. In temporären Branch wechseln
    console.log('--- Erstelle temporären Branch...');
    execSync(`git checkout -b ${TEMP_BRANCH}`, { stdio: 'inherit' });

    // 2. CNAME auf Produktion ändern
    console.log(`--- Setze Domain auf ${PROD_DOMAIN}...`);
    writeFileSync('public/CNAME', PROD_DOMAIN);

    // 3. Änderungen committen
    console.log('--- Committe Änderungen...');
    execSync('git add public/CNAME', { stdio: 'inherit' });
    execSync('git commit -m "chore: release to production"', { stdio: 'inherit' });

    // 4. Zum Produktions-Repo pushen
    console.log(`--- Pushe zu ${REMOTE_NAME}...`);
    execSync(`git push ${REMOTE_NAME} ${TEMP_BRANCH}:main --force`, { stdio: 'inherit' });

    console.log('✅ Deployment erfolgreich abgeschlossen!');
} catch (error) {
    console.error('❌ Fehler beim Deployment:', error.message);
} finally {
    // 5. Zurück zum Haupt-Branch und Aufräumen
    console.log('--- Räume auf und kehre zum Test-Stand zurück...');
    try {
        execSync('git checkout main', { stdio: 'inherit' });
        execSync(`git branch -D ${TEMP_BRANCH}`, { stdio: 'inherit' });
        
        // CNAME wieder auf Test setzen (sicherstellen, dass es lokal wieder stimmt)
        writeFileSync('public/CNAME', TEST_DOMAIN);
        console.log('✨ Alles wieder im Test-Modus.');
    } catch (cleanupError) {
        console.error('⚠️ Fehler beim Aufräumen:', cleanupError.message);
    }
}
