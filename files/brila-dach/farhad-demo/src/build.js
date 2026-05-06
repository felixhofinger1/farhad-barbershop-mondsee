#!/usr/bin/env node
/**
 * Build-Generator für Barbershop-Demos
 * Usage: node src/build.js <slug>
 * Beispiel: node src/build.js farhad-barbershop-mondsee
 */

const fs = require('fs');
const path = require('path');

const slug = process.argv[2];
if (!slug) {
  console.error('❌ Usage: node src/build.js <slug>');
  process.exit(1);
}

const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', `${slug}.json`);
const templatePath = path.join(root, 'src', 'template.html');
const outDir = path.join(root, 'public', slug);
const outPath = path.join(outDir, 'index.html');

if (!fs.existsSync(dataPath)) {
  console.error(`❌ Daten nicht gefunden: ${dataPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let html = fs.readFileSync(templatePath, 'utf8');

// === Helpers ===
const dayNames = {
  monday: 'Mo', tuesday: 'Di', wednesday: 'Mi',
  thursday: 'Do', friday: 'Fr', saturday: 'Sa', sunday: 'So',
};
const dayNamesFull = {
  monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday',
  thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
};

function getInitial(name) {
  return (name || '?').trim().charAt(0).toUpperCase();
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// === Services-HTML ===
const servicesHtml = data.services.map((s, i) => `
    <div class="service">
      <div class="service-num">N° ${String(i + 1).padStart(2, '0')}</div>
      <h3>${escapeHtml(s.name)}</h3>
      <div class="service-duration">${escapeHtml(s.duration)}</div>
      <p class="service-desc">${escapeHtml(s.description)}</p>
      <div class="service-price">€${escapeHtml(s.price)}<small> / ab</small></div>
    </div>
  `).join('');

// === Reviews-HTML ===
const reviewsHtml = data.reviews.map(r => `
    <div class="review">
      <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <p class="review-text">„${escapeHtml(r.text)}"</p>
      <div class="review-author">
        <div class="author-initial">${getInitial(r.author)}</div>
        <div>
          <div class="author-name">${escapeHtml(r.author)}</div>
          <div class="author-when">${escapeHtml(r.when)}</div>
        </div>
      </div>
    </div>
  `).join('');

// === Hours-HTML ===
const hoursHtml = Object.entries(data.hours).map(([day, time]) => {
  const isClosed = time === 'geschlossen';
  return `
      <div class="hours-row${isClosed ? ' closed' : ''}">
        <span class="day">${dayNames[day]}</span>
        <span class="time">${isClosed ? 'geschlossen' : time}</span>
      </div>`;
}).join('');

// === Schema.org Hours ===
const schemaHours = Object.entries(data.hours)
  .filter(([_, time]) => time !== 'geschlossen')
  .map(([day, time]) => {
    const [open, close] = time.split('-');
    return `{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "${dayNamesFull[day]}",
      "opens": "${open}",
      "closes": "${close}"
    }`;
  }).join(',\n    ');

// === Contact-Extras ===
const contactExtras = [
  data.contact.email ? `<p><a href="mailto:${data.contact.email}">${data.contact.email}</a></p>` : '',
  data.contact.bookingUrl ? `<p><a href="${data.contact.bookingUrl}" target="_blank">Online buchen →</a></p>` : '',
].filter(Boolean).join('\n      ');

// === Socials-HTML ===
const socialsHtml = [
  data.contact.instagram ? `<a href="https://instagram.com/${data.contact.instagram.replace('@', '')}" target="_blank">Instagram</a>` : '',
  data.contact.facebook ? `<a href="${data.contact.facebook}" target="_blank">Facebook</a>` : '',
  data.address.googleMapsUrl ? `<a href="${data.address.googleMapsUrl}" target="_blank">Google Maps</a>` : '',
].filter(Boolean).join('\n      ');

// === Replace simple placeholders ===
function getValue(obj, pathStr) {
  return pathStr.split('.').reduce((acc, key) => acc?.[key], obj);
}

html = html.replace(/\{\{([a-zA-Z][a-zA-Z0-9._]*)\}\}/g, (match, key) => {
  // Special composite keys handled separately below
  if (['servicesHtml', 'reviewsHtml', 'hoursHtml', 'schemaHours',
       'contactExtras', 'socialsHtml', 'currentYear'].includes(key)) {
    return match; // skip, handled below
  }
  const value = getValue(data, key);
  return value !== undefined ? String(value) : match;
});

// === Replace composite blocks ===
html = html
  .replace(/\{\{servicesHtml\}\}/g, servicesHtml)
  .replace(/\{\{reviewsHtml\}\}/g, reviewsHtml)
  .replace(/\{\{hoursHtml\}\}/g, hoursHtml)
  .replace(/\{\{schemaHours\}\}/g, schemaHours)
  .replace(/\{\{contactExtras\}\}/g, contactExtras)
  .replace(/\{\{socialsHtml\}\}/g, socialsHtml)
  .replace(/\{\{currentYear\}\}/g, new Date().getFullYear());

// === Write output ===
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html, 'utf8');

console.log(`✅ Built: ${outPath}`);
console.log(`   Lokal testen: npx serve public/${slug}`);
console.log(`   Deployen:     vercel --prod public/${slug}`);
