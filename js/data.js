// ============================================================
// data.js — Cultural & setting data for Northern Hero Forge
// Kalevalan Finland + Viking Age Scandinavia
// ============================================================

export const GENDERS = ['male', 'female'];

// ---------- Homelands ----------
// bias: small stat nudges applied after the core rolls.
export const HOMELANDS = [
  {
    id: 'hame', name: 'Häme (Tavastia)', culture: 'finland',
    flavor: 'Inland bear-country of hill-forts, tar-burners and smoke saunas. The Tavastians guard their forests jealously and speak of the bear as kin, never as beast.',
    bias: { STR: 1, CON: 1 },
  },
  {
    id: 'savo', name: 'Savo', culture: 'finland',
    flavor: 'A maze of lakes and private waters, where slash-and-burn clearings open the spruce and the eränkävijä wilderness-men hold ancient trapping rights by word of mouth.',
    bias: { DEX: 1, SIZ: 1 },
  },
  {
    id: 'karelia', name: 'Karelia', culture: 'finland',
    flavor: 'Eastern borderlands where the sagas of Pohjola are alive and disputed — kanteles are carved, charms are sung over cattle, and the mist off the lake sometimes carries an unfamiliar canoe.',
    bias: { POW: 1, INT: 1 },
  },
  {
    id: 'varsinaisuomi', name: 'Varsinais-Suomi (Finland Proper)', culture: 'finland',
    flavor: 'The south-west coast and its river mouths, where Norse traders beach their keels and two faiths, two tongues and two currencies crowd the same market-smoke.',
    bias: { INT: 1, APP: 1 },
  },
  {
    id: 'pohjanmaa', name: 'Pohjanmaa (Ostrobothnia)', culture: 'finland',
    flavor: 'Flat river plains opening north, where fur-tax sledges vanish toward Pohjola and nobody whistles on the water after dark — Louhi\'s daughters are said to skim the reeds.',
    bias: { CON: 1, POW: 1 },
  },
  {
    id: 'eramaat', name: 'Sápmi border wilderness', culture: 'finland',
    flavor: 'The deep winter country north of the fells, travelled with Sámi kin; those who winter there come back leaner, quieter, and full of songs no karelian will trade for.',
    bias: { CON: 2, DEX: 1, SIZ: -1 },
  },
  {
    id: 'norway', name: 'Norway', culture: 'scandinavia',
    flavor: 'Fjord-country of hanging farms and petty kings, where a good ship is a lineage and an oath to a jarl outweighs a mortgage on the land.',
    bias: { STR: 1, CON: 1, APP: -1 },
  },
  {
    id: 'denmark', name: 'Denmark', culture: 'scandinavia',
    flavor: 'The old raid-road south. Market-towns ring with a dozen tongues, tribute keeps the peace poorly, and every second farmer has a Norse axe in the rafters and a memory of the west.',
    bias: { SIZ: 1, APP: 1, INT: -1 },
  },
  {
    id: 'svealand', name: 'Sweden (Svealand)', culture: 'scandinavia',
    flavor: 'Land of Uppsala\'s great temple and its hanging offerings — oath-sworn thing-meetings, king-making bogs, and traders who row their furs down the Russian rivers.',
    bias: { CON: 1, POW: 1 },
  },
  {
    id: 'gotland', name: 'Gotland', culture: 'scandinavia',
    flavor: 'A trader\'s island studded with silver-hoards and picture stones; Gotlanders speak to both empires and fight like islanders — on the beach, before you land.',
    bias: { INT: 2, STR: -1 },
  },
];

// ---------- Names ----------
export const NAMES = {
  finland: {
    male: ['Ahti','Antti','Eero','Hannu','Ilmari','Jouko','Jussi','Kaapo','Kalevi','Kyösti','Lauri','Mikko','Ohto','Pekka','Reijo','Seppo','Tapani','Tapio','Tero','Tuomas','Untamo','Unto','Väinö','Aslak','Aarne'],
    female: ['Aino','Aila','Anna','Helmi','Ilta','Kaisa','Kerttu','Kyllikki','Liisa','Marjatta','Maria','Outi','Sinikka','Sirja','Sanelma','Tellervo','Terhi','Tuulikki','Vellamo','Vilja','Aune','Tarja'],
    byname: [
      { fi: 'Karhunkäpälä', en: 'Bear-Paw' },
      { fi: 'Ilvesjalka', en: 'Lynx-Leg' },
      { fi: 'Sudenmieli', en: 'Wolf-Mind' },
      { fi: 'Raudanherja', en: 'Iron-Taunter' },
      { fi: 'Vakasuu', en: 'Quiet-Mouth' },
      { fi: 'Jokisuussa syntynyt', en: 'Born at the River-Mouth' },
      { fi: 'Pitkäkeho', en: 'Long-Shanks' },
      { fi: 'Neljäntalven kulkija', en: 'Four-Winter Wanderer' },
      { fi: 'Kettusilmä', en: 'Fox-Eye' },
      { fi: 'Honkajalka', en: 'Pine-Runner' },
      { fi: 'Yönsydän', en: 'Night-Heart' },
      { fi: 'Salakuljettaja', en: 'Smuggler of Charms' },
    ],
    place: ['Rustenjärvi','Kaitaselkä','Honkajärvi','Mustanlammen savupirtti','Suvasvesi','Pihlajavesi','Kalmistonniemi','Jämijärvi','Lohtajan ranta','Hätävuori'],
  },
  scandinavia: {
    male: ['Ragnar','Björn','Eiríkr','Haraldr','Sigurðr','Úlfr','Ketill','Leifr','Ívarr','Gunnarr','Óláfr','Hálfdan','Gormr','Sveinn','Tryggvi','Eysteinn','Hrólfr','Oddr'],
    female: ['Astríðr','Sigríðr','Gunnhildr','Þýra','Hlíf','Ingiríðr','Freydís','Guðrún','Áslaug','Solveigr','Þóra','Yrsa','Bera','Þuríðr'],
    byname: [
      'the Oath-Keeper','Raven-Fed','the Quiet','Wolf-Touched','Seawolf','Serpent-Tongue','Bone-Caster','the Late','the Kind','Ironside\'s Kin','Falconsight','the Unwashed','Snake-in-the-Keel','Bearsark-Whelp',
    ],
    place: ['Hedeby','Kaupang','Birka','Sigtuna','Tunsberg','Garda on the Russian rivers','Vík','Jórvík','Frostfell farm','Saltvík'],
  },
};

// ---------- Occupations ----------
// wealth: [squirrel pelts min, max], [silver pennies min, max]
export const OCCUPATIONS = [
  // --- Kalevalan lands ---
  {
    id: 'talonpoika', label: 'Talonpoika (Freeholder Farmer)', culture: 'finland',
    tagline: 'Smoke-sauna, rye, and a pride older than the village fence.',
    mods: { CON: 1, SIZ: 1, STR: 1 },
    equipment: ['rye sickle','burnt-clearing axe','hide grain-sack','birch-bark shoes','boiled-wool coat','charm-stick above the door (carved by grandmother)'],
    wealth: [6, 18, 1, 6],
  },
  {
    id: 'seppa', label: 'Seppä (Smith)', culture: 'finland',
    tagline: 'Sings to the fire the way Ilmarinen sang to the Sampo.',
    mods: { STR: 2, CON: 1 },
    equipment: ['travelling anvil-stone','tongs and bloom-iron scraps','quenching trough (runed)','leather burn-apron','three iron nails "for the door of a friend"'],
    wealth: [8, 24, 3, 14],
  },
  {
    id: 'tietaja', label: 'Tietäjä (Wise One)', culture: 'finland',
    tagline: 'Knows the birth-charm of fire and the binding-words of bears.',
    mods: { POW: 2, INT: 1 },
    equipment: ['kantele (lime-wood, five strings)','charcoal and birch-stick ink','copper rattle-ring','bundle of contradicting charms, carefully labelled','walrus-tooth whistle'],
    wealth: [5, 14, 6, 20],
  },
  {
    id: 'runonlaulaja', label: 'Runonlaulaja (Rune-Singer)', culture: 'finland',
    tagline: 'Holds a whole winter-house still with a single half-line.',
    mods: { POW: 1, INT: 1, APP: 1 },
    equipment: ['kantele or five-stringed jouhikko','wax-sealed poem-sticks','fine walrus-ivory buckle','wool travel-cape','eating-knife with a hated loan-maker\'s mark'],
    wealth: [5, 16, 4, 16],
  },
  {
    id: 'metsastaja', label: 'Metsästäjä (Wilderness Hunter)', culture: 'finland',
    tagline: 'Lives more in the erämaa than the village, and prefers it.',
    mods: { DEX: 2, CON: 1 },
    equipment: ['birch self-bow and 20 arrows','bear-spear with antler butt','bark-float game net','snare wire','smoked elk-haunch (travelling ration)'],
    wealth: [10, 30, 2, 8],
  },
  {
    id: 'kalastaja', label: 'Kalastaja (Fisher)', culture: 'finland',
    tagline: 'Reads weather in the sedge and fear in the water.',
    mods: { CON: 2, DEX: 1 },
    equipment: ['sewn spruce-bark canoe','net of elm-bark twine','copper (Ladoga) fish-gaff','seal-oil lamp','net-charm woven by an aunt'],
    wealth: [8, 22, 2, 9],
  },
  {
    id: 'vaihtomies', label: 'Vaihtomies (Fur Trader)', culture: 'finland',
    tagline: 'Weighs squirrel pelts to the fourth claw and never forgets a face.',
    mods: { INT: 2, APP: 1 },
    equipment: ['hand-balance scale','brass weight-set (some suspect)','fur-sledge drawn by two dogs','lead money-hoard box','talking-charm for strangers'],
    wealth: [14, 40, 10, 40],
  },
  {
    id: 'soturi', label: 'Soturi (Warman of the Chief)', culture: 'finland',
    tagline: 'Shields the home-plain and drinks second to the chief — by rule.',
    mods: { STR: 1, DEX: 1, CON: 1 },
    equipment: ['spear with socketed iron head','round shield of linden with iron boss','short seax','helmet-ridge cap of hardened leather','war-charm belt (bear-claw plaques)'],
    wealth: [8, 22, 5, 18],
  },
  {
    id: 'karjapaimen', label: 'Karjapaimen (Cattle Herder)', culture: 'finland',
    tagline: 'Sings the cattle to sleep and the wolves to the far wood.',
    mods: { CON: 1, SIZ: 1, POW: 1 },
    equipment: ['crooked birch staff','circle-bell collar set','milk-pail and butter-box','cattle-tending charms','moss-lined winter boots'],
    wealth: [6, 15, 1, 5],
  },
  // --- Norse ---
  {
    id: 'bonde', label: 'Bonde (Freeholder)', culture: 'scandinavia',
    tagline: 'Speaks at the thing, owes no man, and dares you to test it.',
    mods: { STR: 1, CON: 1, SIZ: 1 },
    equipment: ['iron-shod farming spear','oaken ale-bowl','two-horned sheep (his best)','roof-peg knife','whetstone worn to a crescent'],
    wealth: [10, 26, 6, 24],
  },
  {
    id: 'smidr', label: 'Smiðr (Smith)', culture: 'scandinavia',
    tagline: 'Hammer-shouldered and hearth-scented, paid in silence.',
    mods: { STR: 2, CON: 1 },
    equipment: ['folded blade-blank (unfinished, on purpose)','travelling hammer and tongs','wolves-tooth flux horn','charcoal satchel','arm-ring of his own make'],
    wealth: [9, 26, 8, 30],
  },
  {
    id: 'skald', label: 'Skald', culture: 'scandinavia',
    tagline: 'Can make a coward charming and a jarl immortal — for a fee.',
    mods: { INT: 2, APP: 1 },
    equipment: ['drinking-horn gift from a minor king','rune-stick drafts of a half-drápa','silver-wound harp pin','travel-scraps of vellum','memory-knot cord'],
    wealth: [6, 18, 8, 32],
  },
  {
    id: 'volva', label: 'Völva / Seiðr-worker', culture: 'scandinavia',
    tagline: 'Sits on the high seat and sells tomorrow at winter\'s first fence.',
    mods: { POW: 2, INT: 1 },
    equipment: ['iron staff with brass cage-knob','skin pouch of seed-charms','walrus-ivory séance-chair charm','blue-glass amulet','cat-fur trim ("do not ask whose")'],
    wealth: [5, 14, 9, 36],
  },
  {
    id: 'veidimadr', label: 'Veiðimaðr (Hunter)', culture: 'scandinavia',
    tagline: 'Knows which headland the seal will choose by tide and temper.',
    mods: { DEX: 2, CON: 1 },
    equipment: ['yew hunting-bow','skin-edged snow-shoe pair','gull-egg gathering line','seal-spear with toggle-head','restored (twice) leather skiff'],
    wealth: [10, 30, 3, 10],
  },
  {
    id: 'farmadr', label: 'Kaupmaðr (Sea-Trader)', culture: 'scandinavia',
    tagline: 'Has docked at four markets this year and lied well at three.',
    mods: { INT: 2, CON: 1 },
    equipment: ['share of a knarr\'s cargo (furs, tar, whetstones)','steelyard scale','Runic ledger-stick','blue glass trade-beads','feather-down pillow (ultimate luxury)'],
    wealth: [12, 34, 12, 45],
  },
  {
    id: 'vikingr', label: 'Víkingr (Raider)', culture: 'scandinavia',
    tagline: 'Went west on the strength of one good summer and one bad lie.',
    mods: { STR: 1, DEX: 1, CON: 1 },
    equipment: ['sword of mixed fame','round shield with two generations of dents','spear and throwing-darts','sea-chest with a false bottom','captured Frankish belt'],
    wealth: [9, 28, 10, 38],
  },
  {
    id: 'huskarl', label: 'Húskarl (Household Warrior)', culture: 'scandinavia',
    tagline: 'Swallowed an oath with his first winter ale and kept it since.',
    mods: { STR: 2, SIZ: 1 },
    equipment: ['chieftain-gift axe (decorated)','mail shirt (patched at the hip)','ash spear','helm with nasal bar','lord\'s hall-token (safe-passage)'],
    wealth: [8, 20, 10, 30],
  },
];

// ---------- Age brackets ----------
export const AGE_BRACKETS = [
  { id: 'young', label: 'Young', min: 15, max: 19, mods: { SIZ: -1, STR: -1 } },
  { id: 'adult', label: 'In prime', min: 20, max: 39, mods: {} },
  { id: 'middle', label: 'Seasoned', min: 40, max: 59, mods: { DEX: -1, INT: 1 } },
  { id: 'elder', label: 'Grey', min: 60, max: 78, mods: { DEX: -2, CON: -1, INT: 1, POW: 1 } },
];

// ---------- Personality pools ----------
export const PERSONALITY = {
  virtues: [
    'steady under grief','generous to strangers and suspicious of friends','unbreakably loyal to the fire that fed them',
    'honest to the point of awkwardness','brave only on behalf of others','endlessly curious about foreign things',
    'patient as a winter lake','oath-fast, never swayed',
  ],
  flaws: [
    'quick to anger over slights to kin','saves everything, shares nothing','cannot sit with silence — fills it with talk',
    'superstitious about single wrongs never righted','proud past the point of danger','fear-motivated: caves, deep water, or names spoken at night',
    'trusts cleverness more than people','cannot refuse a direct dare',
  ],
  quirks: [
    'hums old rune-metres while counting','keeps a smooth "worry-egg" in one pocket','never says the bear\'s true name',
    'greets every river quietly, as if owed something','collects foreign coins and refuses to spend them',
    'sleeps with boots half-on, always','whistles only indoors','eats salt before any serious talk',
    'carves a fresh rune-stick every morning','always sits facing the door',
  ],
  motivations: [
    'to be remembered in at least one true song','to buy the family-sauna back from a debt-holder','to see Pohjola with own eyes and return',
    'to avenge a brother lost over winter ice','to earn enough to marry a chosen one from a rival village',
    'to carry the family name onto a rune-stone while still breathing','to escape a feud quietly, forever',
    'to find what the old god-songs actually mean','because the farm supports too many mouths and will not divide',
  ],
};

// ---------- Story fragments ----------
const FAMILY_FIN = [
  'No casual soul: the family kept {place}, a homestead known for its {thing}, until the hard winter of two years ago.',
  'Born to a lineage of {thing}-keepers by {place}; the name is still spoken at käräjät (council) without laughter.',
  'Raised in the {thing}-trade along {place}, apprenticed young after the fever took two older siblings.',
];
const FAMILY_NORSE = [
  'Hails from {place}, from a line that claims (perhaps truthfully) an ancestor named in one king\'s saga.',
  'The family farmed {place} until a jarl\'s tax-finger found them; some went to sea rather than to serfdom.',
  'Spent childhood at {place} learning {thing} from a mother who out-judged any man at the local thing.',
];
const MYTH_FIN = [
  'Grandmother could bind a snakebite with one verse; she taught the rest of the family to sing, but only the sky itself knows if any of it took.',
  'Once, while cutting bog-iron, the family dug up a wooden idol too well carved to be natural. It was returned to the lake. Most of it.',
  'A wandering singer left them half of the Sampo-verses as payment for a night\'s food. The other half remains in Pohjola, presumably.',
  'The family still owes a charm-debt to a bear that chose, one autumn, not to eat the youngest child. Debts like that are never forgotten.',
  'An uncle traded a years\' luck at dice with a stranger whose shadow pointed the wrong way. The uncle drowned. The dice are kept in a lead box.',
];
const MYTH_NORSE = [
  'A grandparent claimed to have traded three verses of their own name to a wandering grey-hooded man for one true sighting of the future. The verses have never been sung since.',
  'The family barrow raised its occupant twice in living memory; both times the doors were re-staked, and both times something was different in the house afterwards.',
  'During their naming-feast, a storm unmatched in the region came inland and dropped sea-shells on the thatch. The skalds have been interpreting it ever since.',
  'A half-brother joined a ship going past the edge of the known maps, and one midwinter evening, a rowing-boat with no crew knocked against the family dock.',
  'The family well was blessed, or cursed, by a völva exiled from the south: everything drawn from it comes up one coin lighter.',
];
const HOOK_FIN = [
  'Now {motivation}, and moving north-west, where the songs say the missing verses live.',
  'Left {place} after an argument over a debt of honour, and refuses to speak of which side of it they stood on.',
  'Travels under the cloak of {occupation} work, but every road bends, somehow, toward Karelia and a name not yet spoken.',
  'Was sent by the village elders to fetch a tietäjä of real power; the elders are still waiting, and the road keeps lengthening.',
  'Carries a carved instruction-stick from a dying grandmother. The runes are smudged. The interpretation is therefore everyone\'s.',
];
const HOOK_NORSE = [
  'Now {motivation}, and taking the first seaworthy keel regardless of destination.',
  'Left {place} one step ahead of a wergild that everyone agrees was unfairly assessed — but everyone also agrees it must be paid.',
  'Signed aboard for one season\'s raiding, intending to retire on it. That was four seasons ago.',
  'Was promised a position in a lord\'s hird by a man who then had a very unlucky boar-hunt.',
  'Carries a rune-stick of instructions from an oath-father. Three of the runes are from an older alphabet that nobody local uses.',
];

export const STORY = {
  finland: { family: FAMILY_FIN, myth: MYTH_FIN, hook: HOOK_FIN },
  scandinavia: { family: FAMILY_NORSE, myth: MYTH_NORSE, hook: HOOK_NORSE },
};

// ---------- Shared travel gear (everyone gets some) ----------
export const COMMON_GEAR = [
  'belly-knife (everyday, sharp)','fire-steel and tinder tin','wool cloak with bone pin',
  'birch-bark water flask','winter moccasins of hide','tin of salt',
];
