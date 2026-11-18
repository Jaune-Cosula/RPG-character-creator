// ============================================================
// app.js — UI wiring for Northern Hero Forge
// ============================================================

import { HOMELANDS, OCCUPATIONS } from './data.js';
import { generateCharacter, buildPortraitPrompt } from './generator.js';

const $ = (sel) => document.querySelector(sel);

const els = {
  btnRandom: $('#btn-random'),
  btnGuided: $('#btn-guided'),
  guided: $('#guided-controls'),
  inCulture: $('#in-culture'),
  inHomeland: $('#in-homeland'),
  inGender: $('#in-gender'),
  inAge: $('#in-age'),
  inOccupation: $('#in-occupation'),
  btnPrint: $('#btn-print'),
  btnCopyPrompt: $('#btn-copy-prompt'),
  btnSave: $('#btn-save'),
  btnExport: $('#btn-export'),
  btnClearSaved: $('#btn-clear-saved'),
  savedList: $('#saved-list'),
  sheet: $('#sheet'),
};

let current = null;

// ---------- populate guided dropdowns ----------
function populateDropdowns() {
  els.inHomeland.innerHTML = '<option value="any">Forge it for me</option>';
  els.inOccupation.innerHTML = '<option value="any">Forge it for me</option>';
  for (const h of HOMELANDS) {
    const opt = document.createElement('option');
    opt.value = h.id;
    opt.textContent = h.name;
    els.inHomeland.appendChild(opt);
  }
  for (const o of OCCUPATIONS) {
    const opt = document.createElement('option');
    opt.value = o.id;
    opt.textContent = o.label;
    els.inOccupation.appendChild(opt);
  }
}

function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// ---------- collect guided options ----------
function readOptions() {
  return {
    culture: els.inCulture.value,
    homeland: els.inHomeland.value,
    gender: els.inGender.value,
    ageBracket: els.inAge.value,
    occupation: els.inOccupation.value,
  };
}

// ---------- render ----------
function statTable(stats) {
  const order = ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'APP'];
  return `<table class="stat-table">
    <thead><tr>${order.map((k) => `<th>${k}</th>`).join('')}</tr></thead>
    <tbody><tr>${order.map((k) => `<td>${stats[k]}</td>`).join('')}</tr></tbody>
  </table>`;
}

function equipmentList(items) {
  return `<ul class="gear-list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

function renderSheet(c) {
  const portraitPrompt = buildPortraitPrompt(c);
  const cultureWord = c.homeland.culture === 'finland' ? 'Kalevalan lands' : 'Norse kingdoms';

  els.sheet.innerHTML = `
    <article class="sheet" id="print-sheet">
      <header class="sheet-head">
        <div class="sheet-title">
          <p class="sheet-culture">${esc(cultureWord)} · ${esc(c.homeland.name)}</p>
          <h2 class="sheet-name">${esc(c.name.full)}</h2>
          <p class="sheet-sub">${esc(c.occupation.label)} · ${esc(String(c.age))} winters · ${esc(c.gender === 'female' ? 'Woman' : 'Man')}</p>
        </div>
        <div class="sheet-portrait" title="Portrait">${portraitSvg(c)}</div>
      </header>

      <section class="sheet-block">
        <h3>Attributes</h3>
        ${statTable(c.stats)}
        <div class="derived">
          <div><span class="d-label">Hit Points</span><span class="d-value">${c.derived.hitPoints}</span></div>
          <div><span class="d-label">Magic Points</span><span class="d-value">${c.derived.magicPoints}</span></div>
          <div><span class="d-label">Damage Bonus</span><span class="d-value">${esc(c.derived.damageBonus)}</span></div>
        </div>
      </section>

      <section class="sheet-block">
        <h3>Homeland</h3>
        <p>${esc(c.homeland.flavor)}</p>
      </section>

      <section class="sheet-block sheet-cols">
        <div>
          <h3>Occupation</h3>
          <p><strong>${esc(c.occupation.label)}</strong></p>
          <p class="muted">${esc(c.occupation.tagline)}</p>
        </div>
        <div>
          <h3>Wealth</h3>
          <p>${c.wealth.pelts} squirrel pelts · ${c.wealth.silver} silver pennies</p>
        </div>
      </section>

      <section class="sheet-block">
        <h3>Equipment</h3>
        ${equipmentList(c.equipment)}
      </section>

      <section class="sheet-block">
        <h3>Personality</h3>
        <p>${c.personality.traits.map(esc).join('; ')}.</p>
        <p><em>Tell:</em> ${esc(c.personality.quirk)}.</p>
        <p><em>Wants:</em> ${esc(c.personality.motivation)}.</p>
      </section>

      <section class="sheet-block">
        <h3>Background</h3>
        <p>${esc(c.background)}</p>
      </section>

      <section class="sheet-block prompt-block">
        <h3>Portrait Prompt</h3>
        <p class="prompt-text">${esc(portraitPrompt)}</p>
      </section>
    </article>
  `;
}

function portraitSvg(c) {
  const hairStyle = c.gender === 'female'
    ? '<path d="M40 34 C30 34 26 46 27 62 C28 76 24 86 22 94 L78 94 C76 86 72 76 73 62 C74 46 70 34 60 34 Z" fill="#2a1f16"/>'
    : '<path d="M34 36 C34 26 48 22 56 24 C68 27 70 38 68 48 C66 40 60 36 50 37 C42 38 36 42 34 50 Z" fill="#2a1f16"/><path d="M30 44 C34 40 40 40 44 43 L44 50 C38 48 33 46 30 44 Z" fill="#2a1f16"/>';
  const cloakColor = c.homeland.culture === 'finland' ? '#5a3a24' : '#3c4a5c';
  return `
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder portrait">
    <rect width="100" height="100" fill="#e8dcc0"/>
    <path d="M0 100 L0 78 C18 68 30 72 50 72 C70 72 82 68 100 78 L100 100 Z" fill="${cloakColor}"/>
    <circle cx="50" cy="50" r="18" fill="#c9a77c"/>
    ${hairStyle}
    <circle cx="44" cy="50" r="1.3" fill="#2a1f16"/>
    <circle cx="56" cy="50" r="1.3" fill="#2a1f16"/>
    <path d="M44 59 Q50 62 56 59" stroke="#2a1f16" stroke-width="1.2" fill="none"/>
  </svg>`;
}

// ---------- longhouse (saved characters) ----------
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem('nhf-saved') ?? '[]');
  } catch {
    return [];
  }
}

function persistSaved(list) {
  localStorage.setItem('nhf-saved', JSON.stringify(list));
}

function renderSaved() {
  const saved = loadSaved();
  if (saved.length === 0) {
    els.savedList.innerHTML = '<p class="muted">Nothing by the fire yet.</p>';
    return;
  }
  els.savedList.innerHTML = saved.map((c, i) => `
    <div class="saved-item">
      <button class="saved-load" data-index="${i}" type="button">${esc(c.name.plain)}</button>
      <button class="saved-del" data-index="${i}" type="button" aria-label="Delete">✕</button>
    </div>
  `).join('');

  els.savedList.querySelectorAll('.saved-load').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      current = loadSaved()[idx];
      renderSheet(current);
    });
  });
  els.savedList.querySelectorAll('.saved-del').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      const list = loadSaved();
      list.splice(idx, 1);
      persistSaved(list);
      renderSaved();
    });
  });
}

// ---------- toast ----------
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('shown'), 10);
  setTimeout(() => t.remove(), 2400);
}

// ---------- events ----------
els.btnRandom.addEventListener('click', () => {
  current = generateCharacter();
  renderSheet(current);
});

els.btnGuided.addEventListener('click', () => {
  current = generateCharacter(readOptions());
  renderSheet(current);
});

els.btnPrint.addEventListener('click', () => {
  if (!current) {
    toast('Forge a character first.');
    return;
  }
  window.print();
});

els.btnCopyPrompt.addEventListener('click', async () => {
  if (!current) {
    toast('Forge a character first.');
    return;
  }
  const prompt = buildPortraitPrompt(current);
  try {
    await navigator.clipboard.writeText(prompt);
    toast('Portrait prompt copied.');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = prompt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    toast('Portrait prompt copied.');
  }
});

els.btnSave.addEventListener('click', () => {
  if (!current) {
    toast('Forge a character first.');
    return;
  }
  const list = loadSaved();
  list.unshift(current);
  persistSaved(list.slice(0, 30));
  renderSaved();
  toast('Saved by the fire.');
});

els.btnExport.addEventListener('click', () => {
  if (!current) {
    toast('Forge a character first.');
    return;
  }
  const blob = new Blob([JSON.stringify(current, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${current.name.plain.replaceAll(' ', '_')}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

els.btnClearSaved.addEventListener('click', () => {
  persistSaved([]);
  renderSaved();
  toast('Hearth swept.');
});

els.inCulture.addEventListener('change', () => {
  // narrow homeland dropdown reasonably, without deleting manual choice
  const culture = els.inCulture.value;
  for (const opt of els.inHomeland.options) {
    if (opt.value === 'any') continue;
    const h = HOMELANDS.find((x) => x.id === opt.value);
    opt.hidden = culture !== 'any' && h.culture !== culture;
  }
});

// ---------- init ----------
populateDropdowns();
renderSaved();
