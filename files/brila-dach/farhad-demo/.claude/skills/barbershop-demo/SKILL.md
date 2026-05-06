---
name: barbershop-demo
description: Use this skill when the user wants to generate a new barbershop demo website, add a new shop to the data/ folder, or modify the template. Triggers on phrases like "neue Demo bauen", "neuer Shop", "generiere für [Shop-Name]", or any request to build/customize a single-page barbershop site from JSON data.
---

# Barbershop-Demo-Generator

## Wann dieser Skill greift
- Neuer Shop wird hinzugefügt (`data/<slug>.json`)
- Bestehender Shop wird aktualisiert
- Template wird modifiziert
- Demo wird gebaut und deployed

## Kern-Workflow

### 1. Daten sammeln (vor dem Bauen!)
Folgendes IMMER vom User erfragen oder per web_search holen, bevor JSON
geschrieben wird:

**Pflichtfelder:**
- Shop-Name + Slug (kebab-case)
- Adresse, PLZ, Ort
- Telefon, E-Mail (falls verfügbar)
- Öffnungszeiten (alle 7 Tage explizit)
- Google-Maps-URL
- 3–5 echte Google-Reviews (Text + Vorname/Initiale + Sterne)
- Google-Gesamt-Rating + Anzahl Bewertungen

**Optional aber stark:**
- 3–6 Service-Pakete mit Preisen (recherchieren oder fragen)
- Instagram-Handle
- 1–2 Alleinstellungsmerkmale (nostalgisch? premium? schnell?)
- Existierende Buchungs-URL (Shore, Cituro, etc.)

### 2. Daten-Schema einhalten
JSON folgt strikt `data/_schema.json`. Bei Abweichungen schlägt der Build fehl.

### 3. Template-Platzhalter
Alle Platzhalter im Template haben Format `{{path.to.field}}`.
Beispiele: `{{shop.name}}`, `{{address.city}}`, `{{reviews[0].text}}`.

### 4. Build ausführen
```bash
node src/build.js <slug>
```
Output landet in `public/<slug>/index.html`.

### 5. Lokal prüfen, dann deployen
```bash
npx serve public/<slug>          # lokal testen
vercel --prod public/<slug>      # live setzen
```

## Design-Prinzipien (nicht verletzen)

- **Echte Reviews zuerst.** Das ist die Brila-Magie. Niemals Fake-Reviews.
  Wenn weniger als 3 echte verfügbar: lieber nur 2 anzeigen.
- **Kein Stockfoto-Carousel.** Eine Hero-Aufnahme reicht. Lieber später durch
  echtes Shop-Foto ersetzen.
- **0% Provision-Argument prominent.** Im Footer oder als Section "Direkt
  buchen, ohne Plattform-Gebühren" — das ist Verkaufstext für den Shop, nicht
  für End-User.
- **Schriftpaarung fix:** Bebas Neue (Display) + DM Serif Display (Akzent) +
  Inter (Body). Nicht ändern ohne expliziten Auftrag.
- **Farben:** Dark-Theme mit Gold-Akzent. Hex-Werte stehen als CSS-Variablen
  oben im Template.

## Verkaufslogik (für Pitch-Mails)
Wenn User Pitch-Mail an Shop schreiben will:
1. Verlinkt die Live-Demo-URL
2. Nennt 3 konkrete Schwächen ihrer aktuellen Online-Präsenz
3. Pricing klar: €299 Setup + €19/Monat
4. Soft-CTA: "Wenn euch was gefällt, könnt ihr's behalten — sonst lösche ich's
   in 14 Tagen"

## Häufige Fehler vermeiden
- ❌ Englische Service-Namen ("Haircut" statt "Herrenhaarschnitt")
- ❌ US-Telefon-Format
- ❌ Generische Reviews aus dem Template-Beispiel übernehmen
- ❌ "Online buchen"-Button OHNE echten Buchungs-Link dahinter
- ❌ DSGVO-Cookie-Banner vergessen, wenn später Analytics dazu kommt
