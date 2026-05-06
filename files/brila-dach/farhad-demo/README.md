# Brila DACH — Quickstart

## Erste Schritte

```bash
# 1. Repo klonen / Ordner öffnen
cd brila-dach

# 2. Demo bauen (kein npm install nötig — pure Node)
node src/build.js farhad-barbershop-mondsee

# 3. Lokal anschauen
npx serve public/farhad-barbershop-mondsee

# 4. Live deployen (Vercel-CLI vorausgesetzt)
vercel --prod public/farhad-barbershop-mondsee
```

## Vor dem ersten Pitch — TODOs für Felix

### Heute (30 Min)
- [ ] Google Maps öffnen, 3 längste positive Reviews von Farhad kopieren
- [ ] In `data/farhad-barbershop-mondsee.json` die `[ECHTEN REVIEW EINFÜGEN]`-Platzhalter ersetzen
- [ ] Build neu laufen lassen
- [ ] Demo lokal durchklicken, Mobile-View testen

### Diese Woche (2-3h)
- [ ] Vercel-Account erstellen, Projekt verbinden
- [ ] Custom Domain registrieren: `felix-demo.at` o.ä. (€10/Jahr bei Namecheap)
- [ ] Demo live setzen unter z.B. `farhad.felix-demo.at`
- [ ] Zwei Fotos vom Shop machen (Außen + Innen) — Vorwand: "Ich war eh in Mondsee"
- [ ] Echte Service-Preise rausfinden (Anruf reicht: "Was kostet ein Schnitt?")

## Pitch-Strategie

### Wer kontaktieren
Farhad selbst — nicht Mitarbeiter. Über Instagram-DM `@barber.shop_farhad`
oder direkt Vorbeigehen. **Nicht per E-Mail** (gmail-Account spricht für
"checkt selten").

### Erstkontakt
Persönlich oder per DM (Instagram). Keine kalte E-Mail.

### Pitch-Reihenfolge
1. Demo-Link zeigen (auf dem Handy, vor Ort)
2. 30 Sekunden warten — er muss reagieren
3. "Wenn's dir gefällt, gehört's dir. €299 einmalig + €19/Monat für Hosting,
   Updates und kleine Änderungen."
4. Wenn Zögern: "Bis ich's für dich live schalte, kostet's nichts. Du kannst
   dich entscheiden wenn du den fertigen Stand siehst."

### Mögliche Einwände + Antworten

**"Hab ich Facebook und Instagram, brauch ich keine Website."**
→ "Stimmt, aber wenn jemand 'Barbershop Mondsee' googelt, kommt dein Konkurrent
SaintBarber zuerst. Eine eigene Website ändert das in 2-3 Wochen."

**"Zu teuer."**
→ "Treatwell nimmt 35% Provision auf jeden Neukunden. Bei 5 neuen Kunden im
Monat à €30 sind das €52,50. Meine Lösung kostet €19. Du sparst Geld ab dem
ersten Monat."

**"Ich kenn mich da nicht aus."**
→ "Das ist mein Job. Du machst gar nichts — Bilder schicken reicht."

## 90-Tage-Plan (5-10h/Woche)

### Phase 1: Validierung (Woche 1-3)
**Ziel: 1 zahlender Kunde**
- Woche 1: Farhad-Demo finalisieren + pitchen
- Woche 2: 2 weitere Barbershops in Vöcklabruck/Attnang/Lenzing recherchieren
  und Demos bauen
- Woche 3: Pitchen, lernen, Pitch verfeinern

**Erfolgs-Metrik:** 1 zahlender Kunde ODER 5 ehrliche "Nein, weil..."-Antworten.

### Phase 2: Skalieren (Woche 4-8)
**Ziel: 5 zahlende Kunden = €1.500 MRR**
- Wenn Phase 1 funktioniert: 10 weitere Barbershops in OÖ angehen
- Wenn Phase 1 floppt: Pivot zu Friseur (Damen) oder Werkstätten

**Erfolgs-Metrik:** Conversion-Rate Demo→Kauf = mindestens 15%.

### Phase 3: Systematisieren (Woche 9-12)
**Ziel: Skalierbares System**
- Build-Skript erweitern: weitere Branchen-Templates (Werkstatt, Praxis)
- Cold-Outreach automatisieren (LinkedIn / Instagram-DM-Sequence)
- Partnerschaft mit lokalem Branchenverband prüfen

**Erfolgs-Metrik:** 10 zahlende Kunden ODER klare Erkenntnis, dass Modell
nicht skaliert.

## Stop-Conditions

Project wird **gestoppt**, wenn:
- Phase 1: 5 ehrliche Pitches → 0 Conversions UND keine Pivot-Idee aus Feedback
- Phase 2: Akquisitions-Aufwand > 4h pro Kunde nach 8 Wochen
- Persönlich: Wenn nach 12 Wochen <€500 MRR und kein klarer Pfad zu €2.000

Nicht aus Eitelkeit weitermachen. Lessons Learned dokumentieren, nächste
Chance aus Bericht angehen.
