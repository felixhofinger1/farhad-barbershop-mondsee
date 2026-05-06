# Brila DACH — Demo-Site-Generator

## Was das ist
Tool zum Generieren von One-Page-Demo-Websites für DACH-Barbershops aus
Google-Maps-Reviews + minimalem Input. Verkauf-First-Ansatz: Demo wird
gebaut → an den Shop verkauft → bei Kauf finalisiert.

## Aktueller Stand
- Erste Demo: Farhad Barbershop, Mondsee (5310, AT)
- Stack: Statisches HTML/CSS, Vercel-Deploy
- Kein Build-Step, kein Framework — bewusst lean

## Verzeichnisstruktur
- `data/` — JSON pro Shop (Eingabe)
- `src/template.html` — Master-Template mit `{{platzhalter}}`
- `src/build.js` — Generator-Skript (data + template → public/)
- `public/<shop-slug>/` — Build-Output, wird deployed

## Workflow pro Shop
1. `data/<slug>.json` erstellen oder kopieren
2. `node src/build.js <slug>` ausführen
3. `vercel --prod public/<slug>` deployen
4. Demo-Link an Shop senden

## Konventionen
- Keine externen JS-Frameworks (Vanilla nur für Smooth-Scroll/Mobile-Menu)
- Fonts via Google Fonts CDN (Bebas Neue + DM Serif Display + Inter)
- Bilder: zuerst Unsplash-Platzhalter, dann echte Shop-Fotos
- Mobile-First, getestet auf 375px Breite
- Keine Tracking-Tools im Demo (DSGVO-Schmerz vermeiden)

## Sales-Pitch (für Refresh, falls vergessen)
- Konkurrenz Treatwell/Planity = 35% Provision pro Neukunde
- Eigene Website = 0% Provision, volle Datenhoheit
- Pricing: €299 Setup + €19/Monat Hosting/Updates
- Zielgruppe: Shops MIT Google-Bewertungen ABER OHNE eigene Website

## Was nicht reingehört
- Buchungssystem (verlinkt zu Shore/Cituro/Salonkee)
- Online-Shop
- Blog/CMS
- Multi-Page-Strukturen — strikt One-Pager
