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
};

const EVENTS = [
  { start: '2026-12-18', end: '2026-12-27', type: 'trip', title: 'Skireis St. Anton', icon: '⛷️', who: 'Stijn, Robbe & Lore' },
];
