/* ================================================================
   vriendin.js — kinderregeling van Marijke (Ella, Manou & Leon)
   Basisregel (stand 1 nov 2026):
     - elke week: maandag en dinsdag volledig, woensdag tot de middag
     - woensdagavond en donderdag: geen kinderen
     - weekend om de week: vrijdag na school, zaterdag en zondag
       volledig. In de andere weken ook vrijdag zonder.
       Tot en met week 53 van 2026 zijn dat de ONEVEN ISO-weken
       (ijkpunt: weekend 31 okt – 1 nov 2026, week 44, was zónder).
       Vanaf maandag 4 jan 2027 (CUTOVER_MK, week 1) wisselt dat naar
       de EVEN weken: eerste weekend mét kinderen 16–17 jan 2027,
       weekend 9–10 jan zonder. Zo vallen haar weekends vanaf dan
       samen met die van Robbe & Lore bij Stijn (zelfde omslag in
       kindregeling/regeling.js). Afgesproken 8 nov 2026.
   Een dag krijgt 'full' | 'am' | 'pm' | null  (null = geen kinderen).
   'am' = tot 12u (woensdag), 'pm' = na school (vrijdag).
   Uitzonderingen zeggen enkel het deel van de dag; of dat afwijkend is,
   wordt afgeleid door te vergelijken met base() — zelfde principe als
   dayInfo() in kindregeling/regeling.js.
   Vereist: fmt(), mondayOf() en isoWeekNum() uit kindregeling/regeling.js.
   ================================================================ */

const CUTOVER_MK = '2027-01-04';   // maandag van ISO-week 1 2027: vanaf hier weekends in even weken

const VRIENDIN = {
  id: 'marijke',
  parent: 'Marijke',
  label: 'Ella, Manou & Leon',
  color: { bg: '#dcfce7', bgAfwijking: '#86efac', border: '#16a34a', text: '#14532d' },
  // Tekst per dagdeel, gebruikt door planning/index.html
  partLabels: { full: 'Marijke', am: 'tot 12u', pm: 'na school' },
  vrijLabels: { am: 'vanaf 12u vrij', pm: 'overdag vrij' },

  base(date){
    const wd = (date.getDay() + 6) % 7;          // 0 = maandag … 6 = zondag
    const odd = isoWeekNum(date) % 2 === 1;
    const weekend = fmt(mondayOf(date)) >= CUTOVER_MK ? !odd : odd;   // weekendweek: oneven tot de omslag, even erna
    if (wd <= 1) return 'full';                   // ma, di
    if (wd === 2) return 'am';                    // woe tot 12u
    if (wd === 3) return null;                    // do
    if (wd === 4) return weekend ? 'pm' : null;   // vr na school (weekendweek)
    return weekend ? 'full' : null;               // za, zo
  },

  // Uitzonderingen (chronologisch). Datums 'YYYY-MM-DD', inclusief.
  // part: 'full' | 'am' | 'pm' | null
  exceptions: [
    // voorbeeld: {start:'2026-12-24', end:'2026-12-25', part:'full', label:'🎄 Kerst bij Marijke'},
    // 9 nov 2026: Marijke wisselt weekend 15–17 jan 2027 met 22–24 jan. Zo is ze vrij in hetzelfde weekend
    // dat Robbe & Lore bij Marlies zijn (wissel in regeling.js) → samen vrij 15–17 jan.
    {start:'2027-01-15', end:'2027-01-17', part:null,   label:'Weekend gewisseld'},
    {start:'2027-01-22', end:'2027-01-22', part:'pm',   label:'Wissel terug'},
    {start:'2027-01-23', end:'2027-01-24', part:'full', label:'Wissel terug'},
  ],

  dayInfo(date){
    const iso = fmt(date);
    const ex = this.exceptions.find(e => iso >= e.start && iso <= e.end) || null;
    const base = this.base(date);
    const part = ex ? ex.part : base;
    return { part, afwijkend: ex ? ex.part !== base : false, label: ex ? (ex.label || '') : '' };
  },
};
