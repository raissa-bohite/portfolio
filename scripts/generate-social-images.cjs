// Génère l'image de partage (1200 × 630) de chaque projet, dans chaque langue.
// Usage : node scripts/generate-social-images.cjs
// Prérequis : Playwright installé sur la machine (non inclus dans les dépendances du site).
// Les images sont écrites dans public/og/projects/<slug>-<langue>.jpg ; changer SOCIAL_IMAGE_VERSION
// dans src/lib/social-image.ts quand elles changent, pour que les réseaux sociaux vident leur cache.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const outputDirectory = path.join(root, 'public/og/projects');
const locales = ['fr', 'en', 'de'];
// Libellés propres à l'image : ils ne s'affichent pas dans les pages du site
const caseStudyEyebrows = { fr: 'Étude de cas', en: 'Case study', de: 'Fallstudie' };
// Projet sans étude de cas rédigée : la page montre seulement la fiche du projet
const projectEyebrows = { fr: 'Projet', en: 'Project', de: 'Projekt' };
const hasCaseStudy = (slug, locale) => fs.existsSync(path.join(root, 'src/content/case-studies', locale, `${slug}.yaml`));
// Mêmes couleurs que src/lib/accents.ts
const accentColors = { mint: '#0da479', crimson: '#c8323f', forest: '#2f5b45', gold: '#e0940f', royal: '#1e4fc4' };

const fontUrl = (relativePath) => `file://${path.join(root, 'node_modules', relativePath)}`;
const assetUrl = (relativePath) => `file://${path.join(root, relativePath)}`;

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderPage(project, slug, locale) {
  const eyebrow = hasCaseStudy(slug, locale) ? caseStudyEyebrows[locale] : projectEyebrows[locale];
  const showcase = path.join('src/content/projects', project.showcase);
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><style>
@font-face { font-family: Bricolage; src: url('${fontUrl('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2')}'); font-weight: 200 800; }
@font-face { font-family: Mono; src: url('${fontUrl('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2')}'); font-weight: 500; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #fff; font-family: Bricolage, sans-serif; color: #1e0f45; position: relative; }
.band { position: absolute; top: 0; right: 0; width: 520px; height: 630px; background: ${accentColors[project.accent]}; border-radius: 0 0 0 56px; }
.circle { position: absolute; top: -120px; right: -120px; width: 340px; height: 340px; border-radius: 50%; background: rgb(255 255 255 / 0.14); }
.arc { position: absolute; bottom: -250px; left: -150px; width: 360px; height: 360px; border-radius: 50%; border: 3px solid #f5a25d; border-right-color: transparent; border-bottom-color: transparent; opacity: 0.6; }
.mockup { position: absolute; top: 150px; right: 28px; width: 640px; filter: drop-shadow(0 30px 40px rgb(30 15 69 / 0.28)); }
.text { position: absolute; top: 72px; left: 72px; width: 460px; display: flex; flex-direction: column; gap: 22px; }
.logo { width: 64px; height: 64px; }
.eyebrow { font-family: Mono, monospace; font-size: 22px; color: #9e3409; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 40px; }
h1 { font-size: 76px; line-height: 0.98; font-weight: 800; letter-spacing: -0.04em; }
.cursor { display: inline-block; width: 0.45em; height: 0.08em; background: #f26a1b; margin-left: 6px; }
.kind { font-size: 30px; line-height: 1.25; font-weight: 700; color: #4a23a0; }
.footer { position: absolute; left: 72px; bottom: 48px; font-size: 20px; font-weight: 600; color: #3b3155; }
.footer strong { color: #1e0f45; }
</style></head><body>
<div class="band"><div class="circle"></div></div>
<div class="arc"></div>
<img class="mockup" src="${assetUrl(showcase)}" alt="">
<div class="text">
  <img class="logo" src="${assetUrl('src/assets/brand/rb-mark.svg')}" alt="">
  <p class="eyebrow">${eyebrow}</p>
  <h1>${escapeHtml(project.name)}<span class="cursor"></span></h1>
  <p class="kind">${escapeHtml(project.kind[locale])}</p>
</div>
<p class="footer"><strong>Raissa Bohité</strong> · raissa-bohite.pages.dev</p>
</body></html>`;
}

async function main() {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const projectDirectory = path.join(root, 'src/content/projects');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const file of fs.readdirSync(projectDirectory).filter((name) => name.endsWith('.json'))) {
    const project = JSON.parse(fs.readFileSync(path.join(projectDirectory, file), 'utf8'));
    const slug = path.basename(file, '.json');
    for (const locale of locales) {
      // La page passe par un fichier : les images locales (file://) ne se chargent pas depuis setContent
      const htmlPath = path.join(outputDirectory, `.render-${slug}-${locale}.html`);
      fs.writeFileSync(htmlPath, renderPage(project, slug, locale));
      await page.goto(`file://${htmlPath}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(outputDirectory, `${slug}-${locale}.jpg`), type: 'jpeg', quality: 88 });
      fs.unlinkSync(htmlPath);
    }
  }
  await browser.close();
}

main();
