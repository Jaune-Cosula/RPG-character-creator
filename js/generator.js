// ============================================================
// generator.js — character generation engine
// RuneQuest-style stats: STR CON SIZ DEX INT POW APP (2d6+6)
// ============================================================

import {
  HOMELANDS, NAMES, OCCUPATIONS, AGE_BRACKETS,
  PERSONALITY, STORY, COMMON_GEAR, GENDERS,
} from './data.js';

const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
const intBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

function roll2d6Plus6() {
  return intBetween(1, 6) + intBetween(1, 6) + 6;
}

export function rollStat() {
  return roll2d6Plus6();
}

function applyMods(stats, mods = {}) {
  const out = { ...stats };
  for (const [k, v] of Object.entries(mods)) {
    out[k] = Math.max(1, (out[k] ?? 10) + v);
  }
  return out;
}

function damageBonus(str, siz) {
  const sum = str + siz;
  if (sum <= 8) return '−1d6';
  if (sum <= 12) return '−1d4';
  if (sum <= 16) return '—';
  if (sum <= 24) return '+1d4';
  if (sum <= 32) return '+1d6';
  if (sum <= 40) return '+2d6';
  return '+3d6';
}

// ---------- names ----------
function buildName(homeland, gender, rng = Math) {
  const pool = NAMES[homeland.culture];
  const first = rnd(pool[gender] ?? pool.male);
  const father = rnd(pool.male);

  if (homeland.culture === 'finland') {
    const suffix = gender === 'female' ? 'tytär' : 'poika';
    const base = `${first} ${father}${suffix}`;
    if (rng.random() < 0.55) {
      const by = rnd(pool.byname);
      return { full: `${base}, ${by.fi} (${by.en})`, plain: base };
    }
    return { full: base, plain: base };
  }

  const suffix = gender === 'female' ? 'sdóttir' : 'sson';
  const base = `${first} ${father}${suffix}`;
  if (rng.random() < 0.55) {
    return { full: `${base} ${rnd(pool.byname)}`, plain: base };
  }
  return { full: base, plain: base };
}

// ---------- wealth ----------
function rollWealth(occupation) {
  const [pMin, pMax, sMin, sMax] = occupation.wealth;
  return {
    pelts: intBetween(pMin, pMax),
    silver: intBetween(sMin, sMax),
  };
}

// ---------- portrait prompt ----------
export function buildPortraitPrompt(c) {
  const cultureWords = c.culture === 'finland'
    ? 'iron-age Finland, Kalevalan culture: wool belt-plaques, bronze spiral ornaments, birch-bark and fur clothing, smoke-sauna village by a lake'
    : 'Viking Age Scandinavia: dyed wool tunic with tablet-woven binders, iron brooches, oiled leather, long-hall and dragon-ship motifs';
  const genderWord = c.gender === 'female' ? 'woman' : 'man';
  return [
    `Painted fantasy character portrait, rune-etched parchment border, muted forest and sea tones, dramatic low firelight.`,
    `${c.name.plain}, a ${c.age}-year-old ${genderWord} of ${c.homeland.name}.`,
    `Occupation: ${c.occupation.label} — ${c.occupation.tagline}`,
    `Appearance reads as: ${c.personality.traits.join(', ')}; bearing suggests ${c.personality.motivation}.`,
    `Setting: ${cultureWords}.`,
    `Half-body portrait facing the viewer, faithful period material culture, no modern elements, painterly oil style.`,
  ].join(' ');
}

// ---------- main ----------
export function generateCharacter(options = {}) {
  const {
    culture = 'any',
    homeland: homelandId = 'any',
    gender = 'any',
    ageBracket = 'any',
    occupation: occupationId = 'any',
  } = options;

  // homeland
  let candidates = HOMELANDS;
  if (culture !== 'any') candidates = candidates.filter((h) => h.culture === culture);
  if (homelandId !== 'any') candidates = candidates.filter((h) => h.id === homelandId);
  if (candidates.length === 0) candidates = HOMELANDS.filter((h) => h.culture === 'finland');
  const homeland = rnd(candidates);

  // gender
  const g = gender === 'any' ? rnd(GENDERS) : gender;

  // occupation (fallback properly: occupation may be from the other culture, accept nearest match)
  let occCandidates = OCCUPATIONS.filter((o) => o.culture === homeland.culture);
  if (occupationId !== 'any') {
    const chosen = OCCUPATIONS.find((o) => o.id === occupationId);
    if (chosen) occCandidates = [chosen];
  }
  if (occCandidates.length === 0) occCandidates = OCCUPATIONS;
  const occupation = rnd(occCandidates);

  // age
  let bracket;
  const brackets = AGE_BRACKETS;
  if (ageBracket === 'any') {
    // weight towards adult prime
    const weighted = [...brackets, brackets[1], brackets[1]];
    bracket = rnd(weighted);
  } else {
    bracket = brackets.find((b) => b.id === ageBracket) ?? brackets[1];
  }
  const age = intBetween(bracket.min, bracket.max);

  // name
  const name = buildName(homeland, g);

  // stats
  let stats = {};
  for (const key of ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'APP']) {
    stats[key] = roll2d6Plus6();
  }
  stats = applyMods(stats, homeland.bias);
  stats = applyMods(stats, occupation.mods);
  stats = applyMods(stats, bracket.mods);

  // wealth & gear
  const wealth = rollWealth(occupation);
  const chosenGear = [];
  for (const item of occupation.equipment.slice(0, 4)) chosenGear.push(item);
  const commons = [...COMMON_GEAR].sort(() => Math.random() - 0.5).slice(0, 3);
  chosenGear.push(...commons);

  // personality
  const traits = [...PERSONALITY.virtues].sort(() => Math.random() - 0.5).slice(0, 2)
    .concat([...PERSONALITY.flaws].sort(() => Math.random() - 0.5).slice(0, 1));
  const quirk = rnd(PERSONALITY.quirks);
  const motivation = rnd(PERSONALITY.motivations);
  const personality = { traits, quirk, motivation };

  // story
  const storyPools = STORY[homeland.culture];
  const place = rnd(NAMES[homeland.culture].place);
  const thing = occupation.label.split('(')[0].trim().toLowerCase();

  const fill = (tpl) => tpl
    .replaceAll('{place}', place)
    .replaceAll('{thing}', thing)
    .replaceAll('{motivation}', motivation.replace(/^to /, 'to '))
    .replaceAll('{occupation}', occupation.label);

  const background = [
    fill(rnd(storyPools.family)),
    fill(rnd(storyPools.myth)),
    fill(rnd(storyPools.hook)),
  ].join(' ');

  // derived
  const hitPoints = Math.ceil((stats.CON + stats.SIZ) / 2);
  const magicPoints = stats.POW;
  const db = damageBonus(stats.STR, stats.SIZ);

  return {
    version: 1,
    name,
    gender: g,
    age,
    ageBracket: bracket.label,
    homeland: { id: homeland.id, name: homeland.name, culture: homeland.culture, flavor: homeland.flavor },
    occupation,
    stats,
    derived: { hitPoints, magicPoints, damageBonus: db },
    wealth,
    equipment: chosenGear,
    personality,
    background,
  };
}

// Random picks for guided UI
export function randomHomeland(culture = 'any') {
  const cands = culture === 'any' ? HOMELANDS : HOMELANDS.filter((h) => h.culture === culture);
  return rnd(cands).id;
}
export function randomOccupation(culture = 'any') {
  const cands = culture === 'any' ? OCCUPATIONS : OCCUPATIONS.filter((o) => o.culture === culture);
  return rnd(cands).id;
}
