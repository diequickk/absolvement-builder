// =============================================================================
//  ABSOLVEMENT BUILDER — Game Data Configuration
//  src/config/gameData.js
//
//  ★ THIS IS THE ONLY FILE YOU TOUCH ON PATCH DAY ★
//
//  Every weapon stat, scaling coefficient, talent cost, and cap lives here.
//  Components import what they need; changing a number here propagates
//  everywhere automatically. No hunting through component files.
//
//  Structure:
//    PATCH_VERSION   — string label for the current balance patch
//    STATS           — base stat definitions & caps
//    WEAPONS         — weapon entries with base damage + scaling
//    SCALING         — attribute-to-damage scaling tables (like Souls games)
//    TALENTS         — talent tree nodes with costs and effects
//    CLASSES         — starting class base stat arrays
// =============================================================================

export const PATCH_VERSION = '1.0.0'  // update this each patch for UI display

// ---------------------------------------------------------------------------
// Core stat definitions
// Each entry: { label, abbr, min, max, default }
// ---------------------------------------------------------------------------
export const STATS = {
  vitality: {
    label: 'Vitality',
    abbr: 'VIT',
    min: 1,
    max: 99,
    default: 10,
    description: 'Increases max HP.',
  },
  endurance: {
    label: 'Endurance',
    abbr: 'END',
    min: 1,
    max: 99,
    default: 10,
    description: 'Increases stamina and equip load.',
  },
  strength: {
    label: 'Strength',
    abbr: 'STR',
    min: 1,
    max: 99,
    default: 10,
    description: 'Physical damage scaling. Required for heavy weapons.',
  },
  dexterity: {
    label: 'Dexterity',
    abbr: 'DEX',
    min: 1,
    max: 99,
    default: 10,
    description: 'Governs cast speed and finesse weapon scaling.',
  },
  intelligence: {
    label: 'Intelligence',
    abbr: 'INT',
    min: 1,
    max: 99,
    default: 10,
    description: 'Magic damage scaling. Required for sorceries.',
  },
  faith: {
    label: 'Faith',
    abbr: 'FAI',
    min: 1,
    max: 99,
    default: 10,
    description: 'Incantation scaling and holy resistance.',
  },
}

// ---------------------------------------------------------------------------
// Scaling grades → damage multiplier lookup
// Based on a soft-cap curve; edit the breakpoints to rebalance scaling feel.
//
// grade:    letter grade shown in weapon UI (S / A / B / C / D / E)
// softCap:  stat value where returns start diminishing
// hardCap:  stat value above which scaling is minimal
// peakMult: multiplier at softCap (i.e. "ideal investment" reward)
// ---------------------------------------------------------------------------
export const SCALING = {
  S: { grade: 'S', softCap: 40, hardCap: 80, peakMult: 1.40 },
  A: { grade: 'A', softCap: 45, hardCap: 80, peakMult: 1.25 },
  B: { grade: 'B', softCap: 50, hardCap: 80, peakMult: 1.10 },
  C: { grade: 'C', softCap: 55, hardCap: 80, peakMult: 0.90 },
  D: { grade: 'D', softCap: 60, hardCap: 80, peakMult: 0.65 },
  E: { grade: 'E', softCap: 70, hardCap: 80, peakMult: 0.35 },
}

/**
 * Calculate scaled damage contribution for one attribute.
 *
 * @param {number} statValue    — player's current stat level
 * @param {string} scalingGrade — 'S' | 'A' | 'B' | 'C' | 'D' | 'E'
 * @param {number} baseDamage   — weapon's base AR in that damage type
 * @returns {number} additional AR from scaling
 */
export function calcScaling(statValue, scalingGrade, baseDamage) {
  const sc = SCALING[scalingGrade]
  if (!sc) return 0

  let t
  if (statValue <= sc.softCap) {
    // Linear ramp up to soft cap
    t = statValue / sc.softCap
  } else if (statValue <= sc.hardCap) {
    // Diminishing returns between soft and hard cap
    const over = (statValue - sc.softCap) / (sc.hardCap - sc.softCap)
    t = 1 + over * 0.15   // only 15% more gain from soft→hard cap
  } else {
    t = 1.15              // effectively no gain above hard cap
  }

  return Math.floor(baseDamage * sc.peakMult * Math.min(t, 1.15))
}

// ---------------------------------------------------------------------------
// Weapons
// Each entry: { id, name, category, weight, requirements, baseDamage, scaling }
//
// baseDamage: { physical, magic, fire, lightning, holy }  — all default 0
// scaling:    { str, dex, int, fai }  — grade string or null
// requirements: { str, dex, int, fai }  — minimum to wield
// ---------------------------------------------------------------------------
export const WEAPONS = [
  {
    id: 'longsword',
    name: 'Longsword',
    category: 'Straight Sword',
    weight: 4.0,
    requirements: { str: 10, dex: 10, int: 0,  fai: 0 },
    baseDamage:   { physical: 110, magic: 0, fire: 0, lightning: 0, holy: 0 },
    scaling:      { str: 'C', dex: 'C', int: null, fai: null },
  },
  {
    id: 'claymore',
    name: 'Claymore',
    category: 'Greatsword',
    weight: 9.5,
    requirements: { str: 16, dex: 13, int: 0,  fai: 0 },
    baseDamage:   { physical: 138, magic: 0, fire: 0, lightning: 0, holy: 0 },
    scaling:      { str: 'B', dex: 'D', int: null, fai: null },
  },
  {
    id: 'moonveil',
    name: 'Moonveil',
    category: 'Katana',
    weight: 6.0,
    requirements: { str: 12, dex: 18, int: 23, fai: 0 },
    baseDamage:   { physical: 73, magic: 87, fire: 0, lightning: 0, holy: 0 },
    scaling:      { str: 'D', dex: 'C', int: 'S', fai: null },
  },
  // ↑ Add more weapons following the same shape.
]

// ---------------------------------------------------------------------------
// Character classes — starting stat arrays
// ---------------------------------------------------------------------------
export const CLASSES = {
  vagabond: {
    label: 'Vagabond',
    level: 9,
    stats: { vitality: 15, endurance: 11, strength: 14, dexterity: 13, intelligence: 9, faith: 9 },
  },
  wretch: {
    label: 'Wretch',
    level: 1,
    stats: { vitality: 10, endurance: 10, strength: 10, dexterity: 10, intelligence: 10, faith: 10 },
  },
  astrologer: {
    label: 'Astrologer',
    level: 6,
    stats: { vitality: 9, endurance: 9, strength: 8, dexterity: 12, intelligence: 16, faith: 7 },
  },
  // ↑ Add classes following the same shape.
}

// ---------------------------------------------------------------------------
// Talent tree nodes
// ---------------------------------------------------------------------------
export const TALENTS = [
  {
    id: 'ironSkin',
    name: 'Iron Skin',
    tier: 1,
    cost: 2,           // talent points required
    prerequisites: [], // IDs of talents that must be purchased first
    effect: {
      stat: 'vitality',
      flatBonus: 5,
      percentBonus: 0,
    },
    description: '+5 effective Vitality.',
  },
  {
    id: 'swiftStrike',
    name: 'Swift Strike',
    tier: 1,
    cost: 2,
    prerequisites: [],
    effect: {
      stat: 'dexterity',
      flatBonus: 3,
      percentBonus: 0,
    },
    description: '+3 effective Dexterity.',
  },
  {
    id: 'arcaneMastery',
    name: 'Arcane Mastery',
    tier: 2,
    cost: 4,
    prerequisites: ['swiftStrike'],
    effect: {
      stat: 'intelligence',
      flatBonus: 0,
      percentBonus: 0.08,  // 8% scaling bonus
    },
    description: '+8% Intelligence scaling effectiveness.',
  },
  // ↑ Add talents following the same shape.
]

// ---------------------------------------------------------------------------
// Derived stat formulas
// These are functions, not raw numbers, so changing the formula here
// updates every component that calls them.
// ---------------------------------------------------------------------------

/** Max HP from Vitality */
export function calcMaxHP(vitality) {
  if (vitality <= 25) return Math.floor(300 + vitality * 18)
  if (vitality <= 40) return Math.floor(750 + (vitality - 25) * 22)
  return Math.floor(1080 + (vitality - 40) * 12)
}

/** Max Stamina from Endurance */
export function calcMaxStamina(endurance) {
  return Math.floor(80 + endurance * 2.2)
}

/** Equip load from Endurance */
export function calcEquipLoad(endurance) {
  return Math.floor(40 + endurance * 1.5)
}

/** Total AR for a weapon given a stat block */
export function calcWeaponAR(weapon, stats) {
  const { baseDamage, scaling } = weapon
  let ar = baseDamage.physical + baseDamage.magic + baseDamage.fire + baseDamage.lightning + baseDamage.holy

  if (scaling.str) ar += calcScaling(stats.strength,     scaling.str, baseDamage.physical)
  if (scaling.dex) ar += calcScaling(stats.dexterity,    scaling.dex, baseDamage.physical)
  if (scaling.int) ar += calcScaling(stats.intelligence, scaling.int, baseDamage.magic)
  if (scaling.fai) ar += calcScaling(stats.faith,        scaling.fai, baseDamage.holy)

  return ar
}
// 🔗 Name Bridge Links to stop BuildCalculator from crashing
export const gamePatchInfo = { currentPatch: PATCH_VERSION };
export const gameAttributes = Object.values(STATS);
export const gameWeapons = []; // Temporary blank placeholder array
