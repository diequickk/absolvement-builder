import React, { useState, useMemo, useCallback, useDeferredValue, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Lock, X, Search, ChevronDown, ChevronUp, Check } from "lucide-react";
import { SKILLS, SKILL_ELEMENTS, SKILL_PATHS } from "./skillsData";

const RACE_SKILLS = {
  aranae: { name: 'Web Snare', description: 'Entangle an enemy in webs, preventing dodging and slowing them for 3 seconds.' },
  calvar: { name: 'Detonation', description: 'Trigger an internal explosion dealing AoE damage around you.' },
  cragg: { name: 'Stone Charge', description: 'Charge forward with immense force, knocking back all enemies in your path.' },
  facadae: { name: 'Mimic Form', description: "Temporarily copy a nearby enemy's appearance and basic stats." },
  feriun: { name: 'Blood Sacrifice', description: 'Sacrifice a portion of your HP to greatly empower your next spell cast.' },
  gelidium: { name: 'Slime Coat', description: 'Coat yourself in slime, reducing stun durations and slowing nearby enemies.' },
  katiyr: { name: 'Blur Step', description: 'Perform rapid evasive steps, briefly phasing through incoming attacks.' },
  kixxm: { name: "Nature's Grasp", description: 'Root all nearby enemies with vines for 2 seconds, dealing nature damage.' },
  voidtouched: { name: 'Void Pulse', description: 'Emit a burst of void energy, draining mana from nearby enemies and silencing them.' },
  nespin: { name: 'Surge Dash', description: 'Perform an explosive multi-directional dash, dealing damage to enemies you pass through.' },
};

const RARITY_COLORS = {
  Common: 'bg-gray-800/70 text-gray-200 border border-gray-500/40',
  Uncommon: 'bg-green-900/60 text-green-300 border border-green-500/40',
  Rare: 'bg-blue-900/60 text-blue-300 border border-blue-500/40',
  Unique: 'bg-pink-900/60 text-pink-300 border border-pink-500/40',
  Mythical: 'bg-yellow-900/60 text-yellow-300 border border-yellow-500/40',
  Advanced: 'bg-orange-900/60 text-orange-300',
  Intermediate: 'bg-cyan-900/60 text-cyan-300',
};

const DEFAULT_ELEMENT_COLOR = '#71717a';
const HYBRID_ELEMENT_COLOR = '#DA70D6';
const ARCANE_ELEMENT_COLOR = '#9370DB';
const FIRE_ELEMENT_COLOR = '#FF2A00';

function normalizeElementKey(element) {
  const value = typeof element === 'string' ? element.trim() : '';
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

const RARITY_BORDER_COLORS = {
  Common: '#9CA3AF',
  Uncommon: '#22C55E',
  Rare: '#3B82F6',
  Unique: '#EC4899',
  Mythical: '#FACC15',
};

const RARITY_BY_SKILL_NAME = (() => {
  const map = {};

  const add = (rarity, names) => {
    names.forEach((name) => {
      map[name] = rarity;
    });
  };

  add('Common', [
    'Disarm', 'Reverse Slice', 'Multi-Shot', 'Reckless Leap', 'Serrated Arrow', 'Tendon Slice', 'Pierce',
    'Ash Stomp',
    'Ice Clone', 'Preservation',
    'Distract', 'Gouge', 'Shadowstep',
    'Static Shock',
    'Wind Blast', 'Sweet Symphony', 'Updraft',
    'Scald',
    'Bulb Sprout', 'Poison Arrow',
    'Decaying Slice',
    'Light Steps', 'Lesser Heal', 'Sunbeam', 'Smite',
    'Earthen Wall',
  ]);

  add('Uncommon', [
    'Explosive Arrow',
    'Icicle Eruption', 'Ice Blades',
    'Short Out', 'Thunderstrike', 'Magnetic Pulse',
    'Disorient',
    'Trident Throw', 'Aqua Prison', 'Healing Waters',
    'Swarm', 'Bloom', 'Envenom', 'Root Burst',
    'Famine', 'Black Death',
    'Stone Spike', 'Earth Headbutt',
    'Holy Mirror', 'Whirling Blades', 'Sorrow',
  ]);

  add('Rare', [
    'Execute', 'Focus Shot', 'Bloodlust', 'Rush',
    'Flame Ring', 'Gunpowder Barrel', 'Flame Smash', 'Fire Blast', 'Cataclysm',
    'Cold Breath', 'Subzero Slam', 'Frost Nova',
    'Darkness', 'Shadow Garrote', 'Null', 'Void Dagger', 'Enfeeble', 'Stealth', 'Shackle', 'Hunt',
    'Static Orb', 'Open Circuit', 'Shock Grenade', 'Chain Lightning',
    'Pressure', 'Windweaver', 'Slicing Winds', 'Vortex',
    'Riptide', 'Crushing Depths', 'Crashing Wave', 'Geyser',
    'Symbiosis', 'Sporeblossom', 'Encroaching Vines', 'Ironbark',
    'Fetid Strike', 'Pestulence',
    'Crusading Strike', 'Zeal', 'Persecution', 'Enlightenment', 'Reflection', 'Judgement', 'Holy Wrath',
    'Stoneskin', 'Shatter', 'Crystalline Eruption', 'Curse of Stone', 'Gaia Fist',
    'Glacial Rot',
  ]);

  add('Unique', [
    'Cleave', 'Rapid Fire', 'Volley', 'Shoulder Slam', 'Bear Trap', 'War Banner', 'Rally',
    'Ignition', 'Whirling Flames',
    'Frozen Uppercut', 'Frost Femur Breaker',
    'Haunt', 'Night Slash', 'Reap',
    'Shock Sweep',
    'Palm Strike', 'Wind Vortex', 'Hypoxia',
    'Hydrolance', 'Flood', 'Whirlpool',
    'Briarclash',
    'Ad Mortum', 'Blood Plague', 'Necrotic Rot',
    'Rupture', 'Radiant Light',
    'Quicksand',
    'Holy Flame Charge', 'Rotshade Bolt', 'Obsidian Obelisk', 'Plasma Line', 'Shadowflame Eruption', 'Thunderclap',
  ]);

  add('Mythical', [
    'Chain Pull',
    'Overheat',
    'Everwinter',
    'Regicide',
    'Electric Barrage',
    'Suffocation',
    'Broadside',
    "Nature's Embrace", 'Regeneration',
    'Necropolis', 'Apocalypse', 'Desecrate',
    'Bless', 'Rune of Protection',
    'Uproot',
    'Arcane Arrow', 'Soul Burst', 'Arcane Gateway',
    'Ground Bullet', 'Frozen Cry Pierce',
  ]);

  return map;
})();

function hexToRgba(hex, alpha) {
  const clean = (hex || '').replace('#', '');
  if (clean.length !== 6) return `rgba(113,113,122,${alpha})`;

  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function blendHexColors(hexA, hexB, weight = 0.5) {
  const parseHex = (hex) => {
    const clean = (hex || '').replace('#', '');
    if (clean.length !== 6) return [113, 113, 122];
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  };

  const [ar, ag, ab] = parseHex(hexA);
  const [br, bg, bb] = parseHex(hexB);
  const w = Math.max(0, Math.min(1, weight));

  const r = Math.round(ar * (1 - w) + br * w);
  const g = Math.round(ag * (1 - w) + bg * w);
  const b = Math.round(ab * (1 - w) + bb * w);

  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const ELEMENT_COLOR_MAP = (() => {
  const map = {};

  for (const path of SKILL_PATHS) {
    const categoryKey = normalizeElementKey(path.category);
    if (categoryKey && path.color && !map[categoryKey]) {
      map[categoryKey] = path.color;
    }
  }

  map[normalizeElementKey('Fire')] = FIRE_ELEMENT_COLOR;
  map[normalizeElementKey('Arcane')] = ARCANE_ELEMENT_COLOR;
  map[normalizeElementKey('Hybrid')] = HYBRID_ELEMENT_COLOR;
  return map;
})();

function getElementColor(element) {
  return ELEMENT_COLOR_MAP[normalizeElementKey(element)] || DEFAULT_ELEMENT_COLOR;
}

function getElementBadgeStyle(element) {
  const color = getElementColor(element);
  return {
    borderColor: hexToRgba(color, 0.45),
    background: hexToRgba(color, 0.2),
    color,
  };
}

function getElementFilterStyle(element, isActive) {
  const color = getElementColor(element);
  return {
    borderColor: isActive ? hexToRgba(color, 0.6) : 'rgba(90,90,98,0.6)',
    background: isActive ? hexToRgba(color, 0.24) : 'rgba(0,0,0,0.35)',
    color: isActive ? color : '#9ca3af',
  };
}

const RARITY_ORDER = ['Mythical', 'Unique', 'Rare', 'Uncommon', 'Common'];

function getSkillRarity(skill) {
  return RARITY_BY_SKILL_NAME[skill.name] || 'Common';
}

function getSkillCardBorderStyle(skill, isSelected) {
  const elementColor = getElementColor(skill.element);
  const rarity = getSkillRarity(skill);
  const rarityColor = RARITY_BORDER_COLORS[rarity] || '#9CA3AF';
  const blended = blendHexColors(elementColor, rarityColor, 0.52);

  if (isSelected) {
    return {
      borderColor: hexToRgba(elementColor, 0.95),
      background: `linear-gradient(135deg, ${hexToRgba(elementColor, 0.14)} 0%, ${hexToRgba(rarityColor, 0.18)} 100%)`,
      boxShadow: `0 0 0 1px ${hexToRgba(blended, 0.28)} inset`,
    };
  }

  return {
    borderColor: hexToRgba(elementColor, 0.72),
    background: `linear-gradient(135deg, ${hexToRgba(elementColor, 0.04)} 0%, ${hexToRgba(rarityColor, 0.09)} 100%)`,
  };
}

function getRarityBadgeStyle(rarity) {
  const color = RARITY_BORDER_COLORS[rarity] || '#9CA3AF';
  return {
    borderColor: hexToRgba(color, 0.52),
    background: hexToRgba(color, 0.18),
    color,
  };
}

const SkillCard = React.memo(function SkillCard({ skill, isSelected, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const rarity = useMemo(() => getSkillRarity(skill), [skill]);
  const cardStyle = useMemo(() => getSkillCardBorderStyle(skill, isSelected), [skill, isSelected]);
  const elementBadgeStyle = useMemo(() => getElementBadgeStyle(skill.element), [skill.element]);
  const rarityBadgeStyle = useMemo(() => getRarityBadgeStyle(rarity), [rarity]);
  const handleCardClick = useCallback(() => onToggle(skill), [onToggle, skill]);

  return (
    <div className="rounded border transition-all hover:brightness-110" style={cardStyle}>
      <div
        className="flex items-start gap-3 p-3 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className={`mt-0.5 w-5 h-5 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all ${
          isSelected ? 'bg-white/20 border-white/50' : 'border-gray-600'
        }`}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="text-white text-sm font-medium">{skill.name}</span>
            {skill.tag && (
              <Badge className="text-[10px] px-1 py-0 bg-zinc-700 text-zinc-300">{skill.tag}</Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mb-1.5">
            <Badge
              className="text-[10px] px-1.5 py-0 border"
              style={elementBadgeStyle}
            >
              {skill.element}
            </Badge>
            <Badge className="text-[10px] px-1.5 py-0 border" style={rarityBadgeStyle}>
              {rarity}
            </Badge>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{skill.description}</p>
        </div>
        {skill.upgrades.length > 0 && (
          <button
            type="button"
            className="text-gray-500 hover:text-gray-300 flex-shrink-0 mt-0.5"
            onClick={(e) => { e.stopPropagation(); setExpanded(v => !v); }}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {expanded && skill.upgrades.length > 0 && (
        <div className="px-3 pb-3 space-y-1.5 border-t border-gray-800 pt-2">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Upgrade Potentials</p>
          {skill.upgrades.map((upg, i) => (
            <div key={i} className="flex items-start gap-2">
              <Badge className={`text-[9px] px-1.5 py-0 flex-shrink-0 mt-0.5 ${RARITY_COLORS[upg.rarity] || 'bg-zinc-700 text-zinc-400'}`}>
                {upg.rarity}
              </Badge>
              <div>
                <span className="text-gray-300 text-xs font-medium">{upg.name}</span>
                {upg.locks && upg.locks.length > 0 && (
                  <span className="text-red-400 text-[10px] ml-1">(locks: {upg.locks.join(', ')})</span>
                )}
                <p className="text-gray-500 text-[11px]">{upg.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.skill === nextProps.skill && prevProps.isSelected === nextProps.isSelected;
});

export default function Skills({ selected, onChange, race }) {
  const raceSkill = race ? RACE_SKILLS[race] : null;
  const MAX_SKILLS = 9;
  const raceSlotCount = raceSkill ? 1 : 0;
  const freeSlots = MAX_SKILLS - raceSlotCount;

  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [elementFilter, setElementFilter] = useState('All');

  // selected is an array of skill IDs
  const selectedIds = useMemo(() => new Set(selected || []), [selected]);
  const selectedRef = useRef(selected || []);

  useEffect(() => {
    selectedRef.current = selected || [];
  }, [selected]);

  const handleToggle = useCallback((skill) => {
    const current = selectedRef.current;
    const isAlreadySelected = current.includes(skill.id);

    if (isAlreadySelected) {
      onChange(current.filter(id => id !== skill.id));
    } else {
      if (current.length >= freeSlots) return;
      onChange([...current, skill.id]);
    }
  }, [onChange, freeSlots]);

  const filteredSkills = useMemo(() => {
    const q = deferredSearch.toLowerCase().trim();
    return SKILLS.filter(s => {
      const matchesElement = elementFilter === 'All' || s.element === elementFilter;
      const matchesSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.element.toLowerCase().includes(q) ||
        s.upgrades.some(u => u.name.toLowerCase().includes(q));
      return matchesElement && matchesSearch;
    });
  }, [deferredSearch, elementFilter]);

  // Group by element then rarity
  const grouped = useMemo(() => {
    const map = {};
    filteredSkills.forEach(s => {
      const rarity = getSkillRarity(s);
      if (!map[s.element]) map[s.element] = {};
      if (!map[s.element][rarity]) map[s.element][rarity] = [];
      map[s.element][rarity].push(s);
    });

    Object.values(map).forEach((rarityMap) => {
      Object.values(rarityMap).forEach((skills) => {
        skills.sort((a, b) => a.name.localeCompare(b.name));
      });
    });

    return map;
  }, [filteredSkills]);

  const selectedSkills = useMemo(() => SKILLS.filter(s => selectedIds.has(s.id)), [selectedIds]);
  const totalUsed = selectedSkills.length + raceSlotCount;

  return (
    <div className="space-y-4">
      {/* Dev Note */}
      <div className="rounded p-3 text-xs" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', color: '#ca8a04' }}>
        <span style={{ fontWeight: 700 }}>⚠ Dev Note: </span>
        There are skill interactions between certain elements that are not fully documented here. The list is also incomplete — the game is still adding more skills and interactions regularly.
      </div>
      {/* Selected skills summary */}
      <Card style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(200,200,208,0.15)' }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm" style={{ fontFamily: 'Cinzel, serif' }}>
              Selected Skills
            </CardTitle>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              {totalUsed} / {MAX_SKILLS}
            </Badge>
          </div>
          {raceSkill && (
            <div className="flex items-center gap-2 mt-2 bg-zinc-800/50 border border-gray-700 rounded p-2">
              <Lock className="w-3 h-3 text-gray-500 flex-shrink-0" />
              <div>
                <span className="text-gray-400 text-xs">{raceSkill.name}</span>
                <span className="text-gray-600 text-xs ml-2">(Racial — auto)</span>
              </div>
            </div>
          )}
        </CardHeader>
        {selectedSkills.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1.5">
              {selectedSkills.map(s => (
                <div key={s.id} className="flex items-center gap-1 bg-zinc-800 border border-gray-700 rounded px-2 py-1">
                  <span className="text-white text-xs">{s.name}</span>
                  <button onClick={() => handleToggle(s)} className="text-gray-500 hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Filters */}
      <Card style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(200,200,208,0.15)' }}>
        <CardContent className="pt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-black/50 border-gray-700 text-white placeholder:text-gray-600"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...SKILL_ELEMENTS].map(el => (
              <button
                key={el}
                onClick={() => setElementFilter(el)}
                className="text-xs px-2 py-1 rounded border transition-all hover:brightness-110"
                style={{
                  ...(el === 'All'
                    ? {
                        borderColor: elementFilter === el ? 'rgba(255,255,255,0.3)' : 'rgba(90,90,98,0.6)',
                        background: elementFilter === el ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.35)',
                        color: elementFilter === el ? '#ffffff' : '#9ca3af',
                      }
                    : getElementFilterStyle(el, elementFilter === el)),
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.05em',
                }}
              >
                {el}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill list */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([element, rarities]) => (
          <div key={element}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-800" />
              <Badge className="text-xs border" style={getElementBadgeStyle(element)}>
                {element}
              </Badge>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-800" />
            </div>
            <div className="space-y-4">
              {RARITY_ORDER.filter(rarity => rarities[rarity]).map((rarity) => (
                <div key={rarity}>
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 pl-1">
                    {rarity}
                  </p>
                  <div className="space-y-2">
                    {rarities[rarity].map(skill => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        isSelected={selectedIds.has(skill.id)}
                        onToggle={handleToggle}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {filteredSkills.length === 0 && (
          <p className="text-gray-600 text-center py-8 text-sm">No skills match your search.</p>
        )}
      </div>
    </div>
  );
}