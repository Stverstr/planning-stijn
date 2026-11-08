/* ================================================================
   events.js — losse gebeurtenissen: tripjes, avonden, weekends, …
   Elke entry: {start, end, type, title, icon?, who?, time?, note?}
     - start/end: 'YYYY-MM-DD', inclusief (zelfde dag = ééndaags)
     - type: zie EVENT_TYPES hieronder; 'werk' is gereserveerd voor
       een latere thuis/kantoor-laag
     - who: wie meegaat, vrij tekst, bv. 'Stijn & Marijke'
     - time: optioneel, bv. '19:30' (alleen voor avonden)
   Alleen aanpassen via Claude; geen invoer in de site zelf.
   ================================================================ */

const EVENT_TYPES = {
  trip:    { label: 'Trip',    bg: '#ede9fe', border: '#7c3aed', text: '#4c1d95', icon: '✈️' },
  weekend: { label: 'Weekend', bg: '#ffedd5', border: '#ea580c', text: '#7c2d12', icon: '🏕️' },
  avond:   { label: 'Avond',   bg: '#fef3c7', border: '#d97706', text: '#78350f', icon: '🌙' },
  werk:    { label: 'Werk',    bg: '#e2e8f0', border: '#475569', text: '#1e293b', icon: '💼' },
  overig:  { label: 'Overig',  bg: '#f1f5f9', border: '#64748b', text: '#334155', icon: '📌' },
  verjaardag: { label: 'Verjaardag', bg: '#fce7f3', border: '#db2777', text: '#831843', icon: '🎂' },
};

const EVENTS = [
  { start: '2026-11-12', end: '2026-11-12', type: 'avond',   title: 'Belgian Cats – Zweden', icon: '🏀', who: 'Stijn & Marijke', time: '20:30', note: 'Charleroi' },
  { start: '2026-11-14', end: '2026-11-15', type: 'weekend', title: 'Weekend Ursel', icon: '🚴', who: 'Stijn & Marijke', note: 'za Baroudeurs-tocht Affligem/Liedekerke met Michiel & Isabelle, daarna De Heeren van Liedekerke' },
  { start: '2026-12-12', end: '2026-12-12', type: 'avond',   title: 'Die Verdammte Spielerei', icon: '🎭', who: 'Stijn, Marijke & Elien', note: 'CC Westrand Dilbeek' },
  { start: '2026-12-18', end: '2026-12-27', type: 'trip',    title: 'Skireis St. Anton', icon: '⛷️', who: 'Stijn, Robbe & Lore' },
  { start: '2027-02-20', end: '2027-02-20', type: 'avond',   title: 'Preuteleute', icon: '🎤', who: 'Stijn & Marijke', note: 'Roosdaal' },
  { start: '2027-03-03', end: '2027-03-07', type: 'trip',    title: 'Shortski Serfaus-Fiss-Ladis', icon: '⛷️', who: 'Stijn & Marijke', note: 'Vaya Ladis Hotel; wo vertrek, do–zo skiën' },
  { start: '2027-04-05', end: '2027-04-10', type: 'trip',    title: 'Skivakantie Holzgau', icon: '⛷️', who: 'Marijke, Ella, Manou & Leon' },
  { start: '2027-04-16', end: '2027-04-18', type: 'weekend', title: 'Amstel Gold Race Valkenburg', icon: '🚴', who: 'Stijn & Marijke', note: 'Thermaetel; tourversie za 17 april' },
];

/* Terugkerende dagen: één regel per persoon, 'MM-DD'. Hieronder worden ze voor
   elk jaar t/m 2031 (einde van de tijdlijn) als event toegevoegd. */
const VERJAARDAGEN = [
  { day: '03-21', title: 'Verjaardag Lore' },
  { day: '07-14', title: 'Verjaardag Marijke' },
  { day: '08-28', title: 'Verjaardag Robbe' },
  { day: '09-05', title: 'Eerste date Stijn & Marijke', icon: '❤️', since: 2026 },
  { day: '10-04', title: 'Verjaardag Stijn' },
  { day: '10-13', title: 'Verjaardag Manou' },
  // { day: 'MM-DD', title: 'Verjaardag Ella' },   // datum nog aan te vullen
  // { day: 'MM-DD', title: 'Verjaardag Leon' },   // datum nog aan te vullen
];
for (let y = 2026; y <= 2031; y++) {
  for (const v of VERJAARDAGEN) {
    if (v.since && y <= v.since) continue;
    const d = `${y}-${v.day}`;
    EVENTS.push({ start: d, end: d, type: 'verjaardag', title: v.since ? `${v.title} (${y - v.since} jaar)` : v.title, icon: v.icon });
  }
}
