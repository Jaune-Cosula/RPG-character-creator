// ============================================================
// smoke.mjs — headless sanity check of the generator engine
// Run: node test/smoke.mjs (or: npm test)
// ============================================================

import { generateCharacter, buildPortraitPrompt } from '../js/generator.js';
import { HOMELANDS, OCCUPATIONS } from '../js/data.js';

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.error('FAIL:', msg);
};

const STAT_KEYS = ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'APP'];
const N = 3000;

for (let i = 0; i < N; i += 1) {
  const c = generateCharacter();

  // completeness
  if (!c.name?.plain || !c.name?.full) fail('missing name');
  if (!['male', 'female'].includes(c.gender)) fail(`bad gender: ${c.gender}`);
  if (typeof c.age !== 'number' || c.age < 15 || c.age > 78) fail(`bad age: ${c.age}`);
  if (!c.homeland?.name) fail('missing homeland');
  if (!c.occupation?.label) fail('missing occupation');

  // stat ranges: biased rolls stay within sane bounds
  for (const k of STAT_KEYS) {
    const v = c.stats[k];
    if (!Number.isInteger(v) || v < 1 || v > 24) fail(`stat ${k} out of range: ${v}`);
  }

  // derived
  const expectedHp = Math.ceil((c.stats.CON + c.stats.SIZ) / 2);
  if (c.derived.hitPoints !== expectedHp) fail(`HP mismatch: ${c.derived.hitPoints} vs ${expectedHp}`);
  if (c.derived.magicPoints !== c.stats.POW) fail('MP mismatch');

  // wealth & gear
  if (typeof c.wealth.pelts !== 'number' || c.wealth.pelts < 0) fail('bad pelt wealth');
  if (typeof c.wealth.silver !== 'number' || c.wealth.silver < 0) fail('bad silver wealth');
  if (c.equipment.length < 6) fail(`too little equipment: ${c.equipment.length}`);

  // narrative
  if (!c.personality?.traits?.length || c.personality.traits.length !== 3) fail('bad traits');
  if (!c.personality.quirk || !c.personality.motivation) fail('missing personality bits');
  if (!c.background || c.background.length < 60) fail('background too short');
  if (/\{[a-z]+\}/.test(c.background)) fail(`unfilled placeholder in: ${c.background}`);
  if (!buildPortraitPrompt(c)) fail('empty portrait prompt');
}

// guided options always respected
for (let i = 0; i < 500; i += 1) {
  const c = generateCharacter({ culture: 'finland', gender: 'female', ageBracket: 'elder', occupation: 'tietaja' });
  if (c.homeland.culture !== 'finland') fail('guided culture violated');
  if (c.gender !== 'female') fail('guided gender violated');
  if (c.age < 60) fail('guided age violated');
  if (c.occupation.id !== 'tietaja') fail('guided occupation violated');

  const n = generateCharacter({ homeland: 'norway' });
  if (n.homeland.id !== 'norway') fail('guided homeland violated');

  const s = generateCharacter({ occupation: 'skald' });
  if (s.occupation.id !== 'skald') fail('single-occupation probe violated');
}

// every homeland and occupation is reachable
const seenH = new Set();
const seenO = new Set();
for (let i = 0; i < 20000 && (seenH.size < HOMELANDS.length || seenO.size < OCCUPATIONS.length); i += 1) {
  const c = generateCharacter();
  seenH.add(c.homeland.id);
  seenO.add(c.occupation.id);
}
if (seenH.size !== HOMELANDS.length) fail(`homelands unreachable: ${seenH.size}/${HOMELANDS.length}`);
if (seenO.size !== OCCUPATIONS.length) fail(`occupations unreachable: ${seenO.size}/${OCCUPATIONS.length}`);

if (failures === 0) {
  console.log(`OK — ${N} random + guided probes passed; all ${HOMELANDS.length} homelands and ${OCCUPATIONS.length} occupations reachable.`);
  process.exit(0);
}
console.error(`${failures} failure(s).`);
process.exit(1);
