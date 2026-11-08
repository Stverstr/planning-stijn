/* ================================================================
   events.js — losse gebeurtenissen: tripjes, avonden, weekends, …
   Elke entry: {start, end, type, wie, title, icon?, who?, time?, note?}
     - start/end: 'YYYY-MM-DD', inclusief (zelfde dag = ééndaags)
     - type: zie EVENT_TYPES hieronder; 'werk' is gereserveerd voor
       een latere thuis/kantoor-laag
     - wie: 'stijn' | 'marijke' | 'samen' (verplicht; stuurt de filter
       en de randkleur in de planning, zie EVENT_WIE)
     - who: wie meegaat, vrij tekst, bv. 'Stijn & Marijke'
     - time: optioneel, bv. '19:30' (alleen voor avonden)
     - voorlopig: optioneel, true = idee/plan, nog niet vast (gestippelde
       rand en '?' in de planning)
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

/* Van wie is de gebeurtenis: aparte filter en randkleur per waarde. */
const EVENT_WIE = {
  stijn:   { label: 'Stijn',   color: '#2563eb' },
  marijke: { label: 'Marijke', color: '#16a34a' },
  samen:   { label: 'Samen',   color: '#ff1493' },
};

const EVENTS = [
  { start: '2026-11-09', end: '2026-11-09', type: 'avond',      wie: 'samen',   title: 'Etentje Rugbyman 2', icon: '🦞', who: 'Stijn & Marijke', time: '19:00', note: 'Brussel · kreeftje' },
  { start: '2026-11-10', end: '2026-11-10', type: 'avond',      wie: 'stijn',   title: 'Cyclones: zomervakantie voorbereiden', icon: '🚴', who: 'Stijn', note: 'bij Stijn thuis' },
  { start: '2026-11-10', end: '2026-11-10', type: 'avond',      wie: 'marijke', title: 'Drinks met Elien', icon: '🍸', who: 'Marijke & Elien', note: 'Den Tuus, Asse' },
  { start: '2026-11-11', end: '2026-11-11', type: 'avond',      wie: 'samen',   title: 'Candle Light Dinner by Naked Chef SV', icon: '🕯️', who: 'Stijn & Marijke' },
  { start: '2026-11-12', end: '2026-11-12', type: 'avond',      wie: 'samen',   title: 'Belgian Cats – Zweden', icon: '🏀', who: 'Stijn & Marijke', time: '20:30', note: 'Charleroi' },
  { start: '2026-11-13', end: '2026-11-13', type: 'avond',      wie: 'stijn',   title: 'Etentje met de Bellem boys', icon: '🍽️', who: 'Stijn', note: 'Aalter' },
  { start: '2026-11-13', end: '2026-11-13', type: 'avond',      wie: 'marijke', title: 'Etentje op school', icon: '🍽️', who: 'Marijke' },
  { start: '2026-11-14', end: '2026-11-14', type: 'weekend',    wie: 'samen',   title: 'Baroudeurs-tocht', icon: '🚴', who: 'Stijn & Marijke', note: 'fietstocht Affligem/Liedekerke met Michiel & Isabelle, daarna De Heeren van Liedekerke; slapen in Ursel' },
  { start: '2026-11-17', end: '2026-11-17', type: 'werk',       wie: 'stijn',   title: 'Myreas AI-training + BBQ', icon: '💼', who: 'Stijn', time: '16:00', note: 'tot 22:00 · Marktstraat 62, Lennik' },
  { start: '2026-11-18', end: '2026-11-20', type: 'werk',       wie: 'marijke', title: 'Directie-3-daagse', icon: '💼', who: 'Marijke', note: 'congres · Vayamundo, Oostende · tot vr 20 nov 12:30' },
  { start: '2026-11-20', end: '2026-11-20', type: 'overig',     wie: 'samen',   title: 'Lunchdate', icon: '🥂', who: 'Stijn & Marijke', time: '13:00', voorlopig: true },
  { start: '2026-11-21', end: '2026-11-21', type: 'avond',      wie: 'marijke', title: 'Etentje Les Plouques', icon: '🍽️', who: 'Marijke' },
  { start: '2026-11-26', end: '2026-11-26', type: 'avond',      wie: 'samen',   title: 'Comedyavond Vierhoek', icon: '🎤', who: 'Stijn & Marijke', time: '20:00', voorlopig: true },
  { start: '2026-11-29', end: '2026-11-29', type: 'overig',     wie: 'samen',   title: 'Activiteit verjaardag pa', icon: '🎂', who: 'Stijn & Marijke', voorlopig: true },
  { start: '2026-12-05', end: '2026-12-05', type: 'avond',      wie: 'samen',   title: 'Fuif Laurien', icon: '🎉', who: 'Stijn & Marijke', time: '21:00', note: 'Brussel', voorlopig: true },
  { start: '2026-12-10', end: '2026-12-10', type: 'werk',       wie: 'marijke', title: 'PV + ouderraad', icon: '💼', who: 'Marijke', time: '19:00', note: 'tot 21:00 · Basisschool De Brug' },
  { start: '2026-12-12', end: '2026-12-12', type: 'avond',      wie: 'samen',   title: 'Die Verdammte Spielerei', icon: '🎭', who: 'Stijn, Marijke & Elien', note: 'CC Westrand Dilbeek' },
  { start: '2026-12-17', end: '2026-12-17', type: 'werk',       wie: 'stijn',   title: 'Myreas Christmas Dinner', icon: '🎄', who: 'Stijn', time: '19:00', note: 'tot 23:00 · de Merode, Brussel' },
  { start: '2026-12-18', end: '2026-12-27', type: 'trip',       wie: 'stijn',   title: 'Skireis St. Anton', icon: '⛷️', who: 'Stijn, Robbe & Lore' },
  { start: '2026-12-19', end: '2026-12-19', type: 'avond',      wie: 'marijke', title: 'Dinner & dance Clash – Les Plouques', icon: '💃', who: 'Marijke', note: 'Merchtem' },
  { start: '2026-12-27', end: '2027-01-03', type: 'trip',       wie: 'marijke', title: 'Malta – St Paul\'s Bay', icon: '🏝️', who: 'Marijke' },
  { start: '2027-01-06', end: '2027-01-06', type: 'avond',      wie: 'samen',   title: 'Kommil Foo', icon: '🎭', who: 'Stijn & Marijke', time: '20:00', note: 'Aalst' },
  { start: '2027-01-27', end: '2027-02-04', type: 'trip',       wie: 'marijke', title: 'Sneeuwklassen De Brug', icon: '🏔️', who: 'Marijke (met het 6e leerjaar)', note: 'wo 27 jan – do 4 feb' },
  { start: '2027-02-20', end: '2027-02-20', type: 'avond',      wie: 'samen',   title: 'Preuteleute', icon: '🎤', who: 'Stijn & Marijke', note: 'Roosdaal' },
  { start: '2027-03-05', end: '2027-03-05', type: 'verjaardag', wie: 'samen',   title: '6 maanden samen', icon: '❤️', who: 'Stijn & Marijke', note: 'daten sinds 5 sep 2026' },
  { start: '2027-03-03', end: '2027-03-07', type: 'trip',       wie: 'samen',   title: 'Shortski Serfaus-Fiss-Ladis', icon: '⛷️', who: 'Stijn & Marijke', note: 'Vaya Ladis Hotel; wo vertrek, do–zo skiën' },
  { start: '2027-03-08', end: '2027-03-08', type: 'overig',     wie: 'samen',   title: 'Carnaval Halle', icon: '🎭', who: 'Stijn & Marijke', voorlopig: true },
  { start: '2027-03-11', end: '2027-03-11', type: 'werk',       wie: 'marijke', title: 'PV + ouderraad', icon: '💼', who: 'Marijke', time: '19:00', note: 'tot 21:00 · Basisschool De Brug' },
  // Voorlopig (8 nov 2026): tripjes die we samen willen doen, nog niet vastgelegd.
  { start: '2027-03-29', end: '2027-04-02', type: 'trip',       wie: 'samen',   title: 'Paastripje', icon: '🐣', who: 'Stijn & Marijke', voorlopig: true },
  // Wielerklassiekers 2027 (8 nov 2026). Data: UCI-kalender (RVV zo 4 apr, Parijs-Roubaix zo 11 apr);
  // de toerversies zijn op de zaterdag ervoor. Ook beide elitekoersen (keuze Stijn, 8 nov 2026).
  { start: '2027-04-03', end: '2027-04-03', type: 'weekend',    wie: 'stijn',   title: 'Ronde van Vlaanderen toertocht', icon: '🚴', who: 'Stijn' },
  { start: '2027-04-04', end: '2027-04-04', type: 'weekend',    wie: 'stijn',   title: 'Ronde van Vlaanderen – elitekoers', icon: '🦁', who: 'Stijn' },
  { start: '2027-04-05', end: '2027-04-10', type: 'trip',       wie: 'marijke', title: 'Skivakantie Holzgau', icon: '⛷️', who: 'Marijke, Ella, Manou & Leon' },
  { start: '2027-04-10', end: '2027-04-10', type: 'weekend',    wie: 'stijn',   title: 'Parijs-Roubaix toertocht', icon: '🚴', who: 'Stijn', note: 'Paris-Roubaix Challenge; datum nog niet officieel bevestigd. R&L bij Stijn: opvang regelen' },
  { start: '2027-04-11', end: '2027-04-11', type: 'weekend',    wie: 'stijn',   title: 'Parijs-Roubaix – elitekoers', icon: '🪨', who: 'Stijn' },
  { start: '2027-04-16', end: '2027-04-18', type: 'weekend',    wie: 'samen',   title: 'Amstel Gold Race Valkenburg', icon: '🚴', who: 'Stijn & Marijke', note: 'Thermaetel; tourversie za 17 april' },
  { start: '2027-05-07', end: '2027-05-07', type: 'weekend',    wie: 'samen',   title: 'Rock Affligem', icon: '🎸', who: 'Marijke (Stijn misschien)', voorlopig: true },
  { start: '2027-05-09', end: '2027-05-09', type: 'weekend',    wie: 'marijke', title: 'Kom op tegen Kanker-rit', icon: '🚴', who: 'Marijke', note: 'Mechelen' },
  { start: '2027-05-29', end: '2027-05-29', type: 'werk',       wie: 'marijke', title: 'Kruikenburgse feesten', icon: '🎉', who: 'Marijke', note: 'Basisschool De Brug' },
  { start: '2027-06-05', end: '2027-06-12', type: 'trip',       wie: 'stijn',   title: 'Girona Week', icon: '🇪🇸', who: 'Stijn (alleen)' },
  { start: '2027-07-19', end: '2027-07-26', type: 'trip',       wie: 'samen',   title: 'Zomertripje', icon: '☀️', who: 'Stijn & Marijke', voorlopig: true },
  { start: '2027-08-07', end: '2027-08-13', type: 'trip',       wie: 'stijn',   title: 'Cyclonesreis Pyreneeën', icon: '🚴', who: 'Stijn met de Cyclones' },
  { start: '2027-11-19', end: '2027-11-19', type: 'avond',      wie: 'stijn',   title: 'Zesdaagse Gent', icon: '🚴', who: 'Stijn met de Baroudeurs', note: "'t Kuipke" },
];

/* Terugkerende dagen: één regel per persoon, 'MM-DD'. Hieronder worden ze voor
   elk jaar t/m 2031 (einde van de tijdlijn) als event toegevoegd. */
const VERJAARDAGEN = [
  { day: '01-21', wie: 'marijke', title: 'Verjaardag Ella' },     // °2011
  { day: '03-21', wie: 'stijn',   title: 'Verjaardag Lore' },
  { day: '07-01', wie: 'marijke', title: 'Verjaardag Leon' },     // °2016
  { day: '07-14', wie: 'marijke', title: 'Verjaardag Marijke' },
  { day: '08-28', wie: 'stijn',   title: 'Verjaardag Robbe' },
  { day: '09-05', wie: 'samen',   title: 'samen', icon: '❤️', since: 2026 },   // daten sinds 5 sep 2026 → '1 jaar samen', '2 jaar samen', …
  { day: '10-04', wie: 'stijn',   title: 'Verjaardag Stijn' },
  { day: '10-13', wie: 'marijke', title: 'Verjaardag Manou' },
];
for (let y = 2026; y <= 2031; y++) {
  for (const v of VERJAARDAGEN) {
    if (v.since && y <= v.since) continue;
    const d = `${y}-${v.day}`;
    EVENTS.push({ start: d, end: d, type: 'verjaardag', wie: v.wie, title: v.since ? `${y - v.since} jaar ${v.title}` : v.title, icon: v.icon });
  }
}
